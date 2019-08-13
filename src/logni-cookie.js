
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

/**
 * @fileoverview Cookie javascript library for work with cookies 
 * (supporting LogNI logger)
 * 
 * @version 0.1.3
 * @author Erik Brozek - https://github.com/erikni
 * @since 2019
 * @static
 * Website: https://logni.net/js/cookie
 */

// version
const version = '0.1.3-2';

const logniCookie = new function() {

	this.debugMode = false;
	this.expires = '';
	this.domain = '';
	this.httponly = '';
	this.secure = '';
	this.path = '/';

	// seconds (compatible with strftime directives)
	this.__LOGniExpires = {
		Y: 31536000, // year (365days)
		y: 31536000, // year (alias)
		m: 2592000, // month (30days)
		W: 604800, // week (7days)
		w: 604800, // week (alias)
		d: 86400, // day
		H: 3600, // hour 
		h: 3600, // hour (alias)
		M: 60, // minute 
		S: 1, // second 
		s: 1 // second (alias)
	};

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
		expires = this.__expireStr2ms(setExpires);

		// set domain
		if (this.domain) domains = `;domain=${this.domain}`;
		if (setDomain) domains = `;domain=${setDomain}`;

		// set path, httponly, secure
		paths = (this.path) ? `;path=${this.path}` : ';path=/';
		httponlys = (this.httponly) ? ';httponly' : '';
		secures = (this.secure) ? ';secure' : '';

		// set cookie
		document.cookie = name+"="+value+paths+expires+domains+httponlys+secures;
		this.__debug(`set ${name}=${value}${paths}${expires}${domains}${httponlys}${secures} -> ret=0`);

		return 0;

	};
	// alias function
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
		const cookieDecoded = decodeURIComponent(document.cookie);
		const ca = cookieDecoded.split(';');

		if (this.debugMode) console.log(ca);

		for(let i=0;i < ca.length;i++) {
			let c = ca[i];

			while (c.charAt(0) === ' ') {
				c = c.substring(1,c.length);
			}

			if (c.indexOf(cookieNameEQ) === 0) {
				const ret = this.__convert(c.substring(cookieNameEQ.length,c.length));
				this.__debug(`get ${name} -> ret=${ret} (type=${typeof ret})`);
				return ret;
			}
		}

		this.__debug(`get ${name} not exist -> ret=""`);
		return;
	};
	// alias function
	this.read = this.get;


  	/**
  	 * Remove cookie
  	 * 
  	 * @param {string} name, cookie name
  	 * @static
  	 */
	this.del = function(name) {
		// this.__debug(`cookieDel ${name}`);
		const ret = this.set(name);
		this.__debug(`del name=${name} -> ret=${ret}`);

		return ret;
	};
	// alias function
	this.delete = this.del;
	this.remove = this.del;


  	/**
  	 * Expire string format to milisecond
  	 * 
  	 * @param {string} setExpires, expires format (Xy, Xw, Xd, Xm, Xs)
  	 * @private
  	 */
	this.__expireStr2ms = function(setExpires) {
		let expirestr;
		let expires = '';

		// global v local
		if (this.expires) expirestr = this.expires;
		if (setExpires) expirestr = setExpires;

		// unset expire
		if (expirestr === undefined) return '';

		// if number? convert to Xs format
		if (typeof expirestr === "number") expirestr=`${expirestr}s`;

		let l = expirestr.length;
		if (l==1) expirestr=`${expirestr}s`;
		l = expirestr.length;

		// parse string format
		let expireNo = parseInt(expirestr.substring(0,l-1), 10);
		const expireType = expirestr.substring(l-1,l);

		// convert to miliseconds
		let expireTypeSec = this.__LOGniExpires[expireType];
		if (expireTypeSec === undefined) expireTypeSec = 1;
		if (this.debugMode) this.__debug(`expire ${setExpires} = no=${expireNo} * sec=${expireTypeSec}`);
		expireNo = expireNo * expireTypeSec * 1000;

		if (expireNo) {
			let date = new Date();
			date.setTime(date.getTime()+expireNo);
			expires = `;expires=${date.toGMTString()}`;
		}

		return expires;
	};


  	/**
  	 * Debug message
  	 * 
  	 * @param {string} msg,
  	 * @static
  	 */
	this.__debug = function(msg) {
		console.log(`COOKIE: ${msg} [version=${version}]`);

		return 0;
	};


  	/**
  	 * Convert string -> string|number
  	 * 
  	 * @param {string} value,
  	 * @static
  	 */
	this.__convert = function(value) {
		if (this.debugMode) this.__debug(`convert from value="${value}" type=${typeof value} -> isNumber=${Number(value)}`);

		// string
		if (isNaN(value)) return value

		const value1 = value * 1;
		if (typeof value1 !== "number") return value

		// number
		return value1;
	};
};

// package.json
if ("undefined" !== typeof module) {
	module.exports = logniCookie;
}
