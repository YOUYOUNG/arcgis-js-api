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

define(["require","exports","../../support/mathUtils","./Texture","./Util","../../../webgl/Texture"],function(t,e,i,r,n,h){function o(){var t=document.createElement("canvas");return t.width=d,t.height=d,t}function s(t,e){return"center"===t?.5*e:"right"===t?e:0}function a(t){return"rgb("+t.slice(0,3).map(function(t){return Math.floor(255*t)}).toString()+")"}function l(t){return"rgba("+t.slice(0,3).map(function(t){return Math.floor(255*t)}).toString()+","+t[3]+")"}function u(){return c}for(var d=512,p=function(){function t(t,e,i,r){void 0===r&&(r=!0),this._idHint=i,this._text=t,this._textLines=t.split(/\r?\n/),this._params=e;var n=this._params.halo.size;this._haloSize=Math.round(n),this._autoScale=r}return Object.defineProperty(t.prototype,"id",{get:function(){return null==this._id&&(this._id=r.idGen.gen(this._idHint)),this._id},enumerable:!0,configurable:!0}),t.prototype.getParams=function(){return this._params},t.prototype.getText=function(){return this._text},t.prototype.deferredLoading=function(){return!1},Object.defineProperty(t.prototype,"width",{get:function(){return this._width||(this._width=i.nextHighestPowerOfTwo(this.renderedWidth)),this._width},enumerable:!0,configurable:!0}),t.prototype.getWidth=function(){return this.width},Object.defineProperty(t.prototype,"height",{get:function(){return this._height||(this._height=i.nextHighestPowerOfTwo(this.renderedHeight)),this._height},enumerable:!0,configurable:!0}),t.prototype.getHeight=function(){return this.height},Object.defineProperty(t.prototype,"lineHeight",{get:function(){return this._lineHeight||(this._lineHeight=this._computeLineHeight()),this._lineHeight},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textWidth",{get:function(){return this._textWidth||(this._textWidth=this._computeTextWidth()),this._textWidth},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textHeight",{get:function(){return this._textHeight||(this._textHeight=this._computeTextHeight()),this._textHeight},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderedWidth",{get:function(){return this._renderedWidth||(this._renderedWidth=Math.round(this.textWidth*this.scaleFactor)),this._renderedWidth},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderedHeight",{get:function(){return this._renderedHeight||(this._renderedHeight=Math.round(this.textHeight*this.scaleFactor)),this._renderedHeight},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"scaleFactor",{get:function(){return this._scaleFactor||(this._autoScale?this._scaleFactor=Math.min(1,Math.min(2048/this.textWidth,2048/this.textHeight)):this._scaleFactor=1,this._autoScale&&n.assert(this.renderedWidth<=2048&&this.renderedHeight<=2048)),this._scaleFactor},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"texcoordScale",{get:function(){return[this.renderedWidth/this.width,this.renderedHeight/this.height]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fillStyle",{get:function(){return this._fillStyle||(this._fillStyle=l(this._params.color)),this._fillStyle},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"haloStyle",{get:function(){return this._haloStyle||(this._haloStyle=a(this._params.halo.color)),this._haloStyle},enumerable:!0,configurable:!0}),t.prototype.initializeThroughRender=function(t,e){var i=this._getTextCanvas();i.width=this._width,i.height=this._height;var r=i.getContext("2d");r.save(),e.samplingMode=9987,e.wrapMode=33071,e.flipped=!0,e.preMultiplyAlpha=!0,e.hasMipmap=!0,this.renderText(this._renderedWidth,this._renderedHeight,r,0,this._height-this._renderedHeight);var n=new h(t,e,i);return r.restore(),n},t.prototype.setUnloadFunc=function(t){this._unloadFunc=t},t.prototype.unload=function(){this._unloadFunc&&(this._unloadFunc(this._id),this._unloadFunc=null)},t.prototype.renderText=function(t,e,i,r,n){void 0===r&&(r=0),void 0===n&&(n=0);var h=this.lineHeight*this.scaleFactor,o=this._haloSize,a=s(i.textAlign,t)+o,l=o;i.save();var p=o>0,c=o<3;if(p){var g=l,f=this._getHaloCanvas();f.width=Math.max(d,this.renderedWidth),f.height=Math.max(d,this.renderedHeight);var _=f.getContext("2d");if(_.clearRect(0,0,f.width,f.height),this._setFontProperties(_,this._params.size*this.scaleFactor),_.fillStyle=this.haloStyle,_.strokeStyle=this.haloStyle,_.lineJoin=c?"miter":"round",c)for(var y=0,x=this._textLines;y<x.length;y++){for(var m=x[y],b=0,v=u();b<v.length;b++){var H=v[b],w=H[0],S=H[1];_.fillText(m,a+o*w,l+o*S)}g+=h}else for(var P=0,T=this._textLines;P<T.length;P++){for(var m=T[P],F=2*o,M=0;M<5;M++){var W=.6+.1*M;_.lineWidth=W*F,_.strokeText(m,a,g)}g+=h}i.globalAlpha=this._params.halo.color[3],i.drawImage(f,r,n),f.width=d,f.height=d,i.globalAlpha=1}this._setFontProperties(i,this._params.size*this._scaleFactor);for(var g=n+l,C=0,O=this._textLines;C<O.length;C++){var m=O[C];i.globalCompositeOperation="destination-out",i.fillStyle="rgb(0, 0, 0)",i.fillText(m,r+a,g),i.globalCompositeOperation="source-over",i.fillStyle=this.fillStyle,i.fillText(m,r+a,g),g+=h}i.restore()},t.preferredAtlasSize=function(){return d},t.prototype._getTextCanvas=function(){return null==t._textCanvas2D&&(t._textCanvas2D=o()),t._textCanvas2D},t.prototype._getHaloCanvas=function(){return null==t._haloCanvas2D&&(t._haloCanvas2D=o()),t._haloCanvas2D},t.prototype._setFontProperties=function(t,e){var i=this._params.font,r=i.style+" "+i.weight+" "+e+"px "+i.family+", sans-serif";t.font=r,t.textAlign="left",t.textBaseline="top"},t.prototype._computeTextWidth=function(){var t=this._getTextCanvas(),e=t.getContext("2d");this._setFontProperties(e,this._params.size);for(var i=0,r=0,n=this._textLines;r<n.length;r++){var h=n[r],o=e.measureText(h).width;o>i&&(i=o)}var s=this._params.font;return("italic"===s.style||"oblique"===s.style||"string"==typeof s.weight&&("bold"===s.weight||"bolder"===s.weight)||"number"==typeof s.weight&&s.weight>600)&&(i+=.3*e.measureText("A").width),i+=2*this._haloSize,i=Math.round(i)},t.prototype._computeLineHeight=function(){var t=1.275*this._params.size;return Math.floor(t+2*this._haloSize)},t.prototype._computeTextHeight=function(){return this._computeLineHeight()*this._textLines.length},t}(),c=[],g=0;g<360;g+=22.5)c.push([Math.cos(Math.PI*g/180),Math.sin(Math.PI*g/180)]);return p});