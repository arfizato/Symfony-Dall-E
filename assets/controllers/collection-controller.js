
import { Controller } from "@hotwired/stimulus";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'URLFORSUPA'
const supabaseKey = "KEYFORSUPA"
const supabase = createClient(supabaseUrl, supabaseKey)

export default class extends Controller {
	static targets = ["post","image", "prompt"];
    


}
