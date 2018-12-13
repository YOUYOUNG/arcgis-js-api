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

define(["require","exports","./Dictionary","./Feature","./FunctionWrapper","./ImmutablePathArray","./ImmutablePointArray","./languageUtils","./treeAnalysis","./functions/date","./functions/geomasync","./functions/geometry","./functions/maths","./functions/stats","./functions/string","../core/promiseUtils","../geometry/Extent","../geometry/Geometry","../geometry/Multipoint","../geometry/Point","../geometry/Polygon","../geometry/Polyline","../geometry/SpatialReference"],function(e,r,t,n,o,a,i,c,u,s,l,f,d,h,v,p,g,m,E,y,N,w,b){function I(e){return e&&"function"==typeof e.then}function O(e){return e instanceof Error?p.reject(e):p.reject(new Error(e))}function R(e){return p.resolve(e)}function T(e,r){for(var t=[],n=0;n<r.arguments.length;n++)t.push(F(e,r.arguments[n]));return p.all(t)}function S(e,r,t){return p.create(function(n,o){T(e,r).then(function(a){try{n(t(e,r,a))}catch(e){o(e)}},o)})}function M(e,r,t){try{return T(e,r).then(function(n){try{var o=t(e,r,n);return I(o)?o:p.resolve(o)}catch(e){return O(e)}})}catch(e){return O(e)}}function F(e,r){try{switch(r.type){case"VariableDeclarator":return $(e,r);case"VariableDeclaration":return Q(e,r,0);case"BlockStatement":return W(e,r);case"FunctionDeclaration":return J(e,r);case"ReturnStatement":return X(e,r);case"IfStatement":return Z(e,r);case"ExpressionStatement":return H(e,r);case"UpdateExpression":return G(e,r);case"AssignmentExpression":return z(e,r);case"ForStatement":return k(e,r);case"ForInStatement":return Y(e,r);case"BreakStatement":return p.resolve(c.breakResult);case"EmptyStatement":return p.resolve(c.voidOperation);case"ContinueStatement":return p.resolve(c.continueResult);case"Identifier":return ie(e,r);case"MemberExpression":return re(e,r);case"Literal":return R(r.value);case"ThisExpression":return O(u.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"CallExpression":return ce(e,r);case"UnaryExpression":return te(e,r);case"BinaryExpression":return oe(e,r);case"LogicalExpression":return ae(e,r);case"ConditionalExpression":return O(u.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));case"ArrayExpression":return ne(e,r);case"ObjectExpression":return A(e,r);case"Property":return C(e,r);case"Array":return O(u.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTED"));default:return O(u.nodeErrorMessage(r,"RUNTIME","UNREOGNISED"))}}catch(e){return O(e)}}function A(e,r){try{for(var n=[],o=0;o<r.properties.length;o++)n.push(F(e,r.properties[o]));return p.all(n).then(function(e){return p.create(function(r,n){for(var o={},a=0;a<e.length;a++){var i=e[a];if(c.isFunctionParameter(i.value))throw new Error("Illegal Argument");if(!1===c.isString(i.key))throw new Error("Illegal Argument");i.value===c.voidOperation?o[i.key.toString()]=null:o[i.key.toString()]=i.value}var u=new t(o);u.immutable=!1,r(u)})})}catch(e){return O(e)}}function C(e,r){try{return F(e,r.value).then(function(e){return p.create(function(t,n){t({key:"Identifier"===r.key.type?r.key.name:r.key.value,value:e})})})}catch(e){return p.reject(e)}}function U(e,r,t){try{return F(e,r.body).then(function(n){try{return t.lastAction=n,t.lastAction===c.breakResult?(t.testResult=!1,p.resolve(t)):t.lastAction instanceof c.ReturnResult?(t.testResult=!1,p.resolve(t)):null!==r.update?F(e,r.update).then(function(e){return p.resolve(t)}):p.resolve(t)}catch(e){return p.reject(e)}})}catch(e){return p.reject(e)}}function x(e,r,t){try{return null!==r.test?F(e,r.test).then(function(n){try{return!0===e.progressTracker.isCanceled()?p.reject(new Error("Cancelled")):(t.testResult=n,!1===t.testResult?p.resolve(t):!0!==t.testResult?p.reject(new Error(u.nodeErrorMessage(r,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION"))):U(e,r,t))}catch(e){return p.reject(e)}}):U(e,r,t)}catch(e){return p.reject(e)}}function P(e,r,t,n,o,a){try{x(e,r,t).then(function(){try{!0===t.testResult?(a++,a>Se?(a=0,setTimeout(function(){P(e,r,t,function(e){n(e)},function(e){o(e)},a)})):P(e,r,t,function(e){n(e)},function(e){o(e)},a)):n(t.lastAction instanceof c.ReturnResult?t.lastAction:c.voidOperation)}catch(e){o(e)}},function(e){o(e)})}catch(e){o(e)}}function k(e,r){try{return null!==r.init?F(e,r.init).then(function(){return p.create(function(t,n){var o={testResult:!0,lastAction:c.voidOperation};P(e,r,o,function(e){t(e)},function(e){n(e)},0)})}):p.create(function(t,n){var o={testResult:!0,lastAction:c.voidOperation};P(e,r,o,function(e){t(e)},function(e){n(e)},0)})}catch(e){return p.reject(e)}}function D(e,r,t,n,o,a,i,u,s,l){try{if(n<=a)return void u(c.voidOperation);o.value="k"===i?t[a]:a,F(e,r.body).then(function(f){try{f instanceof c.ReturnResult?u(f):f===c.breakResult?u(c.voidOperation):(l++,l>Se?(l=0,setTimeout(function(){D(e,r,t,n,o,a+1,i,function(e){u(e)},function(e){s(e)},l)})):D(e,r,t,n,o,a+1,i,function(e){u(e)},function(e){s(e)},l))}catch(e){s(e)}},function(e){s(e)})}catch(e){s(e)}}function L(e,r,t,n,o,a,i,u,s){try{if(t.length()<=o)return void i(c.voidOperation);n.value="k"===a?t.get(o):o,F(e,r.body).then(function(l){l instanceof c.ReturnResult?i(l):l===c.breakResult?i(c.voidOperation):(s++,s>Se?(s=0,setTimeout(function(){L(e,r,t,n,o+1,a,function(e){i(e)},function(e){u(e)},s)})):L(e,r,t,n,o+1,a,function(e){i(e)},function(e){u(e)},s))},function(e){u(e)})}catch(e){u(e)}}function _(e,r,t,n,o,a){try{if(void 0===a&&(a="i"),0===t.length)return void n.resolve(c.voidOperation);D(e,r,t,t.length,o,0,a,function(e){n.resolve(e)},function(e){n.reject(e)},0)}catch(e){n.reject(e)}}function j(e,r,t,n,o,a){try{if(void 0===a&&(a="i"),0===t.length)return void n.resolve(c.voidOperation);L(e,r,t,o,0,a,function(e){n.resolve(e)},function(e){n.reject(e)},0)}catch(e){n.reject(e)}}function B(e,r,t,n,o){try{_(e,r,t.keys(),n,o,"k")}catch(e){n.reject(e)}}function V(e,r,t,o,a,i,u,s){try{e.next().then(function(l){try{if(null===l)i(c.voidOperation);else{var f=n.createFromGraphicLikeObject(l.geometry,l.attributes,o);f._underlyingGraphic=l,a.value=f;F(r,t.body).then(function(n){try{n===c.breakResult?i(c.voidOperation):n instanceof c.ReturnResult?i(n):(s++,s>Se?(s=0,setTimeout(function(){V(e,r,t,o,a,function(e){i(e)},function(e){u(e)},s)})):V(e,r,t,o,a,function(e){i(e)},function(e){u(e)},s))}catch(e){u(e)}},function(e){u(e)})}}catch(e){u(e)}},function(e){u(e)})}catch(e){u(e)}}function Y(e,r){return p.create(function(o,a){F(e,r.right).then(function(i){try{var s=null;s="VariableDeclaration"===r.left.type?F(e,r.left):p.resolve(),s.then(function(){try{var s="VariableDeclaration"===r.left.type?r.left.declarations[0].id.name:r.left.name,l=null;if(null!==e.localScope&&void 0!==e.localScope[s]&&(l=e.localScope[s]),null===l&&void 0!==e.globalScope[s]&&(l=e.globalScope[s]),null===l)return void a(new Error(u.nodeErrorMessage(r,"RUNTIME","VARIABLENOTDECLARED")));c.isArray(i)||c.isString(i)?_(e,r,i,{reject:a,resolve:o},l):c.isImmutableArray(i)?j(e,r,i,{reject:a,resolve:o},l):i instanceof t||i instanceof n?B(e,r,i,{reject:a,resolve:o},l):c.isFeatureSet(i)?V(i.iterator(e.progressTracker),e,r,i,l,function(e){o(e)},function(e){a(e)},0):_(e,r,[],{reject:a,resolve:o},l)}catch(e){a(e)}},a)}catch(e){a(e)}},a)})}function G(e,r){try{if("MemberExpression"===r.argument.type){var o={t:null};return F(e,r.argument.object).then(function(t){return o.t=t,!0===r.argument.computed?F(e,r.argument.property):p.resolve(r.argument.property.name)}).then(function(e){return p.create(function(a,i){var u,s=o.t;if(c.isArray(s)){if(!c.isNumber(e))throw new Error("Invalid Parameter");if(e<0&&(e=s.length+e),e<0||e>=s.length)throw new Error("Assignment outside of array bounds");u=c.toNumber(s[e]),s[e]="++"===r.operator?u+1:u-1}else if(s instanceof t){if(!1===c.isString(e))throw new Error("Dictionary accessor must be a string");if(!0!==s.hasField(e))throw new Error("Invalid Parameter");u=c.toNumber(s.field(e)),s.setField(e,"++"===r.operator?u+1:u-1)}else{if(!(s instanceof n))throw c.isImmutableArray(s)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===c.isString(e))throw new Error("Feature accessor must be a string");if(!0!==s.hasField(e))throw new Error("Invalid Parameter");u=c.toNumber(s.field(e)),s.setField(e,"++"===r.operator?u+1:u-1)}a(!1===r.prefix?u:"++"===r.operator?u+1:u-1)})})}return p.create(function(t,n){var o,a=r.argument.name.toLowerCase();return null!==e.localScope&&void 0!==e.localScope[a]?(o=c.toNumber(e.localScope[a].value),e.localScope[a]={value:"++"===r.operator?o+1:o-1,valueset:!0,node:r},void t(!1===r.prefix?o:"++"===r.operator?o+1:o-1)):void 0!==e.globalScope[a]?(o=c.toNumber(e.globalScope[a].value),e.globalScope[a]={value:"++"===r.operator?o+1:o-1,valueset:!0,node:r},void t(!1===r.prefix?o:"++"===r.operator?o+1:o-1)):void n(new Error("Variable not recognised"))})}catch(e){return p.reject(e)}}function q(e,r,t,n){switch(r){case"=":return e===c.voidOperation?null:e;case"/=":return c.toNumber(t)/c.toNumber(e);case"*=":return c.toNumber(t)*c.toNumber(e);case"-=":return c.toNumber(t)-c.toNumber(e);case"+=":return c.isString(t)||c.isString(e)?c.toString(t)+c.toString(e):c.toNumber(t)+c.toNumber(e);case"%=":return c.toNumber(t)%c.toNumber(e);default:throw new Error(u.nodeErrorMessage(n,"RUNTIME","OPERATORNOTRECOGNISED"))}}function z(e,r){return p.create(function(o,a){if("MemberExpression"===r.left.type)F(e,r.right).then(function(i){try{F(e,r.left.object).then(function(u){try{var s=null;s=!0===r.left.computed?F(e,r.left.property):p.resolve(r.left.property.name),s.then(function(e){try{if(c.isArray(u)){if(!c.isNumber(e))throw new Error("Invalid Parameter");if(e<0&&(e=u.length+e),e<0||e>u.length)throw new Error("Assignment outside of array bounds");if(e===u.length){if("="!==r.operator)throw new Error("Invalid Parameter");u[e]=q(i,r.operator,u[e],r)}else u[e]=q(i,r.operator,u[e],r)}else if(u instanceof t){if(!1===c.isString(e))throw new Error("Dictionary accessor must be a string");if(!0===u.hasField(e))u.setField(e,q(i,r.operator,u.field(e),r));else{if("="!==r.operator)throw new Error("Invalid Parameter");u.setField(e,q(i,r.operator,null,r))}}else{if(!(u instanceof n))throw c.isImmutableArray(u)?new Error("Array is Immutable"):new Error("Invalid Parameter");if(!1===c.isString(e))throw new Error("Feature accessor must be a string");if(!0===u.hasField(e))u.setField(e,q(i,r.operator,u.field(e),r));else{if("="!==r.operator)throw new Error("Invalid Parameter");u.setField(e,q(i,r.operator,null,r))}}o(c.voidOperation)}catch(e){a(e)}},a)}catch(e){a(e)}},a)}catch(e){a(e)}},a);else{var i=r.left.name.toLowerCase();null!==e.localScope&&void 0!==e.localScope[i]&&F(e,r.right).then(function(t){try{e.localScope[i]={value:q(t,r.operator,e.localScope[i].value,r),valueset:!0,node:r.right},o(c.voidOperation)}catch(e){a(e)}},a),void 0!==e.globalScope[i]?F(e,r.right).then(function(t){try{e.globalScope[i]={value:q(t,r.operator,e.globalScope[i].value,r),valueset:!0,node:r.right},o(c.voidOperation)}catch(e){a(e)}},a):a(new Error("Cannot assign undeclared variable"))}})}function H(e,r){try{return"AssignmentExpression"===r.expression.type?F(e,r.expression):(r.expression.type,F(e,r.expression).then(function(e){return p.create(function(r,t){r(e===c.voidOperation?c.voidOperation:new c.ImplicitResult(e))})}))}catch(e){return p.reject(e)}}function Z(e,r){return p.create(function(t,n){if("AssignmentExpression"===r.test.type||"UpdateExpression"===r.test.type)return void n(new Error(u.nodeErrorMessage(r.test,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION")));F(e,r.test).then(function(o){try{!0===o?F(e,r.consequent).then(t,n):!1===o?null!==r.alternate?F(e,r.alternate).then(t,n):t(c.voidOperation):n(new Error(u.nodeErrorMessage(r.test,"RUNTIME","CANNOT_USE_NONBOOLEAN_IN_CONDITION")))}catch(e){n(e)}},n)})}function W(e,r){try{return K(e,r,0)}catch(e){return O(e)}}function K(e,r,t){try{return t>=r.body.length?p.resolve(c.voidOperation):p.create(function(n,o){F(e,r.body[t]).then(function(a){try{a instanceof c.ReturnResult||a===c.breakResult||a===c.continueResult?n(a):t===r.body.length-1?n(a):K(e,r,t+1).then(n,o)}catch(e){o(e)}},o)})}catch(e){return O(e)}}function X(e,r){return p.create(function(t,n){null===r.argument?t(new c.ReturnResult(c.voidOperation)):F(e,r.argument).then(function(e){try{t(new c.ReturnResult(e))}catch(e){n(e)}},n)})}function J(e,r){try{var t=r.id.name.toLowerCase();return e.globalScope[t]={valueset:!0,node:null,value:new o(r,e)},p.resolve(c.voidOperation)}catch(e){return O(e)}}function Q(e,r,t){return p.create(function(n,o){if(t>=r.declarations.length)return void n(c.voidOperation);F(e,r.declarations[t]).then(function(a){t===r.declarations.length-1?n(c.voidOperation):Q(e,r,t+1).then(function(e){n(c.voidOperation)},o)},o)})}function $(e,r){try{var t=null;return t=null===r.init?p.resolve(null):F(e,r.init),null!==e.localScope?t.then(function(t){return p.create(function(n,o){t===c.voidOperation&&(t=null);var a=r.id.name.toLowerCase();e.localScope[a]={value:t,valueset:!0,node:r.init},n(c.voidOperation)})}):t.then(function(t){return p.create(function(n,o){var a=r.id.name.toLowerCase();t===c.voidOperation&&(t=null),e.globalScope[a]={value:t,valueset:!0,node:r.init},n(c.voidOperation)})})}catch(e){return O(e)}}function ee(e,r,n,o){var c;switch(r=r.toLowerCase()){case"hasz":var s=e.hasZ;return void 0!==s&&s;case"hasm":var l=e.hasM;return void 0!==l&&l;case"spatialreference":var f=e.spatialReference._arcadeCacheId;if(void 0===f){var d=!0;Object.freeze&&Object.isFrozen(e.spatialReference)&&(d=!1),d&&(Me++,e.spatialReference._arcadeCacheId=Me,f=Me)}var h=new t({wkt:e.spatialReference.wkt,wkid:e.spatialReference.wkid});return void 0!==f&&(h._arcadeCacheId="SPREF"+f.toString()),h}switch(e.type){case"extent":switch(r){case"xmin":case"xmax":case"ymin":case"ymax":case"zmin":case"zmax":case"mmin":case"mmax":var v=e[r];return void 0!==v?v:null;case"type":return"Extent"}break;case"polygon":switch(r){case"rings":c=e.cache._arcadeCacheId,void 0===c&&(Me++,c=Me,e.cache._arcadeCacheId=c);var p=new a(e.rings,e.spatialReference,!0===e.hasZ,!0===e.hasM,c);return p;case"type":return"Polygon"}break;case"point":switch(r){case"x":case"y":case"z":case"m":return void 0!==e[r]?e[r]:null;case"type":return"Point"}break;case"polyline":switch(r){case"paths":c=e.cache._arcadeCacheId,void 0===c&&(Me++,c=Me,e.cache._arcadeCacheId=c);var p=new a(e.paths,e.spatialReference,!0===e.hasZ,!0===e.hasM,c);return p;case"type":return"Polyline"}break;case"multipoint":switch(r){case"points":c=e.cache._arcadeCacheId,void 0===c&&(Me++,c=Me,e.cache._arcadeCacheId=c);var p=new i(e.points,e.spatialReference,!0===e.hasZ,!0===e.hasM,c,1);return p;case"type":return"Multipoint"}}throw new Error(u.nodeErrorMessage(o,"RUNTIME","PROPERTYNOTFOUND"))}function re(e,r){try{return F(e,r.object).then(function(o){try{return null===o?p.reject(new Error(u.nodeErrorMessage(r,"RUNTIME","NOTFOUND"))):!1===r.computed?o instanceof t||o instanceof n?p.resolve(o.field(r.property.name)):o instanceof m?p.resolve(ee(o,r.property.name,e,r)):p.reject(new Error(u.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE"))):F(e,r.property).then(function(a){return p.create(function(i,s){if(o instanceof t||o instanceof n)c.isString(a)?i(o.field(a)):s(new Error(u.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else if(o instanceof m)c.isString(a)?i(ee(o,a,e,r)):s(new Error(u.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else if(c.isArray(o))if(c.isNumber(a)&&isFinite(a)&&Math.floor(a)===a){if(a<0&&(a=o.length+a),a>=o.length||a<0)throw new Error(u.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));i(o[a])}else s(new Error(u.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else if(c.isImmutableArray(o))if(c.isNumber(a)&&isFinite(a)&&Math.floor(a)===a){if(a<0&&(a=o.length()+a),a>=o.length()||a<0)throw new Error(u.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));i(o.get(a))}else s(new Error(u.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else if(c.isString(o))if(c.isNumber(a)&&isFinite(a)&&Math.floor(a)===a){if(a<0&&(a=o.length+a),a>=o.length||a<0)throw new Error(u.nodeErrorMessage(r,"RUNTIME","OUTOFBOUNDS"));i(o[a])}else s(new Error(u.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")));else s(new Error(u.nodeErrorMessage(r,"RUNTIME","INVALIDTYPE")))})})}catch(e){return O(e)}})}catch(e){return O(e)}}function te(e,r){try{return F(e,r.argument).then(function(e){return p.create(function(t,n){c.isBoolean(e)&&"!"===r.operator?t(!e):"-"===r.operator?t(-1*c.toNumber(e)):"+"===r.operator?t(1*c.toNumber(e)):n(new Error(u.nodeErrorMessage(r,"RUNTIME","NOTSUPPORTEDUNARYOPERATOR")))})})}catch(e){return O(e)}}function ne(e,r){try{for(var t=[],n=0;n<r.elements.length;n++)t.push(F(e,r.elements[n]));return p.all(t).then(function(e){return p.create(function(t,n){for(var o=0;o<e.length;o++){if(c.isFunctionParameter(e[o]))return void n(new Error(u.nodeErrorMessage(r,"RUNTIME","FUNCTIONCONTEXTILLEGAL")));e[o]===c.voidOperation&&(e[o]=null)}t(e)})})}catch(e){return O(e)}}function oe(e,r){try{return p.all([F(e,r.left),F(e,r.right)]).then(function(e){return p.create(function(t,n){var o=e[0],a=e[1];switch(r.operator){case"==":case"=":t(c.equalityTest(o,a));break;case"!=":t(!c.equalityTest(o,a));break;case"<":case">":case"<=":case">=":t(c.greaterThanLessThan(o,a,r.operator));break;case"+":t(c.isString(o)||c.isString(a)?c.toString(o)+c.toString(a):c.toNumber(o)+c.toNumber(a));break;case"-":t(c.toNumber(o)-c.toNumber(a));break;case"*":t(c.toNumber(o)*c.toNumber(a));break;case"/":t(c.toNumber(o)/c.toNumber(a));break;case"%":t(c.toNumber(o)%c.toNumber(a));break;default:n(new Error(u.nodeErrorMessage(r,"RUNTIME","OPERATORNOTRECOGNISED")))}})})}catch(e){return O(e)}}function ae(e,r){return p.create(function(t,n){return"AssignmentExpression"===r.left.type||"UpdateExpression"===r.left.type?void n(new Error(u.nodeErrorMessage(r.left,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"))):"AssignmentExpression"===r.right.type||"UpdateExpression"===r.right.type?void n(new Error(u.nodeErrorMessage(r.right,"RUNTIME","CANNOT_USE_ASSIGNMENT_IN_CONDITION"))):void F(e,r.left).then(function(o){try{if(!c.isBoolean(o))throw new Error(u.nodeErrorMessage(r,"RUNTIME","ONLYBOOLEAN"));switch(r.operator){case"||":!0===o?t(o):F(e,r.right).then(function(e){try{if(!c.isBoolean(e))throw new Error(u.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"));t(e)}catch(e){n(e)}},n);break;case"&&":!1===o?t(o):F(e,r.right).then(function(e){try{if(!c.isBoolean(e))throw new Error(u.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"));t(e)}catch(e){n(e)}},n);break;default:throw new Error(u.nodeErrorMessage(r,"RUNTIME","ONLYORORAND"))}}catch(e){n(e)}},n)})}function ie(e,r){return p.create(function(t,n){var o=r.name.toLowerCase();if(null!==e.localScope&&void 0!==e.localScope[o]){var a=e.localScope[o];return void(!0===a.valueset?t(a.value):null!==a.d?a.d.then(t,n):(a.d=F(e,a.node),a.d.then(function(e){try{a.value=e,a.valueset=!0,t(e)}catch(e){n(e)}},n)))}if(void 0!==e.globalScope[o]){var i=e.globalScope[o];return void(!0===i.valueset?t(i.value):null!==i.d?i.d.then(t,n):(i.d=F(e,i.node),i.d.then(function(e){try{i.value=e,i.valueset=!0,t(e)}catch(e){n(e)}},n)))}n(new Error(u.nodeErrorMessage(r,"RUNTIME","VARIABLENOTFOUND")))})}function ce(e,r){try{if("Identifier"!==r.callee.type)return O(u.nodeErrorMessage(r,"RUNTIME","ONLYNODESSUPPORTED"));if(null!==e.localScope&&void 0!==e.localScope[r.callee.name.toLowerCase()]){var t=e.localScope[r.callee.name.toLowerCase()];return t.value instanceof c.NativeFunction?t.value.fn(e,r):t.value instanceof o?ge(e,r,t.value.definition):O(u.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION"))}if(void 0!==e.globalScope[r.callee.name.toLowerCase()]){var t=e.globalScope[r.callee.name.toLowerCase()];return t.value instanceof c.NativeFunction?t.value.fn(e,r):t.value instanceof o?ge(e,r,t.value.definition):O(u.nodeErrorMessage(r,"RUNTIME","NOTAFUNCTION"))}return O(u.nodeErrorMessage(r,"RUNTIME","NOTFOUND"))}catch(e){return O(e)}}function ue(e){return null===e?"":c.isArray(e)?"Array":c.isImmutableArray(e)?"Array":c.isDate(e)?"Date":c.isString(e)?"String":c.isBoolean(e)?"Boolean":c.isNumber(e)?"Number":e instanceof t?"Dictionary":e instanceof n?"Feature":e instanceof y?"Point":e instanceof N?"Polygon":e instanceof w?"Polyline":e instanceof E?"Multipoint":e instanceof g?"Extent":c.isFunctionParameter(e)?"Function":c.isFeatureSet(e)?"FeatureSet":c.isFeatureSetCollection(e)?"FeatureSetCollection":e===c.voidOperation?"":"number"==typeof e&&isNaN(e)?"Number":"Unrecognised Type"}function se(e,r,t,n){return p.create(function(o,a){F(e,r.arguments[t]).then(function(i){try{if(c.equalityTest(i,n))return void F(e,r.arguments[t+1]).then(o,a);var u=r.arguments.length-t;return 1===u?void F(e,r.arguments[t]).then(o,a):(2===u&&o(null),3===u?void F(e,r.arguments[t+2]).then(o,a):void se(e,r,t+2,n).then(o,a))}catch(e){a(e)}},a)})}function le(e,r,t,n){return p.create(function(o,a){if(!0===n)F(e,r.arguments[t+1]).then(o,a);else{3===r.arguments.length-t?F(e,r.arguments[t+2]).then(o,a):F(e,r.arguments[t+2]).then(function(n){try{if(!1===c.isBoolean(n))return void a(new Error("WHEN needs boolean test conditions"));le(e,r,t+2,n).then(o,a)}catch(e){a(e)}})}})}function fe(e,r){try{var t=e.length,n=Math.floor(t/2);return 0===t?p.resolve([]):1===t?p.resolve([e[0]]):p.create(function(o,a){var i=[fe(e.slice(0,n),r),fe(e.slice(n,t),r)];p.all(i).then(function(e){try{de(e[0],e[1],r,[]).then(o,a)}catch(e){a(e)}},a)})}catch(e){return O(e)}}function de(e,r,t,n){return p.create(function(o,a){var i=n;e.length>0||r.length>0?e.length>0&&r.length>0?t(e[0],r[0]).then(function(c){try{isNaN(c)&&(c=1),c<=0?(i.push(e[0]),e=e.slice(1)):(i.push(r[0]),r=r.slice(1)),de(e,r,t,n).then(o,a)}catch(e){a(e)}},a):e.length>0?(i.push(e[0]),e=e.slice(1),de(e,r,t,n).then(o,a)):r.length>0&&(i.push(r[0]),r=r.slice(1),de(e,r,t,n).then(o,a)):o(n)})}function he(e,r){var t=e.length,n=Math.floor(t/2);return r||(r=function(e,r){return e<r?-1:e===r?0:1}),0===t?[]:1===t?[e[0]]:ve(he(e.slice(0,n),r),he(e.slice(n,t),r),r)}function ve(e,r,t){for(var n=[];e.length>0||r.length>0;)if(e.length>0&&r.length>0){var o=t(e[0],r[0]);isNaN(o)&&(o=1),o<=0?(n.push(e[0]),e=e.slice(1)):(n.push(r[0]),r=r.slice(1))}else e.length>0?(n.push(e[0]),e=e.slice(1)):r.length>0&&(n.push(r[0]),r=r.slice(1));return n}function pe(e,r,t){try{var n=e.body;if(t.length!==e.params.length)return O(new Error("Invalid Parameter calls to function."));for(var o=0;o<t.length;o++)r.localScope[e.params[o].name.toLowerCase()]={d:null,value:t[o],valueset:!0,node:null};return F(r,n).then(function(e){return p.create(function(r,t){return e instanceof c.ReturnResult?void r(e.value):e===c.breakResult?void t(new Error("Cannot Break from a Function")):e===c.continueResult?void t(new Error("Cannot Continue from a Function")):e instanceof c.ImplicitResult?void r(e.value):void r(e)})})}catch(e){return p.reject(e)}}function ge(e,r,t){return M(e,r,function(r,n,o){var a={spatialReference:e.spatialReference,services:e.services,console:e.console,lrucache:e.lrucache,localScope:{},progressTracker:e.progressTracker,globalScope:e.globalScope,depthCounter:e.depthCounter+1};if(a.depthCounter>64)throw new Error("Exceeded maximum function depth");return pe(t,a,o)})}function me(e){return function(){var r={applicationCache:void 0===e.context.applicationCache?null:e.context.applicationCache,progressTracker:e.context.progressTracker,spatialReference:e.context.spatialReference,console:e.context.console,lrucache:e.context.lrucache,services:e.context.services,localScope:{},globalScope:e.context.globalScope,depthCounter:e.context.depthCounter+1};if(r.depthCounter>64)throw new Error("Exceeded maximum function depth");return pe(e.definition,r,arguments)}}function Ee(e,r){var o=new Ue;void 0!==e&&null!==e||(e={}),void 0!==r&&null!==r||(r={});var a=new t({newline:"\n",tab:"\t",singlequote:"'",doublequote:'"',forwardslash:"/",backwardslash:"\\"});a.immutable=!1,o.textformatting={value:a,valueset:!0,node:null};for(var i in r)o[i]={value:new c.NativeFunction(r[i]),native:!0,valueset:!0,node:null};for(var i in e)e[i]&&"esri.Graphic"===e[i].declaredClass?o[i]={value:n.createFromGraphic(e[i]),valueset:!0,node:null}:o[i]={value:e[i],valueset:!0,node:null};return o}function ye(e){console.log(e)}function Ne(e){for(var r={mode:"async",compiled:!1,functions:{},signatures:[],standardFunction:S,standardFunctionAsync:M,failDefferred:O,evaluateIdentifier:ie,arcadeCustomFunctionHandler:me},t=0;t<e.length;t++)e[t].registerFunctions(r);for(var n in r.functions)Fe[n]={value:new c.NativeFunction(r.functions[n]),valueset:!0,node:null},Ue.prototype[n]=Fe[n];for(var t=0;t<r.signatures.length;t++)u.addFunctionDeclaration(r.signatures[t],"async")}function we(e,r,t){null!==t&&void 0!==t||(t=new b({wkid:102100}));var n=Ee(r.vars,r.customfunctions);return F({spatialReference:t,services:r.services,progressTracker:void 0===r.progressTracker||null===r.progressTracker?p.createDeferred().promise:r.progressTracker,globalScope:n,console:r.console?r.console:ye,lrucache:r.lrucache,localScope:null,depthCounter:1},e.body[0].body).then(function(e){return p.create(function(r,t){return e instanceof c.ReturnResult&&(e=e.value),e instanceof c.ImplicitResult&&(e=e.value),e===c.voidOperation&&(e=null),e===c.breakResult?void t(new Error("Cannot return BREAK")):e===c.continueResult?void t(new Error("Cannot return CONTINUE")):e instanceof c.NativeFunction?void t(new Error("Cannot return FUNCTION")):e instanceof o?void t(new Error("Cannot return FUNCTION")):void r(e)})})}function be(e,r){return void 0===r&&(r=!1),u.findFieldLiterals(e,r)}function Ie(e,r){return u.validateScript(e,r,"full")}function Oe(e,r){return u.referencesMember(e,r)}function Re(e,r){return u.referencesFunction(e,r)}function Te(e){return u.findFunctionCalls(e,!1)}Object.defineProperty(r,"__esModule",{value:!0});var Se=100,Me=0,Fe={};s.registerFunctions(Fe,S),v.registerFunctions(Fe,S),d.registerFunctions(Fe,S),f.registerFunctions(Fe,S),h.registerFunctions(Fe,S),l.registerFunctions({functions:Fe,compiled:!1,signatures:null,failDefferred:null,evaluateIdentifier:null,arcadeCustomFunctionHandler:null,mode:"async",standardFunction:S,standardFunctionAsync:M}),Fe.typeof=function(e,r){return S(e,r,function(e,r,t){c.pcCheck(t,1,1);var n=ue(t[0]);if("Unrecognised Type"===n)throw new Error("Unrecognised Type");return n})},Fe.iif=function(e,r){return p.create(function(t,n){c.pcCheck(null===r.arguments?[]:r.arguments,3,3),F(e,r.arguments[0]).then(function(o){try{if(!1===c.isBoolean(o))return void n(new Error("IF Function must have a boolean test condition"));!0===o?F(e,r.arguments[1]).then(t,n):F(e,r.arguments[2]).then(t,n)}catch(e){n(e)}},n)})},Fe.decode=function(e,r){return p.create(function(t,n){return r.arguments.length<2?void n(new Error("Missing Parameters")):2===r.arguments.length?void F(e,r.arguments[1]).then(t,n):(r.arguments.length-1)%2==0?void n(new Error("Must have a default value result.")):void F(e,r.arguments[0]).then(function(o){try{se(e,r,1,o).then(t,n)}catch(e){n(e)}},n)})},Fe.when=function(e,r){try{return r.arguments.length<3?O("Missing Parameters"):r.arguments.length%2==0?O("Must have a default value result."):F(e,r.arguments[0]).then(function(t){return p.create(function(n,o){if(!1===c.isBoolean(t))return void o(new Error("WHEN needs boolean test conditions"));le(e,r,0,t).then(n,o)})})}catch(e){return O(e)}},Fe.sort=function(e,r){return M(e,r,function(e,r,t){c.pcCheck(t,1,2);var n=t[0];if(c.isImmutableArray(n)&&(n=n.toArray()),!1===c.isArray(n))return O(Error("Illegal Argument"));if(t.length>1){if(!1===c.isFunctionParameter(t[1]))return O(Error("Illegal Argument"));var o=n;return fe(o,me(t[1]))}var o=n;if(0===o.length)return p.resolve([]);for(var a={},i=0;i<o.length;i++){var u=ue(o[i]);""!==u&&(a[u]=!0)}if(!0===a.Array||!0===a.Dictionary||!0===a.Feature||!0===a.Point||!0===a.Polygon||!0===a.Polyline||!0===a.Multipoint||!0===a.Extent||!0===a.Function)return p.resolve(o.slice(0));var s=0,l="";for(var f in a)s++,l=f;return s>1||"String"===l?o=he(o,function(e,r){if(null===e||void 0===e||e===c.voidOperation)return null===r||void 0===r||r===c.voidOperation?0:1;if(null===r||void 0===r||r===c.voidOperation)return-1;var t=c.toString(e),n=c.toString(r);return t<n?-1:t===n?0:1}):"Number"===l?o=he(o,function(e,r){return e-r}):"Boolean"===l?o=he(o,function(e,r){return e===r?0:r?-1:1}):"Date"===l&&(o=he(o,function(e,r){return r-e})),p.resolve(o)})};var Ae={failDefferred:O,resolveDeffered:R,fixSpatialReference:c.fixSpatialReference,parseArguments:T,standardFunction:S,standardFunctionAsync:M,evaluateIdentifier:ie,arcadeCustomFunction:me};for(var Ce in Fe)Fe[Ce]={value:new c.NativeFunction(Fe[Ce]),valueset:!0,node:null};var Ue=function(){};Ue.prototype=Fe,Ue.prototype.infinity={value:Number.POSITIVE_INFINITY,valueset:!0,node:null},Ue.prototype.pi={value:Math.PI,valueset:!0,node:null},r.functionHelper=Ae,r.extend=Ne,r.executeScript=we,r.extractFieldLiterals=be,r.validateScript=Ie,r.referencesMember=Oe,r.referencesFunction=Re,r.findFunctionCalls=Te});