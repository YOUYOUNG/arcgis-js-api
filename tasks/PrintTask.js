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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/awaiterHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/generatorHelper","dojo/dom-construct","dojox/gfx/canvas","../kernel","../request","../core/kebabDictionary","../core/lang","../core/promiseUtils","../core/screenUtils","../core/urlUtils","../core/accessorSupport/decorators","../geometry/Polygon","./Geoprocessor","./Task","./support/fileFormat","./support/layoutTemplate","./support/printTaskUtils","./support/PrintTemplate","./support/Query"],function(e,t,r,a,i,n,s,o,l,u,c,y,p,d,f,h,m,g,S,b,v,_,L,x,O){function w(e){return e&&(e.path||"image/svg+xml"===e.contentType)}var T={Feet:"ft",Kilometers:"km",Meters:"m",Miles:"mi"},N=y({esriFeet:"Feet",esriKilometers:"Kilometers",esriMeters:"Meters",esriMiles:"Miles"}),J=y({esriExecutionTypeSynchronous:"sync",esriExecutionTypeAsynchronous:"async"}),M=new O({returnGeometry:!0});return function(e){function t(t){var r=e.call(this,t)||this;return r._ssExtent=null,r._legendLayers=[],r._legendLayerNameMap={},r._gpServerUrl=null,r._cimVersion=null,r._is11xService=!1,r._gpMetadata=null,r.updateDelay=1e3,r}return i(t,e),Object.defineProperty(t.prototype,"_geoprocessor",{get:function(){return new S(this.url,{updateDelay:this.updateDelay})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mode",{get:function(){return this._gpMetadata&&this._gpMetadata.executionType?J.fromJSON(this._gpMetadata.executionType):"sync"},enumerable:!0,configurable:!0}),t.prototype.execute=function(e,t){var r=this,a=this.url,i=a.lastIndexOf("/GPServer/");return i>0&&(a=a.slice(0,i+9)),d.resolve().then(function(){return r._gpServerUrl===a?{data:r._gpMetadata}:(r._gpServerUrl=a,c(a,{query:{f:"json"}}))}).then(function(t){return r._gpMetadata=t.data,r._cimVersion=r._gpMetadata.cimVersion,r._is11xService=!!r._cimVersion,r._getGpPrintParams(e)}).then(function(e){var a="async"===r.mode?"submitJob":"execute";return r._geoprocessor[a](e,t).then(function(e){return"sync"===r.mode?e.results&&e.results[0]&&e.results[0].value:r._geoprocessor.getResultData(e.jobId,"Output_File",t).then(function(e){return e.value})})})},t.prototype._createOperationalLayers=function(e,t){return a(this,void 0,void 0,function(){var r,a,i,n,o,l,u,c,y,y;return s(this,function(s){switch(s.label){case 0:r=[],a={layerView:null,printTemplate:t,view:e},i=0,t.preserveScale&&(i=t.outScale||e.scale),n=L.getVisibleLayerViews(e,i),o=0,l=n,s.label=1;case 1:return o<l.length?(u=l[o],c=u.layer,!c.loaded||L.isGroupLayer(c)?[3,23]:(y=void 0,a.layerView=u,L.isBingMapsLayer(c)?(y=this._createBingMapsLayerJSON(c,a),[3,22]):[3,2])):[3,24];case 2:return L.isCSVLayer(c)?[4,this._createCSVLayerJSON(c,a)]:[3,4];case 3:return y=s.sent(),[3,22];case 4:return L.isFeatureLayer(c)?[4,this._createFeatureLayerJSON(c,a)]:[3,6];case 5:return y=s.sent(),[3,22];case 6:return L.isGraphicsLayer(c)?(y=this._createGraphicsLayerJSON(c,a),[3,22]):[3,7];case 7:return L.isImageryLayer(c)?(y=this._createImageryLayerJSON(c,a),[3,22]):[3,8];case 8:return L.isKMLLayer(c)?(y=this._createKMLLayerJSON(c,a),[3,22]):[3,9];case 9:return L.isMapImageLayer(c)?(y=this._createMapImageLayerJSON(c,a),[3,22]):[3,10];case 10:return L.isMapNotesLayer(c)?(y=this._createMapNotesLayerJSON(c,a),[3,22]):[3,11];case 11:return L.isOpenStreetMapLayer(c)?(y=this._createOpenStreetMapLayerJSON(c,a),[3,22]):[3,12];case 12:return L.isStreamLayer(c)?[4,this._createStreamLayerJSON(c,a)]:[3,14];case 13:return y=s.sent(),[3,22];case 14:return L.isTileLayer(c)?(y=this._createTileLayerJSON(c,a),[3,22]):[3,15];case 15:return L.isVectorTileLayer(c)?[4,this._createVectorTileLayerJSON(c,a)]:[3,17];case 16:return y=s.sent(),[3,22];case 17:return L.isWebTileLayer(c)?(y=this._createWebTileLayerJSON(c,a),[3,22]):[3,18];case 18:return L.isWMSLayer(c)?(y=this._createWMSLayerJSON(c,a),[3,22]):[3,19];case 19:return L.isWMTSLayer(c)?(y=this._createWMTSLayerJSON(c,a),[3,22]):[3,20];case 20:return[4,this._createScreenshotJSON(c,a)];case 21:y=s.sent(),s.label=22;case 22:y&&(Array.isArray(y)?r.push.apply(r,y):(y.id=c.id,y.title=this._legendLayerNameMap[c.id]||c.title,y.opacity=c.opacity,y.minScale=c.minScale||0,y.maxScale=c.maxScale||0,r.push(y))),s.label=23;case 23:return o++,[3,1];case 24:return i&&r.forEach(function(e){e.minScale=0,e.maxScale=0}),e.graphics&&e.graphics.length&&(y=this._createFeatureCollectionJSON(null,e.graphics,t))&&r.push(y),[2,r]}})})},t.prototype._createBingMapsLayerJSON=function(e,t){return{culture:e.culture,key:e.key,type:"BingMaps"+("aerial"===e.style?"Aerial":"hybrid"===e.style?"Hybrid":"Road")}},t.prototype._createCSVLayerJSON=function(e,t){var r=t.layerView,i=t.printTemplate;return a(this,void 0,void 0,function(){var t,a;return s(this,function(n){switch(n.label){case 0:return this._legendLayers&&this._legendLayers.push({id:e.id}),this._is11xService?(t={type:"CSV"},e.write(t,{origin:"web-map"}),delete t.popupInfo,delete t.layerType,t.showLabels=i.showLabels&&e.labelsVisible,[3,3]):[3,1];case 1:return[4,this._getGraphics(r)];case 2:return a=n.sent(),[2,this._createFeatureCollectionJSON(e,a,i)];case 3:return[2,t]}})})},t.prototype._createFeatureCollectionJSON=function(e,t,r){var a=this,i=e,n=L.createPolygonLayer(),s=L.createPolylineLayer(),o=L.createPointLayer(),l=L.createMultipointLayer(),u=L.createPointLayer();u.layerDefinition.name="textLayer",delete u.layerDefinition.drawingInfo,i&&("esri.layers.FeatureLayer"===i.declaredClass||"esri.layers.StreamLayer"===i.declaredClass?n.layerDefinition.name=s.layerDefinition.name=o.layerDefinition.name=l.layerDefinition.name=this._legendLayerNameMap[i.id]||i.get("arcgisProps.title")||i.title:"esri.layers.GraphicsLayer"===i.declaredClass&&(t=i.graphics.items));var c=i&&i.renderer&&"esri.renderer.SimpleRenderer"===i.renderer.declaredClass;if(i&&i.renderer&&"function"!=typeof i.get("renderer.field")){var y=i.renderer.toJSON();n.layerDefinition.drawingInfo.renderer=y,s.layerDefinition.drawingInfo.renderer=y,o.layerDefinition.drawingInfo.renderer=y,l.layerDefinition.drawingInfo.renderer=y}else delete n.layerDefinition.drawingInfo,delete s.layerDefinition.drawingInfo,delete o.layerDefinition.drawingInfo,delete l.layerDefinition.drawingInfo;var p=i&&i.fields,d=i&&i.renderer,f=[];d&&"function"!=typeof i.get("renderer.field")&&("class-breaks"===d.type?(p||(p=[{name:d.field,type:"esriFieldTypeDouble"}],d.normalizationField&&p.push({name:d.normalizationField,type:"esriFieldTypeDouble"})),d.field&&f.push(d.field),d.normalizationField&&f.push(d.normalizationField)):"unique-value"===d.type&&(p||(p=[{name:d.field,type:"esriFieldTypeString"}],d.field2&&p.push({name:d.field2,type:"esriFieldTypeString"}),d.field3&&p.push({name:d.field3,type:"esriFieldTypeString"})),d.field&&f.push(d.field),d.field2&&f.push(d.field2),d.field3&&f.push(d.field3))),p&&(n.layerDefinition.fields=p,s.layerDefinition.fields=p,o.layerDefinition.fields=p,l.layerDefinition.fields=p);for(var h,m=t&&t.length,S=this,b=0;b<m;b++)!function(e){var a=t[e]||t.getItemAt(e);if(!1===a.visible||!a.geometry)return"continue";if(h=a.toJSON(),h.hasOwnProperty("popupTemplate")&&delete h.popupTemplate,h.geometry&&h.geometry.z&&delete h.geometry.z,h.symbol&&h.symbol.outline&&"esriCLS"===h.symbol.outline.type&&!S._is11xService)return"continue";if(h.symbol&&h.symbol.outline&&h.symbol.outline.color&&h.symbol.outline.color[3]&&!S._is11xService&&(h.symbol.outline.color[3]=255),i&&i.renderer&&!h.symbol&&("function"==typeof i.renderer.field||i.renderer.compiledFunc||i.renderer.hasVisualVariables())){var c=i.renderer,y=c.getSymbol(a);if(!y)return"continue";h.symbol=y.toJSON(),c.hasVisualVariables()&&L.applyVisualVariables(h.symbol,{renderer:c,graphic:a,symbol:y})}if(h.symbol&&(h.symbol.angle||delete h.symbol.angle,w(h.symbol)?h.symbol=S._convertSvgToPictureMarkerSymbolJson(h.symbol):h.symbol.text&&delete h.attributes),!r||!r.forceFeatureAttributes)if(i&&i.renderer&&"simple"===i.renderer.type)delete h.attributes;else if(f.length){var p={};f.forEach(function(e){h.attributes&&h.attributes.hasOwnProperty(e)&&(p[e]=h.attributes[e])}),h.attributes=p}"polygon"===a.geometry.type?n.featureSet.features.push(h):"polyline"===a.geometry.type?s.featureSet.features.push(h):"point"===a.geometry.type?h.symbol&&h.symbol.text?u.featureSet.features.push(h):o.featureSet.features.push(h):"multipoint"===a.geometry.type?l.featureSet.features.push(h):"extent"===a.geometry.type&&(h.geometry=g.fromExtent(a.geometry).toJSON(),n.featureSet.features.push(h))}(b);var v=[n,s,l,o,u].filter(function(e){return e.featureSet.features.length>0});return v.forEach(function(e){var t=e.featureSet.features.every(function(e){return e.symbol});!t&&!c||r&&r.forceFeatureAttributes||e.featureSet.features.forEach(function(e){delete e.attributes}),t&&delete e.layerDefinition.drawingInfo,e.layerDefinition.drawingInfo&&e.layerDefinition.drawingInfo.renderer&&a._convertSvgRenderer(e.layerDefinition.drawingInfo.renderer)}),v.length?{featureCollection:{layers:v}}:null},t.prototype._createFeatureLayerJSON=function(e,t){var r=t.layerView,i=t.printTemplate,n=t.view;return a(this,void 0,void 0,function(){var t,a,o,l,u,c,y;return s(this,function(s){switch(s.label){case 0:return this._legendLayers&&this._legendLayers.push({id:e.id}),(a=e.renderer,o=a&&("valueExpression"in a&&a.valueExpression||"hasVisualVariables"in a&&a.hasVisualVariables()),l=e.source&&"feature-layer"!==e.source.type,!this._is11xService&&o||e.featureReduction||l||!a||"field"in a&&null!=a.field&&("string"!=typeof a.field||!e.getField(a.field)))?[3,1]:(t={},this._setURLandToken(t,e),e.write(t,{origin:"web-map"}),delete t.layerType,delete t.popupInfo,delete t.visibility,t.showLabels=i.showLabels&&e.labelsVisible,t.layerDefinition&&t.layerDefinition.drawingInfo&&t.layerDefinition.drawingInfo.renderer&&(this._convertSvgRenderer(t.layerDefinition.drawingInfo.renderer),"visualVariables"in a&&a.visualVariables&&a.visualVariables[0]&&(u=a.visualVariables[0],"size"===u.type&&u.maxSize&&"number"!=typeof u.maxSize&&u.minSize&&"number"!=typeof u.minSize&&(c=a.getSizeRangeAtScale(u,n.scale),t.layerDefinition.drawingInfo.renderer.visualVariables[0].minSize=c.minSize,t.layerDefinition.drawingInfo.renderer.visualVariables[0].maxSize=c.maxSize))),[3,3]);case 1:return[4,this._getGraphics(r)];case 2:y=s.sent(),t=this._createFeatureCollectionJSON(e,y,i),s.label=3;case 3:return[2,t]}})})},t.prototype._createGraphicsLayerJSON=function(e,t){var r=t.printTemplate;return this._legendLayers&&this._legendLayers.push({id:e.id}),this._createFeatureCollectionJSON(e,null,r)},t.prototype._createImageryLayerJSON=function(e,t){this._legendLayers&&this._legendLayers.push({id:e.id});var r={bandIds:e.bandIds,compressionQuality:e.compressionQuality,format:e.format,interpolation:e.interpolation};return e.mosaicRule&&(r.mosaicRule=e.mosaicRule.toJSON()),e.renderingRule&&(r.renderingRule=e.renderingRule.toJSON()),this._setURLandToken(r,e),r},t.prototype._createKMLLayerJSON=function(e,t){var a=t.printTemplate;if(this._is11xService){var i={type:"kml"};return e.write(i,{origin:"web-map"}),delete i.layerType,i.url=h.normalize(e.url),i.showLabels=a.showLabels&&e.labelsVisible,i}var n=[],s=t.layerView;s.allVisibleMapImages.forEach(function(t,r){var a={id:e.id+"_image"+r,type:"image",title:e.id,minScale:e.minScale||0,maxScale:e.maxScale||0,opacity:e.opacity,extent:t.extent};"data:image/png;base64,"===t.href.substr(0,22)?a.imageData=t.href.substr(22):a.url=t.href,n.push(a)});var o=s.allVisiblePoints.items.concat(s.allVisiblePolylines.items,s.allVisiblePolygons.items),l=r({id:e.id},this._createFeatureCollectionJSON(null,o,a));return n.push(l),n},t.prototype._createMapImageLayerJSON=function(e,t){var r,a=t.view,i={id:e.id,subLayerIds:[]},n=[],s=a.scale,o=function(e){var t=0===s,r=0===e.minScale||s<=e.minScale,a=0===e.maxScale||s>=e.maxScale;if(e.visible&&(t||r&&a))if(e.sublayers)e.sublayers.forEach(o);else{var l=e.toExportImageJSON().drawingInfo,u=e.toJSON();u.layerDefinition.drawingInfo=l,n.unshift(u),i.subLayerIds.push(e.id)}};return e.sublayers&&e.sublayers.forEach(o),n.length&&(r={layers:n,visibleLayers:i.subLayerIds},this._setURLandToken(r,e),this._legendLayers.push(i)),r},t.prototype._createMapNotesLayerJSON=function(e,t){var r=this,a=t.layerView,i=t.printTemplate,n=[];return a.graphicsViews.forEach(function(e){var t=r._createFeatureCollectionJSON(e,e.graphics,i);t&&n.push.apply(n,t.featureCollection.layers)}),{featureCollection:{layers:n}}},t.prototype._createOpenStreetMapLayerJSON=function(e,t){return{type:"OpenStreetMap"}},t.prototype._createScreenshotJSON=function(e,t){var r=t.printTemplate,i=t.view;return a(this,void 0,void 0,function(){var t,a,n,o,l,u,c,y,p,d;return s(this,function(s){switch(s.label){case 0:return t={type:"image"},a={format:"png",layers:[e],rotation:0},n=this._ssExtent||i.extent.clone(),o=96,l=!0,u=!0,r.exportOptions&&(c=r.exportOptions,c.dpi>0&&(o=c.dpi),c.width>0&&(l=c.width%2==i.width%2),c.height>0&&(u=c.height%2==i.height%2)),"map-only"!==r.layout||!r.preserveScale||r.outScale&&r.outScale!==i.scale||96!==o||l&&u||(a.area={x:0,y:0,width:i.width,height:i.height},l||(a.area.width-=1),u||(a.area.height-=1),this._ssExtent||(y=i.toMap({x:a.area.width,y:a.area.height}),n.ymin=y.y,n.xmax=y.x,this._ssExtent=n)),t.extent=n.clone()._normalize(!0).toJSON(),[4,i.takeScreenshot(a)];case 1:return p=s.sent(),d=h.dataComponents(p.dataUrl),t.imageData=d.data,[2,t]}})})},t.prototype._createStreamLayerJSON=function(e,t){var r=t.layerView,i=t.printTemplate;return a(this,void 0,void 0,function(){var t;return s(this,function(a){switch(a.label){case 0:return this._legendLayers&&this._legendLayers.push({id:e.id}),[4,this._getGraphics(r)];case 1:return t=a.sent(),[2,this._createFeatureCollectionJSON(e,t,i)]}})})},t.prototype._createTileLayerJSON=function(e,t){var r={};return this._setURLandToken(r,e),r},t.prototype._createVectorTileLayerJSON=function(e,t){return a(this,void 0,void 0,function(){var r,a,i;return s(this,function(n){return this._is11xService&&e.serviceUrl&&e.styleUrl&&(r=u.id&&u.id.findCredential(e.styleUrl),a=u.id&&u.id.findCredential(e.serviceUrl),!r&&!a||"2.1.0"!==this._cimVersion)?(i={type:"VectorTileLayer"},i.styleUrl=h.normalize(e.styleUrl),r&&(i.token=r.token),a&&a.token!==i.token&&(i.additionalTokens=[{url:e.serviceUrl,token:a.token}]),[2,i]):[2,this._createScreenshotJSON(e,t)]})})},t.prototype._createWebTileLayerJSON=function(e,t){var r=e.urlTemplate.replace(/\${/g,"{"),a={type:"WebTiledLayer",urlTemplate:r,credits:e.copyright};return e.subDomains&&e.subDomains.length>0&&(a.subDomains=e.subDomains),a},t.prototype._createWMSLayerJSON=function(e,t){var r,a=[],i=function(e){e.visible&&(e.sublayers?e.sublayers.forEach(i):e.name&&a.unshift(e.name))};return e.sublayers&&e.sublayers.forEach(i),a.length&&(r={type:"wms",transparentBackground:e.imageTransparency,visibleLayers:a,url:h.normalize(e.url),version:e.version}),r},t.prototype._createWMTSLayerJSON=function(e,t){var r=e.activeLayer;return{type:"wmts",format:r.imageFormat,layer:r.id,style:r.styleId,tileMatrixSet:r.tileMatrixSetId,url:h.normalize(e.url)}},t.prototype._setURLandToken=function(e,t){t.url&&(e.url=h.normalize(t.url)),t.token&&(e.token=t.token)},t.prototype._convertSvgToPictureMarkerSymbolJson=function(e){this._canvasParent?(this._canvasSurface.clear(),this._canvasSurface.setDimensions(1024,1024)):(this._canvasParent=o.create("div"),this._canvasSurface=l.createSurface(this._canvasParent,1024,1024));var t;t="image/svg+xml"===e.contentType?this._canvasSurface.createObject(l.Image,{src:"data:image/svg+xml;base64,"+e.imageData,width:f.pt2px(e.width),height:f.pt2px(e.height),x:0,y:0}):this._canvasSurface.createObject(l.Path,e.path).setFill(e.color).setStroke(e.outline),"pendingRender"in this._canvasSurface&&this._canvasSurface._render(!0);var r=this._canvasSurface.rawNode.getContext("2d"),a=t.getBoundingBox(),i=Math.ceil(a.width+a.x),n=Math.ceil(a.height+a.y),s=r.getImageData(a.x,a.y,i,n);r.canvas.width=i,r.canvas.height=n,r.putImageData(s,0,0);return{type:"esriPMS",imageData:r.canvas.toDataURL("image/png").substr(22),angle:e.angle,contentType:"image/png",height:e.size?e.size:n-a.y,width:e.size?e.size:i-a.x,xoffset:e.xoffset,yoffset:e.yoffset}},t.prototype._convertSvgRenderer=function(e){var t=this,r=e.type;if("simple"===r&&w(e.symbol))e.symbol=this._convertSvgToPictureMarkerSymbolJson(e.symbol);else if("unique-value"===r||"class-breaks"===r){w(e.defaultSymbol)&&(e.defaultSymbol=this._convertSvgToPictureMarkerSymbolJson(e.defaultSymbol));var a="unique-value"===r?"uniqueValueInfos":"classBreakInfos",i=e[a];i&&i.forEach(function(e){w(e.symbol)&&(e.symbol=t._convertSvgToPictureMarkerSymbolJson(e.symbol))})}},t.prototype._getGraphics=function(e){return e.queryFeatures(M).then(function(e){return e.features})},t.prototype._getPrintDefinition=function(e,t){return a(this,void 0,void 0,function(){var r,a,i,n,o;return s(this,function(s){switch(s.label){case 0:return r=e.view,a=r.spatialReference,n={},[4,this._createOperationalLayers(r,t)];case 1:return n.operationalLayers=s.sent(),i=n,o=this._ssExtent||e.extent||r.extent,a&&a.isWrappable&&(o=o.clone()._normalize(!0),a=o.spatialReference),i.mapOptions={extent:o&&o.toJSON(),spatialReference:a&&a.toJSON(),showAttribution:t.attributionVisible},this._ssExtent=null,r.rotation&&(i.mapOptions.rotation=-r.rotation),t.preserveScale&&(i.mapOptions.scale=t.outScale||r.scale),[2,i]}})})},t.prototype._getGpPrintParams=function(e){return a(this,void 0,void 0,function(){var t,r,a,i,n,o,l,u,c,y,d,f,h,m,g,S,b,L,O,w=this;return s(this,function(s){switch(s.label){case 0:return t=e.template||new x,null==t.showLabels&&(t.showLabels=!0),r=t.exportOptions,i=_.toJSON(t.layout),r&&(n=r.dpi,a={dpi:n},"map_only"!==i.toLowerCase()&&""!==i||(o=r.width,l=r.height,a.outputSize=[o,l])),u=t.layoutOptions,u&&(y=void 0,d=void 0,"Miles"===u.scalebarUnit||"Kilometers"===u.scalebarUnit?(y="Kilometers",d="Miles"):"Meters"!==u.scalebarUnit&&"Feet"!==u.scalebarUnit||(y="Meters",d="Feet"),c={titleText:u.titleText,authorText:u.authorText,copyrightText:u.copyrightText,customTextElements:u.customTextElements,scaleBarOptions:{metricUnit:N.toJSON(y),metricLabel:T[y],nonMetricUnit:N.toJSON(d),nonMetricLabel:T[d]}}),f=null,u&&u.legendLayers&&(f=u.legendLayers.map(function(e){w._legendLayerNameMap[e.layerId]=e.title;var t={id:e.layerId};return e.subLayerIds&&(t.subLayerIds=e.subLayerIds),t})),[4,this._getPrintDefinition(e,t)];case 1:return h=s.sent(),h.operationalLayers&&(g=new RegExp("[\\u4E00-\\u9FFF\\u0E00-\\u0E7F\\u0900-\\u097F\\u3040-\\u309F\\u30A0-\\u30FF\\u31F0-\\u31FF]"),S=/[\u0600-\u06FF]/,b=function(e){var t=e.text,r=e.font,a=r&&r.family&&r.family.toLowerCase();t&&r&&("arial"===a||"arial unicode ms"===a)&&(r.family=g.test(t)?"Arial Unicode MS":"Arial","normal"!==r.style&&S.test(t)&&(r.family="Arial Unicode MS"))},h.operationalLayers.forEach(function(e){e.featureCollection&&e.featureCollection.layers&&e.featureCollection.layers.forEach(function(e){e.layerDefinition&&e.layerDefinition.drawingInfo&&e.layerDefinition.drawingInfo.renderer&&e.layerDefinition.drawingInfo.renderer.symbol&&(m=e.layerDefinition.drawingInfo.renderer,"esriTS"===m.symbol.type&&b(m.symbol)),e.featureSet&&e.featureSet.features&&e.featureSet.features.forEach(function(e){e.symbol&&"esriTS"===e.symbol.type&&b(e.symbol)})})})),e.outSpatialReference&&(h.mapOptions.spatialReference=e.outSpatialReference.toJSON()),p.mixin(h,{exportOptions:a,layoutOptions:c}),p.mixin(h.layoutOptions,{legendOptions:{operationalLayers:null!=f?f:this._legendLayers.slice()}}),this._legendLayers.length=0,L=JSON.stringify(h),O={Web_Map_as_JSON:L,Format:v.toJSON(t.format),Layout_Template:i},e.extraParameters&&p.mixin(O,e.extraParameters),[2,O]}})})},n([m.property({dependsOn:["url","updateDelay"]})],t.prototype,"_geoprocessor",null),n([m.property()],t.prototype,"_gpMetadata",void 0),n([m.property({dependsOn:["_gpMetadata"],readOnly:!0})],t.prototype,"mode",null),n([m.property()],t.prototype,"updateDelay",void 0),t=n([m.subclass("esri.tasks.PrintTask")],t)}(m.declared(b))});