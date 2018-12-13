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

define(["require","exports","../../../../core/libs/gl-matrix-2/gl-matrix","../../../../renderers/support/utils"],function(e,t,o,i){function n(e){return null!==e&&void 0!==e}function r(e){return"number"==typeof e}function a(e){return"string"==typeof e}function l(e){return null==e||a(e)}function s(e,t){e&&e.push(t),f(t)}function u(e){F&&console.warn("[FastSymbolUpdates] "+e)}function f(e){F&&console.info("[FastSymbolUpdates] "+e)}function d(e,t,i,n){void 0===n&&(n=o.mat4f64.create());var r=e||0,a=t||0,l=i||0;return 0!==r&&o.mat4.rotateZ(n,n,-r/180*Math.PI),0!==a&&o.mat4.rotateX(n,n,a/180*Math.PI),0!==l&&o.mat4.rotateY(n,n,l/180*Math.PI),n}function v(e,t,o,a,l){var u=e.minSize,f=e.maxSize;if(e.expression)return s(l,"Could not convert size info: expression not supported"),!1;if(e.useSymbolValue){var d=a.symbolSize[o];return t.minSize[o]=d,t.maxSize[o]=d,t.offset[o]=t.minSize[o],t.factor[o]=0,t.type[o]=1,!0}if(n(e.field))return n(e.stops)?2===e.stops.length&&r(e.stops[0].size)&&r(e.stops[1].size)?(c(e.stops[0].size,e.stops[1].size,e.stops[0].value,e.stops[1].value,t,o),t.type[o]=1,!0):(s(l,"Could not convert size info: stops only supported with 2 elements"),!1):r(u)&&r(f)&&n(e.minDataValue)&&n(e.maxDataValue)?(c(u,f,e.minDataValue,e.maxDataValue,t,o),t.type[o]=1,!0):null!=i.meterIn[e.valueUnit]?(t.minSize[o]=-1/0,t.maxSize[o]=1/0,t.offset[o]=0,t.factor[o]=1/i.meterIn[e.valueUnit],t.type[o]=1,!0):"unknown"===e.valueUnit?(s(l,"Could not convert size info: proportional size not supported"),!1):(s(l,"Could not convert size info: scale-dependent size not supported"),!1);if(!n(e.field)){if(e.stops&&e.stops[0]&&r(e.stops[0].size))return t.minSize[o]=e.stops[0].size,t.maxSize[o]=e.stops[0].size,t.offset[o]=t.minSize[o],t.factor[o]=0,t.type[o]=1,!0;if(r(u))return t.minSize[o]=u,t.maxSize[o]=u,t.offset[o]=u,t.factor[o]=0,t.type[o]=1,!0}return s(l,"Could not convert size info: unsupported variant of sizeInfo"),!1}function c(e,t,o,i,n,r){var a=Math.abs(i-o)>0?(t-e)/(i-o):0;n.minSize[r]=a>0?e:t,n.maxSize[r]=a>0?t:e,n.offset[r]=e-o*a,n.factor[r]=a}function p(e,t,o,i){if(e.normalizationField||e.valueRepresentation)return s(i,"Could not convert size info: unsupported property"),null;if(!l(e.field))return s(i,"Could not convert size info: field is not a string"),null;if(t.size){if(e.field)if(t.size.field){if(e.field!==t.size.field)return s(i,"Could not convert size info: multiple fields in use"),null}else t.size.field=e.field}else t.size={field:e.field,minSize:[0,0,0],maxSize:[0,0,0],offset:[0,0,0],factor:[0,0,0],type:[0,0,0]};var n;switch(e.axis){case"width":return n=v(e,t.size,0,o,i),n?t:null;case"height":return n=v(e,t.size,2,o,i),n?t:null;case"depth":return n=v(e,t.size,1,o,i),n?t:null;case"width-and-depth":return n=v(e,t.size,0,o,i),n&&v(e,t.size,1,o,i),n?t:null;case null:case void 0:case"all":return n=v(e,t.size,0,o,i),n=n&&v(e,t.size,1,o,i),n=n&&v(e,t.size,2,o,i),n?t:null;default:return s(i,'Could not convert size info: unknown axis "'+e.axis+'""'),null}}function z(e,t,o){for(var i=0;i<3;++i){var n=t.unitInMeters;1===e.type[i]&&(n*=t.modelSize[i],e.type[i]=2),e.minSize[i]=e.minSize[i]/n,e.maxSize[i]=e.maxSize[i]/n,e.offset[i]=e.offset[i]/n,e.factor[i]=e.factor[i]/n}var r;if(0!==e.type[0])r=0;else if(0!==e.type[1])r=1;else{if(0===e.type[2])return s(o,"No size axis contains a valid size or scale"),!1;r=2}for(var i=0;i<3;++i)0===e.type[i]&&(e.minSize[i]=e.minSize[r],e.maxSize[i]=e.maxSize[r],e.offset[i]=e.offset[r],e.factor[i]=e.factor[r],e.type[i]=e.type[r]);return!0}function S(e,t,o){e[4*t+0]=o.r/255,e[4*t+1]=o.g/255,e[4*t+2]=o.b/255,e[4*t+3]=o.a}function m(e,t,o){if(e.normalizationField)return s(o,"Could not convert color info: unsupported property"),null;if(a(e.field)){if(!e.stops)return s(o,"Could not convert color info: missing stops or colors"),null;if(e.stops.length>8)return s(o,"Could not convert color info: too many color stops"),null;t.color={field:e.field,values:[0,0,0,0,0,0,0,0],colors:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};for(var i=e.stops,n=0;n<8;++n){var r=Math.min(n,i.length-1),l=i[r];t.color.values[n]=l.value,S(t.color.colors,n,l.color)}}else{if(!(e.stops&&e.stops.length>=0))return s(o,"Could not convert color info: no field and no colors/stops"),null;var u=e.stops&&e.stops.length>=0&&e.stops[0].color;t.color={field:null,values:[0,0,0,0,0,0,0,0],colors:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};for(var n=0;n<8;n++)t.color.values[n]=1/0,S(t.color.colors,n,u)}return t}function y(e,t,o,i){var n=2===o&&"arithmetic"===e.rotationType;t.offset[o]=n?90:0,t.factor[o]=n?-1:1,t.type[o]=1}function b(e,t,o){if(!a(e.field))return s(o,"Could not convert rotation info: field is not a string"),null;if(t.rotation){if(e.field)if(t.rotation.field){if(e.field!==t.rotation.field)return s(o,"Could not convert rotation info: multiple fields in use"),null}else t.rotation.field=e.field}else t.rotation={field:e.field,offset:[0,0,0],factor:[1,1,1],type:[0,0,0]};switch(e.axis){case"tilt":return y(e,t.rotation,0,o),t;case"roll":return y(e,t.rotation,1,o),t;case null:case void 0:case"heading":return y(e,t.rotation,2,o),t;default:return s(o,'Could not convert rotation info: unknown axis "'+e.axis+'""'),null}}function x(e,t,o){if(!e)return null;var i=!t.supportedTypes||!!t.supportedTypes.size,n=!t.supportedTypes||!!t.supportedTypes.color,r=!t.supportedTypes||!!t.supportedTypes.rotation;F&&(o=o||[]);var a=e.reduce(function(e,a){if(!e)return e;if(a.valueExpression)return s(o,"Could not convert visual variables: arcade expressions not supported"),null;switch(a.type){case"size":return i?p(a,e,t,o):e;case"color":return n?m(a,e,o):e;case"rotation":return r?b(a,e,o):e;default:return s(o,"Could not convert visual variables: unsupported type "+a.type),null}},{size:null,color:null,rotation:null});return a&&a.size&&!z(a.size,t,o)?null:a}function h(e){return e&&null!=e.size}function C(e,t){if(T)return u("State not initialized, fast updates disabled (globally disabled)"),{enabled:!1};if(!e)return u("State not initialized, fast updates disabled (no renderer)"),{enabled:!1};if(e.disableFastUpdates)return u("State not initialized, fast updates disabled (renderer.disableFastUpdates set)"),{enabled:!1};var o=x(e.visualVariables,t);return o?(f("State initialized, fast updates enabled"),{enabled:!0,visualVariables:o,materialParameters:V(o,t),requiresShaderTransformation:h(o)}):(u("State not initialized, fast updates disabled (conversion failed)"),{enabled:!1})}function M(e,t,o){if(!t||!e.enabled)return!1;var i=e.visualVariables,n=x(t.visualVariables,o);return n?!!(g(i.size,n.size,"size")&&g(i.color,n.color,"color")&&g(i.rotation,n.rotation,"rotation"))&&(e.visualVariables=n,e.materialParameters=V(n,o),e.requiresShaderTransformation=h(n),f("State updated"),!0):(u("State update failed (conversion failed)"),!1)}function g(e,t,o){if(!!e!=!!t)return u("State update failed ({$name} enabled/disabled)"),!1;if(e&&e.field!==t.field)return u("State update failed ({$name} field changed)"),!1;if(e&&"rotation"===o)for(var i=e,n=t,r=0;r<3;r++)if(i.type[r]!==n.type[r]||i.offset[r]!==n.offset[r]||i.factor[r]!==n.factor[r])return!1;return!0}function V(e,t){var o={vvSizeEnabled:!1,vvSizeMinSize:null,vvSizeMaxSize:null,vvSizeOffset:null,vvSizeFactor:null,vvSizeValue:null,vvColorEnabled:!1,vvColorValues:null,vvColorColors:null,vvSymbolAnchor:null,vvSymbolRotation:null},i=h(e);return e&&e.size?(o.vvSizeEnabled=!0,o.vvSizeMinSize=e.size.minSize,o.vvSizeMaxSize=e.size.maxSize,o.vvSizeOffset=e.size.offset,o.vvSizeFactor=e.size.factor):e&&i&&(o.vvSizeValue=t.transformation.scale),e&&i&&(o.vvSymbolAnchor=t.transformation.anchor,o.vvSymbolRotation=t.transformation.rotation),e&&e.color&&(o.vvColorEnabled=!0,o.vvColorValues=e.color.values,o.vvColorColors=e.color.colors),o}Object.defineProperty(t,"__esModule",{value:!0});var F=!1,T=!1;t.convertVisualVariables=x,t.initFastSymbolUpdatesState=C,t.updateFastSymbolUpdatesState=M,t.getMaterialParams=V;var w;!function(e){function t(e,t,o){return e<t?t:e>o?o:e}function i(e,i,n){if(!e.vvSizeEnabled)return n;o.mat4.copy(r,n),d(e.vvSymbolRotation[2],e.vvSymbolRotation[0],e.vvSymbolRotation[1],r);for(var l=0;l<3;++l){var s=e.vvSizeOffset[l]+i[0]*e.vvSizeFactor[l];a[l]=t(s,e.vvSizeMinSize[l],e.vvSizeMaxSize[l])}return o.mat4.scale(r,r,a),o.mat4.translate(r,r,e.vvSymbolAnchor),r}function n(e,o){if(!e.vvSizeEnabled)return 1;for(var i=-1/0,n=0;n<3;++n){var r=e.vvSizeOffset[n]+o[0]*e.vvSizeFactor[n];i=Math.max(i,t(r,e.vvSizeMinSize[n],e.vvSizeMaxSize[n]))}return i}var r=o.mat4f64.create(),a=o.vec3f64.create();e.evaluateModelTransform=i,e.evaluateModelTransformScaleFactor=n}(w||(w={})),t.evaluateModelTransform=w.evaluateModelTransform,t.evaluateModelTransformScaleFactor=w.evaluateModelTransformScaleFactor});