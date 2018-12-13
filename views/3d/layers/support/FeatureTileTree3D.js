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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/Collection","../../../../core/Handles","../../../../core/Logger","../../../../core/throttle","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../geometry/support/aaBoundingRect","./FeatureTileDescriptor3D","./FeatureTileMeasurements3D","../../support/projectionUtils"],function(e,t,r,i,n,s,o,l,u,a,p,c,h,d,f){function y(){return v++}Object.defineProperty(t,"__esModule",{value:!0});var g=l.getLogger("esri.views.3d.layers.support.FeatureTileFetcher3D"),m=function(e){function t(t){var r=e.call(this,t)||this;return r.tiles=new s,r.tileSize=512,r.disableThrottling=!1,r.idToTile=new Map,r.handles=new o,r.clients=new Set,r.geometryEnginePromise=null,r._dirty=!1,r}return r(t,e),Object.defineProperty(t.prototype,"tilingScheme",{get:function(){var e=this.tilingSchemeOwner.tilingScheme;return e?e.clone():null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterExtent",{set:function(e){if(e&&!e.spatialReference.equals(this.viewState.spatialReference))return void g.error("#extent","extent spatial reference needs to be in the same spatial reference as the view");var t=this._get("filterExtent");if(!(t===e||t&&e&&t.equals(e))){var r=e?e.clone():null;this._set("filterExtent",r),this.setDirty()}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterExtentRect",{get:function(){if(!this.filterExtent||!this.tilingScheme)return null;var e=c.create();return f.extentToBoundingRect(this.filterExtent,e,this.tilingScheme.spatialReference),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rootTileIds",{get:function(){return this.filterExtentRect?this.tilingScheme.rootTilesInExtent(this.filterExtentRect):[[0,0,0]]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"suspended",{set:function(e){e!==this._get("suspended")&&(this._set("suspended",e),e||this.setDirty())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return this.throttledUpdate.hasPendingUpdates()||null!=this.geometryEnginePromise||this._dirty},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"changeId",{get:function(){var e=this._get("changeId")||0;return!this.hasClients||this.suspended?e:e+1},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this.throttledUpdate=u.throttle(this.setDirty,function(){return e.notifyChange("updating")},1e3,this);var t=this.disableThrottling?function(){return e.setDirty}:this.throttledUpdate;this.handles.add(this.watch(["tilingScheme","tileSize"],function(){return e.tileMeasurements=null},!0)),this.handles.add(a.init(this,"changeId",t)),this.resourceController&&(this._frameWorker=this.resourceController.registerFrameWorker(function(){return e.update()},function(){return e.needsUpdate()}))},t.prototype.destroy=function(){this._frameWorker&&(this._frameWorker.remove(),this._frameWorker=null),this.handles&&(this.handles.destroy(),this.handles=null)},t.prototype.addClient=function(){var e=this,t=y();return this.clients.add(t),1===this.clients.size&&this.setDirty(),{remove:function(){return e.removeClient(t)}}},t.prototype.removeClient=function(e){this.clients.delete(e),this.hasClients||this.setDirty()},Object.defineProperty(t.prototype,"hasClients",{get:function(){return this.clients.size>0},enumerable:!0,configurable:!0}),t.prototype.setDirty=function(){if(this.suspended)return void this.notifyChange("updating");this._dirty=!0,this._frameWorker||this.update()},t.prototype.needsUpdate=function(){return this._dirty&&!this.suspended},t.prototype.update=function(){if(this._dirty=!1,!this.tilingScheme||!this.hasClients)return this.tiles.removeAll(),this.idToTile.clear(),void this.notifyChange("updating");this.tileMeasurements||(this.tileMeasurements=new d.FeatureTileMeasurements3D({renderCoordsHelper:this.renderCoordsHelper,tilingScheme:this.tilingScheme,tileSize:this.tileSize,maxVerticalScreenSize:b}));var e=this.viewState.camera,t=this.cameraOnSurface.location;this.tileMeasurements.begin(e,this.focus?this.focus.locationOnSurface:t,t.z),this.updateTiles(this.subdivideTilesForView(this.getRootTiles())),this.tileMeasurements.end(),this.notifyChange("updating")},t.prototype.getRootTiles=function(){var e=this;return this.rootTileIds.map(function(t){return new h.FeatureTileDescriptor3D(t[0],t[1],t[2],e.tilingScheme)})},t.prototype.purgeHorizonTiles=function(e){e.sort(function(e,t){return t.measures.screen.rect[1]-e.measures.screen.rect[1]}),c.empty(S);for(var t=0;t<e.length;t++)if(c.expand(S,e[t].measures.screen.rect),c.height(S)>b)return e.slice(t);return[]},t.prototype.subdivideTilesForView=function(e){for(var t=e.slice(),r=[];t.length>0;){var i=t.pop();this.filterExtentRect&&!c.intersects(this.filterExtentRect,i.extent)||(this.tileMeasurements.updateTile(i),0!==i.measures.visibility&&(i.measures.shouldSplit?(this.tilingScheme.ensureMaxLod(i.lij[0]+1),t.push.apply(t,i.getChildren())):r.push(i)))}return this.purgeHorizonTiles(r)},t.prototype.updateTiles=function(e){for(var t=this,r=0,i=this.tiles.items;r<i.length;r++){i[r].used=!1}var n=e.filter(function(e){var r=t.idToTile.get(e.id);return r?(r.copyMeasurementsFrom(e),r.used=!0):t.idToTile.set(e.id,e),!r}),s=this.tiles.items.filter(function(e){return!e.used&&(t.idToTile.delete(e.id),!0)});this.tiles.removeMany(s),this.tiles.addMany(n),this.sortTiles()},t.prototype.sortTiles=function(){this.tiles.sort(function(e,t){return e.measures.visibility!==t.measures.visibility?2===e.measures.visibility?-1:1:e.measures.distance-t.measures.distance}),this.tiles.forEach(function(e,t){return e.loadPriority=t})},i([p.property({constructOnly:!0})],t.prototype,"resourceController",void 0),i([p.property({constructOnly:!0})],t.prototype,"renderCoordsHelper",void 0),i([p.property({constructOnly:!0})],t.prototype,"tilingSchemeOwner",void 0),i([p.property({constructOnly:!0})],t.prototype,"cameraOnSurface",void 0),i([p.property({constructOnly:!0})],t.prototype,"focus",void 0),i([p.property({constructOnly:!0})],t.prototype,"viewState",void 0),i([p.property()],t.prototype,"tiles",void 0),i([p.property()],t.prototype,"tileSize",void 0),i([p.property({readOnly:!0,dependsOn:["tilingSchemeOwner.tilingScheme"]})],t.prototype,"tilingScheme",null),i([p.property()],t.prototype,"filterExtent",null),i([p.property({readOnly:!0,dependsOn:["filterExtent","tilingScheme"]})],t.prototype,"filterExtentRect",null),i([p.property({readOnly:!0,dependsOn:["filterExtentRect"]})],t.prototype,"rootTileIds",null),i([p.property({value:!1})],t.prototype,"suspended",null),i([p.property()],t.prototype,"updating",null),i([p.property({readOnly:!0,dependsOn:["tileSize","cameraOnSurface.location","tilingScheme","viewState.camera","focus.locationOnSurface"]})],t.prototype,"changeId",null),i([p.property({constructOnly:!0})],t.prototype,"disableThrottling",void 0),t=i([p.subclass()],t)}(p.declared(n));t.FeatureTileTree3D=m;var v=0,S=c.create(),b=10;t.default=m});