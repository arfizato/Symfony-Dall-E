
import { Controller } from "@hotwired/stimulus";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'KEYFORSUPA'
const supabaseKey = "URLFORSUPA"
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
		if (this.nameTarget.value === ""){
			console.log("name");
			return false
		}
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
		if (this.cpassTarget.value === "" || this.cpassTarget.value != password){
			console.log("confirm",password, this.cpassTarget.value);
			return false
		}
		return true
	}
	async signup() {
		if (this.verifinput()){
			console.log("hemdlh")
			const authToken = this.generateUUID();
			const tokenExpirationDate = new Date(+new Date()+24*60*60*1000);
			const { data, error } = await supabase
				.from('User')
				.insert([
					{ 	
						username: this.nameTarget.value, 
						email: this.emailTarget.value,
						password: this.passTarget.value,
						credits: 5,
						authToken: authToken,
						tokenExpirationDate: tokenExpirationDate
					},
				]);
			sessionStorage.setItem("authToken",authToken);
			sessionStorage.setItem("expirationDate",tokenExpirationDate);
			
			window.location.href= "/";
	
			console.warn(data,error)
		}

	}

}
