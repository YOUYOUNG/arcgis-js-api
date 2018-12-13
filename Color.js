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

define(["require","exports","./core/accessorSupport/ensureType"],function(r,e,t){function n(r){return Math.max(0,Math.min(t.ensureInteger(r),255))}function a(r,e,t){return r=Number(r),isNaN(r)?t:r<e?e:r>t?t:r}function i(r,e,t){t<0&&++t,t>1&&--t;var n=6*t;return n<1?r+(e-r)*n:2*t<1?e:3*t<2?r+(e-r)*(2/3-t)*6:r}var o=function(){function r(r){this.r=255,this.g=255,this.b=255,this.a=1,r&&this.setColor(r)}return r.blendColors=function(e,t,n,a){return void 0===a&&(a=new r),a.r=Math.round(e.r+(t.r-e.r)*n),a.g=Math.round(e.g+(t.g-e.g)*n),a.b=Math.round(e.b+(t.b-e.b)*n),a.a=e.a+(t.a-e.a)*n,a._sanitize()},r.fromRgb=function(e,t){var n=e.toLowerCase().match(/^(rgba?|hsla?)\(([\s\.\-,%0-9]+)\)/);if(n){var a=n[2].split(/\s*,\s*/),o=n[1];if("rgb"===o&&3===a.length||"rgba"===o&&4===a.length){var l=a[0];if("%"===l.charAt(l.length-1)){var s=a.map(function(r){return 2.56*parseFloat(r)});return 4===a.length&&(s[3]=parseFloat(a[3])),r.fromArray(s,t)}return r.fromArray(a.map(function(r){return parseFloat(r)}),t)}if("hsl"===o&&3===a.length||"hsla"===o&&4===a.length){var u=(parseFloat(a[0])%360+360)%360/360,h=parseFloat(a[1])/100,g=parseFloat(a[2])/100,d=g<=.5?g*(h+1):g+h-g*h,b=2*g-d,s=[256*i(b,d,u+1/3),256*i(b,d,u),256*i(b,d,u-1/3),1];return 4===a.length&&(s[3]=parseFloat(a[3])),r.fromArray(s,t)}}return null},r.fromHex=function(e,t){void 0===t&&(t=new r);var n=4===e.length?4:8,a=(1<<n)-1,i=Number("0x"+e.substr(1));return isNaN(i)?null:(["b","g","r"].forEach(function(r){var e=i&a;i>>=n,t[r]=4===n?17*e:e}),t.a=1,t)},r.fromArray=function(e,t){return void 0===t&&(t=new r),t._set(Number(e[0]),Number(e[1]),Number(e[2]),Number(e[3])),isNaN(t.a)&&(t.a=1),t._sanitize()},r.fromString=function(e,t){var n=r.named[e];return n&&r.fromArray(n,t)||r.fromRgb(e,t)||r.fromHex(e,t)},r.toJSON=function(r){return r&&[n(r.r),n(r.g),n(r.b),r.a>1?r.a:n(255*r.a)]},r.fromJSON=function(e){return e&&new r([e[0],e[1],e[2],e[3]/255])},r.toUnitRGB=function(r){return[r.r/255,r.g/255,r.b/255]},r.toUnitRGBA=function(r){return[r.r/255,r.g/255,r.b/255,null!=r.a?r.a:1]},r.prototype.setColor=function(e){return"string"==typeof e?r.fromString(e,this):Array.isArray(e)?r.fromArray(e,this):(this._set(e.r,e.g,e.b,e.a),e instanceof r||this._sanitize()),this},r.prototype.toRgb=function(){return[this.r,this.g,this.b]},r.prototype.toRgba=function(){return[this.r,this.g,this.b,this.a]},r.prototype.toHex=function(){var r=this.r.toString(16),e=this.g.toString(16),t=this.b.toString(16);return"#"+(r.length<2?"0"+r:r)+(e.length<2?"0"+e:e)+(t.length<2?"0"+t:t)},r.prototype.toCss=function(r){void 0===r&&(r=!1);var e=this.r+", "+this.g+", "+this.b;return r?"rgba("+e+", "+this.a+")":"rgb("+e+")"},r.prototype.toString=function(){return this.toCss(!0)},r.prototype.toJSON=function(){return[n(this.r),n(this.g),n(this.b),this.a>1?this.a:n(255*this.a)]},r.prototype.clone=function(){return new r(this.toRgba())},r.prototype._sanitize=function(){return this.r=Math.round(a(this.r,0,255)),this.g=Math.round(a(this.g,0,255)),this.b=Math.round(a(this.b,0,255)),this.a=a(this.a,0,1),this},r.prototype._set=function(r,e,t,n){this.r=r,this.g=e,this.b=t,this.a=n},r.named={transparent:[0,0,0,0],black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],aliceblue:[240,248,255],antiquewhite:[250,235,215],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],blanchedalmond:[255,235,205],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],oldlace:[253,245,230],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],rebeccapurple:[102,51,153],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],whitesmoke:[245,245,245],yellowgreen:[154,205,50]},r}();return o.prototype.declaredClass="esri.Color",o});