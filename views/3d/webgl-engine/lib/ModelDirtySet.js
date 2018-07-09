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
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","../../../../core/arrayUtils","../../../../core/iteratorUtils","./ModelContentType","./Util"],function(e,t,r,o,n,i){return function(){function e(e){this._residentGeomRecords=new Map,this._dirtyGeomRecords=new Map,this._dirtyMaterials=new Set,this._model=e}return Object.defineProperty(e.prototype,"residentLayerCount",{get:function(){return this._residentGeomRecords.size},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"residentObjectCount",{get:function(){var e=0;return this._residentGeomRecords.forEach(function(t){e+=t.size}),e},enumerable:!0,configurable:!0}),e.prototype.getDirtyMaterials=function(){return this._dirtyMaterials.size>0?this._dirtyMaterials:null},e.prototype.clearDirtyMaterials=function(){this._dirtyMaterials.clear()},e.prototype.hasDirtyGeometryRecords=function(){var e=!1;return o.forEachUntilMap(this._dirtyGeomRecords,function(t){if(e)return!1;o.forEachUntilMap(t,function(t){if(!e&&t&&t.size>0)return e=!0,!1})}),e},e.prototype.handleUpdate=function(e,t,r){return i.assert(this[t],"ModelDirtySet doesn't know how to process "+t),this[t](e,r)},e.prototype.shaderTransformationChanged=function(e){var t=this,r=this._residentGeomRecords.get(e.id);r&&r.forEach(function(e,r){var o=t._model.content[n.OBJECT][r];o&&o.hasVolativeTransformation()&&e.forEach(function(e){for(var t=0,r=e[1];t<r.length;t++){r[t].shaderTransformationChanged()}})})},e.prototype.commit=function(){return this.commitLayers(r.keysOfMap(this._dirtyGeomRecords))},e.prototype.commitLayers=function(e){for(var t=this,r=[],o=[],a=[],d=this,s=0;s<e.length;s++)!function(s){var c=e[s],y=d._dirtyGeomRecords.get(c);if(!y)return"continue";y.forEach(function(e,d){var s=t._ensureGeomRecord(c,d);e.forEach(function(e,c){var y=e[0],p=e[1],h=e[2],f=2&p&&1&h;if(4&p||f){var u=s.get(c);u?o.push.apply(o,u[1]):4===p&&i.assert(!1,"ModelDirtySet.getAddRemoveListFilteredByLayers: invalid remove"),u&&s.delete(c)}if(1&p||f){var l=[y,[]],m=t._model.get(n.OBJECT,d);t._model.getGeometryRenderGeometries(m,y,l[1]),r.push.apply(r,l[1]),s.set(c,l)}if(2&p&&!f){var u=s.get(c);if(u){var g=u[1],v=g.length;if(16&h)for(var m=t._model.get(n.OBJECT,d),R=0;R<v;R++){var _=g[R];t._model.updateRenderGeometryTransformation(m,y,_)}for(var R=0;R<v;R++){var _=g[R];a.push({renderGeometry:_,updateType:h})}}else i.assert(!1,"ModelDirtySet.getAddRemoveListFilteredByLayers: invalid update")}}),0===s.size&&t._residentGeomRecords.get(c).delete(d)}),0===d._residentGeomRecords.get(c).size&&d._residentGeomRecords.delete(c),d._dirtyGeomRecords.delete(c)}(s);return[r,o,a]},e.prototype.getResidentRenderGeometries=function(){return this.getResidentRenderGeometriesFilteredByLayers(r.keysOfMap(this._residentGeomRecords))},e.prototype.getResidentRenderGeometriesFilteredByLayers=function(e){for(var t=[],r=0;r<e.length;r++){var o=e[r],n=this._residentGeomRecords.get(o);n&&n.forEach(function(e){e.forEach(function(e){t.push.apply(t,e[1])})})}return t},e.prototype.visibilityChanged=function(e,t,r){if(null!=t)this._componentPropertyChanged(e,t,r,2);else for(var o=0,n=e.getGeometryRecords();o<n.length;o++){var i=n[o];this._componentPropertyChanged(e,i,r,2)}},e.prototype.componentHighlightChanged=function(e,t,r){if(null!=t)this._componentPropertyChanged(e,t,r,32);else for(var o=0,n=e.getGeometryRecords();o<n.length;o++){var i=n[o];this._componentPropertyChanged(e,i,r,32)}},e.prototype.vertexAttrsUpdated=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,2,0,0,2,5,4)},e.prototype.matChanged=function(e){this._dirtyMaterials.add(e.id),this.onMaterialChanged&&this.onMaterialChanged(e)},e.prototype.layerAdded=function(e){for(var t=e.getObjects(),r=0;r<t.length;r++)this.layObjectAdded(e,t[r])},e.prototype.layerRemoved=function(e){for(var t=e.getObjects(),r=0;r<t.length;r++)this.layObjectRemoved(e,t[r])},e.prototype.layObjectAdded=function(e,t){for(var r=e.id,o=t.getGeometryRecords(),n=0;n<o.length;n++)this.objGeometryAdded(t,o[n],r)},e.prototype.layObjectRemoved=function(e,t){for(var r=e.id,o=t.getGeometryRecords(),n=0;n<o.length;n++)this.objGeometryRemoved(t,o[n],r)},e.prototype.layObjectReplaced=function(e,t){this.layObjectRemoved(e,t[0]),this.layObjectAdded(e,t[1])},e.prototype.objDirty=function(e,t){var r=this;t=t||this._getParentLayerId(e);var o=e.id;this._ensureGeomRecord(t,o).forEach(function(o){r._updateOrCreateDirtyRecord(e,o[0],t,2,0,2,0,5,1)})},e.prototype.objTransformation=function(e,t){var r=this;t=t||this._getParentLayerId(e);var o=e.id;this._ensureGeomRecord(t,o).forEach(function(o){r._updateOrCreateDirtyRecord(e,o[0],t,2,0,0,2,5,16)})},e.prototype.objGeometryAdded=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,1,4,0,0,0)},e.prototype.objGeometryRemoved=function(e,t,r){this._updateOrCreateDirtyRecord(e,t,r,4,1,2,0,0)},e.prototype.objGeometryReplaced=function(e,t){this.objGeometryRemoved(e,t[0]),this.objGeometryAdded(e,t[1])},e.prototype.objGeometryTransformation=function(e,t){this.objGeometryReplaced(e,t)},e.prototype._componentPropertyChanged=function(e,t,r,o){this._updateOrCreateDirtyRecord(e,t,r,2,0,0,2,5,o)},e.prototype._updateOrCreateDirtyRecord=function(e,t,r,o,n,a,d,s,c){r=r||this._getParentLayerId(e);var y=e.id,p=t.id,h=this._ensureDirtyRecord(r,y),f=h.get(p);if(f){var u=f[1];u&n?h.delete(p):u&a?(f[1]=o,f[2]=c):u&d?f[2]|=c:u&s||i.assert(!1,"ModelDirtySet.objGeometryAdded: inconsistent state")}else h.set(p,[t,o,c])},e.prototype._ensureGeomRecord=function(e,t){var r=this._residentGeomRecords.get(e);r||(r=new Map,this._residentGeomRecords.set(e,r));var o=r.get(t);return o||(o=new Map,r.set(t,o)),o},e.prototype._ensureDirtyRecord=function(e,t){var r=this._dirtyGeomRecords.get(e);r||(r=new Map,this._dirtyGeomRecords.set(e,r));var o=r.get(t);return o||(o=new Map,r.set(t,o)),o},e.prototype._getParentLayerId=function(e){return e.parentLayer.id},e.prototype.formatDebugInfo=function(e){if(e)return"";var t=["ADD","UPD",void 0,"REM"],r="";return this._dirtyGeomRecords.forEach(function(e,o){e.forEach(function(e,n){r.length>0&&(r+="\n"),r+=o+"."+n;var i=[];e.forEach(function(e){var t=e[1];i[t]||(i[t]=[]),i[t].push(e[0].geometry.id)});for(var a=0;a<i.length;a++)if(i[a]){r+=" "+t[a-1]+": ";for(var d=0;d<i[a].length;d++)r+=i[a][d]+", "}})}),r},e}()});