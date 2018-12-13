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

define(["require","exports","../../../../core/Logger","./Util","../../../webgl/Texture"],function(e,t,r,i,n){var s=r.getLogger("esri.views.3d.webgl-engine.lib.GLTextureRep"),a=function(){function e(e,t,r,i){this.NUM_PARALLEL=8,this._fallbackTexture=null,this._fallbackTextureTransparent=null,this.textures=e,this._programRepository=t,this.getViewportToRestore=r,this._rctx=i,this.NUM_PARALLEL=8,this.id2textureRef={},this.loading={},this._queue=[],this.listeners=[],this.afExt=i.capabilities.textureFilterAnisotropic,this.maxMaxAnisotropy=this.afExt?i.parameters.maxMaxAnisotropy:1,this.maxAnisotropy=Math.min(8,this.maxMaxAnisotropy),this._needsRender=!0;this._fallbackTextureData=new Uint8Array(256),this._fallbackTextureTransparentData=new Uint8Array(256);for(var n=0;n<this._fallbackTextureData.length;++n)this._fallbackTextureData[n]=255,this._fallbackTextureTransparentData[n]=(n+1)%4!=0?255:0;this._fallbackTextureDesc={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,width:8,height:8,maxAnisotropy:8}}return e.prototype.resetNeedsRender=function(){this._needsRender=!1},e.prototype.needsRender=function(){return this._needsRender},e.prototype.aquire=function(t,r,n){var a=this,o=this.id2textureRef[t];if(null==o){var u=this.textures[t];i.assert(void 0!==u),u.setUnloadFunc(this._unload.bind(this));var h=!0===r,l=this._createGLTextureDescription(u);if(o=new e.TextureRef(null),i.assert(null==this.id2textureRef[t]),this.id2textureRef[t]=o,u.initializeThroughRender){var p=u.initializeThroughRender(this._rctx,l);o.setGLTexture(p),n&&n(o)}else if(u.deferredLoading())this.getLoadingCount()<this.NUM_PARALLEL?this._loadImage(t,l,n):this._queue.push([t,l,n]);else try{u.initializeThroughUpload(this._rctx,l,this._programRepository,this.getViewportToRestore(),function(e){o.setGLTexture(e),a._needsRender=!0,n&&n(o)})}catch(e){s.error("#aquire","Error loading texture: "+e.toString())}null==o.getGLTexture()&&o.setGLTexture(h?this.fallbackTextureTransparent:this.fallbackTexture),this._needsRender=!0}return o.incRefCnt(),o},e.prototype.release=function(e){var t=this.id2textureRef[e];void 0!==t&&(t.decRefCnt(),i.assert(t.getRefCnt()>=0))},e.prototype.getLoadingCount=function(){return Object.keys(this.loading).length},e.prototype.getTexture=function(e){return this.textures[e]},e.prototype.getMaxAnisotropy=function(){return this.maxAnisotropy},e.prototype._unload=function(e){var t=this.id2textureRef[e];if(void 0!==t){var r=t.getGLTexture();r&&r.dispose(),delete this.id2textureRef[e]}this.next(e)},e.prototype._createGLTextureDescription=function(e){var t=e.params&&e.params.wrap;return{target:3553,pixelFormat:6408,dataType:5121,maxAnisotropy:this.afExt&&e.params&&e.params.mipmap&&!e.params.disableAnisotropy?this.maxAnisotropy:void 0,wrapMode:t}},e.prototype.next=function(e){if(e in this.loading){delete this.loading[e];var t=Object.keys(this.id2textureRef),r=Object.keys(this.loading);this.listeners.forEach(function(i){i(e,t,r)}),this.processQueue()}},e.prototype._loadImage=function(e,t,r){var n=this;i.assert(null==this.loading[e]),this.loading[e]=!0;var s=this.textures[e];i.assert(void 0!==s),setTimeout(function(){var i=n.id2textureRef[e];i&&i.getRefCnt()&&s.initializeThroughUpload(n._rctx,t,n._programRepository,n.getViewportToRestore(),function(t){n.next(e),n._needsRender=!0,i&&i.getRefCnt()&&(i.setGLTexture(t),r&&r(i))})},0)},e.prototype.processQueue=function(){for(var e=[],t=0;t<this._queue.length;++t){var r=this._queue[t],i=r[0],n=this.id2textureRef[i];if(void 0!==n){0===n.getRefCnt()?(n.getGLTexture().dispose(),delete this.id2textureRef[i]):e.push(this._queue[t])}}this._queue=e;for(var s=Math.min(this.NUM_PARALLEL-Object.keys(this.loading).length,this._queue.length),t=0;t<s;++t)this._loadImage(this._queue[t][0],this._queue[t][1],this._queue[t][2]);this._queue.splice(0,s)},Object.defineProperty(e.prototype,"fallbackTexture",{get:function(){return this._fallbackTexture||(this._fallbackTexture=new n(this._rctx,this._fallbackTextureDesc,this._fallbackTextureData)),this._fallbackTexture},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"fallbackTextureTransparent",{get:function(){return this._fallbackTextureTransparent||(this._fallbackTextureTransparent=new n(this._rctx,this._fallbackTextureDesc,this._fallbackTextureTransparentData)),this._fallbackTextureTransparent},enumerable:!0,configurable:!0}),e}();return function(e){var t=function(){function e(e){this._glTexture=null,this._refCount=0,this._glTexture=e}return e.prototype.incRefCnt=function(){++this._refCount},e.prototype.decRefCnt=function(){--this._refCount,i.assert(this._refCount>=0)},e.prototype.getRefCnt=function(){return this._refCount},e.prototype.setGLTexture=function(e){this._glTexture=e},e.prototype.getGLTexture=function(){return this._glTexture},e}();e.TextureRef=t}(a||(a={})),a});