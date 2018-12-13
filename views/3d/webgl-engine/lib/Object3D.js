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

define(["require","exports","../../../../core/libs/gl-matrix-2/gl-matrix","../../support/mathUtils","./ComponentUtils","./GeometryRecord","./HighlightUtils","./IdGen","./ModelContentType","./Util"],function(t,e,i,o,n,r,s,a,c,h){var m=h.assert,d=i.mat4f64.create(),l=function(){function t(e){void 0===e&&(e={}),this._bvObjectSpace=new p,this._bvWorldSpace=new p,this._bvDirty=!0,this._hasVolatileTransformation=!1,this._allComponentsHiddenDirty=!0,this.id=t._idGen.gen(e.idHint),this.name=e.name,this.castShadow=null==e.castShadow||e.castShadow,this.metadata=e.metadata,this.objectTransformation=i.mat4f64.create(),this._initializeGeometryRecords(e.geometries,e.materials,e.transformations,e.origins)}return t.prototype._initializeGeometryRecords=function(t,e,o,n){if(!Array.isArray(t))return this.geometryRecords=[],void(this.geometries=[]);m(e.length===t.length,"Object3D: materials don't match geometries"),m(o.length===t.length,"Object3D: transformations don't match geometries"),this.geometryRecords=new Array(t.length),this.geometries=t.slice();for(var s=0;s<t.length;s++){var a={};this.geometryRecords[s]=new r(t[s],e[s],i.mat4f64.clone(o[s]),a,n&&n[s])}this._hasVolatileTransformation=!1},Object.defineProperty(t.prototype,"parentLayer",{get:function(){return this._parentLayer},set:function(t){m(null==this._parentLayer||null==t,"Object3D can only be added to a single Layer"),this._parentLayer=t},enumerable:!0,configurable:!0}),t.prototype.getNumGeometryRecords=function(){return this.geometryRecords.length},t.prototype.getFirstGeometryIndex=function(t){var e=this.geometries.indexOf(t);return m(e>-1,"Object3D.getFirstGeometryIndex: geometry not found"),e},t.prototype.findGeometryRecords=function(t){for(var e=[],i=0;i<this.geometries.length;i++)this.geometries[i]===t&&e.push(this.geometryRecords[i]);return e},t.prototype.getGeometryRecord=function(t){return m(t>=0&&t<this.geometryRecords.length,"Object3d.getGeometryDataByIndex: index out of range"),this.geometryRecords[t]},t.prototype.getGeometryRecords=function(){return this.geometryRecords},t.prototype.addGeometry=function(t,e,o,n,s,a){void 0===o&&(o=d),this.geometries.push(t);var c=new r(t,e,i.mat4f64.clone(o),n||{},s,a);return this.geometryRecords.push(c),this._hasVolatileTransformation=this.geometryRecords.some(function(t){return!!t.shaderTransformation}),this._notifyDirty("objGeometryAdded",c),this._invalidateBoundingVolume(),this._allComponentsHiddenDirty=!0,c},t.prototype.hasGeometry=function(t){return this.geometries.indexOf(t)>-1},t.prototype.removeGeometry=function(t){var e=this.geometryRecords.splice(t,1)[0];return this._hasVolatileTransformation=this.geometryRecords.some(function(t){return!!t.shaderTransformation}),this.geometries.splice(t,1),this._notifyDirty("objGeometryRemoved",e),this._invalidateBoundingVolume(),this._allComponentsHiddenDirty=!0,e},t.prototype.removeAllGeometries=function(){for(;this.getNumGeometryRecords()>0;)this.removeGeometry(0)},t.prototype.geometryVertexAttrsUpdated=function(t){this._notifyDirty("vertexAttrsUpdated",this.geometryRecords[t]),this._invalidateBoundingVolume()},t.prototype.areAllComponentsHidden=function(){if(this._allComponentsHiddenDirty){this._allComponentsHiddenDirty=!1,this._allComponentsHidden=!0;for(var t=0,e=this.geometryRecords;t<e.length;t++){var i=e[t],o=i.instanceParameters.componentVisibilities,r=i.geometry.data.componentOffsets;if(!n.isAllHidden(o,r)){this._allComponentsHidden=!1;break}}}return this._allComponentsHidden},t.prototype.areAllComponentsVisible=function(){for(var t=0,e=this.geometryRecords;t<e.length;t++){var i=e[t],o=i.instanceParameters.componentVisibilities,r=i.geometry.data.componentOffsets;if(!n.isAllVisible(o,r))return!1}return!0},t.prototype.hasComponents=function(){for(var t=!1,e=0;e<this.geometries.length;e++){var i=this.geometries[e];if(t=n.hasComponents(i.data.componentOffsets))break}return t},t.prototype.setComponentVisibility=function(t,e,i){var o=t.geometry,r=t.instanceParameters.componentVisibilities,s=o.data.componentOffsets,a=n.updateVisibility(r,s,e,i);t.instanceParameters.componentVisibilities=a,this._notifyDirty("visibilityChanged",t),this._allComponentsHiddenDirty=!0},t.prototype.setHidden=function(t,e){t.instanceParameters.hidden=!!e,this._notifyDirty("visibilityChanged",t)},t.prototype.isHidden=function(t){return!!t.instanceParameters.hidden},t.prototype.getComponentVisibility=function(t,e){var i=t.instanceParameters.componentVisibilities;return n.getVisibility(i,e)},t.prototype.hideAllComponents=function(){for(var t=0,e=this.geometryRecords;t<e.length;t++){var i=e[t],o=i.instanceParameters.componentVisibilities,r=n.hideAllComponents(o);i.instanceParameters.componentVisibilities=r}this._notifyDirty("visibilityChanged"),this._allComponentsHiddenDirty=!0},t.prototype.unhideAllComponents=function(){for(var t=0,e=this.geometryRecords;t<e.length;t++){var i=e[t],o=i.instanceParameters.componentVisibilities,r=n.unhideAllComponents(o);i.instanceParameters.componentVisibilities=r}this._notifyDirty("visibilityChanged"),this._allComponentsHiddenDirty=!0},t.prototype._setComponentHighlight=function(t,e,i,o){var r=t.instanceParameters.componentHighlights,s=n.addHighlight(r,e,i,o);t.instanceParameters.componentHighlights=s},t.prototype.setComponentHighlight=function(t,e,i){var o=s.generateHighlightId();return this._setComponentHighlight(t,e,i,o),this._notifyDirty("componentHighlightChanged"),o},t.prototype.highlightAllComponents=function(t){for(var e=s.generateHighlightId(),i=0,o=this.geometryRecords;i<o.length;i++){var n=o[i];this._setComponentHighlight(n,null,t,e)}return this._notifyDirty("componentHighlightChanged"),e},t.prototype.removeHighlights=function(t){for(var e=0,i=this.geometryRecords;e<i.length;e++){var o=i[e],r=o.instanceParameters,s=r.componentHighlights,a=n.removeHighlight(s,t);r.componentHighlights=a}this._notifyDirty("componentHighlightChanged")},t.prototype.getComponentFromTriangleNr=function(t,e){m(t>=0&&t<this.geometryRecords.length,"Object3d.getComponentFromTriangleNr: index out of range");var i=this.geometryRecords[t],o=i.geometry.data.componentOffsets;return n.componentFind(o,3*e)},t.prototype.setGeometryTransformation=function(t,e){m(t>=0&&t<this.geometryRecords.length,"Object3d.setGeometryTransformation: index out of range");var o=this.geometryRecords[t],n=new r(o.geometry,o.material,i.mat4f64.clone(e),o.instanceParameters);this.geometryRecords[t]=n,this._notifyDirty("objGeometryReplaced",[o,n]),this._invalidateBoundingVolume()},t.prototype.getObjectTransformation=function(){return i.mat4f64.clone(this.objectTransformation)},t.prototype.setObjectTransformation=function(t){i.mat4.copy(this.objectTransformation,t),this._invalidateBoundingVolume(),this._notifyDirty("objTransformation")},t.prototype.getCombinedStaticTransformation=function(t,e){return e=e||i.mat4f64.create(),i.mat4.multiply(e,this.objectTransformation,t.getStaticTransformation()),e},t.prototype.getCombinedShaderTransformation=function(t,e){return e=e||i.mat4f64.create(),i.mat4.multiply(e,this.objectTransformation,t.getShaderTransformation()),e},t.prototype.hasVolativeTransformation=function(){return this._hasVolatileTransformation},t.prototype.getCastShadow=function(){return this.castShadow},t.prototype.setCastShadow=function(t){this.castShadow=t},t.prototype.getMetadata=function(){return this.metadata},t.prototype.getName=function(){return this.name},t.prototype.getBBMin=function(t){return this._validateBoundingVolume(),t?this._bvObjectSpace.bbMin:this._bvWorldSpace.bbMin},t.prototype.getBBMax=function(t){return this._validateBoundingVolume(),t?this._bvObjectSpace.bbMax:this._bvWorldSpace.bbMax},t.prototype.getCenter=function(t){return this._validateBoundingVolume(),t?this._bvObjectSpace.center:this._bvWorldSpace.center},t.prototype.getBSRadius=function(t){return this._validateBoundingVolume(),t?this._bvObjectSpace.bsRadius:this._bvWorldSpace.bsRadius},t.prototype._validateBoundingVolume=function(){if(this._bvDirty||this._hasVolatileTransformation){this._bvObjectSpace.init(),this._bvWorldSpace.init();for(var t=0;t<this.geometryRecords.length;++t){var e=this.geometries[t],n=this.geometryRecords[t],r=e.boundingInfo;this._calculateTransformedBoundingVolume(r,this._bvObjectSpace,n.getShaderTransformation()),this._calculateTransformedBoundingVolume(r,this._bvWorldSpace,this.getCombinedShaderTransformation(n))}i.vec3.lerp(this._bvObjectSpace.center,this._bvObjectSpace.bbMin,this._bvObjectSpace.bbMax,.5),i.vec3.lerp(this._bvWorldSpace.center,this._bvWorldSpace.bbMin,this._bvWorldSpace.bbMax,.5);for(var s=i.vec3f64.create(),a=i.vec3f64.create(),c=o.maxScale(this.objectTransformation),t=0;t<this.geometryRecords.length;++t){var e=this.geometries[t],h=this.geometryRecords[t].getShaderTransformation(),m=o.maxScale(h),r=e.boundingInfo;i.vec3.transformMat4(s,r.getCenter(),h);var d=i.vec3.distance(s,this._bvObjectSpace.center),l=r.getBSRadius()*m;this._bvObjectSpace.bsRadius=Math.max(this._bvObjectSpace.bsRadius,d+l),i.vec3.transformMat4(a,s,this.objectTransformation);var p=i.vec3.distance(a,this._bvWorldSpace.center),g=l*c;this._bvWorldSpace.bsRadius=Math.max(this._bvWorldSpace.bsRadius,p+g)}this._bvDirty=!1}},t.prototype._calculateTransformedBoundingVolume=function(t,e,o){var n=t.getBBMin(),r=t.getBBMax(),s=i.vec3f64.clone(n),a=i.vec3f64.clone(r);i.vec3.transformMat4(s,s,o),i.vec3.transformMat4(a,a,o);for(var c=0;c<3;++c)e.bbMin[c]=Math.min(e.bbMin[c],s[c],a[c]),e.bbMax[c]=Math.max(e.bbMax[c],s[c],a[c]);for(var c=0;c<3;++c){i.vec3.copy(s,n),i.vec3.copy(a,r),s[c]=r[c],a[c]=n[c],i.vec3.transformMat4(s,s,o),i.vec3.transformMat4(a,a,o);for(var h=0;h<3;++h)e.bbMin[h]=Math.min(e.bbMin[h],s[h],a[h]),e.bbMax[h]=Math.max(e.bbMax[h],s[h],a[h])}},t.prototype._invalidateBoundingVolume=function(){this._bvDirty=!0,this._parentLayer&&this._parentLayer.notifyObjectBBChanged(this,{center:this._bvWorldSpace.center,radius:this._bvWorldSpace.bsRadius})},t.prototype._notifyDirty=function(t,e,i,o){if(this._parentLayer){i=i||c.OBJECT;var n=o||this;this._parentLayer.notifyDirty(t,e,i,n)}},t._idGen=new a,t}(),p=function(){function t(){this.bbMin=i.vec3f64.create(),this.bbMax=i.vec3f64.create(),this.center=i.vec3f64.create(),this.bsRadius=0}return t.prototype.init=function(){i.vec3.set(this.bbMin,Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),i.vec3.set(this.bbMax,-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE),i.vec3.set(this.center,0,0,0),this.bsRadius=0},t.prototype.getCenter=function(){return this.center},t.prototype.getBSRadius=function(){return this.bsRadius},t}();return l});