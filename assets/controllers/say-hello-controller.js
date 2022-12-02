import { Controller } from "@hotwired/stimulus";
import { Configuration, OpenAIApi } from "openai";
import { createClient } from '@supabase/supabase-js';
import moment from 'moment';

const supabaseUrl = 'URLFORSUPABASE'
const supabaseKey = "KEYFORSUPABASE"
const supabase = createClient(supabaseUrl, supabaseKey)
export default class extends Controller {
	static targets = ["button","prompt", "output"];


	
	async genButtonClicked() {
		this.buttonTarget.textContent = "Waiting for Image To Load . . .";
		this.buttonTarget.disabled = true;
		// document.querySelector("#genButton").disabled = true;
		
		// this.outputTarget.src =await this.genImg(this.nameTarget.value);
		
        let url = "data:image/png;base64,"+await this.genImg(this.promptTarget.value);        
        fetch(url)
            .then(res => res.blob())
            .then(file => {
                console.log(file);
                this.sendFileToBucket(file);
            })
		this.buttonTarget.color = "red";
		// document.querySelector("#genButton").disabled = false;
		

	}

	async genImg(input){
		const configuration = new Configuration({
			apiKey: "KEYFOROPENAI",
		})
		const userinput =(String(input).length)>0 ? input : "Tunisian Flag high detail";
		const openai = new OpenAIApi(configuration);
		const result = await openai.createImage({
			prompt:userinput,
			n:1,
			size:"512x512",
			user:"Arfizato",
			response_format: "b64_json"
		});

		console.log(Date.now());
		console.log("2,",result.data.data[0].b64_json);
		sessionStorage.setItem("b64",result.data.data[0].b64_json)
		return result.data.data[0].b64_json;

	}
	
	async sendFileToBucket(file) {
		/* --------------- getting userId and username for folder name -------------- */
		let { data: User, usererror } = await supabase
			.from('User')
			.select('username,userId')
			.eq("authToken",sessionStorage.getItem("authToken"))
		const userId= User[0].userId;
		const username= User[0].username;
		console.log(User[0],usererror);

		/* ------------------------- upload image to bucket ------------------------- */
		const { data, error } = await supabase.storage
			.from("symfony")
			.upload(`${username}${userId}/${moment().format("DD-MM-YYYY hh:mm:ss")}.png`, file);

		console.log("response",data);
		console.log("error", error);

		//changing the src of the picture and the state of the button 
		this.outputTarget.src = supabaseUrl+"/storage/v1/object/public/symfony/"+data.path;
		this.buttonTarget.disabled = false;
		this.buttonTarget.textContent = "Generate Image";		
		/* -------------- inserting new row to image table in database -------------- */
		
		const { insertData, insertError } = await supabase
		.from('Image')
		.insert([{
			userId: userId,
			prompt: this.promptTarget.value,
			url: this.outputTarget.src,
		}])
		console.log(insertData, insertError);

	}
}
