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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../geometry","../../core/JSONSupport","../../core/kebabDictionary","../../core/accessorSupport/decorators","../../core/accessorSupport/ensureType","../../geometry/support/aaBoundingRect","../../geometry/support/scaleUtils","../../geometry/support/spatialReferenceUtils","../../geometry/support/webMercatorUtils","./LOD"],function(e,t,r,o,i,l,n,s,p,a,c,u,f,y,v){var d=s({PNG:"png",PNG8:"png8",PNG24:"png24",PNG32:"png32",JPEG:"jpg",JPG:"jpg",DIB:"dib",TIFF:"tiff",EMF:"emf",PS:"ps",PDF:"pdf",GIF:"gif",SVG:"svg",SVGZ:"svgz",Mixed:"mixed",MIXED:"mixed",LERC:"lerc"});return function(e){function t(t){var r=e.call(this)||this;return r.dpi=96,r.format=null,r.origin=null,r.minScale=0,r.maxScale=0,r.size=null,r.spatialReference=null,r}o(t,e),n=t,t.create=function(e){void 0===e&&(e={size:256,spatialReference:l.SpatialReference.WebMercator});var t=e.resolutionFactor||1,r=e.scales,o=e.size||256,i=e.spatialReference||l.SpatialReference.WebMercator;if(!f.isValid(i)){for(var s=[],p=5e-4,a=23;a>=0;a--)s.unshift({level:a,scale:p,resolution:p}),p*=2;return new n({dpi:96,lods:s,origin:new l.Point(0,0,i),size:o,spatialReference:i})}var c=f.getInfo(i),y=c?new l.Point(c.origin[0],c.origin[1],i):new l.Point(0,0,i),v=u.getMetersPerUnitForSR(i),d=1/(39.37*v*96),h=[];if(r)for(var a=0;a<r.length;a++){var g=r[a],p=g*d;h.push({level:a,scale:g,resolution:p})}else{var m=f.isGeographic(i)?512/o*147748799.285417:256/o*591657527.591555,w=Math.ceil(24/t);h.push({level:0,scale:m,resolution:m*d});for(var a=1;a<w;a++){var g=m/Math.pow(2,t),p=g*d;h.push({level:a,scale:g,resolution:p}),m=g}}return new n({dpi:96,lods:h,origin:y,size:o,spatialReference:i})},Object.defineProperty(t.prototype,"isWrappable",{get:function(){var e=this,t=e.spatialReference,r=e.origin;if(t&&r){var o=f.getInfo(t);return t.isWrappable&&Math.abs(o.origin[0]-r.x)<=o.dx}return!1},enumerable:!0,configurable:!0}),t.prototype.readOrigin=function(e,t){return l.Point.fromJSON(r({spatialReference:t.spatialReference},e))},Object.defineProperty(t.prototype,"lods",{set:function(e){var t=this,r=0,o=0,i=[];this._levelToLOD={},e&&(r=-1/0,o=1/0,e.forEach(function(e){i.push(e.scale),r=e.scale>r?e.scale:r,o=e.scale<o?e.scale:o,t._levelToLOD[e.level]=e})),this._set("scales",i),this._set("minScale",r),this._set("maxScale",o),this._set("lods",e),this._initializeUpsampleLevels()},enumerable:!0,configurable:!0}),t.prototype.readSize=function(e,t){return[t.cols,t.rows]},t.prototype.writeSize=function(e,t){t.cols=e[0],t.rows=e[0]},t.prototype.zoomToScale=function(e){var t=this.scales;if(e<=0)return t[0];if(e>=t.length)return t[t.length-1];var r=Math.round(e-.5),o=Math.round(e);return t[o]+(o-e)*(t[r]-t[o])},t.prototype.scaleToZoom=function(e){for(var t=this.scales,r=t.length-1,o=0;o<r;o++){var i=t[o],l=t[o+1];if(i<=e)return o;if(l===e)return o+1;if(i>e&&l<e)return o+1-(e-l)/(i-l)}return o},t.prototype.snapScale=function(e,t){void 0===t&&(t=.95);var r=this.scaleToZoom(e);return r%Math.floor(r)>=t?this.zoomToScale(Math.ceil(r)):this.zoomToScale(Math.floor(r))},t.prototype.tileAt=function(e,t,r,o){var i=this.lodAt(e);if(!i)return null;var l,n;if("number"==typeof t)l=t,n=r;else if(f.equals(t.spatialReference,this.spatialReference))l=t.x,n=t.y,o=r;else{var s=y.project(t,this.spatialReference);if(!s)return null;l=s.x,n=s.y,o=r}var p=i.resolution*this.size[0],a=i.resolution*this.size[1];return o||(o={id:null,level:0,row:0,col:0,extent:c.create()}),o.level=e,o.row=Math.floor((this.origin.y-n)/a+.001),o.col=Math.floor((l-this.origin.x)/p+.001),this.updateTileInfo(o),o},t.prototype.updateTileInfo=function(e){var t=this.lodAt(e.level);if(t){var r=t.resolution*this.size[0],o=t.resolution*this.size[1];e.id=e.level+"/"+e.row+"/"+e.col,e.extent||(e.extent=c.create()),e.extent[0]=this.origin.x+e.col*r,e.extent[1]=this.origin.y-(e.row+1)*o,e.extent[2]=e.extent[0]+r,e.extent[3]=e.extent[1]+o}},t.prototype.upsampleTile=function(e){var t=this._upsampleLevels[e.level];return!(!t||-1===t.parentLevel)&&(e.level=t.parentLevel,e.row=Math.floor(e.row/t.factor+.001),e.col=Math.floor(e.col/t.factor+.001),this.updateTileInfo(e),!0)},t.prototype.getTileBounds=function(e,t){var r=this.lodAt(t.level).resolution,o=r*this.size[0],i=r*this.size[1];return e[0]=this.origin.x+t.col*o,e[1]=this.origin.y-(t.row+1)*i,e[2]=e[0]+o,e[3]=e[1]+i,e},t.prototype.lodAt=function(e){return this._levelToLOD&&this._levelToLOD[e]||null},t.prototype.clone=function(){return n.fromJSON(this.write({}))},t.prototype._initializeUpsampleLevels=function(){var e=this.lods;this._upsampleLevels=[];for(var t=null,r=0;r<e.length;r++){var o=e[r];this._upsampleLevels[o.level]={parentLevel:t?t.level:-1,factor:t?t.resolution/o.resolution:0},t=o}};var n;return i([p.property({type:Number,json:{write:!0}})],t.prototype,"compressionQuality",void 0),i([p.property({type:Number,json:{write:!0}})],t.prototype,"dpi",void 0),i([p.property({type:String,json:{read:d.read,write:d.write,origins:{"web-scene":{read:!1,write:!1}}}})],t.prototype,"format",void 0),i([p.property({readOnly:!0,dependsOn:["spatialReference","origin"]})],t.prototype,"isWrappable",null),i([p.property({type:l.Point,json:{write:!0}})],t.prototype,"origin",void 0),i([p.reader("origin")],t.prototype,"readOrigin",null),i([p.property({type:[v],value:null,json:{write:!0}})],t.prototype,"lods",null),i([p.property({readOnly:!0})],t.prototype,"minScale",void 0),i([p.property({readOnly:!0})],t.prototype,"maxScale",void 0),i([p.property({readOnly:!0})],t.prototype,"scales",void 0),i([p.property({cast:function(e){return Array.isArray(e)?e:"number"==typeof e?[e,e]:[256,256]}})],t.prototype,"size",void 0),i([p.reader("size",["rows","cols"])],t.prototype,"readSize",null),i([p.writer("size",{cols:{type:a.Integer},rows:{type:a.Integer}})],t.prototype,"writeSize",null),i([p.property({type:l.SpatialReference,json:{write:!0}})],t.prototype,"spatialReference",void 0),t=n=i([p.subclass("esri.layers.support.TileInfo")],t)}(p.declared(n))});