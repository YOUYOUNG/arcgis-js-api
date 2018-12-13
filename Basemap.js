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

define(["require","exports","./core/tsSupport/assignHelper","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./core/asyncUtils","./core/Collection","./core/collectionUtils","./core/Evented","./core/JSONSupport","./core/lang","./core/Loadable","./core/loadAll","./core/Logger","./core/promiseUtils","./core/urlUtils","./core/accessorSupport/decorators","./layers/Layer","./portal/Portal","./portal/PortalItem","./support/basemapDefinitions"],function(e,r,t,o,a,n,i,s,l,p,c,u,f,y,d,h,m,b,L,v,I){var g=0,w=i.ofType(b),S=y.getLogger("esri.Basemap");return function(r){function i(e){var t=r.call(this)||this;t.id=null,t.portalItem=null,t.thumbnailUrl=null,t.title="Basemap",t.id=Date.now().toString(16)+"-basemap-"+g++,t.baseLayers=new w,t.referenceLayers=new w;var o=function(e){e.parent&&e.parent!==t&&"remove"in e.parent&&e.parent.remove(e),e.parent=t,"elevation"===e.type&&S.error("Layer '"+e.title+", id:"+e.id+"' of type '"+e.type+"' is not supported as a basemap layer and will therefore be ignored.")},a=function(e){e.parent=null};return t.baseLayers.on("after-add",function(e){return o(e.item)}),t.referenceLayers.on("after-add",function(e){return o(e.item)}),t.baseLayers.on("after-remove",function(e){return a(e.item)}),t.referenceLayers.on("after-remove",function(e){return a(e.item)}),t}o(i,r),l=i,i.prototype.initialize=function(){var e=this;this.when().catch(function(r){S.error("#load()","Failed to load basemap (title: '"+e.title+"', id: '"+e.id+"')",r)}),this.resourceInfo&&this.read(this.resourceInfo.data,this.resourceInfo.context)},i.prototype.normalizeCtorArgs=function(e){return e&&"resourceInfo"in e&&(this._set("resourceInfo",e.resourceInfo),e=t({},e),delete e.resourceInfo),e},Object.defineProperty(i.prototype,"baseLayers",{set:function(e){this._set("baseLayers",s.referenceSetter(e,this._get("baseLayers"),w))},enumerable:!0,configurable:!0}),i.prototype.writeBaseLayers=function(e,r,o,a){var n=[];if(!e)return void(r[o]=n);a=t({},a,{layerContainerType:"basemap"}),this.baseLayers.forEach(function(e){if(e.write){var r={};e.write(r,a)&&n.push(r)}}),this.referenceLayers.forEach(function(e){if(e.write){var r={isReference:!0};e.write(r,a)&&n.push(r)}}),r[o]=n},Object.defineProperty(i.prototype,"referenceLayers",{set:function(e){this._set("referenceLayers",s.referenceSetter(e,this._get("referenceLayers"),w))},enumerable:!0,configurable:!0}),i.prototype.writeTitle=function(e,r){r.title=e||"Basemap"},i.prototype.load=function(){return this.addResolvingPromise(this._loadFromSource()),this.when()},i.prototype.loadAll=function(){var e=this;return n.safeCast(f.loadAll(this,function(r){r(e.baseLayers,e.referenceLayers)}))},i.prototype.clone=function(){var e={id:this.id,title:this.title,portalItem:this.portalItem,baseLayers:this.baseLayers.slice(),referenceLayers:this.referenceLayers.slice()};return this.loaded&&(e.loadStatus="loaded"),new l({resourceInfo:this.resourceInfo}).set(e)},i.prototype.read=function(e,r){return this.resourceInfo||this._set("resourceInfo",{data:e,context:r}),this.inherited(arguments)},i.prototype.write=function(e,r){return e=e||{},r&&r.origin||(r=t({origin:"web-map"},r)),this.inherited(arguments,[e,r]),!this.loaded&&this.resourceInfo&&this.resourceInfo.data.baseMapLayers&&(e.baseMapLayers=this.resourceInfo.data.baseMapLayers.map(function(e){var r=c.clone(e);return r.url&&h.isProtocolRelative(r.url)&&(r.url="https:"+r.url),r.templateUrl&&h.isProtocolRelative(r.templateUrl)&&(r.templateUrl="https:"+r.templateUrl),r})),e},i.prototype._loadFromSource=function(){var e=this.resourceInfo,r=this.portalItem;return e?this._loadLayersFromJSON(e.data,e.context?e.context.url:null):r?this._loadFromItem(r):d.resolve(null)},i.prototype._loadLayersFromJSON=function(r,t){var o=this,a=this.resourceInfo&&this.resourceInfo.context,n=this.portalItem&&this.portalItem.portal||a&&a.portal||null,i=a&&"web-scene"===a.origin?"web-scene":"web-map";return d.create(function(r){return e(["./portal/support/layersCreator"],r)}).then(function(e){var a=[];if(r.baseMapLayers&&Array.isArray(r.baseMapLayers)){var s={context:{origin:i,url:t,portal:n,layerContainerType:"basemap"},defaultLayerType:"DefaultTileLayer"},l=e.populateOperationalLayers(o.baseLayers,r.baseMapLayers.filter(function(e){return!e.isReference}),s);a.push.apply(a,l);var p=e.populateOperationalLayers(o.referenceLayers,r.baseMapLayers.filter(function(e){return e.isReference}),s);a.push.apply(a,p)}return d.eachAlways(a)}).then(function(){})},i.prototype._loadFromItem=function(e){var r=this;return e.load().then(function(e){return e.fetchData()}).then(function(t){var o=h.urlToObject(e.itemUrl);return r._set("resourceInfo",{data:t.baseMap,context:{origin:"web-map",portal:e.portal||L.getDefault(),url:o}}),r.read(r.resourceInfo.data,r.resourceInfo.context),r.read({title:e.title,thumbnailUrl:e.thumbnailUrl},{origin:"portal-item",portal:e.portal||L.getDefault(),url:o}),r._loadLayersFromJSON(r.resourceInfo.data,o)})},i.fromId=function(e){var r=I[e];return r?l.fromJSON(r):null};var l;return a([m.property({type:w,json:{write:{ignoreOrigin:!0,target:"baseMapLayers"}}}),m.cast(s.castForReferenceSetter)],i.prototype,"baseLayers",null),a([m.writer("baseLayers")],i.prototype,"writeBaseLayers",null),a([m.property({type:String,json:{origins:{"web-scene":{write:!0}}}})],i.prototype,"id",void 0),a([m.property({type:v})],i.prototype,"portalItem",void 0),a([m.property({type:w}),m.cast(s.castForReferenceSetter)],i.prototype,"referenceLayers",null),a([m.property({readOnly:!0})],i.prototype,"resourceInfo",void 0),a([m.property()],i.prototype,"thumbnailUrl",void 0),a([m.property({type:String,json:{origins:{"web-scene":{write:{isRequired:!0}}}}})],i.prototype,"title",void 0),a([m.writer("title")],i.prototype,"writeTitle",null),i=l=a([m.subclass("esri.Basemap")],i)}(m.declared(p,l,u))});