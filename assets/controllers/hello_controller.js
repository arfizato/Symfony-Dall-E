import { Controller } from "@hotwired/stimulus";
import { createClient } from "@supabase/supabase-js";
import moment from 'moment';
// import dotenv from 'dotenv';
// import { promisify } from 'util';
// import fs from 'fs';

const supabaseUrl = 'URLFORSUPA'
const supabaseKey = "KEYFORSUPA"
console.log(supabaseKey,supabaseUrl)
const supabase = createClient(supabaseUrl, supabaseKey)

export default class extends Controller {
	async test(){		
		
		// const { data, error } = await supabase
		// 	.from('Image')
		// 	.select(`imageId, url, createdAt, prompt, User (username) `)
		// console.log(data,error)
		// data.forEach(i =>{console.log(i)})
		console.log(data)
	}
}



