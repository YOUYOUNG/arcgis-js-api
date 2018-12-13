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

//  copyright

/**
             * The copyright text as defined by the map service.
             *
             * @name copyright
             * @instance
             * @type {string}
             */

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/paramHelper","../Graphic","../PopupTemplate","../renderers","../request","../symbols","../core/Collection","../core/Error","../core/Handles","../core/kebabDictionary","../core/lang","../core/Logger","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","../geometry/Extent","../geometry/HeightModelInfo","../geometry/SpatialReference","../geometry/support/normalizeUtils","./Layer","./graphics/sources/MemorySource","./mixins/ArcGISService","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./support/arcgisLayerUrl","./support/commonProperties","./support/FeatureIndex","./support/FeatureProcessing","./support/FeatureReduction","./support/FeatureReductionSelection","./support/FeatureTemplate","./support/FeatureType","./support/Field","./support/fieldUtils","./support/LabelClass","./support/labelingInfo","./support/layerSourceUtils","./support/Relationship","../renderers/support/jsonUtils","../renderers/support/styleUtils","../renderers/support/typeUtils","../symbols/support/jsonUtils","../tasks/support/AttachmentQuery","../tasks/support/FeatureSet","../tasks/support/Query","../tasks/support/RelationshipQuery"],function(e,t,r,i,o,n,a,s,p,l,u,d,c,y,f,h,m,g,v,b,F,I,w,S,D,O,x,j,A,E,T,R,M,q,_,L,C,P,Q,U,V,G,z,k,B,W,N,Z,H,J,$,K,X,Y){function ee(e){return e&&null!=e.applyEdits}function te(e){return e&&re(e)}function re(e){return e&&e.isInstanceOf&&e.isInstanceOf(d)}function ie(e,t,r){return!!(e&&e.hasOwnProperty(t)?e[t]:r)}var oe=f({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryMultiPatch:"multipatch"}),ne="FeatureLayer",ae=m.getLogger("esri.layers.FeatureLayer");return function(t){function f(e){var r=t.call(this)||this;return r._handles=new y,r.capabilities=null,r.copyright=null,r.displayField=null,r.definitionExpression=null,r.dynamicDataSource=null,r.editFieldsInfo=null,r.editingEnabled=!0,r.elevationInfo=null,r.featureReduction=null,r.fields=null,r.fullExtent=null,r.gdbVersion=null,r.geometryType=null,r.hasM=void 0,r.hasZ=void 0,r.heightModelInfo=null,r.historicMoment=null,r.isTable=!1,r.labelsVisible=!0,r.labelingInfo=null,r.layerId=void 0,r.legendEnabled=!0,r.maxRecordCount=void 0,r.tileMaxRecordCount=void 0,r.minScale=0,r.maxScale=0,r.objectIdField=null,r.popupEnabled=!0,r.popupTemplate=null,r.relationships=null,r.returnM=void 0,r.returnZ=void 0,r.screenSizePerspectiveEnabled=!0,r.serviceDefinitionExpression=null,r.spatialReference=S.WGS84,r.templates=null,r.timeInfo=null,r.title=null,r.sublayerTitleMode="item-title",r.trackIdField=null,r.type="feature",r.typeIdField=null,r.types=null,r.indexes=new(d.ofType(_.FeatureIndex)),r.userIsAdmin=!1,r.version=void 0,r.visible=!0,r}return i(f,t),f.prototype.normalizeCtorArgs=function(e,t){return"string"==typeof e?r({url:e},t):e},f.prototype.load=function(){var e=this;if(this.portalItem&&this.portalItem.loaded&&this.source)return void this.addResolvingPromise(this.createGraphicsSource().then(function(t){return e._initLayerProperties(t)}));var t=this.loadFromPortal({supportedTypes:["Feature Service","Feature Collection"]}).catch(function(e){return e}).then(function(){if(e.url&&null==e.layerId&&/FeatureServer|MapServer\/*$/i.test(e.url))return e._fetchFirstLayerId().then(function(t){null!=t&&(e.layerId=t)})}).then(function(){if(!e.url&&!e._hasMemorySource())throw new c("feature-layer:missing-url-or-source","Feature layer must be created with either a url or a source");return e.createGraphicsSource().then(function(t){return e._initLayerProperties(t)})});return this.addResolvingPromise(t),this.when()},Object.defineProperty(f.prototype,"allRenderers",{get:function(){return this._getAllRenderers(this.renderer)},enumerable:!0,configurable:!0}),f.prototype.readCapabilities=function(e,t){return t=t.layerDefinition||t,{data:this._readDataCapabilities(t),operations:this._readOperationsCapabilities(t.capabilities||e,t),query:this._readQueryCapabilities(t),queryRelated:this._readQueryRelatedCapabilities(t),editing:this._readEditingCapabilities(t)}},f.prototype.readEditingEnabled=function(e,t){return"Query"!==t.capabilities},f.prototype.writeEditingEnabled=function(e,t,r,i){e||(t.capabilities="Query")},Object.defineProperty(f.prototype,"hasAttachments",{get:function(){return ae.warn("FeatureLayer.hasAttachments is deprecated. Use FeatureLayer.capabilities.data.supportsAttachment instead."),this.hasService&&this._get("hasAttachments")||!1},enumerable:!0,configurable:!0}),f.prototype.readIsTable=function(e,t){return t=t&&t.layerDefinition||t,"Table"===t.type},Object.defineProperty(f.prototype,"hasService",{get:function(){return!this._hasMemorySource()},enumerable:!0,configurable:!0}),f.prototype.readMinScale=function(e,t){return t.effectiveMinScale||e||0},f.prototype.readMaxScale=function(e,t){return t.effectiveMaxScale||e||0},f.prototype.readObjectIdFieldFromService=function(e,t){if(t=t.layerDefinition||t,t.objectIdField)return t.objectIdField;if(t.fields)for(var r=0,i=t.fields;r<i.length;r++){var o=i[r];if("esriFieldTypeOID"===o.type)return o.name}},Object.defineProperty(f.prototype,"outFields",{get:function(){var e=this,t=this._userOutFields,r=this.requiredFields;return t=t&&t.slice(0),r=r&&r.slice(0),t?-1===t.indexOf("*")&&r.forEach(function(e){-1===t.indexOf(e)&&t.push(e)}):t=r,-1!==t.indexOf("*")?t=["*"]:this.loaded&&(t=t.filter(function(t){var r=!!e.getField(t);return t&&!r&&ae.error("[outFields] Invalid field: ",t),r},this),t=t.map(function(t){return e.getField(t).name},this),t=t.filter(function(e,t,r){return r.indexOf(e)===t})),t},set:function(e){var t=this,r=this.requiredFields&&this.requiredFields.slice(0);e?-1===e.indexOf("*")&&r.forEach(function(t){-1===e.indexOf(t)&&e.push(t)}):e=r,this.loaded&&(e=e.filter(function(e){var r="*"===e||!!t.getField(e,t.fields);return e&&!r&&ae.error("[outFields] Invalid field: ",e),r},this),e=e.map(function(e){return"*"===e?e:t.getField(e,t.fields).name},this)),this._userOutFields=e},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"parsedUrl",{get:function(){var e=this.url?b.urlToObject(this.url):null;if(null!=e)if(null!=this.layerId)e.path=b.join(e.path,this.layerId.toString());else if(null!=this.dynamicDataSource){var t={source:B.sourceToJSON(this.dynamicDataSource)};e.query={layer:JSON.stringify(t)}}return e},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"renderer",{set:function(e){var t=this._getAllRenderers(e);G.fixRendererFields(t,this.fields),this._set("renderer",e)},enumerable:!0,configurable:!0}),f.prototype.readRenderer=function(e,t,r){t=t.layerDefinition||t;var i,o,n=t.drawingInfo&&t.drawingInfo.renderer||void 0;if(n)(i=N.read(n,t,r)||void 0)||ae.error("Failed to create renderer",{rendererDefinition:t.drawingInfo.renderer,layer:this,context:r});else if(t.defaultSymbol)J.read(t.defaultSymbol,t,r),t.types&&t.types.length?(i=new p.UniqueValueRenderer({defaultSymbol:o,field:t.typeIdField}),t.types.forEach(function(e){n.addUniqueValueInfo(e.id,J.read(e.symbol,e,r))})):i=new p.SimpleRenderer({symbol:o});else if("Table"!==t.type){switch(t.geometryType){case"esriGeometryPoint":case"esriGeometryMultipoint":o=new u.SimpleMarkerSymbol;break;case"esriGeometryPolyline":o=new u.SimpleLineSymbol;break;case"esriGeometryPolygon":o=new u.SimpleFillSymbol}i=o&&new p.SimpleRenderer({symbol:o})}return i},f.prototype.writeRenderer=function(e,t,r,i){N.writeTarget(e,t,r,i)},Object.defineProperty(f.prototype,"requiredFields",{get:function(){var e=this.timeInfo,t=[],r=[],i=[this.objectIdField,this.typeIdField,this.editFieldsInfo&&this.editFieldsInfo.creatorField,this.editFieldsInfo&&this.editFieldsInfo.creationDateField,this.editFieldsInfo&&this.editFieldsInfo.editorField,this.editFieldsInfo&&this.editFieldsInfo.editDateField,e&&e.startTimeField,e&&e.endTimeField,this.trackIdField];this.allRenderers.forEach(function(e){t=t.concat(e.requiredFields)}),this.labelingInfo&&this.labelingInfo.length&&this.labelingInfo.forEach(function(e){r=r.concat(e.requiredFields)}),r=r.map(function(e){return e.replace(/['"]+/g,"")}),i=i.concat(t),i=i.concat(r);var o=this.elevationInfo&&this.elevationInfo.featureExpressionInfo;return o&&(i=i.concat(o.requiredFields)),this.popupTemplate&&(i=i.concat(this.popupTemplate.requiredFields)),i.filter(function(e,t,r){return!!e&&r.indexOf(e)===t&&"function"!=typeof e})},enumerable:!0,configurable:!0}),Object.defineProperty(f.prototype,"source",{set:function(e){var t=this._get("source");t!==e&&(te(t)&&this._resetMemorySource(t),te(e)&&this._initMemorySource(e),this._set("source",e))},enumerable:!0,configurable:!0}),f.prototype.castSource=function(e){return e?Array.isArray(e)||re(e)?new x.default({layer:this,items:e}):e:null},f.prototype.readSource=function(e,t){var r=K.fromJSON(t.featureSet);return new x.default({layer:this,items:r&&r.features||[]})},f.prototype.readTemplates=function(e,t){var r=t.editFieldsInfo,i=r&&r.creatorField,o=r&&r.editorField;return e=e&&e.map(function(e){return Q.fromJSON(e)}),this._fixTemplates(e,i),this._fixTemplates(e,o),e},f.prototype.readTitle=function(e,t){var r=t.layerDefinition&&t.layerDefinition.name||t.name,i=t.title||t.layerDefinition&&t.layerDefinition.title;if(r){var o=this.portalItem&&this.portalItem.title;if("item-title"===this.sublayerTitleMode)return this.url?M.titleFromUrlAndName(this.url,r):r;var n=r||this.url&&M.parse(this.url).title;if(!n)return;return"item-title-and-service-name"===this.sublayerTitleMode&&o&&(n=o+" - "+n),M.cleanTitle(n)}if("item-title"===this.sublayerTitleMode&&i)return i},f.prototype.readTitleFromWebMap=function(e,t){return t.title||t.layerDefinition&&t.layerDefinition.name},f.prototype.readTypeIdField=function(e,t){if(t=t.layerDefinition||t,e=t.typeIdField){var r=this.getField(e,t.fields);r&&(e=r.name)}return e},f.prototype.readTypes=function(e,t){var r=this;t=t.layerDefinition||t,e=t.types;var i=t.editFieldsInfo,o=i&&i.creatorField,n=i&&i.editorField;return e&&e.map(function(e){return e=U.fromJSON(e),r._fixTemplates(e.templates,o),r._fixTemplates(e.templates,n),e})},Object.defineProperty(f.prototype,"url",{set:function(e){var t=M.sanitizeUrlWithLayerId(this,e,ae);this._set("url",t.url),null!=t.layerId&&this._set("layerId",t.layerId)},enumerable:!0,configurable:!0}),f.prototype.writeUrl=function(e,t,r,i){M.writeUrlWithLayerId(this,e,null,t,i)},f.prototype.readVersion=function(e,t){return t=t.layerDefinition||t,t.currentVersion?t.currentVersion:t.hasOwnProperty("capabilities")||t.hasOwnProperty("drawingInfo")||t.hasOwnProperty("hasAttachments")||t.hasOwnProperty("htmlPopupType")||t.hasOwnProperty("relationships")||t.hasOwnProperty("timeInfo")||t.hasOwnProperty("typeIdField")||t.hasOwnProperty("types")?10:9.3},f.prototype.readVisible=function(e,t){return t.layerDefinition&&null!=t.layerDefinition.defaultVisibility?!!t.layerDefinition.defaultVisibility:null!=t.visibility?!!t.visibility:void 0},f.prototype.addAttachment=function(e,t){var r=this;return this.load().then(function(){return r._checkAttachmentSupport(e)}).then(function(){return"addAttachment"in r.source?r.source.addAttachment(e,t):v.reject(new c(ne,"Layer source does not support addAttachment capability"))})},f.prototype.updateAttachment=function(e,t,r){var i=this;return this.load().then(function(){return i._checkAttachmentSupport(e)}).then(function(){return"updateAttachment"in i.source?i.source.updateAttachment(e,t,r):v.reject(new c(ne,"Layer source does not support updateAttachment capability"))})},f.prototype.applyEdits=function(e){var t,r,i=this,o={edits:e,result:v.create(function(e,i){t=e,r=i})};return this.emit("apply-edits",o),this.load().then(function(){return ee(i.source)?i.editingEnabled?i._processApplyEditsParams(e):v.reject(new c(ne,"Editing is disabled for layer",{layer:i})):v.reject(new c(ne,"Layer source does not support applyEdits capability",{layer:i}))}).then(function(e){if(ee(i.source))return i.source.applyEdits(e).then(function(e){var r=function(e){return e.filter(function(e){return!e.error}).map(h.clone)},o={addedFeatures:r(e.addFeatureResults),updatedFeatures:r(e.updateFeatureResults),deletedFeatures:r(e.deleteFeatureResults)};return(o.addedFeatures.length||o.updatedFeatures.length||o.deletedFeatures.length)&&i.emit("edits",o),t(o),e})}).catch(function(e){throw r(e),e})},f.prototype.on=function(e,t){return this.inherited(arguments)},f.prototype.createGraphicsSource=function(){var t=this;return this._hasMemorySource()?(this.emit("graphics-source-create",{graphicsSource:this.source}),this.source.load()):v.create(function(t){return e(["./graphics/sources/FeatureLayerSource"],t)}).then(function(e){return new e.default({layer:t}).load()}).then(function(e){return t.emit("graphics-source-create",{graphicsSource:e}),e})},f.prototype.createGraphicsController=function(t){var i,o=this,n=t.layerView,s=d.ofType(a),p=this.source,l=te(p),u=r({},t.options,{layer:this,layerView:n,graphics:l?p:new s});return i=l?v.create(function(t){return e(["./graphics/controllers/MemoryController"],t)}):"2d"===n.view.type?v.create(function(t){return e(["./graphics/controllers/AutoController2D"],t)}):v.create(function(t){return e(["./graphics/controllers/SnapshotController"],t)}),i.then(function(e){return new e(u)}).then(function(e){return o.emit("graphics-controller-create",{graphicsController:e}),e.when()})},f.prototype.createQuery=function(){var e=new X,t=this.get("capabilities.data");return e.gdbVersion=this.gdbVersion,e.historicMoment=this.historicMoment,e.returnGeometry=!0,t&&(t.supportsZ&&null!=this.returnZ&&(e.returnZ=this.returnZ),t.supportsM&&null!=this.returnM&&(e.returnM=this.returnM)),e.outFields=this.outFields,e.where=this.definitionExpression||"1=1",e.multipatchOption="multipatch"===this.geometryType?"xyFootprint":null,e},f.prototype.deleteAttachments=function(e,t){var r=this;return this.load().then(function(){return r._checkAttachmentSupport(e)}).then(function(){return"deleteAttachments"in r.source?r.source.deleteAttachments(e,t):v.reject(new c(ne,"Layer source does not support deleteAttachments capability"))})},f.prototype.getFeatureType=function(e){var t=this,r=t.typeIdField,i=t.types;if(!r||!e)return null;var o=e.attributes?e.attributes[r]:void 0;if(null==o)return null;var n=null;return i.some(function(e){var t=e.id;return null!=t&&(t.toString()===o.toString()&&(n=e),!!n)}),n},f.prototype.getFieldDomain=function(e,t){var r,i=this,o=!1,n=t&&t.feature,a=n&&n.attributes,s=this.typeIdField&&a&&a[this.typeIdField];return null!=s&&this.types&&(o=this.types.some(function(t){return t.id==s&&(r=t.domains&&t.domains[e],r&&"inherited"===r.type&&(r=i._getLayerDomain(e)),!0)})),o||r||(r=this._getLayerDomain(e)),r},f.prototype.getField=function(e,t){var r=this.processing?this.fields.concat(this.processing.fields):this.fields;return G.getField(e,t||r)},f.prototype.graphicChanged=function(e){this.emit("graphic-update",e)},f.prototype.queryAttachments=function(e){var t=this;return this.load().then(function(){if(!t.get("capabilities.data.supportsAttachment"))return v.reject(new c(ne,"this layer doesn't support attachments"));var r=e.attachmentTypes,i=e.objectIds,o=e.globalIds,n=e.num,a=e.size,s=e.start,p=e.definitionExpression;if(!t.get("capabilities.operations.supportsQueryAttachments")){var l=i&&i.length>1,u=r&&r.length,d=o&&o.length,y=a&&a.length;if(l||u||d||y||n||s||p)return v.reject(new c(ne,"when 'supportsQueryAttachments' is false, only objectIds of length 1 are supported",e))}return i&&i.length||p?"queryAttachments"in t.source?t.source.queryAttachments(e):v.reject(new c(ne,"Layer source does not support queryAttachments capability",e)):v.reject(new c(ne,"objectIds or definitionExpression are required to perform attachment query",e))})},f.prototype.queryFeatures=function(e,t){var r=this;return this.load().then(function(){return r.source.queryFeatures(e||r.createQuery(),t)}).then(function(e){if(e&&e.features)for(var t=0,i=e.features;t<i.length;t++){var o=i[t];o.layer=o.sourceLayer=r}return e})},f.prototype.queryObjectIds=function(e,t){var r=this;return this.load().then(function(){return r.source.queryObjectIds?r.source.queryObjectIds(e||r.createQuery(),t):v.reject(new c(ne,"Layer source does not support queryObjectIds capability"))})},f.prototype.queryFeatureCount=function(e,t){var r=this;return this.load().then(function(){return r.source.queryFeatureCount?r.source.queryFeatureCount(e||r.createQuery(),t):v.reject(new c(ne,"Layer source does not support queryFeatureCount capability"))})},f.prototype.queryExtent=function(e,t){var r=this;return this.load().then(function(){return r.source.queryExtent?r.source.queryExtent(e||r.createQuery(),t):v.reject(new c(ne,"Layer source does not support queryExtent capability"))})},f.prototype.queryRelatedFeatures=function(e){var t=this;return this.load().then(function(){return"queryRelatedFeatures"in t.source?t.source.queryRelatedFeatures(e):v.reject(new c(ne,"Layer source does not support queryRelatedFeatures capability"))})},f.prototype.read=function(e,t){var r=e.featureCollection;if(r){var i=r.layers;i&&1===i.length&&(this.inherited(arguments,[i[0],t]),null!=r.showLegend&&this.inherited(arguments,[{showLegend:r.showLegend},t]))}return this.inherited(arguments,[e,t]),t&&"service"===t.origin&&this.revert(["objectIdField","fields"],"service"),this},f.prototype.write=function(e,t){return t&&"web-scene"===t.origin&&t.messages&&this.isTable?(t.messages.push(new c("layer:unsupported","Layers ("+this.title+", "+this.id+") of type '"+this.declaredClass+"' using a Table source cannot written to web scenes",{layer:this})),null):this.inherited(arguments)},f.prototype.importLayerViewModule=function(t){switch(t.type){case"2d":return v.create(function(t){return e(["../views/2d/layers/FeatureLayerView2D"],t)});case"3d":return v.create(function(t){return e(["../views/3d/layers/FeatureLayerView3D"],t)})}},f.prototype._checkAttachmentSupport=function(e){var t=e.attributes,r=this.objectIdField;return this.get("capabilities.data.supportsAttachment")?e?t?t[r]?void 0:v.reject(new c(ne,"feature is missing the identifying attribute "+r)):v.reject(new c(ne,"'attributes' are required on a feature to query attachments")):v.reject(new c(ne,"A feature is required to add/delete/update attachments")):v.reject(new c(ne,"this layer doesn't support attachments"))},f.prototype._getLayerDomain=function(e){if(!this.fields)return null;var t=null;return this.fields.some(function(r){return r.name===e&&(t=r.domain),!!t}),t},f.prototype._fetchFirstLayerId=function(){return l(this.url,{query:{f:"json"},responseType:"json"}).then(function(e){var t=e.data;if(t&&Array.isArray(t.layers)&&t.layers.length>0)return t.layers[0].id})},f.prototype._initLayerProperties=function(e){return this._set("source",e),e.layerDefinition&&this.read(e.layerDefinition,{origin:"service",url:this.parsedUrl}),this._verifySource(),this._verifyFields(),G.fixRendererFields(this._getAllRenderers(this.renderer),this.fields),Z.loadStyleRenderer(this,{origin:"service"})},f.prototype._getAllRenderers=function(e){if(!e)return[];var t=[];return[e,e.trackRenderer,e.observationRenderer,e.latestObservationRenderer].forEach(function(e){e&&(t.push(e),e.rendererInfos&&e.rendererInfos.forEach(function(e){e.renderer&&t.push(e.renderer)}))}),t},f.prototype._verifyFields=function(){var e=this.parsedUrl&&this.parsedUrl.path||"undefined";this.objectIdField||console.log("FeatureLayer: 'objectIdField' property is not defined (url: "+e+")"),this.isTable||this._hasMemorySource()||-1!==e.search(/\/FeatureServer\//i)||this.fields&&this.fields.some(function(e){return"geometry"===e.type})||console.log("FeatureLayer: unable to find field of type 'geometry' in the layer 'fields' list. If you are using a map service layer, features will not have geometry (url: "+e+")")},f.prototype._fixTemplates=function(e,t){e&&e.forEach(function(e){var r=e.prototype&&e.prototype.attributes;r&&t&&delete r[t]})},f.prototype._verifySource=function(){if(this._hasMemorySource()){if(this.url)throw new c("feature-layer:mixed-source-and-url","FeatureLayer cannot be created with both an in-memory source and a url")}else{if(this.isTable)throw new c("feature-layer:source-type-not-supported","The table feature service type is not yet supported",{sourceType:"Table"});if(!this.url)throw new c("feature-layer:source-or-url-required","FeatureLayer requires either a url, a valid portal item or a source")}},f.prototype._initMemorySource=function(e){var t=this;e.forEach(function(e){e.layer=t,e.sourceLayer=t}),this._handles.add([e.on("after-add",function(e){e.item.layer=t,e.item.sourceLayer=t}),e.on("after-remove",function(e){e.item.layer=null,e.item.sourceLayer=null})],"fl-source")},f.prototype._resetMemorySource=function(e){e.forEach(function(e){e.layer=null,e.sourceLayer=null}),this._handles.remove("fl-source")},f.prototype._hasMemorySource=function(){return!(this.url||!this.source)},f.prototype._readDataCapabilities=function(e){return{supportsAttachment:ie(e,"hasAttachments",!1),supportsM:ie(e,"hasM",!1),supportsZ:ie(e,"hasZ",!1)}},f.prototype._readOperationsCapabilities=function(e,t){var r=e?e.toLowerCase().split(",").map(function(e){return e.trim()}):[],i=-1!==r.indexOf("editing"),o=i&&-1!==r.indexOf("create"),n=i&&-1!==r.indexOf("delete"),a=i&&-1!==r.indexOf("update");return i&&!(o||n||a)&&(o=n=a=!0),{supportsCalculate:ie(t,"supportsCalculate",!1),supportsTruncate:ie(t,"supportsTruncate",!1),supportsValidateSql:ie(t,"supportsValidateSql",!1),supportsAdd:o,supportsDelete:n,supportsEditing:i,supportsQuery:-1!==r.indexOf("query"),supportsQueryAttachments:ie(t.advancedQueryCapabilities,"supportsQueryAttachments",!1),supportsResizeAttachments:ie(t,"supportsAttachmentsResizing",!1),supportsUpdate:a,supportsExceedsLimitStatistics:ie(t,"supportsExceedsLimitStatistics",!1)}},f.prototype._readQueryCapabilities=function(e){var t=e.advancedQueryCapabilities,r=e.ownershipBasedAccessControlForFeatures,i=e.archivingInfo,o=(e.supportedQueryFormats||"").split(",").reduce(function(e,t){var r=t.toLowerCase().trim();return r&&e.add(r),e},new Set);return{supportsStatistics:ie(t,"supportsStatistics",e.supportsStatistics),supportsCentroid:ie(t,"supportsReturningGeometryCentroid",!1),supportsDistance:ie(t,"supportsQueryWithDistance",!1),supportsDistinct:ie(t,"supportsDistinct",e.supportsAdvancedQueries),supportsExtent:ie(t,"supportsReturningQueryExtent",!1),supportsGeometryProperties:ie(t,"supportsReturningGeometryProperties",!1),supportsHavingClause:ie(t,"supportsHavingClause",!1),supportsOrderBy:ie(t,"supportsOrderBy",e.supportsAdvancedQueries),supportsPagination:ie(t,"supportsPagination",!1),supportsQuantization:ie(e,"supportsCoordinatesQuantization",!1),supportsQuantizationEditMode:ie(e,"supportsQuantizationEditMode",!1),supportsResultType:ie(t,"supportsQueryWithResultType",!1),supportsMaxRecordCountFactor:ie(t,"supportsMaxRecordCountFactor",!1),supportsSqlExpression:ie(t,"supportsSqlExpression",!1),supportsStandardizedQueriesOnly:ie(e,"useStandardizedQueries",!1),supportsQueryByOthers:ie(r,"allowOthersToQuery",!0),supportsHistoricMoment:ie(i,"supportsQueryWithHistoricMoment",!1),supportsFormatPBF:o.has("pbf")}},f.prototype._readQueryRelatedCapabilities=function(e){var t=e.advancedQueryCapabilities,r=ie(t,"supportsAdvancedQueryRelated",!1);return{supportsPagination:ie(t,"supportsQueryRelatedPagination",!1),supportsCount:r,supportsOrderBy:r}},f.prototype._readEditingCapabilities=function(e){var t=e.ownershipBasedAccessControlForFeatures;return{supportsGeometryUpdate:ie(e,"allowGeometryUpdates",!0),supportsGlobalId:ie(e,"supportsApplyEditsWithGlobalIds",!1),supportsRollbackOnFailure:ie(e,"supportsRollbackOnFailureParameter",!1),supportsUpdateWithoutM:ie(e,"allowUpdateWithoutMValues",!1),supportsUploadWithItemId:ie(e,"supportsAttachmentsByUploadId",!1),supportsDeleteByAnonymous:ie(t,"allowAnonymousToDelete",!0),supportsDeleteByOthers:ie(t,"allowOthersToDelete",!0),supportsUpdateByAnonymous:ie(t,"allowAnonymousToUpdate",!0),supportsUpdateByOthers:ie(t,"allowOthersToUpdate",!0)}},f.prototype._processApplyEditsParams=function(e){var t="'addFeatures', 'updateFeatures' or 'deleteFeatures' parameter is required",i="feature-layer:missing-parameters";if(!e)return v.reject(new c(i,t));if(e=r({},e),e.addFeatures=e.addFeatures||[],e.updateFeatures=e.updateFeatures||[],e.deleteFeatures=e.deleteFeatures||[],e.addFeatures.length||e.updateFeatures.length||e.deleteFeatures.length){var o=function(e){var t=new a;return e.attributes||(e.attributes={}),t.geometry=e.geometry,t.attributes=e.attributes,t};return e.addFeatures=e.addFeatures.map(o),e.updateFeatures=e.updateFeatures.map(o),this._normalizeGeometries(e)}return v.reject(new c(i,t))},f.prototype._normalizeGeometries=function(e){var t=e.addFeatures,r=e.updateFeatures,i=t.concat(r).map(function(e){return e.geometry});return D.normalizeCentralMeridian(i).then(function(i){var o=t.length,n=r.length;return i.slice(0,o).forEach(function(t,r){e.addFeatures[r].geometry=t}),i.slice(o,o+n).forEach(function(t,r){e.updateFeatures[r].geometry=t}),e})},o([F.property({readOnly:!0,dependsOn:["loaded","renderer","fields"]})],f.prototype,"allRenderers",null),o([F.property({readOnly:!0,json:{read:!1}})],f.prototype,"capabilities",void 0),o([F.reader("service","capabilities",["advancedQueryCapabilities","archivingInfo","supportsStatistics","supportsAdvancedQueries","hasAttachments","hasM","hasZ","supportsAttachmentsResizing","supportsCalculate","supportsTruncate","supportsValidateSql","supportsCoordinatesQuantization","supportsQuantizationEditMode","useStandardizedQueries","ownershipBasedAccessControlForFeatures","allowGeometryUpdates","supportsApplyEditsWithGlobalIds","supportsRollbackOnFailureParameter","allowUpdateWithoutMValues","supportsAttachmentsByUploadId","capabilities","supportedQueryFormats","supportsExceedsLimitStatistics"])],f.prototype,"readCapabilities",null),o([F.property({type:String,json:{read:{source:"layerDefinition.copyrightText"},origins:{service:{read:{source:"copyrightText"}}}}})],f.prototype,"copyright",void 0),o([F.property({type:String,json:{read:{source:"layerDefinition.displayField"},origins:{service:{read:{source:"displayField"}}}}})],f.prototype,"displayField",void 0),o([F.property({type:String,json:{origins:{service:{read:!1,write:!1}},read:{source:"layerDefinition.definitionExpression"},write:{target:"layerDefinition.definitionExpression"}}})],f.prototype,"definitionExpression",void 0),o([F.property({readOnly:!0,json:{read:J.read}})],f.prototype,"defaultSymbol",void 0),o([F.property()],f.prototype,"dynamicDataSource",void 0),o([F.property({readOnly:!0})],f.prototype,"editFieldsInfo",void 0),o([F.property({type:Boolean})],f.prototype,"editingEnabled",void 0),o([F.reader(["portal-item","web-map","web-scene"],"editingEnabled",["capabilities"])],f.prototype,"readEditingEnabled",null),o([F.writer(["portal-item","web-map","web-scene"],"editingEnabled")],f.prototype,"writeEditingEnabled",null),o([F.property(q.elevationInfo)],f.prototype,"elevationInfo",void 0),o([F.property({types:{key:"type",base:C.default,typeMap:{selection:P.default}},json:{origins:{"web-scene":{read:{source:"layerDefinition.featureReduction"},write:{target:"layerDefinition.featureReduction"}}}}})],f.prototype,"featureReduction",void 0),o([F.property({type:[V],json:{origins:{service:{read:!0}},read:{source:"layerDefinition.fields"}}})],f.prototype,"fields",void 0),o([F.property({type:I,json:{origins:{service:{read:{source:"extent"}}},read:{source:"layerDefinition.extent"}}})],f.prototype,"fullExtent",void 0),o([F.property()],f.prototype,"gdbVersion",void 0),o([F.property({type:["point","polygon","polyline","multipoint","multipatch","mesh"],json:{origins:{service:{read:oe.read}},read:{source:"layerDefinition.geometryType",reader:oe.read}}})],f.prototype,"geometryType",void 0),o([F.property({readOnly:!0,dependsOn:["loaded"],json:{origins:{service:{read:!0}},read:{source:"layerDefinition.hasAttachments"}}})],f.prototype,"hasAttachments",null),o([F.property({type:Boolean,json:{origins:{service:{read:!0}},read:{source:"layerDefinition.hasM"}}})],f.prototype,"hasM",void 0),o([F.property({type:Boolean,json:{origins:{service:{read:!0}},read:{source:"layerDefinition.hasZ"}}})],f.prototype,"hasZ",void 0),o([F.property({readOnly:!0,type:w})],f.prototype,"heightModelInfo",void 0),o([F.property({type:Date})],f.prototype,"historicMoment",void 0),o([F.property({json:{origins:{service:{read:!1},"portal-item":{read:!1}}}})],f.prototype,"id",void 0),o([F.property({readOnly:!0})],f.prototype,"isTable",void 0),o([F.reader("service","isTable",["type"]),F.reader("isTable",["layerDefinition.type"])],f.prototype,"readIsTable",null),o([F.property({dependsOn:["loaded","url","source"],readOnly:!0})],f.prototype,"hasService",null),o([F.property(q.labelsVisible)],f.prototype,"labelsVisible",void 0),o([F.property({type:[z],json:{origins:{service:{read:{source:"drawingInfo.labelingInfo",reader:k.reader},write:{target:"drawingInfo.labelingInfo",enabled:!1}}},read:{source:"layerDefinition.drawingInfo.labelingInfo",reader:k.reader},write:{target:"layerDefinition.drawingInfo.labelingInfo"}}})],f.prototype,"labelingInfo",void 0),o([F.property({type:Number,json:{origins:{service:{read:{source:"id"}}},read:!1}})],f.prototype,"layerId",void 0),o([F.property(q.legendEnabled)],f.prototype,"legendEnabled",void 0),o([F.property({type:Number,json:{origins:{service:{read:!0}},read:{source:"layerDefinition.maxRecordCount"}}})],f.prototype,"maxRecordCount",void 0),o([F.property({type:Number,json:{origins:{service:{read:!0}},read:{source:"layerDefinition.tileMaxRecordCount"}}})],f.prototype,"tileMaxRecordCount",void 0),o([F.property({type:Number,json:{origins:{service:{write:{enabled:!1}}},read:{source:"layerDefinition.minScale"},write:{target:"layerDefinition.minScale"}}})],f.prototype,"minScale",void 0),o([F.reader("service","minScale",["minScale","effectiveMinScale"])],f.prototype,"readMinScale",null),o([F.property({type:Number,json:{origins:{service:{write:{enabled:!1}}},read:{source:"layerDefinition.maxScale"},write:{target:"layerDefinition.maxScale"}}})],f.prototype,"maxScale",void 0),o([F.reader("service","maxScale",["maxScale","effectiveMaxScale"])],f.prototype,"readMaxScale",null),o([F.property({type:String})],f.prototype,"objectIdField",void 0),o([F.reader("objectIdField",["layerDefinition.objectIdField","layerDefinition.fields"]),F.reader("service","objectIdField",["objectIdField","fields"])],f.prototype,"readObjectIdFieldFromService",null),o([F.property({value:"ArcGISFeatureLayer",type:["ArcGISFeatureLayer"]})],f.prototype,"operationalLayerType",void 0),o([F.property({dependsOn:["requiredFields"]})],f.prototype,"outFields",null),o([F.property({readOnly:!0,dependsOn:["layerId"]})],f.prototype,"parsedUrl",null),o([F.property(q.popupEnabled)],f.prototype,"popupEnabled",void 0),o([F.property({type:s,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],f.prototype,"popupTemplate",void 0),o([F.property({type:L})],f.prototype,"processing",void 0),o([F.property({type:[W],readOnly:!0})],f.prototype,"relationships",void 0),o([F.property({types:H.types,json:{origins:{service:{write:{target:"drawingInfo.renderer",enabled:!1}}},write:{target:"layerDefinition.drawingInfo.renderer"}}})],f.prototype,"renderer",null),o([F.reader("service","renderer",["drawingInfo.renderer","defaultSymbol","type"]),F.reader("renderer",["layerDefinition.drawingInfo.renderer","layerDefinition.defaultSymbol","layerDefinition.type"])],f.prototype,"readRenderer",null),o([F.writer("renderer")],f.prototype,"writeRenderer",null),o([F.property({readOnly:!0,dependsOn:["allRenderers","labelingInfo","elevationInfo.featureExpressionInfo","popupTemplate.requiredFields"]})],f.prototype,"requiredFields",null),o([F.property()],f.prototype,"resourceInfo",void 0),o([F.property({
type:Boolean})],f.prototype,"returnM",void 0),o([F.property({type:Boolean})],f.prototype,"returnZ",void 0),o([F.property(q.screenSizePerspectiveEnabled)],f.prototype,"screenSizePerspectiveEnabled",void 0),o([F.property()],f.prototype,"source",null),o([F.cast("source")],f.prototype,"castSource",null),o([F.reader("portal-item","source",["featureSet"]),F.reader("web-map","source",["featureSet"])],f.prototype,"readSource",null),o([F.property({readOnly:!0,json:{origins:{service:{read:{source:"definitionExpression"}}}}})],f.prototype,"serviceDefinitionExpression",void 0),o([F.property({type:S,json:{origins:{service:{read:{source:"extent.spatialReference"}}},read:{source:"layerDefinition.extent.spatialReference"}}})],f.prototype,"spatialReference",void 0),o([F.property({type:[Q]})],f.prototype,"templates",void 0),o([F.reader("templates",["editFieldsInfo","creatorField","editorField","templates"])],f.prototype,"readTemplates",null),o([F.property()],f.prototype,"timeInfo",void 0),o([F.property()],f.prototype,"title",void 0),o([F.reader("service","title",["name"]),F.reader("portal-item","title",["layerDefinition.title","layerDefinition.name","title"])],f.prototype,"readTitle",null),o([F.reader("web-map","title",["layerDefinition.name","title"])],f.prototype,"readTitleFromWebMap",null),o([F.property({type:String})],f.prototype,"sublayerTitleMode",void 0),o([F.property({type:String,readOnly:!0,json:{read:{source:"timeInfo.trackIdField"}}})],f.prototype,"trackIdField",void 0),o([F.property({json:{read:!1}})],f.prototype,"type",void 0),o([F.property({type:String,readOnly:!0})],f.prototype,"typeIdField",void 0),o([F.reader("service","typeIdField"),F.reader("typeIdField",["layerDefinition.typeIdField"])],f.prototype,"readTypeIdField",null),o([F.property({type:[U]})],f.prototype,"types",void 0),o([F.reader("service","types",["types"]),F.reader("types",["layerDefinition.types"])],f.prototype,"readTypes",null),o([F.property({type:d.ofType(_.FeatureIndex),readOnly:!0})],f.prototype,"indexes",void 0),o([F.property(q.url)],f.prototype,"url",null),o([F.writer("url")],f.prototype,"writeUrl",null),o([F.property({readOnly:!0})],f.prototype,"userIsAdmin",void 0),o([F.property({json:{origins:{"portal-item":{read:!1}}}})],f.prototype,"version",void 0),o([F.reader("service","version",["currentVersion","capabilities","drawingInfo","hasAttachments","htmlPopupType","relationships","timeInfo","typeIdField","types"]),F.reader("version",["layerDefinition.currentVersion","layerDefinition.capabilities","layerDefinition.drawingInfo","layerDefinition.hasAttachments","layerDefinition.htmlPopupType","layerDefinition.typeIdField","layerDefinition.types"])],f.prototype,"readVersion",null),o([F.property({type:Boolean,json:{origins:{"portal-item":{write:{target:"layerDefinition.defaultVisibility"}}}}})],f.prototype,"visible",void 0),o([F.reader("portal-item","visible",["visibility","layerDefinition.defaultVisibility"])],f.prototype,"readVisible",null),o([n(0,F.cast($))],f.prototype,"queryAttachments",null),o([n(0,F.cast(X))],f.prototype,"queryFeatures",null),o([n(0,F.cast(X))],f.prototype,"queryObjectIds",null),o([n(0,F.cast(X))],f.prototype,"queryFeatureCount",null),o([n(0,F.cast(X))],f.prototype,"queryExtent",null),o([n(0,F.cast(Y))],f.prototype,"queryRelatedFeatures",null),f=o([F.subclass("esri.layers.FeatureLayer")],f)}(F.declared(O,A,E,R,T,j,g))});