# d3plus-common

[![NPM Release](http://img.shields.io/npm/v/d3plus-common.svg?style=flat)](https://www.npmjs.org/package/d3plus-common)
[![Build Status](https://travis-ci.org/d3plus/d3plus-common.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-common)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-common.svg?style=flat)](https://david-dm.org/d3plus/d3plus-common)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

Common functions and methods used across D3plus modules.

## Installing

If you use NPM, `npm install d3plus-common`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-common/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-common.v0.6.full.min.js"></script>
```


## API Reference
### Classes

<dl>
<dt><a href="#BaseClass">BaseClass</a></dt>
<dd></dd>
</dl>

### Functions

<dl>
<dt><a href="#accessor">accessor(key, [def])</a></dt>
<dd><p>Wraps an object key in a simple accessor function.</p>
</dd>
<dt><a href="#assign">assign(...objects)</a></dt>
<dd><p>A deeply recursive version of <code>Object.assign</code>.</p>
</dd>
<dt><a href="#attrize">attrize(elem, attrs)</a></dt>
<dd><p>Applies each key/value in an object as an attr.</p>
</dd>
<dt><a href="#closest">closest(n, arr)</a></dt>
<dd><p>Finds the closest numeric value in an array.</p>
</dd>
<dt><a href="#constant">constant(value)</a></dt>
<dd><p>Wraps non-function variables in a simple return function.</p>
</dd>
<dt><a href="#elem">elem(selector, params)</a></dt>
<dd><p>Manages the enter/update/exit pattern for a single DOM element.</p>
</dd>
<dt><a href="#isObject">isObject(item)</a></dt>
<dd><p>Detects if a variable is a javascript Object.</p>
</dd>
<dt><a href="#merge">merge(objects, aggs)</a></dt>
<dd><p>Combines an Array of Objects together and returns a new Object.</p>
</dd>
<dt><a href="#prefix">prefix()</a></dt>
<dd><p>Returns the appropriate CSS vendor prefix, given the current browser.</p>
</dd>
<dt><a href="#stylize">stylize(elem, styles)</a></dt>
<dd><p>Applies each key/value in an object as a style.</p>
</dd>
</dl>

<a name="BaseClass"></a>

### BaseClass
**Kind**: global class  

* [BaseClass](#BaseClass)
    * [new BaseClass()](#new_BaseClass_new)
    * [.config([*value*])](#BaseClass.config) ↩︎
    * [.on([*typenames*], [*listener*])](#BaseClass.on) ↩︎

<a name="new_BaseClass_new"></a>

#### new BaseClass()
An abstract class that contains some global methods and functionality.

<a name="BaseClass.config"></a>

#### BaseClass.config([*value*]) ↩︎
If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.

**Kind**: static method of <code>[BaseClass](#BaseClass)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="BaseClass.on"></a>

#### BaseClass.on([*typenames*], [*listener*]) ↩︎
Adds or removes a *listener* to each object for the specified event *typenames*. If a *listener* is not specified, returns the currently assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.

**Kind**: static method of <code>[BaseClass](#BaseClass)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*typenames*] | <code>String</code> | 
| [*listener*] | <code>function</code> | 

**Example** *(By default, listeners apply globally to all objects, however, passing a namespace with the class name gives control over specific elements:)*  
```js
new Plot
  .on("click.Shape", function(d) {
    console.log("data for shape clicked:", d);
  })
  .on("click.Legend", function(d) {
    console.log("data for legend clicked:", d);
  })
```
<a name="accessor"></a>

### accessor(key, [def])
Wraps an object key in a simple accessor function.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key to be returned from each Object passed to the function. |
| [def] | <code>\*</code> | A default value to be returned if the key is not present. |

**Example** *(this)*  
```js
accessor("id");
    
```
**Example** *(returns this)*  
```js
function(d) {
  return d["id"];
}
```
<a name="assign"></a>

### assign(...objects)
A deeply recursive version of `Object.assign`.

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...objects | <code>Object</code> | 

**Example** *(this)*  
```js
assign({id: "foo", deep: {group: "A"}}, {id: "bar", deep: {value: 20}}));
    
```
**Example** *(returns this)*  
```js
{id: "bar", group: "A", value: 20}
```
<a name="attrize"></a>

### attrize(elem, attrs)
Applies each key/value in an object as an attr.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>D3selection</code> | The D3 element to apply the styles to. |
| attrs | <code>Object</code> | An object of key/value attr pairs. |

<a name="closest"></a>

### closest(n, arr)
Finds the closest numeric value in an array.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number value to use when searching the array. |
| arr | <code>Array</code> | The array of values to test against. |

<a name="constant"></a>

### constant(value)
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
<a name="elem"></a>

### elem(selector, params)
Manages the enter/update/exit pattern for a single DOM element.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> |  | A D3 selector, which must include the tagname and a class and/or ID. |
| params | <code>Object</code> |  | Additional parameters. |
| [params.condition] | <code>Boolean</code> | <code>true</code> | Whether or not the element should be rendered (or removed). |
| [params.enter] | <code>Object</code> | <code>{}</code> | A collection of key/value pairs that map to attributes to be given on enter. |
| [params.exit] | <code>Object</code> | <code>{}</code> | A collection of key/value pairs that map to attributes to be given on exit. |
| [params.parent] | <code>D3Selection</code> | <code>d3.select(&quot;body&quot;)</code> | The parent element for this new element to be appended to. |
| [params.transition] | <code>D3Transition</code> | <code>d3.transition().duration(0)</code> | The transition to use when animated the different life cycle stages. |
| [params.update] | <code>Object</code> | <code>{}</code> | A collection of key/value pairs that map to attributes to be given on update. |

<a name="isObject"></a>

### isObject(item)
Detects if a variable is a javascript Object.

**Kind**: global function  

| Param | Type |
| --- | --- |
| item | <code>\*</code> | 

<a name="merge"></a>

### merge(objects, aggs)
Combines an Array of Objects together and returns a new Object.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| objects | <code>Array</code> | The Array of objects to be merged together. |
| aggs | <code>Object</code> | An object containing specific aggregation methods (functions) for each key type. By default, numbers are summed and strings are returned as an array of unique values. |

**Example** *(this)*  
```js
merge([
  {id: "foo", group: "A", value: 10, links: [1, 2]},
  {id: "bar", group: "A", value: 20, links: [1, 3]}
]);
    
```
**Example** *(returns this)*  
```js
{id: ["bar", "foo"], group: "A", value: 30, links: [1, 2, 3]}
```
<a name="prefix"></a>

### prefix()
Returns the appropriate CSS vendor prefix, given the current browser.

**Kind**: global function  
<a name="stylize"></a>

### stylize(elem, styles)
Applies each key/value in an object as a style.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>D3selection</code> | The D3 element to apply the styles to. |
| styles | <code>Object</code> | An object of key/value style pairs. |



###### <sub>Documentation generated on Mon, 19 Dec 2016 20:19:41 GMT</sub>
