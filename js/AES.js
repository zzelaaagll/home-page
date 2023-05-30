window.AESDecode = function (str, key, iv) {

	try {
		const bytes = CryptoJS.AES.decrypt(str, CryptoJS.enc.Utf8.parse(key), {
		  iv: CryptoJS.enc.Utf8.parse(iv),
		  mode: CryptoJS.mode.CBC,
		  padding: CryptoJS.pad.Pkcs7
		});
		const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
		return JSON.parse(decryptedText);
	}catch (e) {
		return "";
	}
}

window.AESEncode = function (json, key, iv) {

	try {
		const plaintext = JSON.stringify(json);
		const ciphertext = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(key), {
		  iv: CryptoJS.enc.Utf8.parse(iv),
		  mode: CryptoJS.mode.CBC,
		  padding: CryptoJS.pad.Pkcs7
		});
		return ciphertext.toString();
	}catch (e) {
		return "";
	}
}