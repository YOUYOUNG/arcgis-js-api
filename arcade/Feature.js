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

define(["require","exports","../core/tsSupport/assignHelper","./Dictionary","./ImmutableArray","./languageUtils","../geometry/Geometry","../geometry/Point","../geometry/support/jsonUtils","../layers/graphics/featureConversionUtils"],function(t,e,i,r,s,o,a,n,u,l){return function(){function t(){this.declaredClass="esri.arcade.Feature",this._optimizedGeomDefinition=null,this._geometry=null,this.attributes=null,this._layer=null,this._datesfixed=!0,this.immutable=!0,this.immutable=!0}return t.createFromGraphic=function(e){var i=new t;return i._geometry=e.geometry?e.geometry:null,void 0===e.attributes?i.attributes={}:null===e.attributes?i.attributes={}:i.attributes=e.attributes,e._sourceLayer?(i._layer=e._sourceLayer,i._datesfixed=!1):e._layer?(i._layer=e._layer,i._datesfixed=!1):e.layer&&(i._layer=e.layer,i._datesfixed=!1),i},t.createFromArcadeFeature=function(e){var i=new t;return i._datesfixed=e._datesfixed,i.attributes=e.attributes,i._geometry=e._geometry,i._optimizedGeomDefinition=e._optimizedGeomDefinition,e._layer&&(i._layer=e._layer),i},t.createFromOptimisedFeature=function(e,i,r){var s=new t;return s._geometry=e.geometry?{geometry:e.geometry}:null,s._optimizedGeomDefinition=r,s.attributes=e.attributes||{},s._layer=i,s._datesfixed=!1,s},t.createFromArcadeDictionary=function(e){var i=new t;return i.attributes=e.field("attributes"),null!==i.attributes&&i.attributes instanceof r?(i.attributes=i.attributes.attributes,null===i.attributes&&(i.attributes={})):i.attributes={},i._geometry=e.field("geometry"),null!==i._geometry&&(i._geometry instanceof r?i._geometry=t.parseGeometryFromDictionary(i._geometry):i._geometry instanceof a||(i._geometry=null)),i},t.createFromGraphicLikeObject=function(e,i,r){void 0===r&&(r=null);var s=new t;return null===i&&(i={}),s.attributes=i,s._geometry=e||null,s._layer=r,s._layer&&(s._datesfixed=!1),s},t.prototype.repurposeFromGraphicLikeObject=function(t,e,i){void 0===i&&(i=null),null===e&&(e={}),this.attributes=e,this._geometry=t||null,this._layer=i,this._layer?this._datesfixed=!1:this._datesfixed=!0},t.prototype.castToText=function(){var t="";for(var e in this.attributes){""!==t&&(t+=",");var i=this.attributes[e];null==i?t+=JSON.stringify(e)+":null":o.isBoolean(i)||o.isNumber(i)||o.isString(i)?t+=JSON.stringify(e)+":"+JSON.stringify(i):i instanceof a?t+=JSON.stringify(e)+":"+o.toStringExplicit(i):i instanceof s?t+=JSON.stringify(e)+":"+o.toStringExplicit(i):i instanceof Array?t+=JSON.stringify(e)+":"+o.toStringExplicit(i):i instanceof Date?t+=JSON.stringify(e)+":"+JSON.stringify(i):null!==i&&"object"==typeof i&&void 0!==i.castToText&&(t+=JSON.stringify(e)+":"+i.castToText())}return'{"geometry":'+(null===this.geometry()?"null":o.toStringExplicit(this.geometry()))+',"attributes":{'+t+"}}"},t.prototype._fixDates=function(){for(var t=[],e=0;e<this._layer.fields.length;e++){var i=this._layer.fields[e];"date"!==i.type&&"esriFieldTypeDate"!==i.type||t.push(i.name)}t.length>0&&this._fixDateFields(t),this._datesfixed=!0},t.prototype._fixDateFields=function(t){this.attributes=i({},this.attributes);for(var e=0;e<t.length;e++){var r=this.attributes[t[e]];if(null===r);else if(void 0===r){for(var s in this.attributes)if(s.toLowerCase()===t[e]){r=this.attributes[s],null!==r&&(r instanceof Date||(this.attributes[s]=new Date(r)));break}}else r instanceof Date||(this.attributes[t[e]]=new Date(r))}},t.prototype.geometry=function(){return null===this._geometry?this._geometry:this._geometry instanceof a?this._geometry:(this._optimizedGeomDefinition?(this._geometry=u.fromJSON(l.convertToGeometry(this._geometry,this._optimizedGeomDefinition.geometryType,this._optimizedGeomDefinition.hasZ,this._optimizedGeomDefinition.hasM)),this._geometry.spatialReference=this._optimizedGeomDefinition.spatialReference):this._geometry=u.fromJSON(this._geometry),this._geometry)},t.prototype.field=function(t){!1===this._datesfixed&&this._fixDates();var e=t.toLowerCase(),i=this.attributes[t];if(void 0!==i)return i;for(var r in this.attributes)if(r.toLowerCase()===e)return this.attributes[r];if(this._hasFieldDefinition(e))return null;throw new Error("Field not Found")},t.prototype._hasFieldDefinition=function(t){if(null===this._layer)return!1;for(var e=0;e<this._layer.fields.length;e++){if(this._layer.fields[e].name.toLowerCase()===t)return!0}return!1},t.prototype._field=function(t){!1===this._datesfixed&&this._fixDates();var e=t.toLowerCase(),i=this.attributes[t];if(void 0!==i)return i;for(var r in this.attributes)if(r.toLowerCase()===e)return this.attributes[r];return null},t.prototype.setField=function(t,e){if(this.immutable)throw new Error("Feature is Immutable");if(!1===o.isSimpleType(e))throw new Error("Illegal Value Assignment to Feature");var i=t.toLowerCase();if(void 0!==this.attributes[t])return void(this.attributes[t]=e);for(var r in this.attributes)if(r.toLowerCase()===i)return void(this.attributes[r]=e);this.attributes[t]=e},t.prototype.hasField=function(t){var e=t.toLowerCase();if(void 0!==this.attributes[t])return!0;for(var i in this.attributes)if(i.toLowerCase()===e)return!0;return!!this._hasFieldDefinition(e)},t.prototype.keys=function(){var t=[],e={};for(var i in this.attributes)t.push(i),e[i.toLowerCase()]=1;if(null!==this._layer)for(var r=0;r<this._layer.fields.length;r++){var s=this._layer.fields[r];1!==e[s.name.toLowerCase()]&&t.push(s.name)}return t=t.sort()},t.parseGeometryFromDictionary=function(e){var i=t.convertDictionaryToJson(e,!0);return void 0!==i.spatialreference&&(i.spatialReference=i.spatialreference,delete i.spatialreference),void 0!==i.rings&&(i.rings=this.fixPathArrays(i.rings,!0===i.hasZ,!0===i.hasM)),void 0!==i.paths&&(i.paths=this.fixPathArrays(i.paths,!0===i.hasZ,!0===i.hasM)),void 0!==i.points&&(i.points=this.fixPointArrays(i.points,!0===i.hasZ,!0===i.hasM)),u.fromJSON(i)},t.fixPathArrays=function(t,e,i){var r=[];if(t instanceof Array)for(var o=0;o<t.length;o++)r.push(this.fixPointArrays(t[o],e,i));else if(t instanceof s)for(var o=0;o<t.length();o++)r.push(this.fixPointArrays(t.get(o),e,i));return r},t.fixPointArrays=function(t,e,i){var r=[];if(t instanceof Array)for(var o=0;o<t.length;o++){var a=t[o];a instanceof n?e&&i?r.push([a.x,a.y,a.z,a.m]):e?r.push([a.x,a.y,a.z]):i?r.push([a.x,a.y,a.m]):r.push([a.x,a.y]):r.push(a)}else if(t instanceof s)for(var o=0;o<t.length();o++){var a=t.get(o);a instanceof n?e&&i?r.push([a.x,a.y,a.z,a.m]):e?r.push([a.x,a.y,a.z]):i?r.push([a.x,a.y,a.m]):r.push([a.x,a.y]):r.push(a)}return r},t.convertDictionaryToJson=function(e,i){void 0===i&&(i=!1);var s={};for(var o in e.attributes){var a=e.attributes[o];a instanceof r&&(a=t.convertDictionaryToJson(a)),i?s[o.toLowerCase()]=a:s[o]=a}return s},t.parseAttributesFromDictionary=function(t){var e={};for(var i in t.attributes){var r=t.attributes[i];if(!o.isSimpleType(r))throw new Error("Illegal Argument");e[i]=r}return e},t.fromJson=function(e){var i=null;null!==e.geometry&&void 0!==e.geometry&&(i=u.fromJSON(e.geometry));var r={};if(null!==e.attributes&&void 0!==e.attributes)for(var s in e.attributes){var a=e.attributes[s];if(null===a)r[s]=a;else{if(!(o.isString(a)||o.isNumber(a)||o.isBoolean(a)||o.isDate(a)))throw new Error("Illegal Argument");r[s]=a}}return t.createFromGraphicLikeObject(i,r,null)},t.prototype.domainValueLookup=function(t,e,i){if(null===this._layer)return null;if(!this._layer.fields)return null;var r=o.getDomain(t,this._layer,this,i);if(void 0===e)try{e=this.field(t)}catch(t){return null}return o.getDomainValue(r,e)},t.prototype.domainCodeLookup=function(t,e,i){if(null===this._layer)return null;if(!this._layer.fields)return null;if(void 0===e){try{e=this.field(t)}catch(t){return null}return e}var r=o.getDomain(t,this._layer,this,i);return o.getDomainCode(r,e)},t}()});