
import { Controller } from "@hotwired/stimulus";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'URLFORSUPA'
const supabaseKey = "KEYFORSUPA"
const supabase = createClient(supabaseUrl, supabaseKey)

export default class extends Controller {
	static targets = ["name","email", "pass","cpass"];


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

	verifinput() {	
		if (this.emailTarget.value ==="admin" && this.passTarget.value === "admin" )
			return true	
		const re= /^.+@\w+\.\w{2,5}$/;
		if (!re.exec(this.emailTarget.value)){
			console.log("email");
			return false
		}
		const password= this.passTarget.value;
		if (password.length <8 ){
			console.log("password");
			return false
		}
		return true
	}
	async login() {
		if (this.verifinput()){
			console.log("hemdlh")
			
			const { data, error } = await supabase
				.from('User')
				.select("username")
				.eq("email",this.emailTarget.value)
				.eq("password",this.passTarget.value)
			
			if (data.length == 0){
				console.log("credentials incorrect");
			}
			else{
				const tokenExpirationDate=new Date(+new Date()+60*60*24*1000);
				const uuid = this.generateUUID();
				const { updateData, updateError } = await supabase
					.from('User')
					.update({ authToken: uuid, tokenExpirationDate: tokenExpirationDate})
					.eq('email', this.emailTarget.value)
				console.log(updateData,updateError);
				sessionStorage.setItem("authToken", uuid);
				sessionStorage.setItem("expirationDate",tokenExpirationDate);
				
				if (this.emailTarget.value === "admin"){
					window.location.href = "/admin";
				}else
					window.location.href= "/" 
			}
			console.warn(data,error)
		}else{
			console.log("invalid Email or Password.")
		}

	}

}
