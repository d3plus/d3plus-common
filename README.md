# d3plus-common

[![NPM Release](http://img.shields.io/npm/v/d3plus-common.svg?style=flat-square)](https://www.npmjs.org/package/d3plus-common)
[![Build Status](https://travis-ci.org/d3plus/d3plus-common.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-common)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-common.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-common)
[![Dependency Status](http://img.shields.io/david/dev/d3plus/d3plus-common.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-common#info=devDependencies)

A starter environment for D3plus modules.

## Installation Options

* [NPM](#install.npm)
* [Browser](#install.browser)
* [AMD and CommonJS](#install.amd)
* [Custom Builds](#install.custom)

<a name="install.npm"></a>
### NPM
```sh
npm install d3plus-common
```

<a name="install.browser"></a>
### Browser
In a vanilla environment, a `d3plus_common` global is exported. To use a compiled version hosted on [d3plus.org](https://d3plus.org) that includes all dependencies:

```html
<script src="https://d3plus.org/js/d3plus-common.v0.1.min.js"></script>
```

Otherwise, [click here](https://github.com/d3plus/d3plus-common/releases/latest) to download the latest release.

<a name="install.amd"></a>
### AMD and CommonJS
The released bundle natively supports both AMD and CommonJS, and vanilla environments.

<a name="install.custom"></a>
### Custom Builds
The source code is written using standard `import` and `export` statements. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. Take a look at the [index.js](https://github.com/d3plus/d3plus-common/blob/master/index.js) file to see the modules exported.

---

# API Reference
<a name="constant"></a>

## constant(value)
Wraps non-function variables in a simple return function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Array</code> &#124; <code>Number</code> &#124; <code>Object</code> &#124; <code>String</code> | The value to be returned from the function. |

**Example** *(this)*  
```js
constant(42);
    
```
**Example** *(returns this)*  
```js
function() {
  return 42;
}
```
