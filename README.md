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
  logniCookie.expires = '10m'; // 10min expired (optimal)
</script>
```

Expired values:

You can specify a time unit after a time value 'X', such as Xy, Xmo, Xw, Xd, Xh or Xm, to represent: 
- y: years
- mo: months
- w: weeks
- d: days
- h: hours
- m/mi: minutes
- s: seconds


_Set cookie_
```
<script type="text/javascript">
  cookieName = 'TEST1';
  cookieValue = 'AbC' + Math.random();

  logniCookie.set(cookieName, cookieValue, '2h', 'differentdomain.com');
  logniCookie.set(cookieName, cookieValue, '3w');
</script>
```

_Read / remove cookie_
```
<script type="text/javascript">
  logniCookie.get(cookieName);
  
  logniCookie.del(cookieName);
</script>
```

## Test

[test/cookie.html](https://develop-jslib.logni.net/test/cookie.html)

## Contribution

[Pull Requests](https://github.com/erikni/logni-cookie.js/pulls) are very welcome.

# Licence
[GNU General Public License v3.0](LICENSE)
