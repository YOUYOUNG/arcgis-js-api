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

define(["require","exports","../../../../../core/Quantity","../../../../../core/libs/earcut/earcut","../../../../../core/libs/gl-matrix-2/gl-matrix","../../../../../geometry/SpatialReference","../../../../../geometry/support/intersects","../support/measurementUtils","../support/viewUtils","../../../support/earthUtils","../../../support/mathUtils","../../../support/mathUtils","../../../support/projectionUtils"],function(e,t,i,s,r,o,n,h,a,c,d,p,l){function g(e,t,i){for(var s=new Float64Array(e.length*i),r=0;r<e.length;++r)for(var o=e[r],n=0;n<i;++n)s[r*i+n]=o[n];return s}return function(){function e(){this.positionsWorldCoords=[],this.positionsRenderCoords=[],this.positionsProjectedWorldCoords=[],this.positionsFittedRenderCoords=[],this.positionsGeographic=[],this.positionsSpherical=[],this.positionsStereographic=[],this.pathSegmentLengths=[],this.geodesicPathSegmentLengths=[],this.perimeterSegmentLengths=[],this.intersectingSegments=new Set,this.geodesicIntersectingSegments=new Set,this.areaCentroidWorldCoords=r.vec3f64.create(),this.areaCentroidRenderCoords=r.vec3f64.create(),this.areaNormalRenderCoords=r.vec3f64.create(),this.geodesicAreaCentroidRenderCoords=r.vec3f64.create(),this.geodesicAreaNormalRenderCoords=r.vec3f64.create(),this._length=0,this._centroidRenderCoords=r.vec3f64.create(),this._planeWorldCoords=r.vec4f64.create(),this._worldUp=r.vec3f64.create(),this._worldTangent=r.vec3f64.create(),this._frame=[r.vec3f64.create(),r.vec3f64.create(),r.vec3f64.create()],this._tempU=r.vec3f64.create(),this._tempV=r.vec3f64.create(),this._tempVec3=r.vec3f64.create(),this._tempSphere={center:r.vec3f64.create(),radius:0}}return e.prototype.update=function(e,t,s,n,h,a,c,d){t.clear(),this._resize(e.length);for(var p=s.spatialReference.isWGS84||s.spatialReference.isWebMercator,g=this.positionsGeographic,m=this.positionsWorldCoords,u=this.positionsRenderCoords,f=this.positionsSpherical,_=0;_<e.length;++_){var v=e.vertex(_);l.pointToVector(v,m[_],c),l.pointToVector(v,u[_],a),p&&(l.pointToVector(v,g[_],o.WGS84),l.pointToVector(v,f[_],l.SphericalECEFSpatialReference),r.vec3.normalize(f[_],f[_]))}var C=this._updatePathLengths(h);if(this.pathLength=this._length>0?new i(n.normalizeDistance(C),"meters"):null,p){var S=this._updateGeodesicPathLengths(h);this.geodesicPathLength=this._length>0?new i(S,"meters"):null}else this.geodesicPathLength=null;if(!h)return this.area=null,this.geodesicArea=null,this.perimeterLength=null,this.triangleIndices=null,this.geodesicTriangleIndices=null,this.intersectingSegments.clear(),void this.geodesicIntersectingSegments.clear();this._updateArea(s,n,a,c,d),p&&this._updateGeodesicArea(s,a)},e.prototype._resize=function(e){for(e<this._length&&(this.positionsWorldCoords.length=e,this.positionsRenderCoords.length=e,this.positionsProjectedWorldCoords.length=e,this.positionsFittedRenderCoords.length=e,this.positionsGeographic.length=e,this.positionsSpherical.length=e,this.positionsStereographic.length=e,this.pathSegmentLengths.length=e,this.geodesicPathSegmentLengths.length=e,this.perimeterSegmentLengths.length=e,this._length=e);this._length<e;)this.positionsWorldCoords.push(r.vec3f64.create()),this.positionsRenderCoords.push(r.vec3f64.create()),this.positionsProjectedWorldCoords.push(r.vec2f64.create()),this.positionsFittedRenderCoords.push(r.vec3f64.create()),this.positionsGeographic.push(r.vec3f64.create()),this.positionsSpherical.push(r.vec3f64.create()),this.positionsStereographic.push(r.vec2f64.create()),this.pathSegmentLengths.push(0),this.geodesicPathSegmentLengths.push(0),this.perimeterSegmentLengths.push(0),++this._length},e.prototype._updatePathLengths=function(e){for(var t=this.positionsWorldCoords,i=this.pathSegmentLengths,s=0,o=0;o<this._length;++o){var n=i[o]=r.vec3.distance(t[o],t[(o+1)%this._length]);(o<this._length-1||e)&&(s+=n)}return s},e.prototype._updateGeodesicPathLengths=function(e){for(var t=this.positionsGeographic,i=this.geodesicPathSegmentLengths,s=0,r=0;r<this._length;++r){var o=i[r]=h.segmentLengthGeodesicVector(t[r],t[(r+1)%this._length]);(r<this._length-1||e)&&(s+=o)}return s},e.prototype._updateArea=function(e,t,s,o,n){var c=e.renderCoordsHelper,d=this.positionsWorldCoords,g=this.positionsRenderCoords,m=this.positionsProjectedWorldCoords,u=this.positionsFittedRenderCoords,f=this._planeWorldCoords,_=this._centroidRenderCoords;a.midpoint(g,_),c.worldUpAtPosition(_,this._worldUp),c.worldBasisAtPosition(_,0,this._worldTangent),l.transformDirection(_,this._worldUp,s,this._worldUp,o),l.transformDirection(_,this._worldTangent,s,this._worldTangent,o),h.bestFitPlane(d,f),this.fittingMode=this._selectFittingMode(f,d,this._worldUp,n);var v=0;if("horizontal"===this.fittingMode){var C=-1/0;g.forEach(function(e,t){var i=c.getAltitude(g[t]);i>C&&(C=i,v=t)})}var S=d[v],R=f,A=this._worldTangent;"horizontal"===this.fittingMode?R=this._worldUp:"vertical"===this.fittingMode&&(R=this._tempVec3,A=this._worldUp,p.makeOrthonormal(f,this._worldUp,R)),r.vec3.copy(this._frame[2],R),p.makeOrthonormal(A,R,this._frame[0]),r.vec3.cross(this._frame[1],this._frame[0],this._frame[2]),r.vec3.negate(this._frame[1],this._frame[1]);for(var w=this._tempVec3,L=this._tempU,P=this._tempV,W=0;W<this._length;++W){var U=m[W],y=u[W];r.vec3.subtract(w,d[W],S),r.vec2.set(U,r.vec3.dot(this._frame[0],w),r.vec3.dot(this._frame[1],w)),r.vec3.scale(L,this._frame[0],U[0]),r.vec3.scale(P,this._frame[1],U[1]),r.vec3.add(w,L,P),r.vec3.add(w,w,S),l.vectorToVector(w,o,y,s)}this.perimeterLength=this._length>0?new i(t.normalizeDistance(this._updatePerimeterLengths()),"meters"):null,a.midpoint(u,this.areaCentroidRenderCoords),l.vectorToVector(this.areaCentroidRenderCoords,s,this.areaCentroidWorldCoords,o),l.transformDirection(this.areaCentroidWorldCoords,this._frame[2],o,this.areaNormalRenderCoords,s),this._updateIntersectingSegments(),this.area=0===this.intersectingSegments.size?new i(t.normalizeArea(this._computeArea()),"square-meters"):null},e.prototype._updateGeodesicArea=function(e,t){var s=e.renderCoordsHelper,o=this.positionsSpherical,n=this.positionsStereographic,a=this._tempVec3,d=h.fitHemisphere(o,a);if(!d)return void(this.geodesicArea=null);var g=this._tempU,m=this._tempV;p.tangentFrame(a,g,m);for(var u=0;u<this._length;++u){var f=r.vec3.dot(o[u],g),_=r.vec3.dot(o[u],m),v=r.vec3.dot(o[u],a);r.vec2.set(n[u],f/v,_/v)}r.vec3.scale(a,a,c.earthRadius),s.toRenderCoords(a,l.SphericalECEFSpatialReference,this.geodesicAreaCentroidRenderCoords),s.worldUpAtPosition(this.geodesicAreaCentroidRenderCoords,this.geodesicAreaNormalRenderCoords),this._updateGeodesicIntersectingSegments(),this.geodesicArea=d&&0===this.geodesicIntersectingSegments.size?new i(this._computeGeodesicArea(),"square-meters"):null},e.prototype._updatePerimeterLengths=function(){for(var e=this.positionsProjectedWorldCoords,t=this.perimeterSegmentLengths,i=0,s=0;s<this._length;++s){i+=t[s]=r.vec2.distance(e[s],e[(s+1)%this._length])}return i},e.prototype._updateIntersectingSegments=function(){var e=this.positionsProjectedWorldCoords,t=this.intersectingSegments;t.clear();for(var i=0;i<this._length;++i)for(var s=i+2;s<this._length;++s)if((s+1)%this._length!==i){var r=e[i],o=e[(i+1)%this._length],h=e[s],a=e[(s+1)%this._length];n.segmentIntersects(r,o,h,a)&&(t.add(i),t.add(s))}},e.prototype._computeArea=function(){for(var e=this.positionsProjectedWorldCoords,t=g(e,2,2),i=this.triangleIndices=new Uint32Array(s(t,[],2)),r=0,o=0;o<i.length;o+=3)r+=h.triangleAreaEuclidean(e[i[o]],e[i[o+1]],e[i[o+2]]);return r},e.prototype._updateGeodesicIntersectingSegments=function(){var e=this.positionsStereographic,t=this.geodesicIntersectingSegments;t.clear();for(var i=0;i<this._length;++i)for(var s=i+2;s<this._length;++s)if((s+1)%this._length!==i){var r=e[i],o=e[(i+1)%this._length],h=e[s],a=e[(s+1)%this._length];n.segmentIntersects(r,o,h,a)&&(t.add(i),t.add(s))}},e.prototype._computeGeodesicArea=function(){for(var e=this.positionsGeographic,t=this.positionsStereographic,i=g(t,2,2),r=this.geodesicTriangleIndices=new Uint32Array(s(i,[],2)),n=0,a=0;a<r.length;a+=3)n+=h.triangleAreaGeodesic(e[r[a]],e[r[a+1]],e[r[a+2]],o.WGS84);return n},e.prototype._selectFittingMode=function(e,t,i,s){var o=t.map(function(t){return Math.abs(h.planePointDistance(e,t))}).reduce(function(e,t){return Math.max(e,t)},0);h.boundingSphere(t,this._tempSphere);var n=2*this._tempSphere.radius,a=o/n,c=a<s.maxRelativeErrorCoplanar,p=a<s.maxRelativeErrorAlmostCoplanar,l="horizontal";if(c)l="oblique";else if(p){var g=Math.abs(r.vec3.dot(i,e))>Math.cos(d.deg2rad(s.verticalAngleThreshold));l=g?"horizontal":"vertical"}return l},e}()});