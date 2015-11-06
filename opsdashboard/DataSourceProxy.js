// COPYRIGHT © 2015 Esri
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
// See http://js.arcgis.com/3.15/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/json","dojo/Deferred","../layers/Field","../tasks/FeatureSet","../renderers/jsonUtils","./core/messageHandler","./core/errorMessages","./core/MessageReceiver"],function(e,t,r,n,i,s,o,u,a,d){return e([d],{id:null,name:null,objectIdFieldName:null,displayFieldName:null,typeIdFieldName:null,fields:null,types:null,geometryType:null,supportsSelection:!1,isBroken:!1,_popupInfo:null,_renderer:null,constructor:function(){this.fields||(this.fields=[]);for(var e=0;e<this.fields.length;e++){var t=this.fields[e];"string"==typeof t&&(t=r.parse(t)),this.fields[e]=new i(t)}},executeQuery:function(e){var r={functionName:"executeQuery",args:{dataSourceId:this.id,query:e}};return u._sendMessageWithReply(r).then(t.hitch(this,function(e){this.isBroken=!1;var t=e.featureSet;return new s(t)}),t.hitch(this,function(e){throw this.isBroken=!0,e}))},getAssociatedSelectionDataSourceProxy:function(){return u._sendMessageWithReply({functionName:"getAssociatedSelectionDataSource",args:{dataSourceId:this.id}}).then(t.hitch(this,function(e){return this.getDataSourceProxy(e.dataSourceId)}))},selectFeaturesByObjectIds:function(e){if(!Array.isArray(e))throw new Error(a.invalidObjectIdArray);if(!this.supportsSelection)throw new Error(a.selectionNotSupported);u._sendMessage({functionName:"selectFeaturesByIds",args:{dataSourceId:this.id,objectIds:e}})},selectFeatures:function(e){if(!this.supportsSelection)throw new Error(a.selectionNotSupported);u._sendMessage({functionName:"selectFeatures",args:{dataSourceId:this.id,geometry:e}})},clearSelection:function(){this.supportsSelection&&u._sendMessage({functionName:"clearSelection",args:{dataSourceId:this.id}})},getPopupInfo:function(){return this._popupInfo?(new n).resolve(this._popupInfo):u._sendMessageWithReply({functionName:"getPopupInfo",args:{dataSourceId:this.id}}).then(t.hitch(this,function(e){return this._popupInfo=e.popupInfo,this._popupInfo}))},getRenderer:function(){return this._renderer?(new n).resolve(this._renderer):u._sendMessageWithReply({functionName:"getRenderer",args:{dataSourceId:this.id}}).then(t.hitch(this,function(e){return e.renderer?(this._renderer=o.fromJson(e.renderer),this._renderer):null}))},_findField:function(e){if(!e||!Array.isArray(this.fields))return null;for(var t=0;t<this.fields.length;t++)if(this.fields[t].name===e)return this.fields[t];return null},_findType:function(e){if(!e||!Array.isArray(this.types))return null;for(var t=0;t<this.types.length;t++)if(this.types[t].id===e)return this.types[t];return null},_getCodedValueFromCodedDomain:function(e,t){if(!t||"codedValue"!==t.type)return null;for(var r=0;r<t.codedValues.length;r++)if(t.codedValues[r].code===e)return t.codedValues[r];return null},getTypeFromFeature:function(e){return this.typeIdFieldName?this._findType(e.attributes[this.typeIdFieldName]):null},getValueFromFeature:function(e,t){var r=this._findField(t);if(!t||!r)return null;var n=e.attributes[t];if(!n&&(n=e.attributes[t.toUpperCase()],!n))return null;if(this.typeIdFieldName===t){var i=this._findType(n);if(i)return i.name}var s,o=this.getFeatureType(e);if(o&&Array.isArray(o.domains)){var u=o.domains[t];if(s=this.getCodedValueFromCodedDomain(n,u))return s.name}return s=this._getCodedValueFromCodedDomain(n,r.domain),s?s.name:n}})});