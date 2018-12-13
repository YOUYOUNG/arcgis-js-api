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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../request","../core/Error","../core/promiseUtils","../core/accessorSupport/decorators","../geometry/Extent","../geometry/SpatialReference","../geometry/support/aaBoundingRect","./Layer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./support/TileInfo"],function(e,t,r,o,n,i,l,p,a,s,c,u,y,d,f,m){var v={id:"0/0/0",level:0,row:0,col:0,extent:null};return function(t){function r(){var e=null!==t&&t.apply(this,arguments)||this;return e.tileInfo=m.create({spatialReference:c.WebMercator,size:256}),e.type="base-tile",e.fullExtent=new s(-20037508.342787,-20037508.34278,20037508.34278,20037508.342787,c.WebMercator),e.spatialReference=c.WebMercator,e}return o(r,t),r.prototype.getTileBounds=function(e,t,r,o){var n=o||u.create();return v.level=e,v.row=t,v.col=r,v.extent=n,this.tileInfo.updateTileInfo(v),v.extent=null,n},r.prototype.fetchTile=function(e,t,r,o){var n=this.getTileUrl(e,t,r),l={responseType:"image"};return o&&o.timestamp&&(l.query={_ts:o.timestamp}),i(n,l).then(function(e){return e.data})},r.prototype.getTileUrl=function(e,t,r){throw new l("basetilelayer:gettileurl-not-implemented","getTileUrl() is not implemented")},r.prototype.importLayerViewModule=function(t){switch(t.type){case"2d":return p.create(function(t){return e(["../views/2d/layers/TileLayerView2D"],t)});case"3d":return p.create(function(t){return e(["../views/3d/layers/TileLayerView3D"],t)})}},n([a.property({type:m})],r.prototype,"tileInfo",void 0),n([a.property({readOnly:!0,value:"base-tile"})],r.prototype,"type",void 0),n([a.property()],r.prototype,"fullExtent",void 0),n([a.property()],r.prototype,"spatialReference",void 0),r=n([a.subclass("esri.layers.BaseTileLayer")],r)}(a.declared(y,d,f))});