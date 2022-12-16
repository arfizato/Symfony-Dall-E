
import { Controller } from "@hotwired/stimulus";
import { createClient } from '@supabase/supabase-js'
import {nodemailer} from 'nodemailer';


const supabaseUrl = 'URLFORSUPA'
const supabaseKey = "KEYFORSUPA"
const supabase = createClient(supabaseUrl, supabaseKey)

export default class extends Controller {
	static targets = ["oldPass","email", "pass","cpass"];


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

	verifpasswords() {		
		let password= this.passTarget.value;
		if (password.length <8 ){
			console.log("new password invalid");
			return false
		}
		password= this.cpassTarget.value;
		if (password.length <8 ){
			console.log("confirm password invalid");
			return false
		}
		if (password!==this.passTarget.value){
			console.log("passwords don't match")
			return false
		}
		return true
	}
	
	// async newPassword() {
		
	// 	const { data, error } = await supabase
	// 		.from('User')
	// 		.select("username")
	// 		.eq("email",this.emailTarget.value)
	// 		.eq("password",this.oldPassTarget.value)
		
	
	// 	console.log(data,error)
	// 	if (data.length == 0){
	// 		console.log("Check Your Credentials!");
	// 	}
	// 	else{
	// 		const tokenExpirationDate=new Date(+new Date()+60*60*24*1000);
	// 		const uuid = this.generateUUID();
	// 		if (this.verifinput()){
	// 			const { updateData, updateError } = await supabase
	// 				.from('User')
	// 				.update({ authToken: uuid, tokenExpirationDate: tokenExpirationDate,password:this.passTarget.value})
	// 				.eq('email', this.emailTarget.value)
	// 			console.log(updateData,updateError);

	// 			sessionStorage.setItem("authToken", uuid);
	// 			sessionStorage.setItem("expirationDate",tokenExpirationDate);
				
				

	// 			alert(`password changed to ${this.passTarget.value} from ${this.oldPassTarget.value}`);
	// 			window.location.href= "/" 
	// 		}
	// 	}
	// 	console.warn(data,error)
	// 	// let { data: User, error } = await supabase
	// 	// .from('User')
	// 	// .select('*')

	// }

	async getNewPassword(){		
		const { data, error } = await supabase
			.from('User')
			.select("userId")
			.eq("email",this.emailTarget.value);
		console.log("getNewPassword: ",data,error);
		if (data.length > 0){
			this.sendEmail(this.emailTarget.value);
		}else{
			this.emailTarget.value= "";
			console.warn("email does not exist in databse");
		}

	}

	sendEmail(email){		
		const msg = {
			from:"symfonydalle@gmail.com",
			to:email,
			subject:"Request To Change Password",
			text:"Did you request to change your password ?",
		};
		const transporter=	nodemailer.createTransport({
			service:  'gmail',
			auth: {
				user: "symfonydalle@gmail.com",
				pass: "NODEMAILERPASS"
			},
			port: 465,
			host: 'smtp.gmail.com'
		});
		transporter.sendMail(msg, (err )=>{
			if(err) {
				return console.log('Error occurs!', err);
			}else{
				return console.log('Email sent :x ');
			}
		})

	}

}
