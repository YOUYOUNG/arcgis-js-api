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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Graphic","../../../core/Logger","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../geometry/support/aaBoundingBox","../../../tasks/support/Query","./I3SMeshView3D","./LayerView3D","./i3s/I3SQueryEngine","./i3s/I3SUtil","./support/layerViewUpdatingProperties","./support/PopupSceneLayerView","../support/projectionUtils"],function(e,r,t,n,o,i,u,a,s,p,c,l,d,y,g,h,f,_){var b=u.getLogger("esri.views.3d.layers.SceneLayerView3D");!function(){function e(){}}();return function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r._queryEngine=null,r.progressiveLoadFactor=1,r._elevationContext="scene",r._isIntegratedMesh=!1,r}return n(r,e),Object.defineProperty(r.prototype,"lodFactor",{get:function(){return this.get("view.qualitySettings.sceneService.3dObject.lodFactor")||1},enumerable:!0,configurable:!0}),r.prototype.initialize=function(){var e=this;this.handles.add(a.init(this.layer,"rangeInfos",function(r){return e._rangeInfosChanged(r)}))},r.prototype.destroy=function(){},r.prototype._rangeInfosChanged=function(e){null!=e&&e.length>0&&b.warn("Unsupported property: rangeInfos are currently only serialized to and from web scenes but do not affect rendering.")},r.prototype.queryExtent=function(e){return this._ensureQueryEngine().queryExtent(e)},r.prototype.queryFeatureCount=function(e){return this._ensureQueryEngine().queryFeatureCount(e)},r.prototype.queryFeatures=function(e){return this._ensureQueryEngine().queryFeatures(e)},r.prototype.queryObjectIds=function(e){return this._ensureQueryEngine().queryObjectIds(e)},r.prototype._ensureQueryEngine=function(){return this._queryEngine||(this._queryEngine=this._createQueryEngine()),this._queryEngine},r.prototype._createQueryEngine=function(){var e=this,r={id:0,index:0,meta:null,bbCorners:new Float64Array(24)};return new y(this.layer,{forAll:function(t,n){var o=function(n,o,i){r.id=n,r.index=o,r.meta=i,e._boundingBoxCornerPoints(o,i.engineObject,r.bbCorners),t(r)};e._forAllFeatures(o,n)},createGraphic:function(r){return e._createGraphic(r.index,r.meta)},requestFields:function(r,t,n){var o=function(t){var n=e._getGraphicIndices(r,t);return[{node:r,indices:n,graphics:t}]};return g.whenGraphicAttributes(e.layer,t,e._getObjectIdField(),n,o,{ignoreUnavailableFields:!1})},createExtentBuilder:function(){return e._createExtentBuilder()}},{enableObjectId:!0,enableOutFields:!!this.layer.objectIdField})},r.prototype._createExtentBuilder=function(){var e=this.view.renderSpatialReference,r=this.view.spatialReference,t=p.empty(),n=new Float64Array(24);return{add:function(o){_.bufferToBuffer(o.bbCorners,e,0,n,r,0,8)&&p.expandWithBuffer(t,n,0,8)},getExtent:function(){return p.toExtent(t,r)}}},r.prototype.highlight=function(e,r){void 0===r&&(r={});var t=this._highlights;if(e instanceof c){var n=t.acquireSet(r),o=n.set,i=n.handle;return this.queryObjectIds(e).then(function(e){return t.setFeatureIds(o,e)}),i}return this.inherited(arguments)},r.prototype._createLayerGraphic=function(e){var r=new i(null,null,e);return r.layer=this.layer,r.sourceLayer=this.layer,r},r.prototype.canResume=function(){return this.inherited(arguments)&&(!this._controller||this._controller.rootNodeVisible)},r.prototype.isUpdating=function(){return!(!this._controller||!this._controller.updating)},o([s.property()],r.prototype,"layer",void 0),o([s.property({dependsOn:["_controller.updating"]})],r.prototype,"updating",void 0),o([s.property({dependsOn:["_controller.rootNodeVisible"]})],r.prototype,"suspended",void 0),o([s.property(h.updatingPercentage)],r.prototype,"updatingPercentage",void 0),o([s.property({readOnly:!0})],r.prototype,"lodFactor",null),o([s.property({readOnly:!0,aliasOf:"_controller.updatingPercentage"})],r.prototype,"updatingPercentageValue",void 0),r=o([s.subclass("esri.views.3d.layers.SceneLayerView3D")],r)}(s.declared(d,l,f.PopupSceneLayerView))});