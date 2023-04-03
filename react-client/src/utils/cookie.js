export function getCookie(name) {
	var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = "";
	if (cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(";", cookieStart);
			if (cookieEnd == -1) {
					cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue;
}

export function setCookie(name, value, expires, domain, path, secure) {
	var cookieText = "";
	cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if (expires instanceof Date) {
			cookieText += "; expires=" + expires.toGMTString();
	}
	if (path) {
			cookieText += "; path=" + path;
	}
	if (domain) {
			cookieText += "; domain=" + domain;
	}
	if (secure) {
			cookieText += "; secure";
	}
	document.cookie = cookieText;
}

export function removeCookie(name, domain, path, secure) {
	setCookie(name, "", Date(0), domain, path, secure);
}