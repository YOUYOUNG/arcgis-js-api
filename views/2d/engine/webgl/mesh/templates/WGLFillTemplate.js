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

define(["require","exports","../../../../../../core/tsSupport/extendsHelper","../../../../../../core/Logger","../../../../../../core/screenUtils","../../../../../../core/libs/earcut/earcut","../../color","../../definitions","../../enums","../../enums","../../number","../../TileClipper","../../WGLDisplayRecord","../Tesselator","./WGLMeshTemplate"],function(e,t,i,r,m,v,c,C,u,f,T,g,F,y,s){Object.defineProperty(t,"__esModule",{value:!0});var _=r.getLogger("esri.views.2d.engine.webgl.mesh.templates.WGLFillTemplate"),P=[],S=[],L=128,o=function(a){function x(e,t,i,r,s,o,n,l,h){var p=a.call(this)||this;return p.fillColor=r,p.tl=s,p.br=o,p.aux1=n,p.aux2=l,p.isBFS=h,p.geometryType=u.WGLGeometryType.FILL,p.useLibtess=!0,p._tesselator=new y.default,p.vvFlags=t,p._materialStore=e,p.materialId=p._materialStore.createSpriteMaterial(i,p.geometryType,t),p._tileClipper=new g.TileClipper(0,0,0,1,8),p._tileClipper.setExtent(C.TILE_SIZE),p}return i(x,a),x.fromSimpleFill=function(e,t,i,r,s,o){void 0===o&&(o=!1);var n=i.color,l=n&&"none"!==i.style&&c.premultiplyAlphaRGBA(n)||0;if(!r)return new x(e,t,null,l,0,0,0,0,o);var h=r.rect,p=r.width,a=r.height,u=h.x+1,f=h.y+1,g=h.x+1+p,v=h.y+1+a;return new x(e,t,r,l,T.i1616to32(u,f),T.i1616to32(g,v),T.i8888to32(T.nextHighestPowerOfTwo(g-u),T.nextHighestPowerOfTwo(v-f),0,0),T.i1616to32(L,L),o)},x.fromPictureFill=function(e,t,i,r,s,o){void 0===o&&(o=!1);var n=C.PICTURE_FILL_COLOR,l=r.rect,h=r.width,p=r.height,a=l.x+1,u=l.y+1,f=a+h,g=u+p,v=T.i1616to32(a,u),c=T.i1616to32(f,g),y=T.nextHighestPowerOfTwo(m.pt2px(i.width));255<y&&(y=255);var _=T.nextHighestPowerOfTwo(m.pt2px(i.height));255<_&&(_=255);var d=m.pt2px(i.xoffset)+L;255<d&&(d=255);var w=m.pt2px(-i.yoffset)+L;return 255<w&&(w=255),new x(e,t,r,n,v,c,T.i8888to32(y,_,d,w),T.i1616to32(L*i.xscale,L*i.yscale),o)},x.prototype.writeMesh=function(e,t,i,r,s,o,n){if(P.length=0,this.vvFlags&f.WGLVVFlag.COLOR||0!==this.fillColor){if("esriGeometryPolygon"===i){var l=s.geometry,h=this._isClippingRequired(l),p=h?this._clip(l,!this.useLibtess):l.rings;return this.useLibtess?this._writeMeshLibtess(e,t,i,r,p,h,o,n):this._writeMeshEarcut(e,t,i,r,p,h,o,n)}_.error("Unable to handle geometryType: "+i)}},x.prototype._isClippingRequired=function(e){for(var t=C.TILE_SIZE+8,i=0,r=e.rings;i<r.length;i++){var s=r[i],o=s.length;if(!(o<3)){var n=s[0][0],l=s[0][1];if(n<-8||t<n||l<-8||t<l)return!0;for(var h=1;h<o;++h)if(n+=s[h][0],l+=s[h][1],n<-8||t<n||l<-8||t<l)return!0}}return!1},x.prototype._clip=function(e,t){var i,r;this._tileClipper.reset(3);for(var s=0,o=e.rings;s<o.length;s++){var n=o[s],l=n.length;if(!(l<3)){i=n[0][0],r=n[0][1],this._tileClipper.moveTo(i,r);for(var h=1;h<l;++h)i+=n[h][0],r+=n[h][1],this._tileClipper.lineTo(i,r);this._tileClipper.close()}}return this._tileClipper.result(t)},x.prototype._writeMeshLibtess=function(e,t,i,r,s,o,n,l){if(s&&s.length){var h=this._materialStore.get(this.materialId),p=[],a=t.indexVector,u=t.get("geometry"),f=t.get("visibility"),g=new F(r,this.geometryType,this.materialId),v=this._getOffset(u,h),c=o;g.vertexFrom=v,g.indexFrom=a.length,this._tesselator.beginPolygon(P,p);for(var y=0,_=s;y<_.length;y++){var d=_[y];if(!(d.length<3)){this._tesselator.beginContour();var w=void 0,x=void 0;x=c?(w=d[0].x,d[0].y):(w=d[0][0],d[0][1]);var m=[w,x,0];this._tesselator.addVertex(m,m);for(var C=1;C<d.length-1;C++){c?(w=d[C].x,x=d[C].y):(w+=d[C][0],x+=d[C][1]);var T=[w,x,0];this._tesselator.addVertex(T,T)}this._tesselator.endContour()}}this._tesselator.endPolygon(),this._writeVerticesLibTess(g,u,f,r,P,h,l),this._writeIndicesLibTess(g,a,v,p),0<g.indexCount&&e.push(g)}},x.prototype._writeMeshEarcut=function(e,t,i,r,s,o,n,l){if(s&&s.length){var h=this._materialStore.get(this.materialId),p=t.indexVector,a=t.get("geometry"),u=t.get("visibility"),f=new F(r,this.geometryType,this.materialId),g=this._getOffset(a,h);f.vertexFrom=g,f.indexFrom=p.length,e.push(f);for(var v=0,c=0,y=o,_=0,d=s;_<d.length;_++){var w=d[_],x=c,m=void 0,C=void 0;C=y?(m=w[0].x,w[0].y):(m=w[0][0],w[0][1]),P[c++]=m,P[c++]=C;for(var T=0,L=1;L<w.length;++L){var V=void 0,b=void 0;if(y){var I=m,O=C;V=(m=w[L].x)-I,b=(C=w[L].y)-O}else m+=V=w[L][0],C+=b=w[L][1];T-=V*(C+C+b),P[c++]=m,P[c++]=C}0<T?(0<x-v&&(this._write(f,p,a,u,g,r,P,S,v,x,h,l),v=x),S.length=0):T<0&&0<x-v?S.push(.5*(x-v)):c=x}0<c-v&&this._write(f,p,a,u,g,r,P,S,v,c,h,l),P.length=S.length=0}},x.prototype._write=function(e,t,i,r,s,o,n,l,h,p,a,u){var f=v(n.slice(h,p),l,2);if(f.length){var g=this._getOffset(i,a);this._writeVertices(e,i,r,o,n,l,a,u),this._writeIndices(e,t,g,f)}},x.prototype._getOffset=function(e,t){var i=t.materialKeyInfo.hasVV()?9:7;return e.length/i},x.prototype._writeVertices=function(e,t,i,r,s,o,n,l){for(var h=0;h<s.length;h+=2){var p=T.i1616to32(s[h],s[h+1]);t.push(p),t.push(r),t.push(this.fillColor),t.push(this.tl),t.push(this.br),t.push(this.aux1),t.push(this.aux2),this._writeVV(t,l,n),i.push(255),e.vertexCount++}},x.prototype._writeIndices=function(e,t,i,r){for(var s=i,o=0;o<r.length;o+=3)t.push(s+r[o]),t.push(s+r[o+1]),t.push(s+r[o+2]),e.indexCount+=3},x.prototype._writeVerticesLibTess=function(e,t,i,r,s,o,n){for(var l=0;l<s.length;l+=2){var h=T.i1616to32(s[l],s[l+1]);t.push(h),t.push(r),t.push(this.fillColor),t.push(this.tl),t.push(this.br),t.push(this.aux1),t.push(this.aux2),this._writeVV(t,n,o),i.push(255),e.vertexCount++}},x.prototype._writeIndicesLibTess=function(e,t,i,r){for(var s=i,o=0;o<r.length;o++)t.push(s+r[o]),e.indexCount++},x.prototype._writeVV=function(e,t,i){i.materialKeyInfo.hasVV()&&(this.isBFS?(e.push(4294967295),e.push(4294967295)):(e.push(t[u.VVType.COLOR]),e.push(t[u.VVType.OPACITY])))},x}(s.default);t.default=o});