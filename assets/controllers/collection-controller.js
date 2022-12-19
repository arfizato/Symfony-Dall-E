
import { Controller } from "@hotwired/stimulus";
import Swal from 'sweetalert2';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'URLFORSUPA'
const supabaseKey = "KEYFORSUPA"
const supabase = createClient(supabaseUrl, supabaseKey)

export default class extends Controller {
	static targets = ["post","image", "prompt"];
    
	async deleteImage(event){
		console.log(event.params);
		let {id, parent} = event.params;
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(async(result) => {
		if (result.isConfirmed) {
			document.getElementById(parent).remove();			
			const { ImageData , ImageError } = await supabase
				.from('Image')
				.delete()
				.eq('imageId', id)
				.select()
			console.log("Image: ",ImageData,ImageError);
			Swal.fire(
				'Deleted!',
				'Your file has been deleted.',
				'success'
			)
		}
		})
	}

}
