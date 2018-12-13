// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

define(["../Component","../Buttons/SvgButton","../Dropdowns/TextOptionDropdown"],function(t,n,e){return function(t){function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var e={};return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(n){return t[n]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=300)}({0:function(t,n,e){"use strict";function o(t,n){function e(){this.constructor=t}r(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}e.d(n,"b",function(){return o}),e.d(n,"a",function(){return i});var r=function(t,n){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)},i=function(){return(i=Object.assign||function(t){for(var n,e=1,o=arguments.length;e<o;e++)for(var r in n=arguments[e])Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r]);return t}).apply(this,arguments)}},1:function(n,e){n.exports=t},22:function(t,e){t.exports=n},300:function(t,n,e){"use strict";e.r(n);var o=e(0),r=e(1),i=e(77),u=e.n(i),a=e(22),p=e.n(a),c=function(t){function n(n){var e=t.call(this,n)||this;return e.handleBtnClick=e.handleBtnClick.bind(e),e.handleMobileClick=e.handleMobileClick.bind(e),e}return o.b(n,t),n.prototype.render=function(t){var n=this;if(!(this.props.options.length<=1)){var e=this.props.options.map(function(e){var o={"nav-tabnav__btn":!0,"nav-tabnav__btn--active":n.props.selectedOptionValue===e.value};return t("button",{key:e.value,classes:o,value:e.value,onclick:n.handleBtnClick},e.text)}),o=this.props.options.filter(function(t){return t.value===n.props.selectedOptionValue})[0].text;return t("nav",{class:"nav-tabnav__nav"},e,t("div",{class:"nav-tabnav__mobile-menu"},t(u.a,{key:"ib-ex__section-dropdown",options:this.props.options,onSelect:this.handleMobileClick,selectedOptionValue:this.props.selectedOptionValue,justify:"right"},t("h3",{key:"search-"+o+"-dropdown",id:"section-dropdown-toggle",class:"nav-tabnav__section-dropdown-text"},o," ",t(p.a,{key:"section-dropdown-button"},t("svg",{width:"12",height:"12",viewBox:"0 0 16 16"},t("path",{d:"M1.5,4 L8,11 L14.5,4 C11.893,4 4.101,4 1.5,4 Z"})))))))}},n.prototype.handleBtnClick=function(t){t.target.value!==this.props.selectedOptionValue&&this.props.onSelect(t.target.value)},n.prototype.handleMobileClick=function(t){t!==this.props.selectedOptionValue&&this.props.onSelect(t)},n}(r.Component);n.default=c},77:function(t,n){t.exports=e}})});