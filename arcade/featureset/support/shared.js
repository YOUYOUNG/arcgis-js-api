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

define(["require","exports","dojo/Deferred","../../../geometry/Extent","../../../layers/support/Field"],function(e,t,r,n,o){function i(e){return o.fromJSON(e.toJSON())}function u(e){return e.toJSON()}function l(e){if(null===e)return null;var t=e.clone();return void 0!==e.cache._geVersion&&(t.cache._geVersion=e.cache._geVersion),t}function c(e){var t=e.clone();return t.geometry&&void 0!==e.geometry.cache._geVersion&&(t.geometry.cache._geVersion=e.geometry.cache._geVersion),t}function s(e){return"string"==typeof e||e instanceof String}function a(e){return"boolean"==typeof e}function y(e){return"number"==typeof e}function f(e){return e instanceof Array}function m(e){return e instanceof Date}function p(e,t){return e===t||!(!m(e)||!m(t))&&e.getTime()===t.getTime()}function g(e){var t={};for(var r in e)t[r]=e[r];return t}function v(e){if(void 0===e)return null;if("number"==typeof e)return e;switch(e.toLowerCase()){case"meters":case"meter":return 109404;case"miles":case"mile":return 109413;case"kilometers":case"kilometer":case"km":return 109414}return null}function d(e){if(null===e)return null;switch(e.type){case"polygon":case"multipoint":case"polyline":return e.extent;case"point":return new n({xmin:e.x,ymin:e.y,xmax:e.x,ymax:e.y,spatialReference:e.spatialReference});case"extent":return e}return null}function G(e){if(void 0===e)return null;if("number"==typeof e)return e;if("number"==typeof e)return e;switch(e.toLowerCase()){case"meters":case"meter":return 9001;case"miles":case"mile":return 9035;case"kilometers":case"kilometer":case"km":return 9036}return null}function S(e,t){return e===t||("point"===e&&"esriGeometryPoint"===t||("polyline"===e&&"esriGeometryPolyline"===t||("polygon"===e&&"esriGeometryPolygon"===t||("extent"===e&&"esriGeometryEnvelope"===t||("multipoint"===e&&"esriGeometryMultipoint"===t||("point"===t&&"esriGeometryPoint"===e||("polyline"===t&&"esriGeometryPolyline"===e||("polygon"===t&&"esriGeometryPolygon"===e||("extent"===t&&"esriGeometryEnvelope"===e||"multipoint"===t&&"esriGeometryMultipoint"===e)))))))))}function h(e){return function(t){e.reject(t)}}function x(e,t){return function(r){try{e.apply(null,arguments)}catch(e){t.reject(e)}}}function P(e){switch(e){case"point":return"esriGeometryPoint";case"polygon":return"esriGeometryPolygon";case"multipoint":return"esriGeometryMultipoint";case"polyline":return"esriGeometryPolyline";default:return"esriGeometryPoint"}}function b(e,t,n){var o=new r,i=new r;return i.resolve(!0),e.reduce(function(e,n,o,i){return e.then(function(e){try{return t(e,n,o,i)}catch(e){var u=new r;return u.reject(e),u.promise}},function(e){var t=new r;return t.reject(e),t.promise})},i.promise).then(function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise}function w(e,t){t||(t={}),"function"==typeof t&&(t={cmp:t});var r="boolean"==typeof t.cycles&&t.cycles,n=t.cmp&&function(e){return function(t){return function(r,n){var o={key:r,value:t[r]},i={key:n,value:t[n]};return e(o,i)}}}(t.cmp),o=[];return function e(t){if(t&&t.toJSON&&"function"==typeof t.toJSON&&(t=t.toJSON()),void 0!==t){if("number"==typeof t)return isFinite(t)?""+t:"null";if("object"!=typeof t)return JSON.stringify(t);var i,u;if(Array.isArray(t)){for(u="[",i=0;i<t.length;i++)i&&(u+=","),u+=e(t[i])||"null";return u+"]"}if(null===t)return"null";if(-1!==o.indexOf(t)){if(r)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}var l=o.push(t)-1,c=Object.keys(t).sort(n&&n(t));for(u="",i=0;i<c.length;i++){var s=c[i],a=e(t[s]);a&&(u&&(u+=","),u+=JSON.stringify(s)+":"+a)}return o.splice(l,1),"{"+u+"}"}}(e)}Object.defineProperty(t,"__esModule",{value:!0});!function(e){e[e.Standardised=0]="Standardised",e[e.SqlServer=1]="SqlServer",e[e.Oracle=2]="Oracle",e[e.Postgres=3]="Postgres",e[e.PGDB=4]="PGDB",e[e.FILEGDB=5]="FILEGDB",e[e.NotEvaluated=6]="NotEvaluated"}(t.FeatureServiceDatabaseType||(t.FeatureServiceDatabaseType={})),t.cloneField=i,t.esriFieldToJson=u,t.cloneGeometry=l,t.cloneGraphic=c;!function(e){e[e.InFeatureSet=0]="InFeatureSet",e[e.NotInFeatureSet=1]="NotInFeatureSet",e[e.Unknown=2]="Unknown"}(t.IdState||(t.IdState={})),t.isString=s,t.isBoolean=a,t.isNumber=y,t.isArray=f,t.isDate=m,t.equalityTest=p,t.cloneAttributes=g,t.convertSquareUnitsToCode=v,t.shapeExtent=d,t.convertLinearUnitsToCode=G,t.sameGeomType=S,t.defaultMaxRecords=1e3,t.errback=h,t.callback=x,t.layerGeometryEsriConstants={point:"point",polygon:"polygon",polyline:"polyline",multipoint:"multipoint",extent:"extent",esriGeometryPoint:"point",esriGeometryPolygon:"polygon",esriGeometryPolyline:"polyline",esriGeometryMultipoint:"multipoint",esriGeometryEnvelope:"extent",envelope:"extent"},t.toEsriGeometryType=P,t.reduceArrayWithPromises=b,t.stableStringify=w});