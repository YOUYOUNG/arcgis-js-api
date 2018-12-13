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

define(["require","exports","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./core/tsSupport/paramHelper","./core/tsSupport/assignHelper","./core/tsSupport/generatorHelper","./core/tsSupport/awaiterHelper","./kernel","./Map","./Viewpoint","./core/asyncUtils","./core/Collection","./core/Error","./core/Handles","./core/has","./core/JSONSupport","./core/lang","./core/Loadable","./core/loadAll","./core/Logger","./core/promiseUtils","./core/urlUtils","./core/accessorSupport/decorators","./core/accessorSupport/originUtils","./core/accessorSupport/read","./geometry/Extent","./geometry/HeightModelInfo","./geometry/SpatialReference","./geometry/support/heightModelInfoUtils","./geometry/support/jsonUtils","./portal/Portal","./portal/PortalItem","./support/webSceneUtils","./webscene/ApplicationProperties","./webscene/Environment","./webscene/InitialViewProperties","./webscene/Presentation","./webscene/Version"],function(e,t,r,i,n,o,a,s,p,l,u,c,d,h,y,f,v,w,m,g,b,S,A,I,_,L,M,R,V,U,O,P,j,E,W,C,T,G,N){var x=b.getLogger("esri.WebScene"),F=f("dojo-debug-messages"),J=new N.default(1,13),B={width:600,height:400};return function(t){function l(e){var r=t.call(this)||this;return r._handles=new y,r.applicationProperties=null,r.clippingArea=null,r.clippingEnabled=!1,r.heightModelInfo=null,r.sourceVersion=null,r.supportsHeightModelInfo=!0,r.presentation=new G,r.initialViewProperties=new T,r.portalItem=null,r.resourceInfo=null,r.authoringApp=null,r.authoringAppVersion=null,r._isAuthoringAppSetByUser=!1,r._isAuthoringAppVersionSetByUser=!1,r}return r(l,t),l.prototype.initialize=function(){var e=this;if(this.when().catch(function(e){x.error("#load()","Failed to load web scene",e)}),this.resourceInfo){var t=void 0;try{t=this._validateJSON(this.resourceInfo)}catch(e){return void this.addResolvingPromise(S.reject(e))}this.read(t),this.addResolvingPromise(this._validateSpatialReference()),this.addResolvingPromise(this._validateHeightModelInfo())}this._handles.add(this.allLayers.on("change",function(){return e._scheduleLayersIdGC()}))},l.prototype.destroy=function(){this._unscheduleLayersIdGC(),this._handles.destroy()},l.prototype.writeClippingArea=function(e,t){t.clippingArea||(t.clippingArea={}),t.clippingArea.geometry=e.toJSON()},l.prototype.readClippingEnabled=function(e,t){return!!t.clippingArea&&!!t.clippingArea.clip},l.prototype.writeClippingEnabled=function(e,t){this.clippingArea&&(t.clippingArea||(t.clippingArea={}),t.clippingArea.clip=e)},l.prototype.writeLayers=function(e,t,r,i){var n=this,a=o({},i,{layerContainerType:"operational-layers"}),s=e.filter(function(e){return n.verifyWriteLayer(e,a)}).map(function(e){return e.write(null,a)}).filter(function(e){return!!e});t[r]=s.toArray()},l.prototype.verifyWriteLayer=function(e,t){return!!e.write||(t&&t.messages&&t.messages.push(new h("layer:unsupported","Layers ("+e.title+", "+e.id+") of type '"+e.declaredClass+"' cannot be persisted in web scenes",{layer:e})),!1)},l.prototype.readSourceVersion=function(e,t){var r=t.version.split("."),i=r[0],n=r[1];return new N.default(parseInt(i,10),parseInt(n,10))},l.prototype.writeSourceVersion=function(e,t,r){t[r]=J.major+"."+J.minor},Object.defineProperty(l.prototype,"thumbnailUrl",{get:function(){return this.portalItem&&this.portalItem.thumbnailUrl||null},set:function(e){e?this._override("thumbnailUrl",e):this._clearOverride("thumbnailUrl")},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"authoringApp",{set:function(e){this._isAuthoringAppSetByUser=!0,this._set("authoringApp",e)},enumerable:!0,configurable:!0}),l.prototype.writeAuthoringApp=function(e,t){e&&this._isAuthoringAppSetByUser?t.authoringApp=e:t.authoringApp="ArcGIS API for JavaScript"},Object.defineProperty(l.prototype,"authoringAppVersion",{set:function(e){this._isAuthoringAppVersionSetByUser=!0,this._set("authoringAppVersion",e)},enumerable:!0,configurable:!0}),l.prototype.writeAuthoringAppVersion=function(e,t){e&&this._isAuthoringAppVersionSetByUser?t.authoringAppVersion=e:t.authoringAppVersion=p.version},l.prototype.writeGround=function(e,t,r,i){t[r]=e?e.write(null,i):{transparency:0,layers:[]}},l.prototype.readInitialViewProperties=function(e,t){var r={};return t.initialState&&t.initialState.environment&&(r.environment=C.fromJSON(t.initialState.environment)),t.spatialReference?r.spatialReference=V.fromJSON(t.spatialReference):r.spatialReference=V.WebMercator,r.viewingMode=t.viewingMode||"global",t.initialState&&t.initialState.viewpoint&&(r.viewpoint=u.fromJSON(t.initialState.viewpoint)),new T(r)},l.prototype.writeInitialViewProperties=function(e,t,r,i){if(e){var n={};e.environment&&(n.environment=e.environment.write({},i)),e.viewpoint&&(n.viewpoint=e.viewpoint.write({},i)),0!==Object.keys(n).length&&(t.initialState=n),t.spatialReference=e.spatialReference?e.spatialReference.write({},i):V.WebMercator.toJSON(),t.viewingMode=null!=e.viewingMode?e.viewingMode:"global"}},l.prototype.load=function(){return this.addResolvingPromise(this._loadFromSource()),this.when()},l.prototype.loadAll=function(){var e=this;return c.safeCast(g.default(this,function(t){var r=e.presentation&&e.presentation.slides;t(e.ground,e.basemap,e.layers,r&&r.map(function(e){return e.basemap}))}))},l.prototype.read=function(e,t){var r=this;t=o({},t,{origin:"web-scene"});var i=this._isAuthoringAppVersionSetByUser,n=this._isAuthoringAppSetByUser,a=arguments;if(L.readLoadable(this,e,function(t){return r.inherited(a,[e,t])},t),n||(this._isAuthoringAppSetByUser=!1),i||(this._isAuthoringAppVersionSetByUser=!1),e.baseMap&&Array.isArray(e.baseMap.elevationLayers)&&this.sourceVersion.supportsVisibleElevationLayersInSlides){var s=e.baseMap.elevationLayers.map(function(e){return{id:e.id}}),p=this.presentation.slides,l=function(e,t){return e.visibleLayers.some(function(e){return e.id===t})},u=s.filter(function(e){return!p.some(function(t){return l(t,e.id)})});p.forEach(function(e){e.visibleLayers.addMany(u)})}return this},l.prototype._writeBasemapElevationLayers=function(e){var t=e.ground&&e.ground.layers;!e.baseMap&&t&&t.length&&(e.baseMap={title:"Basemap",baseMapLayers:[]}),e.baseMap&&(e.baseMap.elevationLayers=w.clone(t))},l.prototype.write=function(e,t){if("loaded"!==this.loadStatus){var r=new h("webscene:not-loaded","Web scene must be loaded before it can be serialized");throw x.error("#toJSON()","Web scene must be loaded before it can be serialized",this.loadError||this.loadStatus),r}this._runLayersIdGC(),t=o({},t,{origin:"web-scene"});var i=this.inherited(arguments,[e,t]);return this._writeBasemapElevationLayers(i),i},l.prototype.save=function(e){return s(this,void 0,void 0,function(){var t,r,i;return a(this,function(n){switch(n.label){case 0:return this.portalItem?[3,2]:(x.error("save(): requires the .portalItem property to be set"),[4,S.reject(new h("webscene:portal-item-not-set","Portal item to save to has not been set on the WebScene"))]);case 1:n.sent(),n.label=2;case 2:return"Web Scene"===this.portalItem.type?[3,4]:[4,S.reject(new h("webscene:portal-item-wrong-type",'Portal item needs to have type "Web Scene"'))];case 3:n.sent(),n.label=4;case 4:return t=this._updateFromPromise,[4,this.load()];case 5:return n.sent(),[4,this._loadObjectsWithLayers()];case 6:return n.sent(),r=this._enableVerifyItemRelativeUrls({origin:"web-scene",url:this.portalItem.itemUrl&&A.urlToObject(this.portalItem.itemUrl),messages:[],portal:this.portalItem.portal||P.getDefault(),writtenProperties:[],blockedRelativeUrls:[]}),i=this.write(null,r),[4,this._verifySave(i,r,e)];case 7:return n.sent(),this._updateTypeKeywords(this.portalItem),[4,this.portalItem.update({data:i})];case 8:return n.sent(),_.updateOrigins(r),t?[4,t]:[3,10];case 9:n.sent(),n.label=10;case 10:return[4,this._saveThumbnail()];case 11:return n.sent(),[2,this.portalItem]}})})},l.prototype.saveAs=function(e,t){return s(this,void 0,void 0,function(){var r,i,n,o,s;return a(this,function(a){switch(a.label){case 0:return e?[3,2]:(x.error("saveAs(portalItem): requires a portal item parameter"),[4,S.reject(new h("webscene:portal-item-required","saveAs requires a portal item to save to"))]);case 1:a.sent(),a.label=2;case 2:return e.type&&"Web Scene"!==e.type||e.id?[4,S.reject(new h("webscene:portal-item-already-exists","WebScene can only saveAs to a new and empty portal item"))]:[3,4];case 3:a.sent(),a.label=4;case 4:return r=e.portal||P.getDefault(),[4,this.load()];case 5:return a.sent(),[4,this._loadObjectsWithLayers()];case 6:return a.sent(),i=this._enableVerifyItemRelativeUrls({origin:"web-scene",url:null,messages:[],portal:r,writtenProperties:[],blockedRelativeUrls:[]}),n=this.write(null,i),[4,this._verifySaveAs(n,i,t)];case 7:return a.sent(),[4,r._signIn()];case 8:return a.sent(),o=this.thumbnailUrl,s=!this._isOverridden("thumbnailUrl"),e.type="Web Scene",e.portal=r,this._updateTypeKeywords(e),[4,r.user.addItem({item:e,folder:t&&t.folder,data:n})];case 9:return a.sent(),this.portalItem=e,v.prototype.read.call(this,{version:n.version,authoringApp:n.authoringApp,authoringAppVersion:n.authoringAppVersion},{name:"web-scene",ignoreDefaults:!0,url:e.itemUrl&&A.urlToObject(e.itemUrl)}),_.updateOrigins(i),o&&(this.thumbnailUrl=s?A.addQueryParameter(o,"w","8192"):o),[4,this._saveThumbnail()];case 10:return a.sent(),[2,e]}})})},l.prototype._saveThumbnail=function(){return s(this,void 0,void 0,function(){return a(this,function(e){switch(e.label){case 0:return this._isOverridden("thumbnailUrl")?[4,this.portalItem.updateThumbnail({thumbnail:this.thumbnailUrl})]:[3,2];case 1:e.sent(),this._clearOverride("thumbnailUrl"),e.label=2;case 2:return[2]}})})},l.prototype._verifySave=function(t,r,i,n){void 0===n&&(n=!1);var o=r.messages.filter(function(e){return"error"===e.type}).map(function(e){return new h(e.name,e.message,e.details)});r.blockedRelativeUrls&&(o=o.concat(r.blockedRelativeUrls.map(function(e){return new h("url:unsupported","Relative url '"+e+"' is not supported in Web Scene")}))),i&&i.ignoreUnsupported&&(o=o.filter(function(e){return"layer:unsupported"!==e.name&&"symbol:unsupported"!==e.name&&"symbol-layer:unsupported"!==e.name&&"property:unsupported"!==e.name&&"url:unsupported"!==e.name})),i&&i.strictSchemaValidationEnabled||(o=o.filter(function(e){return"web-document-write:property-required"!==e.name}));var a,s=i&&i.strictSchemaValidationEnabled;return a=F||s?S.create(function(t){return e(["./webscene/validator"],t)}).then(function(e){var r=e.validate(t);if(r.length>0){var i="webscene did not validate:\n"+r.join("\n");x.error((n?"saveAs":"save")+"(): "+i)}return r.map(function(e){return new h("webscene:schema-validation",e)})}).then(function(e){if(s&&e.length>0){var t=E.createSchemaValidationError(e.concat(o));return S.reject(t)}return o}):S.resolve(o),a.then(function(e){if(e.length>0)return S.reject(new h("webscene:save","Failed to save webscene due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:e}))})},l.prototype._verifySaveAs=function(e,t,r){return this.canSaveAs(t)?S.reject(E.createCopyError()):this._verifySave(e,t,r,!0)},l.prototype.verifySaveAs=function(e){var t=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),r=this.write(null,t);return this._verifySaveAs(r,t,e)},l.prototype.canSaveAs=function(e){return e||(e=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),this.write(null,e)),e.verifyItemRelativeUrls&&e.verifyItemRelativeUrls.writtenUrls.length>0},l.prototype.updateFrom=function(e,t){return void 0===t&&(t={}),s(this,void 0,void 0,function(){var r,i;return a(this,function(n){switch(n.label){case 0:return r=this._updateFromInternal(e,t),this._updateFromPromise=r,[4,r];case 1:return n.sent(),i=this._updateFromPromise===r,i&&(this._updateFromPromise=null),[2]}})})},l.prototype._updateFromInternal=function(e,t){return void 0===t&&(t={}),s(this,void 0,void 0,function(){return a(this,function(r){switch(r.label){case 0:return[4,e.whenReady()];case 1:return r.sent(),!t.environmentExcluded&&e.environment&&(this.initialViewProperties.environment=C.prototype.clone.apply(e.environment)),!t.viewpointExcluded&&e.viewpoint&&(this.initialViewProperties.viewpoint=e.viewpoint.clone()),this.initialViewProperties.spatialReference=e.spatialReference.clone(),this.initialViewProperties.viewingMode=e.viewingMode,e.clippingArea?e.clippingArea!==this.clippingArea&&(this.clippingArea=e.clippingArea.clone(),this.clippingEnabled=!0):this.clippingEnabled=!1,e.heightModelInfo&&(this.heightModelInfo=e.heightModelInfo.clone()),e.map===this&&e.allLayerViews.forEach(function(e){e.layer.visible=e.visible}),!1===t.thumbnailExcluded||null==t.thumbnailExcluded&&!t.viewpointExcluded?[4,this._updateFromThumbnail(e,t.thumbnailSize||void 0)]:[3,3];case 2:r.sent(),r.label=3;case 3:return[2]}})})},l.prototype._updateFromThumbnail=function(e,t){return void 0===t&&(t=B),s(this,void 0,void 0,function(){var r,i,n,o,s;return a(this,function(a){switch(a.label){case 0:return r=1.5,i=t.width,n=t.height,o=i/n,o<r?n=i/r:o>r&&(i=n*r),i>e.width&&(n*=e.width/i,i=e.width),n>e.height&&(i*=e.height/n,n=e.height),[4,e.takeScreenshot({format:"jpg",width:Math.round(i),height:Math.round(n),disableSlice:!0})];case 1:return s=a.sent(),this.thumbnailUrl=s.dataUrl,[2]}})})},l.prototype._loadFromSource=function(){return this.resourceInfo?this._loadFromJSON(this.resourceInfo,{origin:"web-scene"}):this.portalItem&&this.portalItem.id?this._loadFromItem(this.portalItem):this._loadObjectsWithLayers()},l.prototype._readAndLoadFromJSON=function(e,t){var r=this._validateJSON(e,t&&t.url&&t.url.path);return this.read(r,t),this._loadFromJSON(r,t)},l.prototype._extractOperationalLayers=function(e){var t=this,r=[];if(!this.sourceVersion.supportsGround&&e.baseMap&&Array.isArray(e.baseMap.elevationLayers))for(var i=0,n=e.baseMap.elevationLayers;i<n.length;i++){var o=n[i];r.push(o)}var a=[],s=function(e){return e.layers&&(e.layers=e.layers.filter(s)),"ArcGISTiledElevationServiceLayer"!==e.layerType||(t.sourceVersion.supportsGround||a.push(e),!1)};return{operationalLayers:e.operationalLayers?e.operationalLayers.filter(s):[],operationalElevationLayers:a,basemapElevationLayers:r}},l.prototype._loadFromJSON=function(t,r){var i=this,n=new d;return this._validateSpatialReference().then(function(){return i._validateHeightModelInfo()}).then(function(){return S.create(function(t){return e(["./portal/support/layersCreator"],t)})}).then(function(e){var a=i._extractOperationalLayers(t),s=a.operationalLayers,p=a.operationalElevationLayers,l=a.basemapElevationLayers,u=[],c={context:o({},r,{layerContainerType:"operational-layers"})};if(i.portalItem&&(c.context.portal=i.portalItem.portal||P.getDefault()),l.length>0){var d=o({},c,{context:o({},c.context,{layerContainerType:"ground"})});d.defaultLayerType="ArcGISTiledElevationServiceLayer",u.push.apply(u,e.populateOperationalLayers(i.ground.layers,l,d))}if(p.length>0){var d=o({},c,{context:o({},c.context,{layerContainerType:"ground"})});d.defaultLayerType="ArcGISTiledElevationServiceLayer",u.push.apply(u,e.populateOperationalLayers(n,p,d))}return s&&s.length>0&&u.push.apply(u,e.populateOperationalLayers(i.layers,s,c)),S.eachAlways(u).then(function(){})}).then(function(){return i._loadObjectsWithLayers()}).then(function(){i.ground.layers.addMany(n)})},l.prototype._loadObjectsWithLayers=function(){var e=[];return this.ground&&e.push(this.ground.load()),this.basemap&&e.push(this.basemap.load()),this.presentation.slides.forEach(function(t){t.basemap&&e.push(t.basemap.load())}),S.eachAlways(e).then(function(){})},l.prototype._loadFromItem=function(e){var t=this;return e.load().catch(function(e){throw new h("webscene:load-portal-item","Failed to load portal item",{error:e})}).then(function(){if("Web Scene"!==e.type)throw new h("webscene:invalid-portal-item","Invalid portal item type '${type}', expected 'Web Scene'",{type:e.type})}).then(function(){return e.fetchData()}).then(function(r){return t.resourceInfo=r,t._readAndLoadFromJSON(r,{origin:"web-scene",url:A.urlToObject(e.itemUrl),portal:e.portal||P.getDefault()})})},l.prototype._validateSpatialReference=function(){var e,t=this.initialViewProperties,r=this._sceneSpatialReference,i="local"!==t.viewingMode;if(i){if(!r.isWGS84&&!r.isWebMercator)return S.reject(new h("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in global mode, only Web Mercator or WGS84 GCS are supported",{spatialReference:r,viewingMode:t.viewingMode}));e=function(e){return!e||e.isWGS84||e.isWebMercator}}else{if(r.isGeographic)return S.reject(new h("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in local mode, only projected coordinate systems are supported",{spatialReference:r,viewingMode:t.viewingMode}));e=function(e){return!e||e.equals(r)}}var n=function(e){return e&&(e.camera&&e.camera.position&&e.camera.position.spatialReference||e.targetGeometry&&e.targetGeometry.spatialReference)},o=t.viewpoint,a=n(o);if(a&&!e(a))return S.reject(new h("webscene:incompatible-camera-spatial-reference","Camera spatial reference (${cameraSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{cameraSpatialReference:a,sceneSpatialReference:r,viewingMode:t.viewingMode}));var s=this.presentation.slides.find(function(t){return!e(n(t.viewpoint))});if(s){var p=n(s.viewpoint);return S.reject(new h("webscene:incompatible-slide-spatial-reference","Slide spatial reference (${slideSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{slideSpatialReference:p,sceneSpatialReference:r,viewingMode:t.viewingMode}))}return S.resolve()},l.prototype._validateHeightModelInfo=function(){var e=this._sceneSpatialReference,t=U.validateWebSceneError(this.heightModelInfo,e);return t?S.reject(t):S.resolve()},l.prototype._validateJSON=function(e,t){void 0===t&&(t=null);var r=N.default.parse(e.version||"","webscene");return J.validate(r),e.version=r.major+"."+r.minor,1===r.major&&r.minor<=2&&(e.spatialReference=V.WebMercator.toJSON()),e},l.prototype._updateTypeKeywords=function(e){"local"===this.initialViewProperties.viewingMode?e.typeKeywords?-1===e.typeKeywords.indexOf("ViewingMode-Local")&&e.typeKeywords.push("ViewingMode-Local"):e.typeKeywords=["ViewingMode-Local"]:"global"===this.initialViewProperties.viewingMode&&e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(function(e){return"ViewingMode-Local"!==e})),e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(function(e,t,r){return r.indexOf(e)===t}))},Object.defineProperty(l.prototype,"_sceneSpatialReference",{get:function(){return this.initialViewProperties.spatialReference||V.WebMercator},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_verifyItemRelativeRootPath",{get:function(){return this.portalItem&&this.portalItem.itemUrl?A.urlToObject(this.portalItem.itemUrl).path:null},enumerable:!0,configurable:!0}),l.prototype._enableVerifyItemRelativeUrls=function(e){var t=this._verifyItemRelativeRootPath;return t&&(e.verifyItemRelativeUrls={rootPath:t,writtenUrls:[]}),e},l.prototype._unscheduleLayersIdGC=function(){this._layersIdGCTimeoutId&&(clearTimeout(this._layersIdGCTimeoutId),this._layersIdGCTimeoutId=0)},l.prototype._scheduleLayersIdGC=function(){var e=this;this._unscheduleLayersIdGC(),this._layersIdGCTimeoutId=setTimeout(function(){e._layersIdGCTimeoutId=0,e._runLayersIdGC()},3e3)},l.prototype._runLayersIdGC=function(){var e=this;this._unscheduleLayersIdGC();var t=this.applicationProperties&&this.applicationProperties.viewing&&this.applicationProperties.viewing.search,r=function(t){return!!e.allLayers.find(function(e){return e.id===t})};t&&t.layers&&(t.layers=t.layers.filter(function(e){return r(e.id)}));var i=this.presentation&&this.presentation.slides;i&&i.forEach(function(e){e.visibleLayers&&(e.visibleLayers=e.visibleLayers.filter(function(e){return r(e.id)}))})},l.fromJSON=function(e){if(!e)throw new h("webscene:empty-resource","Expected a JSON resource but got nothing");return new this({resourceInfo:e})},l.VERSION=J,i([I.property({type:W,json:{write:!0}})],l.prototype,"applicationProperties",void 0),i([I.property({json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],l.prototype,"basemap",void 0),i([I.property({type:M,json:{read:{source:"clippingArea.geometry",reader:O.fromJSON},write:{target:"clippingArea.geometry"}}})],l.prototype,"clippingArea",void 0),i([I.writer("clippingArea")],l.prototype,"writeClippingArea",null),i([I.property({type:Boolean,json:{write:{target:"clippingArea.clip"}}})],l.prototype,"clippingEnabled",void 0),i([I.reader("clippingEnabled",["clippingArea"])],l.prototype,"readClippingEnabled",null),i([I.writer("clippingEnabled")],l.prototype,"writeClippingEnabled",null),i([I.property({type:R,json:{write:!0}})],l.prototype,"heightModelInfo",void 0),i([I.property({json:{write:{target:"operationalLayers"}}})],l.prototype,"layers",void 0),i([I.writer("layers")],l.prototype,"writeLayers",null),i([I.property({readOnly:!0,type:N.default,json:{type:String,write:{allowNull:!0,target:"version",isRequired:!0}}})],l.prototype,"sourceVersion",void 0),i([I.reader("sourceVersion",["version"])],l.prototype,"readSourceVersion",null),i([I.writer("sourceVersion")],l.prototype,"writeSourceVersion",null),i([I.property({dependsOn:["portalItem.thumbnailUrl"]})],l.prototype,"thumbnailUrl",null),i([I.property({type:String,json:{write:{allowNull:!0}}})],l.prototype,"authoringApp",null),i([I.writer("authoringApp")],l.prototype,"writeAuthoringApp",null),i([I.property({type:String,json:{write:{allowNull:!0}}})],l.prototype,"authoringAppVersion",null),i([I.writer("authoringAppVersion")],l.prototype,"writeAuthoringAppVersion",null),i([I.property({json:{write:{isRequired:!0,allowNull:!0,enabled:!0}}})],l.prototype,"ground",void 0),i([I.writer("ground")],l.prototype,"writeGround",null),i([I.property({type:G,nonNullable:!0,json:{write:function(e,t,r,i){if(e.slides&&e.slides.length>0){var n=o({},i,{isPresentation:!0});t.presentation=e.write(null,n)}}}})],l.prototype,"presentation",void 0),i([I.property({type:T,nonNullable:!0,json:{default:function(){return new T({viewingMode:"global",spatialReference:V.WebMercator})}}})],l.prototype,"initialViewProperties",void 0),i([I.reader("initialViewProperties",["initialState.environment","spatialReference","viewingMode","initialState.viewpoint"])],l.prototype,"readInitialViewProperties",null),i([I.writer("initialViewProperties",{"initialState.environment":{type:C},spatialReference:{type:V},viewingMode:{type:String},"initialState.viewpoint":{type:u}})],l.prototype,"writeInitialViewProperties",null),i([I.property({type:j})],l.prototype,"portalItem",void 0),i([I.property()],l.prototype,"resourceInfo",void 0),i([n(0,I.cast(j))],l.prototype,"saveAs",null),i([I.property()],l.prototype,"_sceneSpatialReference",null),i([I.property()],l.prototype,"_verifyItemRelativeRootPath",null),l=i([I.subclass("esri.WebScene")],l)}(I.declared(l,m,v))});