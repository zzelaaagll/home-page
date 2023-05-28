
// 恭喜你找到这里，然而并没有什么用╮(๑•́ ₃•̀๑)╭
$.extend({
	base64Decode:function(txt) {

		if (txt !== undefined && txt !== "") {
			return {pw: "\u590f\u6d1b\u7279\u70e6\u607c", u: "#"};
		}else {
			return "";
		}
	}
});

function decrypt (str, key, iv) {

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

function encrypt (json, key, iv) {

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