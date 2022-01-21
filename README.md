# d3plus-common

[![NPM Release](http://img.shields.io/npm/v/d3plus-common.svg?style=flat)](https://www.npmjs.org/package/d3plus-common) [![Build Status](https://travis-ci.org/d3plus/d3plus-common.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-common) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-common.svg?style=flat)](https://david-dm.org/d3plus/d3plus-common) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/)

Common functions and methods used across D3plus modules.

## Installing

If you use NPM, `npm install d3plus-common`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-common/releases/latest). You can also load d3plus-common as a standalone library or as part of [D3plus](https://github.com/d3plus/d3plus). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3plus` global is exported:

```html
<script src="https://cdn.jsdelivr.net/npm/d3plus-common@1"></script>
<script>
  console.log(d3plus);
</script>
```

## API Reference

##### 
* [BaseClass](#BaseClass) - An abstract class that contains some global methods and functionality.

##### 
* [accessor](#accessor) - Wraps an object key in a simple accessor function.
* [assign](#assign) - A deeply recursive version of `Object.assign`.
* [attrize](#attrize) - Applies each key/value in an object as an attr.
* [closest](#closest) - Finds the closest numeric value in an array.
* [configPrep](#configPrep) - Preps a config object for d3plus data, and optionally bubbles up a specific nested type. When using this function, you must bind a d3plus class' `this` context.
* [constant](#constant) - Wraps non-function variables in a simple return function.
* [elem](#elem) - Manages the enter/update/exit pattern for a single DOM element.
* [isObject](#isObject) - Detects if a variable is a javascript Object.
* [merge](#merge) - Combines an Array of Objects together and returns a new Object.
* [parseSides](#parseSides) - Converts a string of directional CSS shorthand values into an object with the values expanded.
* [prefix](#prefix) - Returns the appropriate CSS vendor prefix, given the current browser.
* [stylize](#stylize) - Applies each key/value in an object as a style.
* [unique](#unique) - ES5 implementation to reduce an Array of values to unique instances.
* [uuid](#uuid) - Returns a unique identifier.

##### 
* [RESET](#RESET) - String constant used to reset an individual config property.

---

<a name="BaseClass"></a>
#### **BaseClass** [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L46)


This is a global class.


* [BaseClass](#BaseClass)
    * [.config([*value*])](#BaseClass.config) ↩︎
    * [.locale([*value*])](#BaseClass.locale) ↩︎
    * [.on([*typenames*], [*listener*])](#BaseClass.on) ↩︎
    * [.translate([*value*])](#BaseClass.translate) ↩︎


<a name="BaseClass.config" href="#BaseClass.config">#</a> BaseClass.**config**([*value*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L74)

If *value* is specified, sets the methods that correspond to the key/value pairs and returns this class. If *value* is not specified, returns the current configuration.


This is a static method of [<code>BaseClass</code>](#BaseClass), and is chainable with other methods of this Class.


<a name="BaseClass.locale" href="#BaseClass.locale">#</a> BaseClass.**locale**([*value*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L129)

Sets the locale used for all text and number formatting. This method supports the locales defined in [d3plus-format](https://github.com/d3plus/d3plus-format/blob/master/src/locale.js). The locale can be defined as a complex Object (like in d3plus-format), a locale code (like "en-US"), or a 2-digit language code (like "en"). If a 2-digit code is provided, the "findLocale" function is used to identify the most approximate locale from d3plus-format.


This is a static method of [<code>BaseClass</code>](#BaseClass), and is chainable with other methods of this Class.


```js
{
        separator: "",
        suffixes: ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "B", "t", "q", "Q", "Z", "Y"],
        grouping: [3],
        delimiters: {
          thousands: ",",
          decimal: "."
        },
        currency: ["$", ""]
      }
```


<a name="BaseClass.on" href="#BaseClass.on">#</a> BaseClass.**on**([*typenames*], [*listener*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L148)

Adds or removes a *listener* to each object for the specified event *typenames*. If a *listener* is not specified, returns the currently assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.


This is a static method of [<code>BaseClass</code>](#BaseClass), and is chainable with other methods of this Class.

| Param | Type |
| --- | --- |
| [*typenames*] | <code>String</code> | 
| [*listener*] | <code>function</code> | 

By default, listeners apply globally to all objects, however, passing a namespace with the class name gives control over specific elements:

```js
new Plot
  .on("click.Shape", function(d) {
    console.log("data for shape clicked:", d);
  })
  .on("click.Legend", function(d) {
    console.log("data for legend clicked:", d);
  })
```


<a name="BaseClass.translate" href="#BaseClass.translate">#</a> BaseClass.**translate**([*value*]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/BaseClass.js#L172)

Defines how informational text strings should be displayed. By default, this function will try to find the string in question (which is the first argument provided to this function) inside of an internally managed translation Object. If you'd like to override to use custom text, simply pass this method your own custom formatting function.


This is a static method of [<code>BaseClass</code>](#BaseClass), and is chainable with other methods of this Class.
For example, if we wanted to only change the string &quot;Back&quot; and allow all other string to return in English:

```js
.translate(function(d) {
  return d === "Back" ? "Get outta here" : d;
})
```

---

<a name="accessor"></a>
#### d3plus.**accessor**(key, [def]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/accessor.js#L1)

Wraps an object key in a simple accessor function.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The key to be returned from each Object passed to the function. |
| [def] | <code>\*</code> | A default value to be returned if the key is not present. |

this

```js
accessor("id");
    
```
returns this

```js
function(d) {
  return d["id"];
}
```

---

<a name="assign"></a>
#### d3plus.**assign**(...objects) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/assign.js#L14)

A deeply recursive version of `Object.assign`.


This is a global function.
this

```js
assign({id: "foo", deep: {group: "A"}}, {id: "bar", deep: {value: 20}}));
    
```
returns this

```js
{id: "bar", deep: {group: "A", value: 20}}
```

---

<a name="attrize"></a>
#### d3plus.**attrize**(elem, attrs) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/attrize.js#L1)

Applies each key/value in an object as an attr.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>D3selection</code> | The D3 element to apply the styles to. |
| attrs | <code>Object</code> | An object of key/value attr pairs. |


---

<a name="closest"></a>
#### d3plus.**closest**(n, arr) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/closest.js#L1)

Finds the closest numeric value in an array.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| n | <code>Number</code> | The number value to use when searching the array. |
| arr | <code>Array</code> | The array of values to test against. |


---

<a name="configPrep"></a>
#### d3plus.**configPrep**([config], [type], [nest]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/configPrep.js#L1)

Preps a config object for d3plus data, and optionally bubbles up a specific nested type. When using this function, you must bind a d3plus class' `this` context.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [config] | <code>Object</code> | <code>this._shapeConfig</code> | The configuration object to parse. |
| [type] | <code>String</code> | <code>&quot;shape&quot;</code> | The event classifier to user for "on" events. For example, the default event type of "shape" will apply all events in the "on" config object with that key, like "click.shape" and "mouseleave.shape", in addition to any gloval events like "click" and "mouseleave". |
| [nest] | <code>String</code> |  | An optional nested key to bubble up to the parent config level. |


---

<a name="constant"></a>
#### d3plus.**constant**(value) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/constant.js#L1)

Wraps non-function variables in a simple return function.


This is a global function.
this

```js
constant(42);
    
```
returns this

```js
function() {
  return 42;
}
```

---

<a name="elem"></a>
#### d3plus.**elem**(selector, params) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/elem.js#L6)

Manages the enter/update/exit pattern for a single DOM element.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> |  | A D3 selector, which must include the tagname and a class and/or ID. |
| params | <code>Object</code> |  | Additional parameters. |
| [params.condition] | <code>Boolean</code> | <code>true</code> | Whether or not the element should be rendered (or removed). |
| [params.enter] | <code>Object</code> | <code>{}</code> | A collection of key/value pairs that map to attributes to be given on enter. |
| [params.exit] | <code>Object</code> | <code>{}</code> | A collection of key/value pairs that map to attributes to be given on exit. |
| [params.parent] | <code>D3Selection</code> | <code>d3.select(&quot;body&quot;)</code> | The parent element for this new element to be appended to. |
| [params.duration] | <code>Number</code> | <code>0</code> | The duration for the d3 transition. |
| [params.update] | <code>Object</code> | <code>{}</code> | A collection of key/value pairs that map to attributes to be given on update. |


---

<a name="isObject"></a>
#### d3plus.**isObject**(item) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/isObject.js#L1)

Detects if a variable is a javascript Object.


This is a global function.

---

<a name="merge"></a>
#### d3plus.**merge**(objects, aggs) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/merge.js#L5)

Combines an Array of Objects together and returns a new Object.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| objects | <code>Array</code> | The Array of objects to be merged together. |
| aggs | <code>Object</code> | An object containing specific aggregation methods (functions) for each key type. By default, numbers are summed and strings are returned as an array of unique values. |

this

```js
merge([
  {id: "foo", group: "A", value: 10, links: [1, 2]},
  {id: "bar", group: "A", value: 20, links: [1, 3]}
]);
    
```
returns this

```js
{id: ["bar", "foo"], group: "A", value: 30, links: [1, 2, 3]}
```

---

<a name="parseSides"></a>
#### d3plus.**parseSides**(sides) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/parseSides.js#L1)

Converts a string of directional CSS shorthand values into an object with the values expanded.


This is a global function.

---

<a name="prefix"></a>
#### d3plus.**prefix**() [<>](https://github.com/d3plus/d3plus-common/blob/master/src/prefix.js#L1)

Returns the appropriate CSS vendor prefix, given the current browser.


This is a global function.

---

<a name="stylize"></a>
#### d3plus.**stylize**(elem, styles) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/stylize.js#L1)

Applies each key/value in an object as a style.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>D3selection</code> | The D3 element to apply the styles to. |
| styles | <code>Object</code> | An object of key/value style pairs. |


---

<a name="unique"></a>
#### d3plus.**unique**(arr, [accessor]) [<>](https://github.com/d3plus/d3plus-common/blob/master/src/unique.js#L1)

ES5 implementation to reduce an Array of values to unique instances.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The Array of objects to be filtered. |
| [accessor] | <code>function</code> | An optional accessor function used to extract data points from an Array of Objects. |

this

```js
unique(["apple", "banana", "apple"]);
    
```
returns this

```js
["apple", "banana"]
```

---

<a name="uuid"></a>
#### d3plus.**uuid**() [<>](https://github.com/d3plus/d3plus-common/blob/master/src/uuid.js#L10)


This is a global function.

---

<a name="RESET"></a>
#### **RESET** [<>](https://github.com/d3plus/d3plus-common/blob/master/src/RESET.js#L1)

String constant used to reset an individual config property.


This is a global constant.

---



###### <sub>Documentation generated on Fri, 21 Jan 2022 21:13:42 GMT</sub>
