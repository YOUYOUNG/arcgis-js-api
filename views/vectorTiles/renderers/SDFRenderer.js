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

define(["require","exports","../../../core/has","../../../core/libs/gl-matrix-2/gl-matrix","../GeometryUtils","./rendererUtils","../../webgl/VertexArrayObject"],function(e,t,r,i,a,o,s){return function(){function e(e){this._viewProjMat=i.mat4f32.create(),this._offsetVector=i.vec3f32.create(),this._extrudeMat=i.mat4f32.create(),this._scaleVec=i.vec3f32.create(),this._haloColor=i.vec4f32.create(),this._sdfColor=i.vec4f32.create(),this._initialized=!1,this._programOptions={id:!1,dd:!1},this._programCache=e}return e.prototype.dispose=function(){},e.prototype.render=function(e,t,s,n,f,l,h,_,u,d,m,c,x){var v=this;if(!r("esri-vector-tiles-avoid-text")){this._initialized||this._initialize(e);var p=a.degToByte(f),g=_.getLayoutValue("text-rotation-alignment",s);2===g&&(g=1===_.getLayoutValue("symbol-placement",s)?0:1);var y=0===g,V=_.getLayoutValue("text-keep-upright",s)&&y,D=3===n,U=.8*3/c,z=_.hasDataDrivenTextSize?1:_.getLayoutValue("text-size",s),b=_.hasDataDrivenTextColor?[1,1,1,1]:_.getPaintValue("text-color",s),C=_.hasDataDrivenTextOpacity?1:_.getPaintValue("text-opacity",s),A=b[3]*C*x;this._sdfColor[0]=A*b[0],this._sdfColor[1]=A*b[1],this._sdfColor[2]=A*b[2],this._sdfColor[3]=A,this._glyphTextureSize||(this._glyphTextureSize=i.vec2f32.fromValues(u.width/4,u.height/4));var M=h.tileTransform.transform,O=_.getPaintValue("text-translate",s);if(0!==O[0]||0!==O[1]){i.mat4.copy(this._viewProjMat,h.tileTransform.transform);var P=O[0],j=O[1],w=0,T=0,S=h.coordRange/512,B=(1<<h.key.level)/Math.pow(2,s)*S;if(1===_.getPaintValue("text-translate-anchor",s)){var L=-a.C_DEG_TO_RAD*f,E=Math.sin(L),I=Math.cos(L);w=B*(P*I-j*E),T=B*(P*E+j*I)}else w=B*P,T=B*j;this._offsetVector[0]=w,this._offsetVector[1]=T,this._offsetVector[2]=0,i.mat4.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),M=this._viewProjMat}y?i.mat4.copy(this._extrudeMat,d):i.mat4.copy(this._extrudeMat,m),this._scaleVec[0]=1/24,this._scaleVec[1]=1/24,this._scaleVec[2]=1,i.mat4.scale(this._extrudeMat,this._extrudeMat,this._scaleVec);var R=_.hasDataDrivenText,G=this._getSDFVAO(e,h,R);if(G){e.bindVAO(G);var k=(D?1:0)<<1|(R?1:0),F=this._programOptions;F.id=D,F.dd=R;var q=this._programCache.getProgram(6,k,F);if(e.bindProgram(q),q.setUniformMatrix4fv("u_transformMatrix",M),q.setUniformMatrix4fv("u_extrudeMatrix",this._extrudeMat),q.setUniform2fv("u_normalized_origin",h.tileTransform.displayCoord),q.setUniform1f("u_depth",_.z+1/65536),q.setUniform2fv("u_mosaicSize",this._glyphTextureSize),q.setUniform1f("u_mapRotation",p),q.setUniform1f("u_keepUpright",V?1:0),q.setUniform1f("u_level",10*s),q.setUniform1f("u_fadeSpeed",10*l.fadeSpeed),q.setUniform1f("u_minfadeLevel",10*l.minfadeLevel),q.setUniform1f("u_maxfadeLevel",10*l.maxfadeLevel),q.setUniform1f("u_fadeChange",10*(s+l.fadeChange)),q.setUniform1i("u_texture",6),q.setUniform1f("u_size",z),q.setUniform1f("u_antialiasingWidth",U),D){var W=o.int32To4Bytes(t.layerID);q.setUniform4f("u_id",W[0],W[1],W[2],W[3])}t.glyphPerPageElementsMap.forEach(function(t,r){v._renderGlyphRange(e,t,r,_,u,q,s,C*x,3)}),e.bindVAO()}}},e.prototype._renderGlyphRange=function(e,t,r,i,a,o,s,n,f){a.bind(e,9729,r,6);var l=i.getPaintValue("text-halo-color",s),h=i.getPaintValue("text-halo-width",s);if(l[3]>0&&h>0){var _=l[3]*n;this._haloColor[0]=_*l[0],this._haloColor[1]=_*l[1],this._haloColor[2]=_*l[2],this._haloColor[3]=_;var u=i.getPaintValue("text-halo-blur",s)*f,d=h*f;o.setUniform4fv("u_color",this._haloColor),o.setUniform1f("u_halo",1),o.setUniform1f("u_edgeDistance",d),o.setUniform1f("u_edgeBlur",u),e.drawElements(4,t[1],5125,12*t[0])}this._sdfColor[3]>0&&(o.setUniform4fv("u_color",this._sdfColor),o.setUniform1f("u_halo",0),o.setUniform1f("u_edgeDistance",0),o.setUniform1f("u_edgeBlur",0),e.drawElements(4,t[1],5125,12*t[0]))},e.prototype._initialize=function(e){return!!this._initialized||(this._vertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:16,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:16,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:16,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:16,normalized:!1,divisor:0}]},this._vertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffset",count:2,type:5122,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_tex",count:4,type:5121,offset:8,stride:24,normalized:!1,divisor:0},{name:"a_levelInfo",count:4,type:5121,offset:12,stride:24,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_size",count:1,type:5126,offset:20,stride:24,normalized:!1,divisor:0}]},this._initialized=!0,!0)},e.prototype._getSDFVAO=function(e,t,r){if(r){if(t.textDDVertexArrayObject)return t.textDDVertexArrayObject;var i=t.textDDVertexBuffer,a=t.textIndexBuffer;return i&&a?(t.textDDVertexArrayObject=new s(e,this._programCache.getProgramAttributes(6),this._vertexAttributesDD,{geometry:i},a),t.textDDVertexArrayObject):null}if(t.textVertexArrayObject)return t.textVertexArrayObject;var i=t.textVertexBuffer,a=t.textIndexBuffer;return i&&a?(t.textVertexArrayObject=new s(e,this._programCache.getProgramAttributes(6),this._vertexAttributes,{geometry:i},a),t.textVertexArrayObject):null},e}()});