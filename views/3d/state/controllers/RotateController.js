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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/libs/gl-matrix-2/gl-matrix","../../camera/constraintUtils","../Constraints","./InteractiveController","../utils/navigationUtils","../../support/mathUtils"],function(t,i,e,r,s,n,o,a,c){Object.defineProperty(i,"__esModule",{value:!0});var p=function(t){function i(i,e,s){var n=t.call(this)||this;return n.view=i,n.intersectionHelper=e,n.pivot=s,n.lastPoint=r.vec2f64.create(),n.tmpWorldUp=r.vec3f64.create(),n.tmpViewDir=r.vec3f64.create(),n.tmpRotCurPoint=r.vec2f64.create(),n.tmpTransf=r.mat4f64.create(),n.tmpAxis=r.vec3f64.create(),n.pivotPos=r.vec3f64.create(),n.constraintOptions={selection:15,interactionType:2,interactionFactor:0,interactionStartCamera:null,interactionDirection:null,tiltMode:0},n.rotScale="center"===s?3:1.5,n}return e(i,t),i.prototype.begin=function(t){if(this.active){switch(this.pivot){case"eye":r.vec3.copy(this.pivotPos,this.beginCamera.eye),this.constraintOptions.interactionType=3,this.constraintOptions.tiltMode=1,this.constraintOptions.selection=0;break;case"center":this.intersectionHelper.intersectRayFreePointFallback(this.beginCamera.ray,this.pivotPos)||r.vec3.copy(this.pivotPos,this.beginCamera.center),this.beginCamera.center=this.pivotPos,this.constraintOptions.interactionType=2,this.constraintOptions.tiltMode=0,this.constraintOptions.selection=11}this.constraintOptions.interactionStartCamera=this.beginCamera,a.normalizeCoordinate(this.beginCamera,t,this.lastPoint)}},i.prototype.update=function(t){if(this.active){var i;switch(this.pivot){case"eye":i=this.currentCamera.center;break;case"center":this.currentCamera.center=this.pivotPos,i=this.currentCamera.eye}this.applyRotation(this.currentCamera,t,i,this.pivotPos),s.applyAll(this.view,this.currentCamera,this.constraintOptions)}},i.prototype.end=function(){this.active&&this.finishController()},i.prototype.applyRotation=function(t,i,e,s){this.view.renderCoordsHelper.worldUpAtPosition(s,this.tmpWorldUp),a.normalizeCoordinate(t,i,this.tmpRotCurPoint);var o=(this.tmpRotCurPoint[1]-this.lastPoint[1])*this.rotScale,p=(this.tmpRotCurPoint[0]-this.lastPoint[0])*this.rotScale;r.vec3.subtract(this.tmpViewDir,e,s);var h=r.vec3.length(this.tmpViewDir),l=c.acos(r.vec3.dot(this.tmpViewDir,this.tmpWorldUp)/h);if("eye"===this.pivot){o*=-.5;var m=.5*Math.PI-l,v=.5*Math.PI*.99;o=m-Math.max(-v,Math.min(v,m+o))}o=c.clamp(o+l,n.TiltDefault.min,n.TiltDefault.max)-l,r.mat4.identity(this.tmpTransf),r.vec3.cross(this.tmpAxis,t.up,this.tmpViewDir),"center"===this.pivot&&(p=-p),r.mat4.rotate(this.tmpTransf,this.tmpTransf,p,this.tmpWorldUp),r.mat4.rotate(this.tmpTransf,this.tmpTransf,o,this.tmpAxis),r.vec3.transformMat4(this.tmpViewDir,this.tmpViewDir,this.tmpTransf),r.vec3.add(e,s,this.tmpViewDir),r.vec3.transformMat4(t.up,t.up,this.tmpTransf),r.vec2.copy(this.lastPoint,this.tmpRotCurPoint),t.markViewDirty()},i}(o.InteractiveController);i.RotateController=p});