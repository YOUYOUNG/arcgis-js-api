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

define(["require","exports","../../../../core/compilerUtils","../../../../core/libs/gl-matrix-2/gl-matrix","./common","../../state/utils/viewUtils","../../support/earthUtils","../../support/geometryUtils","../../support/mathUtils"],function(e,t,r,n,a,i,s,c,o){function u(e,t,i,s,c){void 0===i&&(i=a.defaultApplyOptions),void 0===s&&(s=t),void 0===c&&(c=!0),t!==s&&s.copyFrom(t),T.eyeCenterDistance=0,T.requiresTwoSteps=!1;var o=l(e,t,i,void 0,T);if(0===o)return!1;switch(n.mat4.identity(R),n.mat4.rotate(R,R,-o,t.viewRight),i.tiltMode){case 1:n.vec3.transformMat4(g,t.viewForward,R),n.vec3.scale(g,g,T.eyeCenterDistance),n.vec3.add(s.center,t.eye,g);break;case 0:n.vec3.subtract(g,t.center,t.eye),n.vec3.transformMat4(g,g,R),n.vec3.subtract(s.eye,t.center,g);break;default:r.neverReached(i.tiltMode)}return n.vec3.transformMat4(s.up,s.up,R),s.markViewDirty(),!T.requiresTwoSteps||!c||u(e,s,i,s,!1)}function l(e,t,r,n,i){if(void 0===r&&(r=a.defaultApplyOptions),void 0===n&&(n=a.defaultApplyOptions),!e.state.constraints.tilt)return 0;var s=t.distance,c=e.state.constraints.tilt(s,D);return A(e,r,c),2===n.interactionType&&a.hasConstraintType(n.selection,2)&&I(e,n.interactionStartCamera,c),1===r.tiltMode||1===n.tiltMode?p(e,t,c,i):d(e,t,c)}function d(e,t,r){var n=i.viewAngle(e.renderCoordsHelper,t.center,t.eye),a=o.clamp(n,r.min,r.max),s=n-a;return m(s)?s:0}function p(e,t,n,a){switch(a&&(a.requiresTwoSteps=!1),e.viewingMode){case"global":return f(e,t,n,a);case"local":return v(e,t,n,a);default:r.neverReached(e.viewingMode)}}function v(e,t,r,n){var a=i.viewAngle(e.renderCoordsHelper,t.center,t.eye),s=o.clamp(a,r.min,r.max),c=a-s;if(!m(c))return 0;if(n){var u=e.pointsOfInterest.centerOnSurfaceFrequent.estimatedSurfaceAltitude,l=e.renderCoordsHelper.getAltitude(t.eye)-u,d=Math.cos(s);Math.abs(d)>1e-4?n.eyeCenterDistance=l/d:n.eyeCenterDistance=t.distance}return c}function f(e,t,r,n){var a=y(e,t,O),i=o.clamp(a.tiltAtCenter,r.min,r.max);if(!m(a.tiltAtCenter-i))return 0;var s,c;return a.centerIsOnSurface?(s=h(a),c=C(a,s)):(s=a.constraints.clampTilt(a.eyeCenterDistance,a.tiltAtCenter),n&&s<Math.PI/2&&(n.requiresTwoSteps=!0,s=Math.PI/2-1e-5),c=w(a,s)),n&&(n.eyeCenterDistance=M(a,s)),c}function y(e,t,r){var a=e.pointsOfInterest.centerOnSurfaceFrequent.estimatedSurfaceAltitude,u=a+s.earthRadius,l=e.renderCoordsHelper.intersectManifold(t.ray,a,S);return r.eyeCenterDistance=t.distance,l?(r.eyeCenterDistance=n.vec3.distance(t.eye,S),r.tiltAtCenter=i.viewAngle(e.renderCoordsHelper,S,t.eye)):e.state.isLocal?r.tiltAtCenter=i.viewAngle(e.renderCoordsHelper,t.center,t.eye):(c.sphere.closestPointOnSilhouette(c.sphere.wrap(u),t.ray,S),r.eyeCenterDistance=n.vec3.distance(t.eye,S),r.tiltAtCenter=o.acos(-n.vec3.dot(t.viewForward,n.vec3.normalize(S,S)))),r.radius=u,r.eyeRadius=n.vec3.length(t.eye),r.constraints=e.state.constraints,r.centerIsOnSurface=l,r}function m(e){return Math.abs(e)>1e-9}function h(e){var t=e.constraints,r=e.eyeCenterDistance,n=e.tiltAtCenter,a=n,i=t.clampTilt(r,n),s=M(e,i);if(t.clampTilt(s,n)===i)return i;for(var c=0;c<10&&m(i-a);){var o=(a+i)/2,u=M(e,o);m(t.clampTilt(u,o)-o)?a=o:i=o,c++}return i}function M(e,t){if(!e.centerIsOnSurface)return e.eyeCenterDistance;var r=Math.PI-o.clamp(t,0,Math.PI),n=o.asin(e.radius/e.eyeRadius*Math.sin(r)),a=Math.PI-r-n,i=Math.sin(a)/Math.sin(r);if(e.eyeRadius<e.radius&&i>1){var s=Math.PI-n,c=Math.PI-r-s;return Math.sin(c)/Math.sin(r)*e.eyeRadius}return i*e.eyeRadius}function C(e,t){var r=o.asin(e.radius/e.eyeRadius*Math.sin(e.tiltAtCenter)),n=o.asin(e.radius/e.eyeRadius*Math.sin(t));return e.eyeRadius>e.radius?r-n:n-r}function w(e,t){return e.tiltAtCenter-Math.PI/2-(t-Math.PI/2)}function A(e,t,r){if(0!==t.interactionType){var n=t.interactionStartCamera,s=t.interactionFactor,c=r.min,o=r.max,u=l(e,n,a.defaultApplyOptions,t),d=0===u?0:i.viewAngle(e.renderCoordsHelper,n.center,n.eye);r.min=c,r.max=o,2===t.interactionType?(a.hasConstraintType(t.selection,2)&&I(e,n,r),a.adjustRangeForInteraction(u,d,!0,s,x,r)):a.adjustRangeForInteraction(u,d,!1,s,x,r)}}function I(e,t,r){if(!e.state.isLocal){var a=e.state.constraints;if(a.altitude){var i=n.vec3.squaredLength(t.center),c=Math.sqrt(i),u=t.distance,l=a.altitude.min+s.earthRadius,d=a.altitude.max+s.earthRadius,p=(l*l-u*u-i)/(-2*c*u),v=(d*d-u*u-i)/(-2*c*u);r.min=Math.max(r.min,Math.min(Math.PI-o.acos(v),r.max)),r.max=Math.min(r.max,Math.PI-o.acos(p))}}}Object.defineProperty(t,"__esModule",{value:!0}),t.apply=u,t.error=l;var g=n.vec3f64.create(),R=n.mat4f64.create(),S=n.vec3f64.create(),x=o.deg2rad(5),D={min:0,max:0},O={constraints:null,radius:0,eyeRadius:0,centerIsOnSurface:!0,eyeCenterDistance:0,tiltAtCenter:0},T={eyeCenterDistance:0,requiresTwoSteps:!1}});