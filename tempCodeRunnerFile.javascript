const crypto = require("crypto");

function encrypt(text, password) {
	// Generate a random initialization vector (IV) of 16 bytes
	const iv = crypto.randomBytes(16);

	// Generate a salt of 16 bytes
	const salt = crypto.randomBytes(16);

	// Derive a key from the password using PBKDF2
	const key = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");

	// Create a new cipher using AES-256-CBC with the derived key
	const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

	// Encrypt the text and return the ciphertext as a hexadecimal string
	return (
		cipher.update(text, "utf8", "hex") +
		cipher.final("hex") +
		iv.toString("hex") +
		salt.toString("hex")
	);
}

function decrypt(ciphertext, password) {
	// Extract the initialization vector (IV) and salt from the ciphertext
	const iv = Buffer.from(ciphertext.slice(-32, -16), "hex");
	const salt = Buffer.from(ciphertext.slice(-16), "hex");

	// Derive the key from the password using PBKDF2
	const key = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256");

	// Create a new decipher using AES-256-CBC with the derived key
	const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

	// Decrypt the ciphertext and return the resulting plaintext
	return (
		decipher.update(ciphertext.slice(0, -32), "hex", "utf8") +
		decipher.final("utf8")
	);
}
const encrypted = encrypt('Hello, world!', 'my secret password');
console.log(encrypted);  // => 'a8f9f938f29b61e70d0cc1f8a3a444a3d3d3f76a7fb15ed...'

const decrypted = decrypt(encrypted, 'my secret password');
console.log(decrypted);  // => 'Hello, world!'
