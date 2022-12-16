import { Controller } from "@hotwired/stimulus";
import { createClient } from "@supabase/supabase-js";
import moment from 'moment';
import { duration } from "moment/moment";


const supabaseUrl = 'URLFORSUPA'
const supabaseKey = "KEYFORSUPA"
const supabase = createClient(supabaseUrl, supabaseKey)

function loadUserHeader(){
	const p = document.getElementById("contentContainer")	;

	const header=`
	<div class="flex justify-between mb-5 border-b-2 border-gray-700 border-solid pl-2">
		<h1 class="overflow-x-auto scrollbar w-28">Username</h1>
		<p  class="overflow-x-auto scrollbar w-56">Email</p>
		<p  class="overflow-x-auto scrollbar w-28">Password </p>
		<p  class="overflow-x-auto scrollbar w-24" data-user="arfizato" id="credits">
			Credits
		</p>
		<p  class="overflow-x-auto scrollbar w-64">Created At</p>

		<button class="invisible duration-75 transition-all hover:scale-90 text-white bg-red-600 py-1 px-2 rounded ">Delete</button>
	</div>
	`
	p.insertAdjacentHTML( 'beforeend', header );

}

function loadUser(user){
	const p = document.getElementById("contentContainer")	;
	let {username,userId,email,password,credits,createdAt} = user;
	const userElem= `
		<div class="flex justify-between my-5 hover:bg-slate-100 transition-all duration-200 pl-2 rounded" id=${username+userId}>
			<h1 class="overflow-x-auto scrollbar w-28" id=${"username"+userId} >${username}</h1>
			<p  class="overflow-x-auto scrollbar w-56">${email}</p>
			<p  class="overflow-x-auto scrollbar w-28">${password}</p>
			<p  class="overflow-x-auto scrollbar w-24 flex justify-between" data-user=${userId} >
				<button class="px-2 bg-blue-300 rounded-md hover:bg-blue-400 transition-all duration-75" 
					data-action="admin#updateCredits" data-admin-id-param=${userId} data-admin-parent-param=${"credits"+username+userId} 
					data-admin-operator-param="-1">
					-
				</button> 
				<span id=${"credits"+username+userId}> ${credits} </span>
				<button class="px-2 bg-blue-300 rounded-md hover:bg-blue-400 transition-all duration-75" 
					data-action="admin#updateCredits" data-admin-id-param=${userId} data-admin-parent-param=${"credits"+username+userId} 
					data-admin-operator-param="1">
					+
				</button>
			</p>
			<p  class="overflow-x-auto scrollbar w-64">${ (new Date(createdAt)).toLocaleString() }</p>

			<button class="duration-75 transition-all hover:scale-90 text-white bg-red-600 py-1 px-2 rounded " id=${"delBtn"+userId} 
				data-admin-id-param=${userId} data-admin-parent-param=${username+userId} data-action="admin#deleteUser" >
				Delete
			</button>
		</div>
	`;

	p.insertAdjacentHTML( 'beforeend', userElem );

}

function loadImageHeader(){
	const p = document.getElementById("contentContainer")	;
	const header = `
	<div class="flex justify-between mb-5 border-b-2 border-gray-700 border-solid">
		<h1 class="overflow-x-auto scrollbar w-28">Preview</h1>
		<p  class="overflow-x-auto scrollbar w-64">Prompt</p>
		<p  class="overflow-x-auto scrollbar w-28">Username </p>
		<p  class="overflow-x-auto scrollbar w-56">Created At</p>

		<button class="invisible py-2 px-4 rounded my-auto h-fit ">Delete</button>
	</div>	
	`;
	p.insertAdjacentHTML( 'beforeend', header );
}

function loadImage(image){
	const {imageId, url, createdAt, prompt, User} =image

	const p = document.getElementById("contentContainer")	;
	const imageElem =`
	<div class="flex justify-between my-5 gap-5 hover:bg-slate-100 transition-all duration-200 rounded" id=${"image"+imageId}>
		<a href=${url} target="_blank">
			<img class="overflow-x-auto scrollbar w-28 rounded-md shadow-md" src=${url} />
		</a>
		<p  class="overflow-x-auto scrollbar w-64 max-h-28">${prompt}</p>
		<p  class="overflow-x-auto scrollbar w-28">${User.username} </p>
		<p  class="overflow-x-auto scrollbar w-56">${(new Date(createdAt)).toLocaleString()}</p>

		<button class="duration-75 transition-all hover:scale-90 text-white bg-red-600 py-2 px-4 rounded my-auto h-fit " 
				data-admin-id-param=${imageId} data-admin-parent-param=${"image"+imageId} data-action="admin#deleteImage">
			Delete
		</button>
	</div>	
	`;

	p.insertAdjacentHTML( 'beforeend', imageElem );
}

export default class extends Controller {
	// static targets = [];
	async loadUsers(){	
		const parent = document.getElementById("contentContainer")	;
		while(parent.firstChild) parent.removeChild(parent.firstChild);
		
		let { data: User, error } = await supabase
			.from('User')
			.select('username,userId,email,password,credits,createdAt,role')

		// console.log(User,error);
		loadUserHeader();
		User.forEach(u => {
			loadUser(u);
			console.log("role",u.role)
			if (u.role==="ADMIN"){
				console.warn("admin is logged in");
				let userh1= document.getElementById("username"+u.userId),
					userDelBtn= document.getElementById("delBtn"+u.userId);
				userh1.innerHTML= "🛡"+userh1.innerHTML;
				userDelBtn.classList.add("invisible");
			}
		})
	}
	async updateCredits(event){
		console.log(event.params )
		const {id, parent, operator}=event.params;

		const credElem = document.getElementById(parent);
		let currentCredits= parseInt(credElem.innerHTML);
		if (currentCredits+operator < 0) return

		credElem.innerHTML= currentCredits+operator
		console.log((currentCredits));

		const { error } = await supabase
			.from('User')
			.update({ credits: currentCredits+operator})
			.eq('userId', id)
		if (error)
			console.warn(error)

	}
	async deleteUser(event){
		console.log("delete",event.params)
		const parent= document.getElementById(event.params.parent);

		const { ImageData , ImageError } = await supabase
			.from('Image')
			.delete()
			.eq('userId', event.params.id)
			.select()
		console.log("Image: ",ImageData,ImageError);

		const { userData , userError } = await supabase
			.from('User')
			.delete()
			.eq('userId', event.params.id)
			.select()
		console.log("user: ",userData,userError);
		

		parent.remove();
	}	

	async loadImages(){
		const parent = document.getElementById("contentContainer")	;
		while(parent.firstChild) parent.removeChild(parent.firstChild);

		const { data, error } = await supabase
			.from('Image')
			.select(`imageId, url, createdAt, prompt, User (username) `)
			.order("userId", {ascending: true})
		console.log(data, error);

		loadImageHeader();
		data.forEach(image =>{loadImage(image)})
	}
	async deleteImage(event){		
		console.log("delete",event.params)
		// const parent= document.getElementById(event.params.parent);
		document.getElementById(event.params.parent).remove();
		
		const { ImageData , ImageError } = await supabase
			.from('Image')
			.delete()
			.eq('imageId', event.params.id)
			.select()
		console.log("Image: ",ImageData,ImageError);
	}
}



