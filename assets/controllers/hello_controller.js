import { Controller } from "@hotwired/stimulus";
import { createClient } from "@supabase/supabase-js";
import moment from 'moment';

/*
 * This is an example Stimulus controller!
 *
 * Any element with a data-controller="hello" attribute will cause
 * this controller to be executed. The name "hello" comes from the filename:
 * hello_controller.js -> "hello"
 *
 * Delete this file or adapt it for your use!
 */
const supabaseUrl = "URLFORSUPABASE";
const supabaseKey = "KEYFORSUPABASE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default class extends Controller {
	static targets = ["file"];

	generateUUID() {
		// Public Domain/MIT 1d82717f-11c1-43c2-b405-e91055210c43
		var d = new Date().getTime(); //Timestamp
		var d2 =
			(typeof performance !== "undefined" &&
				performance.now &&
				performance.now() * 1000) ||
			0; //Time in microseconds since page-load or 0 if unsupported
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (c) {
				var r = Math.random() * 16; //random number between 0 and 16
				if (d > 0) {
					//Use timestamp until depleted
					r = (d + r) % 16 | 0;
					d = Math.floor(d / 16);
				} else {
					//Use microseconds since page-load if supported
					r = (d2 + r) % 16 | 0;
					d2 = Math.floor(d2 / 16);
				}
				return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
			}
		);
	}
	async upload() {
		
        let url = "data:image/png;base64,"+sessionStorage.getItem("b64");
        
        fetch(url)
            .then(res => res.blob())
            .then(file => {
                console.log(file);
                this.sendFileToBucket(file)
            })
	}
	async sendFileToBucket(file) {
		const { data, error } = await supabase.storage
			.from("symfony")
			.upload(`public/${moment().format("DD-MM-YYYY hh:mm:ss")}.png`, file);

		console.log("response",data);
		console.log("error", error);
	}
	async test(){
		// console.log(env.supabaseKey);
	}
}



