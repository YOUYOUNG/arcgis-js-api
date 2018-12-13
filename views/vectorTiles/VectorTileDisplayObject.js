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

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/ObjectPool","../../core/libs/gl-matrix-2/gl-matrix","../../geometry/support/spatialReferenceUtils","../2d/engine/DisplayObject","../2d/tiling/TileKey","./RenderBucket","../webgl/BufferObject"],function(e,t,r,i,a,s,n,f,c,o){var l=["fillVertexBuffer","fillDDVertexBuffer","fillIndexBuffer","outlineVertexBuffer","outlineDDVertexBuffer","outlineIndexBuffer","lineVertexBuffer","lineDDVertexBuffer","lineIndexBuffer","iconVertexBuffer","iconDDVertexBuffer","iconIndexBuffer","textVertexBuffer","textDDVertexBuffer","textIndexBuffer","circleVertexBuffer","circleIndexBuffer"];return function(e){function t(){for(var t,r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];var s=e.call(this)||this;return s._renderBuckets=[],s._vectorTileData=null,s._symbolUpdateData=null,s.coords=[0,0],s.bounds=[0,0,0,0],s.tileTransform={transform:a.mat4f32.create(),displayCoord:a.vec2f32.create()},s.stencilData={mask:0,reference:0},r.length>0&&(t=s.acquire).call.apply(t,[s].concat(r)),s}return r(t,e),t.prototype.reset=function(){f.pool.release(this.key),this.key=null,this.refKey=null,this.coords[0]=0,this.coords[1]=0,this.bounds[0]=0,this.bounds[1]=0,this.bounds[2]=0,this.bounds[3]=0,this.width=0,this.height=0,this.resolution=null,this.rotation=0,this._vectorTileData=null,this.styleLayers=null,this.client=null,this.id=null,this.tileTransform.transform.fill(0),this.tileTransform.displayCoord.fill(0),this.stencilData.mask=0,this.stencilData.reference=0,this._renderBuckets.length=0,this._symbolUpdateData=null,this.stage=null},t.prototype.acquire=function(e,t,r,i,a){this.key=e,this.refKey=t;var n=r.lodAt(e.level),f=null!==n?n.resolution:0,c=r.size[0]*f,o=r.origin,l=e.col*c,u=e.row*c,h=r.spatialReference,x=h&&(h._isWrappable?h._isWrappable():h.isWrappable),d=0;if(x){var D=s.getInfo(h);d=D.valid[1]-D.valid[0]}var y=e.world*d,B=o.x+l+y,p=o.y-u,v=B+c,b=p-c;this.coords[0]=B,this.coords[1]=p,this.bounds[0]=B,this.bounds[1]=p,this.bounds[2]=v,this.bounds[3]=b,this.widthInPixels=r.size[1],this.coordRange=4096,this.resolution=f,this.rotation=a,this.styleLayers=i,this.id=e.id},t.prototype.setData=function(e,t){this._vectorTileData=e,this.client=t},t.prototype.updateSymbolData=function(e){e&&(this._symbolUpdateData=e,this.requestRender())},t.prototype.updateTileData=function(e){this._vectorTileData=e,this.stage.requestRender()},t.prototype.dispose=function(){for(var e=["fillVertexArrayObject","fillDDVertexArrayObject","outlineVertexArrayObject","lineVertexArrayObject","lineDDVertexArrayObject","iconVertexArrayObject","iconDDVertexArrayObject","textVertexArrayObject","textDDVertexArrayObject","circleVertexArrayObject","fillVertexBuffer","fillDDVertexBuffer","fillIndexBuffer","outlineVertexBuffer","outlineDDVertexBuffer","outlineIndexBuffer","lineVertexBuffer","lineDDVertexBuffer","lineIndexBuffer","iconVertexBuffer","iconDDVertexBuffer","iconIndexBuffer","textVertexBuffer","textDDVertexBuffer","textIndexBuffer","circleVertexBuffer","circleIndexBuffer","texture"],t=0;t<e.length;++t){var r=e[t];this[r]&&(this[r].dispose(),this[r]=null)}this._renderBuckets.length=0},t.prototype.getCpuMemoryUsage=function(){return null!=this._vectorTileData&&this._vectorTileData.bufferData?this._vectorTileData.bufferData.reduce(function(e,t){return e+t.byteLength},0)+this._vectorTileData.bufferDataInfo.byteLength+this._vectorTileData.bucketDataInfo.byteLength:0},t.prototype.getGpuMemoryUsage=function(){var e=this,t=l.reduce(function(t,r){return e[r]?t+e[r].size:t},0);return this.texture&&(t+=this.texture.descriptor.width*this.texture.descriptor.height*4),t},t.prototype.attachWithContext=function(e){this.stage={context:e},this.attached=this.attach()},t.prototype._commitChanges=function(){this._vectorTileData&&(this.dispose(),this._createRenderBuckets(),this._createBufferObjects(),this._vectorTileData=null)},t.prototype._createRenderBuckets=function(){for(var e=new Uint32Array(this._vectorTileData.bucketDataInfo),t=e.length,r=0;r<t;){var i=e[r];switch(e[r+1]){case 0:var a=new c.BackgroundRenderBucket;a.layerID=i,this._renderBuckets.push(a),r+=2;break;case 1:var s=new c.FillRenderBucket;s.layerID=i,s.triangleElementStart=e[r+2],s.triangleElementCount=e[r+3],s.outlineElementStart=e[r+4],s.outlineElementCount=e[r+5],this._renderBuckets.push(s),r+=6;break;case 2:var n=new c.LineRenderBucket;n.layerID=i,n.triangleElementStart=e[r+2],n.triangleElementCount=e[r+3],this._renderBuckets.push(n),r+=4;break;case 3:var f=new c.SymbolRenderBucket;f.layerID=i,f.isSDF=0!==e[r+2];var o=r+3,l=e[o];if(o++,l>0)for(var u=void 0,h=void 0,x=void 0,d=0;d<l;d++)u=e[o],h=e[o+1],x=e[o+2],f.markerPerPageElementsMap.set(u,[h,x]),o+=3;var D=o,y=e[D];if(D++,y>0)for(var u=void 0,h=void 0,x=void 0,d=0;d<y;d++)u=e[D],h=e[D+1],x=e[D+2],f.glyphPerPageElementsMap.set(u,[h,x]),D+=3;this._renderBuckets.push(f),r+=5+3*l+3*y;break;case 4:var B=new c.CircleRenderBucket;B.layerID=i,B.triangleElementStart=e[r+2],B.triangleElementCount=e[r+3],this._renderBuckets.push(B),r+=4;break;default:console.error("Bad bucket type!"),r+=2}}},t._createBufferToObject=function(){var e=[];return e[1]={create:o.createVertex,var:"fillVertexBuffer"},e[2]={create:o.createVertex,var:"fillDDVertexBuffer"},e[3]={create:o.createIndex,var:"fillIndexBuffer"},e[4]={create:o.createVertex,var:"outlineVertexBuffer"},e[5]={create:o.createVertex,var:"outlineDDVertexBuffer"},e[6]={create:o.createIndex,var:"outlineIndexBuffer"},e[7]={create:o.createVertex,var:"lineVertexBuffer"},e[8]={create:o.createVertex,var:"lineDDVertexBuffer"},e[9]={create:o.createIndex,var:"lineIndexBuffer"},e[10]={create:o.createVertex,var:"iconVertexBuffer"},e[11]={create:o.createVertex,var:"iconDDVertexBuffer"},e[12]={create:o.createIndex,var:"iconIndexBuffer"},e[13]={create:o.createVertex,var:"textVertexBuffer"},e[14]={create:o.createVertex,var:"textDDVertexBuffer"},e[15]={create:o.createIndex,var:"textIndexBuffer"},e[16]={create:o.createVertex,var:"circleVertexBuffer"},e[17]={create:o.createIndex,var:"circleIndexBuffer"},e},t.prototype._createBufferObjects=function(){for(var e=this.stage.context,r=new Uint32Array(this._vectorTileData.bufferDataInfo),i=r.length,a=0,s=0;s<i;s+=2,a++){var n=r[s];if(!(r[s+1]<=0||0===this._vectorTileData.bufferData[a].byteLength)){var f=t.bufferToObject[n];f?this[f.var]?this[f.var].setData(this._vectorTileData.bufferData[a]):this[f.var]=f.create(e,35044,this._vectorTileData.bufferData[a]):console.error("Bad buffer type "+n)}}},t.prototype.detach=function(){this.isReady&&this.client.invoke("destructTileData",this.id),this.dispose(),e.prototype.detach.call(this)},t.prototype.doRender=function(e){if(this.visible&&this.isReady){var t=this.stage.context,r=e.renderer;if(t&&r){this._commitChanges();var i=e.drawphase;this._symbolUpdateData&&(this._updateSymbolData(e,this._symbolUpdateData),this._symbolUpdateData=null),t.setStencilFunction(514,this.stencilData.reference,this.stencilData.mask);var a,s=this.styleLayers,n=void 0!==e.layerOpacity?e.layerOpacity:1;if(0!==n){var f=this._renderBuckets.length;if(0===i)for(var c=f-1;c>=0;c--){var o=this._renderBuckets[c];if(a=s.layers[o.layerID],!o||!a)return;1!==o.type&&0!==o.type||!o.hasData()||r.renderBucket(t,o,e.displayLevel,e.requiredLevel,i,this,a,n)}else for(var c=0;c<f;c++){var o=this._renderBuckets[c];if(a=s.layers[o.layerID],!o||!a)return;o.hasData()&&r.renderBucket(t,o,e.displayLevel,e.requiredLevel,i,this,a,n)}}}}},t.prototype._updateSymbolData=function(e,t){if(!t||!t.bucketDataInfo)return!0;var r=new Uint32Array(t.bucketDataInfo),i=r.length;if(0===i)return!0;if(!this.isReady)return this.requestRender(),!1;for(var a=this.stage.context,s=new Uint32Array(t.bufferDataInfo),n=s.length,f=0,l=0;l<n;l+=2,f++){switch(s[l]){case 10:this.iconVertexBuffer&&(this.iconVertexBuffer.dispose(),this.iconVertexBuffer=null),this.iconVertexBuffer=o.createVertex(a,35044,t.bufferData[f]);break;case 11:this.iconDDVertexBuffer&&(this.iconDDVertexBuffer.dispose(),this.iconDDVertexBuffer=null),this.iconDDVertexBuffer=o.createVertex(a,35044,t.bufferData[f]);break;case 12:this.iconIndexBuffer&&(this.iconIndexBuffer.dispose(),this.iconIndexBuffer=null),this.iconIndexBuffer=o.createIndex(a,35044,t.bufferData[f]);break;case 13:this.textVertexBuffer&&(this.textVertexBuffer.dispose(),this.textVertexBuffer=null),this.textVertexBuffer=o.createVertex(a,35044,t.bufferData[f]);break;case 14:this.textDDVertexBuffer&&(this.textDDVertexBuffer.dispose(),this.textDDVertexBuffer=null),this.textDDVertexBuffer=o.createVertex(a,35044,t.bufferData[f]);break;case 15:this.textIndexBuffer&&(this.textIndexBuffer.dispose(),this.textIndexBuffer=null),this.textIndexBuffer=o.createIndex(a,35044,t.bufferData[f])}}for(var u=[],h=0;h<this._renderBuckets.length;h++)this._renderBuckets[h]instanceof c.SymbolRenderBucket||u.push(this._renderBuckets[h]);this._renderBuckets=u;for(var x,d=0;d<i;){var D=r[d];x=new c.SymbolRenderBucket,x.layerID=D,x.isSDF=0!==r[d+2],this.styleLayers.layers.length>x.layerID&&this.styleLayers.layers[x.layerID].type===x.type&&u.push(x);var y=d+3,B=r[y];if(y++,B>0)for(var p=void 0,v=void 0,b=void 0,V=0;V<B;V++)p=r[y],v=r[y+1],b=r[y+2],x.markerPerPageElementsMap.set(p,[v,b]),y+=3;var I=y,g=r[I];if(I++,g>0)for(var p=void 0,v=void 0,b=void 0,V=0;V<g;V++)p=r[I],v=r[I+1],b=r[I+2],x.glyphPerPageElementsMap.set(p,[v,b]),I+=3;d+=5+3*B+3*g}return this.iconVertexArrayObject&&(this.iconVertexArrayObject.dispose(),this.iconVertexArrayObject=null),this.iconDDVertexArrayObject&&(this.iconDDVertexArrayObject.dispose(),this.iconDDVertexArrayObject=null),this.textVertexArrayObject&&(this.textVertexArrayObject.dispose(),this.textVertexArrayObject=null),this.textDDVertexArrayObject&&(this.textDDVertexArrayObject.dispose(),this.textDDVertexArrayObject=null),!0},t.pool=new i(t),t.bufferToObject=t._createBufferToObject(),t}(n.DisplayObject)});