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

define(["require","exports","./MemoryRequirements","./TileBufferData","./TileDisplayData","./Utils","./Utils","./WGLDisplayObject","./WGLDisplayRecord","./mesh/VertexBuffer","./mesh/factories/MaterialStore","./util/Reader","./util/serializationUtils","./util/Writer"],function(e,t,r,L,O,z,A,s,B,f,l,n,u,a){var F=new r.default,R=new r.default;function m(e,t){var r={};for(var a in e){var i={data:A.allocateTypedArrayBuffer(t,e[a]),stride:e[a]};r[a]=i}return r}return function(){function j(){this.tileDisplayData=null,this.tileBufferData=null}return j.prototype.reshuffle=function(){F.reset();var e=O.groupRecordsByGeometryType(this.tileDisplayData.displayObjects);for(var t in e)for(var r=0,a=p=e[t];r<a.length;r++){var i=a[r];F.needMore(i.geometryType,i.meshData?i.meshData.vertexCount:i.vertexCount,i.meshData?i.meshData.indexData.length:i.indexCount)}var s=e.length,f=new L;for(t=0;t<s;++t){f.geometries[t].indexBuffer=new Uint32Array(Math.round(1.15*F.indicesFor(t)));var l=[];for(var n in this.tileBufferData.geometries[t].vertexBuffer)l.push(this.tileBufferData.geometries[t].vertexBuffer[n].stride);var u=j._computeVertexAlignment(l),o=Math.round(1.15*F.verticesFor(t)),d=j._align(o,u);for(var D in this.tileBufferData.geometries[t].vertexBuffer){var v=this.tileBufferData.geometries[t].vertexBuffer[D].stride;f.geometries[t].vertexBuffer[D]={stride:v,data:A.allocateTypedArrayBuffer(d,v)}}}R.reset(),this.tileDisplayData.displayList.clear();for(t=0;t<s;++t){for(var p,h=0,y=p=e[t];h<y.length;h++){if((i=y[h]).meshData)i.writeMeshDataToBuffers(R.verticesFor(t),f.geometries[t].vertexBuffer,R.indicesFor(t),f.geometries[t].indexBuffer),i.meshData=null;else{var B=this.tileBufferData.geometries[t].vertexBuffer,m=this.tileBufferData.geometries[t].indexBuffer,c=f.geometries[t].vertexBuffer,g=f.geometries[t].indexBuffer,x=R.verticesFor(t),M=R.indicesFor(t);z.copyMeshData(x,M,c,g,i,B,m),i.vertexFrom=x,i.indexFrom=M}R.needMore(t,i.vertexCount,i.indexCount)}this.tileDisplayData.displayList.unified||this.tileDisplayData.displayList.addToList(p)}if(this.tileDisplayData.displayList.unified)for(var w=0,b=this.tileDisplayData.displayObjects;w<b.length;w++){var T=b[w];this.tileDisplayData.displayList.addToList(T.displayRecords)}this.tileBufferData=f},j.prototype.getStrides=function(){for(var e=[],t=0;t<this.tileBufferData.geometries.length;++t){var r=this.tileBufferData.geometries[t];for(var a in e[t]={},r.vertexBuffer)e[t][a]=r.vertexBuffer[a].stride}return e},j.prototype._guessSize=function(){for(var e=this.tileDisplayData.displayObjects,t=Math.min(e.length,4),r=0,a=0;a<t;a++)r=Math.max(r,e[a].displayRecords.length);return 2*(12*e.length+e.length*r*40)},j.prototype.serialize=function(){var e=this.tileBufferData.serialize(),t=this.tileBufferData.getBuffers(),r=this.tileDisplayData.serialize(new a.default(Int32Array,this._guessSize())).buffer();return t.push(r),{result:{displayData:r,bufferData:e},transferList:t}},j.decode=function(e){var t=l.default.deserialize(new n.default(e.materialStore)),r=u.deserializeList(new n.default(e.displayObjects),s,{store:t}),a={};for(var i in e.vertexBuffersMap)a[i]=f.VertexBuffers.decode(e.vertexBuffersMap[i]);return j.fromMeshData({materials:t,displayObjects:r,vertexBuffersMap:a},!1)},j.fromMeshData=function(e,t){void 0===t&&(t=!0);var r=new j,a=new O.default,i=new L;for(var s in a.displayObjects=e.displayObjects,t&&e.materials.hydrateObjects(a.displayObjects),e.vertexBuffersMap){var f=e.vertexBuffersMap[s];i.geometries[s].indexBuffer=f.indexBuffer,i.geometries[s].vertexBuffer=f.namedBuffers}return r.tileDisplayData=a,r.tileBufferData=i,r},j.bind=function(e,t){var r=new j;return r.tileDisplayData=e,r.tileBufferData=t,r},j.create=function(e,t){var r=new j;r.tileDisplayData=new O.default;for(var a=[0,0,0,0,0],i=[0,0,0,0,0],s=[[],[],[],[],[]],f=0,l=r.tileDisplayData.displayObjects=e;f<l.length;f++)for(var n=0,u=l[f].displayRecords;n<u.length;n++){var o=u[n];s[o.geometryType].push(o),a[o.geometryType]+=o.meshData.vertexCount,i[o.geometryType]+=o.meshData.indexData.length}for(var d,D=new L,v=[(d=t).fill||{},d.line||{},d.icon||{},d.text||{},d.label||{}],p=0;p<5;p++){var h=new Uint32Array(i[p]),y=m(v[p],a[p]);B.writeAllMeshDataToBuffers(s[p],y,h),D.geometries[p]={indexBuffer:h,vertexBuffer:y}}return r.tileBufferData=D,r},j._align=function(e,t){var r=e%t;return 0===r?e:e+(t-r)},j._computeVertexAlignment=function(e){for(var t=!1,r=!1,a=0,i=e;a<i.length;a++){var s=i[a];s%4==2?t=!0:s%4!=0&&(r=!0)}return r?4:t?2:1},j}()});