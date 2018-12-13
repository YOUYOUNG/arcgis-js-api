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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/has","../../../../core/libs/gl-matrix-2/gl-matrix","./BitBlitRenderer","./enums","./MaterialManager","./TextureManager","./Utils","./VertexStream","./brushes/WGLBrushInfo","./brushes/WGLBrushStencil","./brushes/WGLGeometryBrushFill","./brushes/WGLGeometryBrushLabel","./brushes/WGLGeometryBrushLine","./brushes/WGLGeometryBrushMarker","./brushes/WGLGeometryBrushText","./painter/WGLHighlightPainter","./shaders/RasterPrograms","../../../webgl/FramebufferObject","../../../webgl/programUtils"],function(t,e,c,s,y,r,B,i,a,g,n,o,h,l,u,p,_,d,f,w,b,P){Object.defineProperty(e,"__esModule",{value:!0});var m=function(){function t(){this._initialized=!1}return t.prototype.registerPass=function(t,e){this._initialize();for(var s=0;s<B.WGLDrawPhase.NUM_DRAW_PHASES-2;s++){var r=1<<s;r&e&&this._passMap.set(r,t)}return this},t.prototype.getPaintPassTs=function(t){return this._initialize(),this._passMap.has(t)?[this._passMap.get(t)]:[]},t.prototype._initialize=function(){this._initialized||(this._passMap=new Map,this._initialized=!0)},t}();e.PainterOptions=m;var L=new Uint8Array(4*g.C_HITTEST_SEARCH_SIZE*g.C_HITTEST_SEARCH_SIZE),S=new Uint32Array(L.buffer),G=function(){function t(t){var b,m=this;this.context=t,this._hlPainter=new f,this._blitRenderer=new r,this._globalOpacityFBO=null,this._boundFBO=null,this.textureManager=new a,this.stencilRef=-1,this.drawImage=(b=y.vec3f32.create(),function(t,e,s,r,i,a,n,o,h,l,u){var c,p=t.getViewport(),_=p.width,d=p.height,g=m._transform,f=m._quadVertexStream;(c=u===B.WGLDrawPhase.CLIP?(t.setStencilFunction(519,m.stencilRef,255),m._transformSolidProgram):(t.setStencilFunction(514,m.stencilRef,255),m._transformTextureProgram)).setUniform1f("u_positionScale",f.positionScale),y.mat4.identity(g),y.mat4.scale(g,g,y.vec3.set(b,2*l/_,2*l/d,1)),y.mat4.translate(g,g,y.vec3.set(b,s-_/2/l,d/2/l-r,0)),y.mat4.rotateZ(g,g,n),y.mat4.translate(g,g,y.vec3.set(b,i/2,-a/2,0)),y.mat4.rotateZ(g,g,-o),y.mat4.scale(g,g,y.vec3.set(b,i/2,a/2,1)),c.setUniformMatrix4fv("u_transform",g),u!==B.WGLDrawPhase.CLIP&&(c.setUniform1f("u_texcoordScale",f.texcoordScale),t.bindTexture(e,0),c.setUniform1i("u_texture",0)),c.setUniform1f("u_opacity",h),f.draw()}),this.materialManager=new i(t),this._quadVertexStream=new n(t,[-32768,-32768,0,0,32767,-32768,32767,0,-32768,32767,0,32767,32767,32767,32767,32767],[0,1,2,1,3,2]),this._quadVertexStream.positionScale=1,this._quadVertexStream.texcoordScale=1,this._transformTextureProgram=P.createProgram(t,w.transformTexture),this._transformSolidProgram=P.createProgram(t,w.transformSolid),this._transform=y.mat4f32.create()}return t.prototype.dispose=function(){this.materialManager.dispose(),this.textureManager.dispose(),this._hlPainter&&(this._hlPainter.dispose(),this._hlPainter=null),this._blitRenderer&&(this._blitRenderer.dispose(),this._blitRenderer=null),this._globalOpacityFBO&&(this._globalOpacityFBO.dispose(),this._globalOpacityFBO=null),this._boundFBO=null,this._hittestFBO&&(this._hittestFBO.dispose(),this._hittestFBO=null),this._passes&&(this._passes.forEach(function(t){return t.dispose()}),this._passes.clear()),this._brushes&&(this._brushes.forEach(function(t){return t.forEach(function(t){return t.dispose()})}),this._brushes.clear()),this._geometryBrushes&&(this._geometryBrushes.forEach(function(t){return t.dispose()}),this._geometryBrushes.clear()),this._quadVertexStream.dispose()},t.prototype.getBrushes=function(t){if(t===B.WGLDrawPhase.MAP)throw new Error("Painter: Tried to get brush for the MAP phase; use a specific geometry type and call getMapBrush() instead.");if(!this._brushes){var e=[this.getGeometryBrush(B.WGLGeometryType.FILL),this.getGeometryBrush(B.WGLGeometryType.LINE),this.getGeometryBrush(B.WGLGeometryType.MARKER),this.getGeometryBrush(B.WGLGeometryType.TEXT)],s=new u.default,r=new o.default,i=new h.default;this._brushes=new Map,this._brushes.set(B.WGLDrawPhase.LABEL,[s]),this._brushes.set(B.WGLDrawPhase.LABEL_ALPHA,[s]),this._brushes.set(B.WGLDrawPhase.HITTEST,e),this._brushes.set(B.WGLDrawPhase.HIGHLIGHT,e),this._brushes.set(B.WGLDrawPhase.CLIP,[i]),this._brushes.set(B.WGLDrawPhase.DEBUG,[r])}if(!this._brushes.has(t))throw new Error("Painter: Tried to get brush for unknown phase: "+t);return this._brushes.get(t)},t.prototype.getGeometryBrush=function(t){if(!this._geometryBrushes){var e=new l.default,s=new p.default,r=new _.default,i=new d.default,a=new u.default;this._geometryBrushes=new Map,this._geometryBrushes.set(B.WGLGeometryType.FILL,e),this._geometryBrushes.set(B.WGLGeometryType.LINE,s),this._geometryBrushes.set(B.WGLGeometryType.MARKER,r),this._geometryBrushes.set(B.WGLGeometryType.TEXT,i),this._geometryBrushes.set(B.WGLGeometryType.LABEL,a)}return this._geometryBrushes.get(t)},t.prototype.draw=function(t,e,s,r){this._setGlobalOpacity(t,s),0==(s&(B.WGLDrawPhase.LABEL_ALPHA|B.WGLDrawPhase.LABEL))&&this._drawClippingRects(t,e);var i=this.context;i.setBlendingEnabled(!0),i.setStencilWriteMask(0),i.setBlendFunctionSeparate(1,771,1,771),this._drawPhases(t,e,s,r),this._applyGlobalOpacity(t,s),this._debugTiles(t,e)},t.prototype.setHighlightOptions=function(t){this._hlPainter.setHighlightOptions(t)},t.prototype.highlight=function(t,e){var s=this.context,r=s.getViewport();this._hlPainter.setup(s,r.width,r.height),this._hlPainter.startMaskDraw(s),this._drawClippingRects(t,e),s.setBlendingEnabled(!0),s.setStencilWriteMask(0),s.setBlendFunctionSeparate(1,771,1,771),this._drawPhases(t,e,B.WGLDrawPhase.HIGHLIGHT),this._hlPainter.draw(s)},t.prototype.hitTest=function(t,e){var s=this.context,r=g.C_HITTEST_SEARCH_SIZE,i=[0,0],a=[0,0],n=t.state;if(n.toMap(i,[0,0]),n.toMap(a,[r,r]),0===e.filter(function(t){return!(i[0]>t.bounds[2]||a[0]<t.bounds[0]||i[1]<t.bounds[1]||a[1]>t.bounds[3])}).length)return[];this._hittestFBO||(this._hittestFBO=b.create(s,{colorTarget:0,depthStencilTarget:3,width:r,height:r}));var o=s.getViewport(),h=s.getBoundFramebufferObject();s.bindFramebuffer(this._hittestFBO),s.setViewport(0,0,r,r),this._drawClippingRects(t,e);var l=s.gl;s.setClearColor(1,1,1,1),s.clear(l.COLOR_BUFFER_BIT),s.setBlendingEnabled(!1),s.setStencilWriteMask(0),this._drawPhases(t,e,B.WGLDrawPhase.HITTEST),s.setBlendingEnabled(!0),this._hittestFBO.readPixels(0,0,r,r,6408,5121,L);for(var u=r*r,c=new Set,p=0;p<u;p++){var _=S[p];4294967295!==_&&c.add(_)}s.bindFramebuffer(h),s.setViewport(o.x,o.y,o.width,o.height);var d=[];return c.forEach(function(t){d.push(t)}),d},t.prototype.startStencilBurn=function(){this.context.setStencilTestEnabled(!0),this.context.setStencilWriteMask(255),this.context.setClearStencil(0),this.context.clear(this.context.gl.STENCIL_BUFFER_BIT),this.context.setStencilOp(7680,7680,7681),this.context.setColorMask(!1,!1,!1,!1),this.context.setBlendingEnabled(!1),this._quadVertexStream.bind(),this.context.bindProgram(this._transformSolidProgram)},t.prototype.startStencilDraw=function(){this.context.setStencilWriteMask(0),this.context.setStencilOp(7680,7680,7680),this.context.setColorMask(!0,!0,!0,!0),this.context.setBlendingEnabled(!0),this.context.setBlendFunction(1,771),this._quadVertexStream.bind(),this.context.bindProgram(this._transformTextureProgram)},t.prototype.endStencilDraw=function(){this.context.setStencilTestEnabled(!1),this._quadVertexStream.unbind(),this.context.bindProgram()},t.prototype._getPaintPass=function(e){if(this._passes||(this._passes=new Map),!this._passes.has(e))try{this._passes.set(e,new e)}catch(t){throw new Error("Tried to instantiate WGLPaintPass with unknown constructor: "+e+",\n"+t)}return this._passes.get(e)},t.prototype._getPaintPasses=function(t,e){var s=this;return e.getPaintPassTs(t).map(function(t){return s._getPaintPass(t)})},t.prototype._drawPhases=function(e,t,s,r){var i=this.context;i.setStencilTestEnabled(!0);for(var a=0;a<B.WGLDrawPhase.NUM_DRAW_PHASES-2;a++){var n=1<<a;if(n&s){var o=r?this._getPaintPasses(n,r):[],h=c({},e,{drawPhase:n});o.forEach(function(t){return t.preRender(e,e.rendererInfo)});for(var l=0,u=t;l<u.length;l++){u[l].doRender(h)}o.reverse().forEach(function(t){return t.postRender(e,e.rendererInfo)})}}i.setStencilTestEnabled(!1)},t.prototype._debugTiles=function(t,e){s("esri-feature-tiles-debug")&&this._drawPhases(t,e,B.WGLDrawPhase.DEBUG)},t.prototype._drawClippingRects=function(t,e){if(0!==e.length){var s=this.context;s.setDepthWriteEnabled(!1),s.setDepthTestEnabled(!1),s.setStencilTestEnabled(!0),s.setBlendingEnabled(!1),s.setColorMask(!1,!1,!1,!1),s.setStencilOp(7680,7680,7681),s.setClearStencil(0),s.clear(s.gl.STENCIL_BUFFER_BIT),s.setStencilWriteMask(255);for(var r=0,i=e.length;r<e.length;r++,i--){var a=e[r];a.attached&&(a.stencilRef=i)}this._drawPhases(t,e,B.WGLDrawPhase.CLIP),s.setColorMask(!0,!0,!0,!0)}},t.prototype._setGlobalOpacity=function(t,e){if(e===B.WGLDrawPhase.MAP&&1!==t.globalOpacity){var s=t.context,r=t.pixelRatio,i=t.state.size,a=i[0],n=i[1],o=Math.round(a*r),h=Math.round(n*r);null!==this._globalOpacityFBO&&this._globalOpacityFBO.width===o&&this._globalOpacityFBO.height===h||(null!==this._globalOpacityFBO&&this._globalOpacityFBO.dispose(),this._globalOpacityFBO=b.create(s,{colorTarget:0,depthStencilTarget:3,width:o,height:h})),this._boundFBO=s.getBoundFramebufferObject(),s.bindFramebuffer(this._globalOpacityFBO),s.setDepthWriteEnabled(!0),s.setStencilWriteMask(255),s.setClearColor(0,0,0,0),s.setClearDepth(1),s.setClearStencil(0),s.clear(s.gl.COLOR_BUFFER_BIT|s.gl.DEPTH_BUFFER_BIT|s.gl.STENCIL_BUFFER_BIT),s.setDepthWriteEnabled(!1)}},t.prototype._applyGlobalOpacity=function(t,e){if(e===B.WGLDrawPhase.MAP&&1!==t.globalOpacity){var s=t.context;s.bindFramebuffer(this._boundFBO);var r=this._globalOpacityFBO.colorTexture;this._blitRenderer.render(s,r,9728,t.globalOpacity),this._boundFBO=null}},t}();e.default=G});