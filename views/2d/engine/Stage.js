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

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/tsSupport/assignHelper","../../../core/promiseUtils","../../../core/scheduling","../../../core/libs/gl-matrix-2/gl-matrix","./Container","./webgl/BitBlitRenderer","./webgl/enums","./webgl/Painter","./webgl/shaders/StencilPrograms","../../support/screenshotUtils","../../webgl/BufferObject","../../webgl/context-util","../../webgl/FramebufferObject","../../webgl/programUtils","../../webgl/RenderingContext","../../webgl/VertexArrayObject"],function(e,t,r,a,i,s,n,l,o,h,c,d,p,_,u,b,f,m,g){Object.defineProperty(t,"__esModule",{value:!0});var F=function(e){function t(t,r){var i=e.call(this)||this;i._renderParameters={drawPhase:0,state:i.state,pixelRatio:window.devicePixelRatio,stationary:!1,globalOpacity:1},i._renderRequested=!1,i._clipData=new Float32Array(8),i._upperLeft=n.vec2f64.create(),i._upperRight=n.vec2f64.create(),i._lowerLeft=n.vec2f64.create(),i._lowerRight=n.vec2f64.create(),i._mat2=n.mat2df64.create(),i._clipRendererInitialized=!1,i._supersampleScreenshots=!0,i.stage=i,i._stationary=!0,i.attached=!0;var l=a({alpha:!0,stencil:!0,renderContext:"webgl"},r);i._canvas=document.createElement("canvas"),i._canvas.setAttribute("style","width: 100%; height:100%; display:block;"),t.appendChild(i._canvas);var o={alpha:l.alpha,antialias:!1,depth:!0,stencil:l.stencil},h=u.createContextOrErrorHTML(i._canvas,o,l.renderContext);return i.context=new m(h),i.painter=new c.default(i.context),i._taskHandle=s.addFrameTask({render:function(){return i.renderFrame()}}),i._taskHandle.pause(),i._supersampleScreenshots=!l.hasOwnProperty("supersampleScreenshots")||l.supersampleScreenshots,i}return r(t,e),t.prototype.destroy=function(){this.removeAllChildren(),this.renderFrame(),this._taskHandle.remove(),this._taskHandle=null,this._boundFBO=null,this._clipFBO&&(this._clipFBO.dispose(),this._clipFBO=null),this._labelsFBO1&&(this._labelsFBO1.dispose(),this._labelsFBO1=null),this._labelsFBO2&&(this._labelsFBO2.dispose(),this._labelsFBO2=null),this._blitRenderer&&(this._blitRenderer.dispose(),this._blitRenderer=null),this._clipVAO&&(this._clipVAO.dispose(),this._clipVAO=null,this._clipVBO=null),this._clipStencilProgram&&(this._clipStencilProgram.dispose(),this._clipStencilProgram=null),this.painter.dispose(),this.context.dispose(),this._canvas.parentNode&&this._canvas.parentNode.removeChild(this._canvas),this._canvas=null},Object.defineProperty(t.prototype,"state",{get:function(){return this._state},set:function(e){this._state=e,this.requestRender()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"stationary",{get:function(){return this._stationary},set:function(e){this._stationary!==e&&(this._stationary=e,this.requestRender())},enumerable:!0,configurable:!0}),t.prototype.requestRender=function(){this._renderRequested=!0,this._taskHandle&&this._taskHandle.resume()},t.prototype.renderFrame=function(){this._renderRequested&&(this._renderRequested=!1,this._renderParameters.state=this._state,this._renderParameters.stationary=this.stationary,this._renderParameters.pixelRatio=window.devicePixelRatio,this._renderParameters.globalOpacity=1,this.processRender(this._renderParameters)),this._renderRequested||this._taskHandle.pause()},t.prototype.renderChildren=function(e){var t=this,r=t.context,a=t.children;this.beforeRenderChildren(e),e.drawPhase=h.WGLDrawPhase.MAP;for(var i=e.children?e.children:a,s=i.length,n=0;n<s;n++){var l=i[n];l.attached&&l.processRender(e)}var o=r.getBoundFramebufferObject();r.bindFramebuffer(this._labelsFBO2);var c=e.stationary;if(r.setClearColor(0,0,0,c?0:1),r.clear(r.gl.COLOR_BUFFER_BIT),c){e.drawPhase=h.WGLDrawPhase.LABEL_ALPHA,e.labelFBO=this._labelsFBO1;for(var n=0;n<s;n++){var l=i[n];l.attached&&l.processRender(e)}}r.bindFramebuffer(o),e.labelFBO=this._labelsFBO2,e.drawPhase=h.WGLDrawPhase.LABEL;for(var n=0;n<s;n++){var l=i[n];l.attached&&l.processRender(e)}var d=this._labelsFBO2;this._labelsFBO2=this._labelsFBO1,this._labelsFBO1=d,this.afterRenderChildren()},t.prototype.beforeRenderChildren=function(e){var t=this,r=t.context,a=t.painter,i=e.state,s=e.pixelRatio;if(a){r.enforceState();var l=i.size,o=i.rotation,h=Math.round(l[0]*s),c=Math.round(l[1]*s);this._boundFBO=r.getBoundFramebufferObject(),this._labelsFBO1&&this._labelsFBO1.width===h&&this._labelsFBO1.height===c||(this._labelsFBO1&&(this._labelsFBO1.dispose(),this._labelsFBO2.dispose()),this._labelsFBO1=b.createWithAttachments(r,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,samplingMode:9728,wrapMode:33071,width:h,height:c},{colorTarget:0,depthStencilTarget:0}),r.bindFramebuffer(this._labelsFBO1),r.setDepthWriteEnabled(!0),r.setStencilWriteMask(255),r.setClearColor(0,0,0,0),r.setClearDepth(1),r.setClearStencil(0),r.clear(r.gl.COLOR_BUFFER_BIT|r.gl.DEPTH_BUFFER_BIT|r.gl.STENCIL_BUFFER_BIT),r.setDepthWriteEnabled(!1),r.bindFramebuffer(this._boundFBO),this._labelsFBO2=b.createWithAttachments(r,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,samplingMode:9728,wrapMode:33071,width:h,height:c},{colorTarget:0,depthStencilTarget:0}));if(!(i.spatialReference&&(i.spatialReference._isWrappable?i.spatialReference._isWrappable():i.spatialReference.isWrappable)))return void(this._clipFrame=!1);var d=n.common.toRadian(o),p=Math.abs(Math.cos(d)),_=Math.abs(Math.sin(d)),u=Math.round(h*p+c*_),f=Math.round(i.worldScreenWidth);if(u<=f)return void(this._clipFrame=!1);this._clipFBO&&this._clipFBO.width===h&&this._clipFBO.height===c||(this._clipFBO=new b(r,{colorTarget:0,depthStencilTarget:3,width:h,height:c}));var m=.5*h,g=.5*c,F=1/h,v=1/c,B=h*_+c*p,O=.5*f*s,R=.5*B,w=this._upperLeft,C=this._upperRight,y=this._lowerLeft,E=this._lowerRight;n.vec2.set(w,-O,-R),n.vec2.set(C,O,-R),n.vec2.set(y,-O,R),n.vec2.set(E,O,R),n.mat2d.identity(this._mat2),n.mat2d.translate(this._mat2,this._mat2,[m,g]),0!==o&&n.mat2d.rotate(this._mat2,this._mat2,d),n.vec2.transformMat2d(w,w,this._mat2),n.vec2.transformMat2d(C,C,this._mat2),n.vec2.transformMat2d(y,y,this._mat2),n.vec2.transformMat2d(E,E,this._mat2);var S=this._clipData;S.set([2*y[0]*F-1,2*(c-y[1])*v-1,2*E[0]*F-1,2*(c-E[1])*v-1,2*w[0]*F-1,2*(c-w[1])*v-1,2*C[0]*F-1,2*(c-C[1])*v-1]),this._clipRendererInitialized||this._initializeClipRenderer(r),this._clipVBO.setData(S),this._boundFBO=r.getBoundFramebufferObject(),r.bindFramebuffer(this._clipFBO),r.setDepthWriteEnabled(!0),r.setStencilWriteMask(255),r.setClearColor(0,0,0,0),r.setClearDepth(1),r.setClearStencil(0),r.clear(r.gl.COLOR_BUFFER_BIT|r.gl.DEPTH_BUFFER_BIT|r.gl.STENCIL_BUFFER_BIT),r.setDepthWriteEnabled(!1),this._clipFrame=!0}},t.prototype.afterRenderChildren=function(){var e=this.context;e.logIno(),this._clipFrame&&this._clipRendererInitialized&&(e.bindFramebuffer(this._boundFBO),this._boundFBO=null,e.bindVAO(this._clipVAO),e.bindProgram(this._clipStencilProgram),e.setDepthWriteEnabled(!1),e.setDepthTestEnabled(!1),e.setStencilTestEnabled(!0),e.setBlendingEnabled(!1),e.setColorMask(!1,!1,!1,!1),e.setStencilOp(7680,7680,7681),e.setStencilWriteMask(255),e.setStencilFunction(519,1,255),e.drawElements(4,6,5123,0),e.bindVAO(),e.setColorMask(!0,!0,!0,!0),e.setBlendingEnabled(!0),e.setStencilFunction(514,1,255),this._blitRenderer.render(e,this._clipFBO.colorTexture,9728,1),e.setStencilTestEnabled(!1))},t.prototype.doRender=function(t){var r=this.context,a=t.state,i=t.pixelRatio;this._resizeCanvas(t),this.context.enforceState(),r.setViewport(0,0,i*a.size[0],i*a.size[1]),r.setDepthWriteEnabled(!0),r.setStencilWriteMask(255),r.setClearColor(0,0,0,0),r.setClearDepth(1),r.setClearStencil(0),r.clear(r.gl.COLOR_BUFFER_BIT|r.gl.DEPTH_BUFFER_BIT|r.gl.STENCIL_BUFFER_BIT),r.setDepthWriteEnabled(!1),e.prototype.doRender.call(this,t)},t.prototype.takeScreenshot=function(e,t){var r=p.screenshotSuperSampleSettings(e,this._supersampleScreenshots),a=r.framebufferWidth,s=r.framebufferHeight,n=this.context,l=e.layers,o={drawPhase:null,globalOpacity:1,stationary:!0,state:this._renderParameters.state.clone(),pixelRatio:r.pixelRatio};if(null!=e.rotation){var h=o.state.viewpoint;h.rotation=e.rotation,o.state.viewpoint=h}l.length>0&&(o.children=[],l.forEach(function(e){var r=t.find(function(t){return t.layer.id===e.id});r&&r.container&&r.attached&&o.children.push(r.container)}));var c=b.create(n,{colorTarget:0,depthStencilTarget:3,width:a,height:s}),d=n.getBoundFramebufferObject();n.bindFramebuffer(c),n.setViewport(0,0,a,s);var _=n.gl;n.setClearColor(0,0,0,0),n.setClearDepth(1),n.setClearStencil(0),n.clear(_.COLOR_BUFFER_BIT|_.DEPTH_BUFFER_BIT|_.STENCIL_BUFFER_BIT),this.renderChildren(o);var u=this._readbackScreenshot(r);n.bindFramebuffer(d);var f=this._ensureScreenshotEncodeCanvas(),m=p.encodeResult(u,e,f,{flipY:!0,premultipliedAlpha:!0});return i.resolve(m)},t.prototype._ensureScreenshotEncodeCanvas=function(){return this._screenshotEncodeCanvas||(this._screenshotEncodeCanvas=document.createElement("canvas")),this._screenshotEncodeCanvas},t.prototype._readbackScreenshot=function(e){var t=e.framebufferWidth,r=e.framebufferHeight,a=e.region,i=e.resample,s=this.context,n=s.gl;if(i){var l=p.createEmptyImageData(t,r,this._ensureScreenshotEncodeCanvas());n.readPixels(0,0,t,r,6408,5121,new Uint8Array(l.data.buffer));var o=p.createEmptyImageData(a.width,a.height,this._ensureScreenshotEncodeCanvas());return p.resampleHermite(l,o,!0,i.region.x,r-(i.region.y+i.region.height),i.region.width,i.region.height)}var l=p.createEmptyImageData(a.width,a.height,this._ensureScreenshotEncodeCanvas());return n.readPixels(a.x,r-(a.y+a.height),a.width,a.height,6408,5121,new Uint8Array(l.data.buffer)),l},t.prototype._resizeCanvas=function(e){var t=this._canvas,r=t.style,a=e.state.size,i=e.pixelRatio,s=a[0],n=a[1],l=Math.round(s*i),o=Math.round(n*i);t.width===l&&t.height===o||(t.width=l,t.height=o),r.width=s+"px",r.height=n+"px"},t.prototype._initializeClipRenderer=function(e){if(this._clipRendererInitialized)return!0;this._blitRenderer=new o;var t=d.stencil.attributes,r=f.createProgram(e,d.stencil);if(!r)return!1;var a=_.createVertex(e,35040,32),i=new Uint16Array([0,1,2,2,1,3]),s=_.createIndex(e,35044,i),n={geometry:[{name:"a_pos",count:2,type:5126,offset:0,stride:8,normalized:!1,divisor:0}]},l=new g(e,t,n,{geometry:a},s);return this._clipStencilProgram=r,this._clipVBO=a,this._clipVAO=l,this._clipRendererInitialized=!0,!0},t}(l.Container);t.Stage=F});