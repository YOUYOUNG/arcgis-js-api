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

define(["require","exports","./Utils"],function(e,r,u){return function(){function i(){this.geometries=[{indexBuffer:void 0,vertexBuffer:{}},{indexBuffer:void 0,vertexBuffer:{}},{indexBuffer:void 0,vertexBuffer:{}},{indexBuffer:void 0,vertexBuffer:{}},{indexBuffer:void 0,vertexBuffer:{}}]}return i.deserialize=function(e){for(var r=new i,f=0;f<5;++f)for(var t in r.geometries[f].indexBuffer=new Uint32Array(e.geometries[f].indexBuffer),r.geometries[f].vertexBuffer={},e.geometries[f].vertexBuffer)r.geometries[f].vertexBuffer[t]={data:u.allocateTypedArrayBufferwithData(e.geometries[f].vertexBuffer[t].data,e.geometries[f].vertexBuffer[t].stride),stride:e.geometries[f].vertexBuffer[t].stride};return r},i.prototype.serialize=function(){for(var e={geometries:[{indexBuffer:this.geometries[0].indexBuffer.buffer,vertexBuffer:{}},{indexBuffer:this.geometries[1].indexBuffer.buffer,vertexBuffer:{}},{indexBuffer:this.geometries[2].indexBuffer.buffer,vertexBuffer:{}},{indexBuffer:this.geometries[3].indexBuffer.buffer,vertexBuffer:{}},{indexBuffer:this.geometries[4].indexBuffer.buffer,vertexBuffer:{}}]},r=0;r<5;++r)for(var f in this.geometries[r].vertexBuffer)e.geometries[r].vertexBuffer[f]={data:this.geometries[r].vertexBuffer[f].data.buffer,stride:this.geometries[r].vertexBuffer[f].stride};return e},i.prototype.getBuffers=function(){for(var e=[],r=0;r<5;++r)for(var f in e.push(this.geometries[r].indexBuffer.buffer),this.geometries[r].vertexBuffer)e.push(this.geometries[r].vertexBuffer[f].data.buffer);return e},i}()});