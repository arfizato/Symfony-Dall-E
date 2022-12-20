
import { Controller } from "@hotwired/stimulus";
import { createClient } from '@supabase/supabase-js'
import Swal from 'sweetalert2';

const {supabaseKey,supabaseUrl} = require("./secrets.json")
const supabase = createClient(supabaseUrl, supabaseKey)

export default class extends Controller {
	static targets = ["email", "pass","cpass"];
	/* ---------------------------- global functions ---------------------------- */
	generateUUID() { // Public Domain/MIT 1d82717f-11c1-43c2-b405-e91055210c43
		var d = new Date().getTime();//Timestamp
		var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16;//random number between 0 and 16
			if(d > 0){//Use timestamp until depleted
				r = (d + r)%16 | 0;
				d = Math.floor(d/16);
			} else {//Use microseconds since page-load if supported
				r = (d2 + r)%16 | 0;
				d2 = Math.floor(d2/16);
			}
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
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
	/* ------------------- requesting Email (nopass.html.twig) ------------------ */
	sendEmail(USER){
		const {email,username} = USER;
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({
			"email": email,
			"username": username,
			"url": "http://localhost:8000/newpass"
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("http://localhost:8080/sendEmail", requestOptions)
			.then(response => response.text())
			.then(result => console.log("sendMail result:",result))
			.catch(error => console.log('sendMail error:', error));
	}
	async getNewPassword(){		
		const { data, error } = await supabase
			.from('User')
			.select("userId,username,email")
			.eq("email",this.emailTarget.value);

		console.log("getNewPassword: ",data,error);
		if (data.length > 0){
			this.sendEmail(data[0]);
			await Swal.fire({
				title: 'Authentication Email Sent!',
				text: "Did you recieve it?",
				icon: 'question',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, I got it!'
			}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
				'Great!',
				'Now go to the email and click the Link.',
				'success'
				)
			}
			})		
			
		}else{
			this.emailTarget.value= "";
			this.invalidField(this.emailTarget,"The email you provided is not registered in our database!",true)
			console.warn("email does not exist in database");
		}

	}
	/* --------------- creating new password (newpass.html.twig) ---------------- */
	verifpasswords() {		
		let pass= this.passTarget.value;
		let cpass= this.cpassTarget.value;

		if (pass.length <8 ){
			console.log("new password invalid");
			this.invalidField(this.passTarget,"password");
			return false
		}
		if (pass!==cpass){
			console.log("passwords don't match")
			this.invalidField(this.cpassTarget,"passwords don't match",true);
			return false
		}
		return true
	}
	async saveNewPassword(newPassword,authToken){
		const tokenExpirationDate=new Date(+new Date()+60*60*24*1000);
		const uuid = this.generateUUID();

		let{ data, error } = await supabase
			.from('User')
			.update({ authToken: uuid, tokenExpirationDate: tokenExpirationDate,password:newPassword})
			.eq("authToken",authToken);
		console.log(data,error);

		sessionStorage.setItem("authToken", uuid);
		sessionStorage.setItem("expirationDate",tokenExpirationDate);
		// alert(`password changed to ${this.passTarget.value} from ${this.oldPassTarget.value}`);
		
		Swal.fire(
			'Sucess!',
			'Your password has been reset. remember it this time!',
			'success'
			)
		window.location.href= "/" 	
	}
	async makeNewPassword() {
		const password = this.passTarget.value;
		const urlParams = new URLSearchParams(window.location.search);
		const authToken = urlParams.get("authToken");
		console.log("makeNewPassword1:",authToken,urlParams)
		
		if(!this.verifpasswords()) return

		/* ---------------------- verify if authtoken is valid ---------------------- */
		let { data, error } = await supabase
			.from('User')
			.select("username")
			.eq("authToken",authToken)		
		if(data.length==0) return console.log("invalid authToken");
		console.log(data,error)
		
		/* --------------------------- update the database -------------------------- */
		this.saveNewPassword(password,authToken);

	}
}
