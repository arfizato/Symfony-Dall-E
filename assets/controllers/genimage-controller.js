import { Controller } from "@hotwired/stimulus";
import { Configuration, OpenAIApi } from "openai";
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2';
import moment from 'moment';

const {supabaseKey,supabaseUrl,apiKey} = require("./secrets.json")
const supabase = createClient(supabaseUrl, supabaseKey)
export default class extends Controller {
	static targets = ["button","prompt", "output"];

	logout(){
		console.log("leaving")
		sessionStorage.clear();
		window.location.href= "/login";
	}
	
	invalidField(elem,name,full= false){ 
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: !full ? `${name} is invalid` : name,
		})
		elem.style.border= "solid 1px red";
		elem.classList.add("animate-invalidField");
		setTimeout(()=>{elem.classList.remove("animate-invalidField");},800 )
		setTimeout(()=>{elem.style.border="none"},3000);
	}
	async requestMoreCredits(){
		
		const { data:updateData,error: updateError } = await supabase
			.from('User')
			.update({ credits: 10})
			.eq("authToken",sessionStorage.getItem("authToken"))
		document.getElementById('numberOfCredits').innerHTML=10
		console.log("update log:",updateData,updateError);
	}
	ranOutOfCredits(){
		Swal.fire({
			title: 'You Ran Out Of ',
			text: "Do you want to request more from the admin?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#888',
			confirmButtonText: 'Request More credits!',
			cancelButtonText:"Oh, Okay :( ."
		}).then((result) => {
			if (result.isConfirmed) {
				this.requestMoreCredits();
				Swal.fire(
					'Done!',
					'Request has been sent.',
					'success'
				)

			}
		})
	}
	IfCollectionEmpty(){
		const elems = document.querySelector(".imgContainerElem");
		if (!elems){
			const p = document.getElementById("imagesThisSession");
			p.classList.add("hidden");
			p.classList.remove("grid");
	
			const down=document.getElementById("downArrowToRecent");
			down.classList.add("hidden");
			down.classList.remove("grid");

			window.location.href= "/" ;                

		}
	}
	async deleteImage(event){
		console.log("Delete Image:",event.params);
		let {id, parent} = event.params;
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(async (result) => {
		if (result.isConfirmed) {
			document.getElementById(parent).remove();		
			Swal.fire(
				'Deleted!',
				'Your file has been deleted.',
				'success'
			)	
			const { data :ImageData , error:ImageError } = await supabase
				.from('Image')
				.delete()
				.eq('imageId', id)
				.select()
			console.log("Image deletion: ",ImageData,ImageError);
			this.IfCollectionEmpty()	
		}})
	}

	async genButtonClicked() {
		this.buttonTarget.textContent = "Waiting for Image To Load . . .";
		this.buttonTarget.disabled = true;
		this.buttonTarget.classList.remove("hover:bg-blue-700");
		this.buttonTarget.classList.remove("bg-blue-500");
		this.buttonTarget.classList.add("bg-gray-400");
		// getting credits 
		let { data: UserCredits, userCreditsError } = await supabase
			.from('User')
			.select('credits')
			.eq("authToken",sessionStorage.getItem("authToken"))

		if (UserCredits[0].credits>0){
			let prompt = (String(this.promptTarget.value).length)>0 ? this.promptTarget.value : "Tunisian Flag high detail" ;
			let image = await this.genImg(prompt);  
			if (image.length<300){
				this.outputTarget.src = image;			
				this.invalidField(this.promptTarget,"The prompt is inappropriate!",true);
				this.buttonTarget.disabled = false;
				this.buttonTarget.textContent = "Generate Image";
				this.buttonTarget.classList.add("hover:bg-blue-700");
				this.buttonTarget.classList.add("bg-blue-500");
				this.buttonTarget.classList.remove("bg-gray-400");
				return	
			}
			let url = "data:image/png;base64,"+image;
			fetch(url)
				.then(res => res.blob())
				.then(file => {
					console.log(file);
					this.sendFileToBucket(file,prompt);
				})
			
			const { data:updateData,error: updateError } = await supabase
				.from('User')
				.update({ credits: UserCredits[0].credits -1})
				.eq("authToken",sessionStorage.getItem("authToken"))
			document.getElementById('numberOfCredits').innerHTML=UserCredits[0].credits -1
			console.log("update log:",updateData,updateError);
		}else{
			this.buttonTarget.disabled = false;
			this.buttonTarget.textContent = "Generate Image";
			this.buttonTarget.classList.add("hover:bg-blue-700");
			this.buttonTarget.classList.add("bg-blue-500");
			this.buttonTarget.classList.remove("bg-gray-400");
			this.ranOutOfCredits();
			console.warn("ran out poor guy");
		}
	}

	async genImg(input){
		const configuration = new Configuration({
			apiKey: apiKey,
		})
		const userinput =input;
		const openai = new OpenAIApi(configuration);
		let result;
		try {
			result = await openai.createImage({
				prompt:userinput,
				n:1,
				size:"512x512",
				user:"Arfizato",
				response_format: "b64_json"
			});
		}catch (error){
			console.warn("OPEN AI THROWN ERROR",error);
			return supabaseUrl+"/storage/v1/object/public/symfony/ADMIN69/16-12-2022%2012:41:05.png"//"https://cdn.discordapp.com/attachments/869334941337546782/1050535050631970866/naw-mike-epps.gif"
		}
		console.log(result);
		// console.log("2,",result.data.data[0].b64_json);
		// sessionStorage.setItem("b64",result.data.data[0].b64_json)
		return result.data.data[0].b64_json;

	}
	
	async getUserData(){		
		/* --------------- getting userId and username for folder name -------------- */
		let { data: User, usererror } = await supabase
			.from('User')
			.select('username,userId')
			.eq("authToken",sessionStorage.getItem("authToken"))
		console.log("user",User[0],sessionStorage.getItem("authToken"))
		return User[0]
	}
	async uploadImageToBucket(userId,username,file){
		const { data, error } = await supabase.storage
			.from("symfony")
			.upload(`${username}${userId}/${moment().format("DD-MM-YYYY hh:mm:ss")}.png`, file);

		console.log("uploadImageToBucket: response",data);
		console.log("uploadImageToBucket: error", error);

		return data;
	}
	addToSessionImages(imageobj){
		let {prompt,imageId,url}= imageobj;
		console.log("addToSessionImages: ",imageobj,prompt,imageId,url)
		const p = document.getElementById("imagesThisSession");
		p.classList.remove("hidden");
		p.classList.add("grid");

		const down=document.getElementById("downArrowToRecent");
		down.classList.remove("hidden");
		down.classList.add("grid");
		

		const imgContainerElem=`
        <div class="flex flex-col justify-center items-center h-80 imgContainerElem" id=${"imgInGen"+imageId} {{stimulus_controller("genimage")}} > 
            <img class="w-48 rounded-md shadow-md " src=${url} alt=${prompt} />
            <p class=" h-16 py-1 overflow-y-auto scrollbar text-center align-middle "> ${prompt} </p>
            <button class="bg-red-600 text-white px-10 py-1 rounded-md hover:scale-90 transition-all duration-200" 
                data-genimage-id-param=${imageId} data-genimage-parent-param=${"imgInGen"+imageId} data-action="genimage#deleteImage">
                Delete 
            </button>
        </div>		
		`;

		p.insertAdjacentHTML( 'beforeend', imgContainerElem );

	}
	async sendFileToBucket(file,prompt) {

		const {userId,username}= await this.getUserData();
		console.log("sendFileToBucket",{userId,username});

		/* ------------------------- upload image to bucket ------------------------- */

		const bucketData =await this.uploadImageToBucket(userId,username,file)

		//changing the src of the picture and the state of the button 
		this.outputTarget.src = supabaseUrl+"/storage/v1/object/public/symfony/"+bucketData.path;
		this.buttonTarget.disabled = false;
		this.buttonTarget.classList.add("hover:bg-blue-700");
		this.buttonTarget.classList.add("bg-blue-500");
		this.buttonTarget.classList.remove("bg-gray-400");
		this.buttonTarget.textContent = "Generate Image";	


		/* -------------- inserting new row to image table in database -------------- */		
		const { data, error } = await supabase
			.from('Image')
			.insert({
				userId: userId,
				prompt: prompt,
				url: this.outputTarget.src,
			})
			.select("*")
		console.log("sendFileToBucket: insertData",data, error);
		this.addToSessionImages(data[0]);

	}
}
