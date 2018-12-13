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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../geometry","../../TimeExtent","../../core/JSONSupport","../../core/kebabDictionary","../../core/lang","../../core/accessorSupport/decorators","../../geometry/support/jsonUtils","../../geometry/support/typeUtils","../../symbols/support/jsonUtils","../../symbols/support/typeUtils","./QuantizationParameters","./StatisticDefinition"],function(t,e,r,o,i,n,s,p,a,l,u,y,c,d,m,h){var v=p({esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelEnvelopeIntersects:"envelope-intersects",esriSpatialRelIndexIntersects:"index-intersects",esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:"relation"}),w=p({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"});return function(t){function e(e){var r=t.call(this,e)||this;return r.datumTransformation=null,r.distance=void 0,r.gdbVersion=null,r.geometry=null,r.geometryPrecision=void 0,r.groupByFieldsForStatistics=null,r.having=null,r.historicMoment=null,r.maxAllowableOffset=void 0,r.maxRecordCountFactor=1,r.multipatchOption=null,r.num=void 0,r.objectIds=null,r.orderByFields=null,r.outFields=null,r.outSpatialReference=null,r.outStatistics=null,r.parameterValues=null,r.pixelSize=null,r.quantizationParameters=null,r.rangeValues=null,r.relationParameter=null,r.resultType=null,r.returnDistinctValues=!1,r.returnGeometry=!1,r.returnCentroid=!1,r.returnExceededLimitFeatures=!0,r.returnM=void 0,r.returnZ=void 0,r.source=null,r.spatialRelationship="intersects",r.start=void 0,r.sqlFormat=null,r.text=null,r.timeExtent=null,r.units="meters",r.where=null,r}r(e,t),s=e,e.prototype.castDatumTransformation=function(t){return"number"==typeof t||"object"==typeof t?t:null},e.prototype.writeHistoricMoment=function(t,e,r){e.historicMoment=t&&t.getTime()},e.prototype.writeParameterValues=function(t,e,r){if(t){var o={};for(var i in t){var n=t[i];Array.isArray(n)?o[i]=n.map(function(t){return t instanceof Date?t.getTime():t}):n instanceof Date?o[i]=n.getTime():o[i]=n}e.parameterValues=o}},e.prototype.writeStart=function(t,e,r){e.resultOffset=this.start,e.resultRecordCount=this.num||10,e.where="1=1"},e.prototype.writeWhere=function(t,e,r){e.where=t||"1=1"},e.prototype.clone=function(){return new s(a.clone({datumTransformation:this.datumTransformation,distance:this.distance,gdbVersion:this.gdbVersion,geometry:this.geometry,geometryPrecision:this.geometryPrecision,groupByFieldsForStatistics:this.groupByFieldsForStatistics,having:this.having,historicMoment:this.historicMoment?new Date(this.historicMoment.getTime()):null,maxAllowableOffset:this.maxAllowableOffset,maxRecordCountFactor:this.maxRecordCountFactor,multipatchOption:this.multipatchOption,num:this.num,objectIds:this.objectIds,orderByFields:this.orderByFields,outFields:this.outFields,outSpatialReference:this.outSpatialReference,outStatistics:this.outStatistics,parameterValues:this.parameterValues,pixelSize:this.pixelSize,quantizationParameters:this.quantizationParameters,rangeValues:this.rangeValues,relationParameter:this.relationParameter,resultType:this.resultType,returnDistinctValues:this.returnDistinctValues,returnGeometry:this.returnGeometry,returnCentroid:this.returnCentroid,returnExceededLimitFeatures:this.returnExceededLimitFeatures,returnM:this.returnM,returnZ:this.returnZ,source:this.source,spatialRelationship:this.spatialRelationship,start:this.start,sqlFormat:this.sqlFormat,text:this.text,timeExtent:this.timeExtent,units:this.units,where:this.where}))};var s;return e.MAX_MAX_RECORD_COUNT_FACTOR=5,o([l.property({json:{write:!0}})],e.prototype,"datumTransformation",void 0),o([l.cast("datumTransformation")],e.prototype,"castDatumTransformation",null),o([l.property({type:Number,json:{write:!0}})],e.prototype,"distance",void 0),o([l.property({type:String,json:{write:!0}})],e.prototype,"gdbVersion",void 0),o([l.property({types:y.types,json:{read:u.fromJSON,write:!0}})],e.prototype,"geometry",void 0),o([l.property({type:Number,json:{write:!0}})],e.prototype,"geometryPrecision",void 0),o([l.property({type:[String],json:{write:!0}})],e.prototype,"groupByFieldsForStatistics",void 0),o([l.property({type:String,json:{write:!0}})],e.prototype,"having",void 0),o([l.property({type:Date})],e.prototype,"historicMoment",void 0),o([l.writer("historicMoment")],e.prototype,"writeHistoricMoment",null),o([l.property({type:Number,json:{write:!0}})],e.prototype,"maxAllowableOffset",void 0),o([l.property({type:Number,cast:function(t){return t<1?1:t>s.MAX_MAX_RECORD_COUNT_FACTOR?s.MAX_MAX_RECORD_COUNT_FACTOR:t},json:{write:{overridePolicy:function(t){return{enabled:t>1}}}}})],e.prototype,"maxRecordCountFactor",void 0),o([l.property({type:String,json:{write:!0}})],e.prototype,"multipatchOption",void 0),o([l.property({type:Number,json:{read:{source:"resultRecordCount"}}})],e.prototype,"num",void 0),o([l.property({type:[Number],json:{write:!0}})],e.prototype,"objectIds",void 0),o([l.property({type:[String],json:{write:!0}})],e.prototype,"orderByFields",void 0),o([l.property({type:[String],json:{write:!0}})],e.prototype,"outFields",void 0),o([l.property({type:i.SpatialReference,json:{read:{source:"outSR"},write:{target:"outSR"}}})],e.prototype,"outSpatialReference",void 0),o([l.property({type:[h],json:{write:!0}})],e.prototype,"outStatistics",void 0),o([l.property({json:{write:!0}})],e.prototype,"parameterValues",void 0),o([l.writer("parameterValues")],e.prototype,"writeParameterValues",null),o([l.property({types:d.types,json:{read:c.read,write:!0}})],e.prototype,"pixelSize",void 0),o([l.property({type:m.default,json:{write:!0}})],e.prototype,"quantizationParameters",void 0),o([l.property({type:[Object],json:{write:!0}})],e.prototype,"rangeValues",void 0),o([l.property({type:String,json:{read:{source:"relationParam"},write:{target:"relationParam",overridePolicy:function(t){return{enabled:"relation"===this.spatialRelationship}}}}})],e.prototype,"relationParameter",void 0),o([l.property({type:String,json:{write:!0}})],e.prototype,"resultType",void 0),o([l.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:t}}}}})],e.prototype,"returnDistinctValues",void 0),o([l.property({type:Boolean,json:{write:!0}})],e.prototype,"returnGeometry",void 0),o([l.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:t}}}}})],e.prototype,"returnCentroid",void 0),o([l.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:!t}}}}})],e.prototype,"returnExceededLimitFeatures",void 0),o([l.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:t}}}}})],e.prototype,"returnM",void 0),o([l.property({type:Boolean,json:{write:{overridePolicy:function(t){return{enabled:t}}}}})],e.prototype,"returnZ",void 0),o([l.property({json:{write:!0}})],e.prototype,"source",void 0),o([l.property({type:String,json:{read:{source:"spatialRel",reader:v.read},write:{target:"spatialRel",writer:v.write}}})],e.prototype,"spatialRelationship",void 0),o([l.property({type:Number,json:{read:{source:"resultOffset"}}})],e.prototype,"start",void 0),o([l.writer("start"),l.writer("num")],e.prototype,"writeStart",null),o([l.property({type:String,json:{write:!0}})],e.prototype,"sqlFormat",void 0),o([l.property({type:String,json:{write:!0}})],e.prototype,"text",void 0),o([l.property({type:n,json:{write:!0}})],e.prototype,"timeExtent",void 0),o([l.property({type:String,json:{read:w.read,write:{writer:w.write,overridePolicy:function(t){return{enabled:this.distance>0}}}}})],e.prototype,"units",void 0),o([l.property({type:String,json:{write:{overridePolicy:function(t){return{enabled:null!=t||this.start>0}}}}})],e.prototype,"where",void 0),o([l.writer("where")],e.prototype,"writeWhere",null),e=s=o([l.subclass("esri.tasks.support.Query")],e)}(l.declared(s))});