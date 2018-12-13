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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../Color","./support/colors","./support/utils"],function(e,r,a,o,n,i){function s(e,r){return e.map(function(e){var a=new o(e);return null!=r&&(a.a=r),a})}function t(e,r,a,o){var n,s=f.getColors(e,a,o);if(s){1===i.hasIdenticalColors(r,s)&&(n=e)}return n}function l(e,r,a,o){var n,i=1;do{(n=t(e,r,a,o))||(e=f.flipColors(e),i++)}while(!n&&i<=4);return n}function p(e,r,a){return l(e,r,a,"HH")||l(e,r,a,"HL")||l(e,r,a,"LH")||l(e,r,a,"LL")}function c(e,r,a,i,t){var l,p=n[e];if(p){var c=i+"/"+t+"/"+e,u=[];for(var m in p){var h=+m,d=p[m].map(function(e){return s(e)});u.push({numClasses:h,colors:d})}var y=new o(r.noDataColor);switch(a){case"point":var f=r;l={id:c,colorsForClassBreaks:u,noDataColor:y,opacity:1,outline:{color:new o(f.outline.color),width:f.outline.width},size:f.size};break;case"polyline":l={id:c,colorsForClassBreaks:u,noDataColor:y,opacity:1,width:r.width};break;case"polygon":var g=r;l={id:c,colorsForClassBreaks:u,noDataColor:y,opacity:g.fillOpacity,outline:{color:new o(g.outline.color),width:g.outline.width}};break;case"mesh":l={id:c,colorsForClassBreaks:u,noDataColor:y,opacity:r.fillOpacity}}}return l}function u(e,r,a){var o=y[r],n=i.getStorageType(a),s=o&&o[n];return s&&s[e]}var m={light:{color:[153,153,153,.25],width:"1px"},dark:{color:[153,153,153,.25],width:"1px"},darker:{color:[26,26,26,.25],width:"1px"}},h={lightBasemaps:{primary:"relationship-blue-orange-brown",secondary:["relationship-brewer-yellow-blue-black","relationship-brewer-pink-blue-purple","relationship-purple-green-blue","relationship-blue-green-purple","relationship-blue-orange-green","relationship-mustard-blue-wine","relationship-pink-blue-purple","relationship-olive-blue-green","relationship-yellow-cyan-blue","relationship-blue-pink-purple","relationship-purple-green-wine"]},darkBasemaps:{primary:"relationship-blue-orange-brown",secondary:["relationship-brewer-yellow-blue-black","relationship-brewer-pink-blue-purple","relationship-purple-green-blue","relationship-blue-green-purple","relationship-blue-orange-green","relationship-mustard-blue-wine","relationship-pink-blue-purple","relationship-olive-blue-green","relationship-yellow-cyan-blue","relationship-blue-pink-purple","relationship-purple-green-wine"]}},d={default:{name:"default",label:"Default",description:"Default theme for visualizing features based on relationship between two attributes.",basemapGroups:{light:["streets","gray","topo","terrain","national-geographic","oceans","osm","gray-vector","streets-vector","topo-vector","streets-relief-vector","streets-navigation-vector"],dark:["satellite","hybrid","dark-gray","dark-gray-vector","streets-night-vector"]},pointSchemes:{light:{common:{noDataColor:"#aaaaaa",outline:m.light,size:"8px"},primary:h.lightBasemaps.primary,secondary:h.lightBasemaps.secondary},dark:{common:{noDataColor:"#aaaaaa",outline:m.darker,size:"8px"},primary:h.darkBasemaps.primary,secondary:h.darkBasemaps.secondary}},polylineSchemes:{light:{common:{noDataColor:"#aaaaaa",width:"2px"},primary:h.lightBasemaps.primary,secondary:h.lightBasemaps.secondary},dark:{common:{noDataColor:"#aaaaaa",width:"2px"},primary:h.darkBasemaps.primary,secondary:h.darkBasemaps.secondary}},polygonSchemes:{light:{common:{noDataColor:"#aaaaaa",outline:m.light,fillOpacity:.8},primary:h.lightBasemaps.primary,secondary:h.lightBasemaps.secondary},dark:{common:{noDataColor:"#aaaaaa",outline:m.dark,fillOpacity:.8},primary:h.darkBasemaps.primary,secondary:h.darkBasemaps.secondary}}}},y={};!function(){for(var e in d){var r=d[e],a=r.basemapGroups,o=y[e]={basemaps:[].concat(a.light).concat(a.dark),point:{},polyline:{},polygon:{}};for(var n in a)for(var i=a[n],s=0;s<i.length;s++){var t=i[s];r.pointSchemes&&(o.point[t]=r.pointSchemes[n]),r.polylineSchemes&&(o.polyline[t]=r.polylineSchemes[n]),r.polygonSchemes&&(o.polygon[t]=r.polygonSchemes[n])}}}();var f={getThemes:function(e){var r=[];for(var a in d){var o=d[a],n=y[a],s=i.getBasemapId(e,n.basemaps);s&&-1===n.basemaps.indexOf(s)||r.push({name:o.name,label:o.label,description:o.description,basemaps:n.basemaps.slice(0)})}return r},getSchemes:function(e){var r,a=e.geometryType,o="mesh"!==a&&e.worldScale,n=e.view,s=e.theme||"default",t=i.getBasemapId(e.basemap,y[s].basemaps),l=u(t,s,a);if(l){var p=c(l.primary,l.common,a,s,t);r={primaryScheme:o?f.toWorldScale({scheme:p,view:n}):p,secondarySchemes:l.secondary.map(function(e){var r=c(e,l.common,a,s,t);return o?f.toWorldScale({scheme:r,view:n}):r}),basemapId:t}}return r},cloneScheme:function(e){var r;return e&&(r=a({},e),r.colorsForClassBreaks=r.colorsForClassBreaks.map(function(e){var r=e.colors.map(function(e){return s(e)});return{numClasses:e.numClasses,colors:r}}),r.noDataColor&&(r.noDataColor=new o(r.noDataColor)),r.outline&&(r.outline={color:r.outline.color&&new o(r.outline.color),width:r.outline.width})),r},flatten2DArray:function(e,r){var a=[],o=(r||"HH").split(""),n=o[0],i=o[1];"L"===n&&e.reverse();var s="H"===i;return e.forEach(function(e){s&&e.reverse(),a=a.concat(e)}),a},getColors:function(e,r,a){var o;return e.colorsForClassBreaks.some(function(e){return e.numClasses===r&&(o=e.colors),!!o}),o=o.map(function(e){return s(e)}),o?f.flatten2DArray(o,a):null},flipColors:function(e,r){var a=r?e:f.cloneScheme(e);return a.colorsForClassBreaks.forEach(function(e){for(var r=e.colors.reverse(),a=[],o=0;o<e.numClasses;o++)!function(e){var o=[];r.forEach(function(r){o.push(r[e])}),a.push(o)}(o);e.colors=a}),a},getMatchingSchemes:function(e){var r=e.theme,a=e.geometryType,o=e.colors,n=e.numClasses,i=y[r].basemaps,s=[];return i.forEach(function(e){var i=f.getSchemes({theme:r,basemap:e,geometryType:a});if(i){var t=p(i.primaryScheme,o,n);t&&s.push(t),i.secondarySchemes.forEach(function(e){(t=p(e,o,n))&&s.push(t)})}}),s},toWorldScale:function(e){if(e.scheme&&e.view){var r=e.scheme,a=e.scheme;if(r.hasOwnProperty("size"))return r.size&&(r.size=i.toWorldScale(r.size,e.view)),r;if(a.hasOwnProperty("width"))return a.width&&(a.width=i.toWorldScale(a.width,e.view)),a}return e.scheme}};return f});