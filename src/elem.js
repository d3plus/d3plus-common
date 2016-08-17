import {select} from "d3-selection";
import {transition} from "d3-transition";

import {default as attrize} from "./attrize";

const defaultParams = {
  condition: true,
  enter: {},
  exit: {},
  parent: select("body"),
  transition: transition().duration(0),
  update: {}
};

/**
    @function elem
    @desc Manages the enter/update/exit pattern for a single DOM element.
    @param {String} selector A D3 selector, which must include the tagname and a class and/or ID.
    @param {Object} params Additional parameters.
    @param {Boolean} [params.condition = true] Whether or not the element should be rendered (or removed).
    @param {Object} [params.enter = {}] A collection of key/value pairs that map to attributes to be given on enter.
    @param {Object} [params.exit = {}] A collection of key/value pairs that map to attributes to be given on exit.
    @param {D3Selection} [params.parent = d3.select("body")] The parent element for this new element to be appended to.
    @param {D3Transition} [params.transition = d3.transition().duration(0)] The transition to use when animated the different life cycle stages.
    @param {Object} [params.update = {}] A collection of key/value pairs that map to attributes to be given on update.
*/
export default function(selector, p) {

  p = Object.assign({}, defaultParams, p);

  const className = (/\.([^#]+)/g).exec(selector),
        id = (/#([^\.]+)/g).exec(selector),
        tag = (/^([^.^#]+)/g).exec(selector)[1];

  const elem = p.parent.selectAll(selector).data(p.condition ? [null] : []);

  const enter = elem.enter().append(tag).call(attrize, p.enter);

  if (id) enter.attr("id", id[1]);
  if (className) enter.attr("class", className[1]);

  elem.exit().transition(p.transition).call(attrize, p.exit).remove();

  return enter.merge(elem).transition(p.transition).call(attrize, p.update);

}
