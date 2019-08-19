[![npm version](http://img.shields.io/npm/v/logni-cookie.js.svg?style=flat)](https://npmjs.org/package/logni-cookie.js "View this project on npm")
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/42bc87cd688e4ac5bf41623f3c24373b)](https://www.codacy.com/app/erikni/logni-cookie.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=erikni/logni-cookie.js&amp;utm_campaign=Badge_Grade)
[![Github Releases](https://img.shields.io/github/downloads/atom/atom/latest/total.svg)](https://github.com/erikni/logni-cookie.js/releases)
[![Build Status](https://secure.travis-ci.org/erikni/logni-cookie.js.png?branch=master)](http://travis-ci.org/erikni/logni-cookie.js)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENCE)

# logni-cookie.js
Cookie javascript library for work with cookies (supporting LogNI logger)

## How to install?
- git (github)
- node package manager


Install from Github
```
$ git clone https://github.com/erikni/logni-cookie.js.git
$ cd logni-cookie.js
$ npm install
$ npm run build
```

Install from Node package manager
```
$ npm i logni-cookie.js
```


## Usage:

Add the local javascript file to head of HTML page:
```
<head>
  <script src="build/js/logni-cookie.min.js" type="text/javascript"></script>
</head>
```

ES5 support:
```
<head>
  <script src="build/js/logni-cookie-es5.min.js" type="text/javascript"></script>
</head>
```

or from Cloudflare CDN:
```
<head>
  <script src="https://live-jslib.logni.net/js/logni-cookie.min.js" type="text/javascript"></script>
</head>
```


_Initialization_
```
<script type="text/javascript">
  logniCookie.path = '/'; // set cookie path (optimal)
  logniCookie.domain = '.yourdomain.com'; // set cookie (sub)domain (optimal)
  logniCookie.expires = '10M'; // 10min expired (optimal)
</script>
```
- debugMode (boolean) - Debug ode
- expires (string) - Specified it will expire at the end of session.
- domain (string) - If not specified, this defaults to the host portion of the current document location. Contrary to earlier specifications, leading dots in domain names are ignored, but browsers may decline to set the cookie containing such dots. If a domain is specified, subdomains are always included. (example: 'example.com' or 'subdomain.example.com')
- httponly (boolean) - cookie attribute can help to mitigate this attack by preventing access to cookie value through Javascript
- secure (boolean) - Cookie to only be transmitted over secure protocol as https. Before Chrome 52, this flag could appear with cookies from http domains.
- path (string) - If not specified, defaults to the current path of the current document location. The path must be absolute (see RFC 6265). For more information on how to use relative paths. (default is "/", example: /, /path)


_Expired format_ (expires):

You can specify a time unit after a time value 'X', such as XY, Xm, Xw, Xd, XH, XM or XS to represent: 
- Y: years (alias: y)
- m: months 
- W: weeks (alias: w)
- d: days 
- H: hours (alias: h) 
- M: minutes 
- S: seconds (alias: s)

_Methods_

- get() - read one cookie
- set() - setting one cookie
- del() - remove one cookie
- gets() - read more cookies
- sets() - setting more cookies
- gets() - remove more cookies
- getAll() - is a string containing a semicolon-separated list of all cookies (i.e. key=value pairs). Note that each key and value may be surrounded by whitespace (space and tab characters): in fact, RFC 6265 mandates a single space after each semicolon, but some user agents may not abide by this.


_Variables_
```
<script type="text/javascript">
  cookieName1 = 'TEST1str';
  cookieValue1 = 'aa11' + Math.random();

  cookieName2 = 'TEST2str';
  cookieValue2 = '22bb' + Math.random();

  cookieName3 = 'TEST3int';
  cookieValue3 = 111;

  const cookieName4 = 'TEST4float';
  const cookieValue4 = 123.456;

  const cookieNames = [cookieName1, cookieName2, cookieName3, cookieName4];
  let cookieNameSets = {}
  cookieNameSets[cookieName1] = cookieValue1;
  cookieNameSets[cookieName3] = cookieValue3;
  cookieNameSets[cookieName4] = cookieValue4;
</script>
```


_Setting per one cookie_
```
<script type="text/javascript">
  logniCookie.set(cookieName1, cookieValue1, '2H', 'differentdomain.com'); // 2hour
  logniCookie.set(cookieName1, cookieValue1, '3w'); // 3 week
  logniCookie.set(cookieName1, cookieValue1, '10S'); // 10 second
  logniCookie.set(cookieName1, cookieValue1, 10); // 10 second (alias for '10s')
</script>
```

_or settings for more cookies_
```
<script type="text/javascript">
  logniCookie.sets(cookieNameSets, 'differentdomain.com'); // 2hour
</script>

```
_Read / remove cookie_
```
<script type="text/javascript">
  logniCookie.get(cookieName); // one cookie
  logniCookie.gets(cookieNames); // more cookies
  
  logniCookie.del(cookieName); // one cookie
  logniCookie.dels(cookieNames); // more cookies
</script>
```

## Test

[test/cookie.html](https://develop-jslib.logni.net/test/cookie.html)

## Contribution

[Pull Requests](https://github.com/erikni/logni-cookie.js/pulls) are very welcome.

# Licence
[GNU General Public License v3.0](LICENSE)
