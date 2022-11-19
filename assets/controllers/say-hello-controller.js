import { Controller } from "@hotwired/stimulus";
import { Configuration, OpenAIApi } from "openai";

export default class extends Controller {
	static targets = ["name", "output"];

	async greet() {
		this.outputTarget.textContent = "waiting for URL. . .";
		this.outputTarget.src =await this.genImg(this.nameTarget.value);
	}

	async genImg(input){
		const configuration = new Configuration({
			apiKey: "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",
		})
		console.log("1,",input);
		console.log("2,",input);
		const userinput =(String(input).length)>0 ? input : "Tunisian Flag high detail";
		const openai = new OpenAIApi(configuration);
		const result = await openai.createImage({
			prompt:userinput,
			n:1,
			size:"1024x1024",
			user:"Arfizato"
		});

		console.log(Date.now());
		console.log("2,",result.data.data[0].url);

		return result.data.data[0].url;

	}
}
