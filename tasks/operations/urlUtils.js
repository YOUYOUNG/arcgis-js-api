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

define(["require","exports"],function(e,r){function t(e){var r={};for(var f in e)if("declaredClass"!==f){var i=e[f];if(null!=i&&"function"!=typeof i)if(Array.isArray(i)){r[f]=[];for(var n=0;n<i.length;n++)r[f][n]=t(i[n])}else"object"==typeof i?i.toJSON&&(r[f]=JSON.stringify(i)):r[f]=i}return r}Object.defineProperty(r,"__esModule",{value:!0}),r.mapParameters=t});