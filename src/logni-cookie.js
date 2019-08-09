
/*
 * GNU General Public License v3.0
 *
 * Permissions of this strong copyleft license are conditioned on making 
 * available complete source code of licensed works and modifications, 
 * which include larger works using a licensed work, under the same license. 
 * Copyright and license notices must be preserved. Contributors provide 
 * an express grant of patent rights.
 *
 * see all: https://github.com/erikni/lognijs-cookie/blob/master/LICENSE
 */

const version = '0.1.2';


// nodejs cookies compatible
let documentCookie = `logni=${version}`;
try {
	documentCookie = document.cookie;
}
catch(err) {
	console.log(`[logni-cookie.js] document.cookie err="${err}"`);
}


const logniCookie = new function() {

	this.cookies = documentCookie;
	this.expires = '';
	this.domain = '';
	this.httponly = '';
	this.secure = '';
	this.path = '/';

  	/**
  	 * Create or update cookie
  	 * 
  	 * @param {string} name, cookie name
  	 * @param {string} value, cookie value
  	 * @param {string} setExpires, cookie expire in format NoType
  	 * @param {string} setDomain, cookie domain
  	 * @static
  	 */
	this.set = function(name, value, setExpires, setDomain) {
		let expires = '';
		let domains = '';
		let httponlys;
		let secures;
		let paths = '/';

		if (value === undefined) value='';

		// set expires
		if (setExpires) {
			let date = new Date();
			date.setTime(date.getTime()+(setExpires*86400*1000));
			expires = `;expires=${date.toGMTString()}`;
		}

		// set domain
		if (this.domain) domains = `;domain=${this.domain}`;
		if (setDomain) domains = `;domain=${setDomain}`;

		// set path, httponly, secure
		paths = (this.path) ? `;path=${this.path}` : ';path=/';
		httponlys = (this.httponly) ? ';httponly' : '';
		secures = (this.secure) ? ';secure' : '';

		const ret =`${name}=${value}${paths}${expires}${domains}${httponlys}${secures}`;
		this.cookies = ret;
		console.log(`COOKIE: set ${ret}`);

		return ret;

	};
	this.save = this.set;
	this.update = this.set;
	this.insert = this.set;


  	/**
  	 * Read cookie
  	 * 
  	 * @param {string} name, cookie name
  	 * @static
  	 */
	this.get = function(name) {
		const cookieNameEQ = name + "=";
		const cookieDecoded = decodeURIComponent(this.cookies);
		const ca = cookieDecoded.split(';');

		for(let i=0;i < ca.length;i++) {
			let c = ca[i];

			while (c.charAt(0) === ' ') {
				c = c.substring(1,c.length);
			}

			if (c.indexOf(cookieNameEQ) === 0) {
				const ret = c.substring(cookieNameEQ.length,c.length);
				console.log(`COOKIE: get ${name}="${ret}"`);
				return ret;
			}

		}

		// this.__debug(`cookieGet ${name} not exist`);
		console.log('COOKIE: get None');
		return;
	};
	this.read = this.get;


  	/**
  	 * Remove cookie
  	 * 
  	 * @param {string} name, cookie name
  	 * @static
  	 */
	this.del = function(name) {
		// this.__debug(`cookieDel ${name}`);
		this.set(name);
		console.log(`COOKIE: del name=${name}`);

		return 0;
	};
	this.delete = this.del;
	this.remove = this.del;
};

// package.json
if ("undefined" !== typeof module) {
	module.exports = logniCookie;
}
