
import { Controller } from "@hotwired/stimulus";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'URLFORSUPA'
const supabaseKey = "KEYFORSUPA"
const supabase = createClient(supabaseUrl, supabaseKey)

export default class extends Controller {
	static targets = ["post","image", "prompt"];
    
	async deleteImage(event){
		console.log(event.params);
		let {id, parent} = event.params;
		document.getElementById(parent).remove();
		
		const { ImageData , ImageError } = await supabase
			.from('Image')
			.delete()
			.eq('imageId', id)
			.select()
		console.log("Image: ",ImageData,ImageError);
	}

}
