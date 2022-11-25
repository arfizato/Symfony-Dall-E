import { Controller } from "@hotwired/stimulus";
import { Configuration, OpenAIApi } from "openai";

export default class extends Controller {
	static targets = ["button","name", "output"];

	async greet() {
		this.buttonTarget.textContent = "Waiting for Image To Load . . .";
		this.buttonTarget.disabled = true;
		document.querySelector("#genButton").disabled = true;
		
		this.outputTarget.src =await this.genImg(this.nameTarget.value);
		
		document.querySelector("#genButton").disabled = false;
		this.buttonTarget.disabled = false;
		this.buttonTarget.textContent = "Generate Image";
	}

	async genImg(input){
		const configuration = new Configuration({
			apiKey: "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",
		})
		const userinput =(String(input).length)>0 ? input : "Tunisian Flag high detail";
		const openai = new OpenAIApi(configuration);
		const result = await openai.createImage({
			prompt:userinput,
			n:1,
			size:"512x512",
			user:"Arfizato"
		});

		console.log(Date.now());
		console.log("2,",result.data.data[0].url);

		return result.data.data[0].url;

	}
}
