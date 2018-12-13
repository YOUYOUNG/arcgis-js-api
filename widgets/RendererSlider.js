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

define(["./Widgette","./DateTimeTextBox","./RendererSlider/sliderUtils","../core/lang","../core/numberUtils","../renderers/support/utils","dijit/_TemplatedMixin","dijit/form/NumberTextBox","dojo/dnd/move","dojo/dom-construct","dojo/dom-style","dojo/dom-class","dojo/on","dojo/text!./RendererSlider/templates/RendererSlider.html"],function(e,t,i,a,s,n,l,o,r,d,h,u,m,b){return e.createSubclass([l],{declaredClass:"esri.widgets.RendererSlider",templateString:b,_visibleLabels:["data","handle"],_roundedDataLabels:[],_roundedHandleLabels:[],_ratioLabels:[],_minRatioLabel:"",_maxRatioLabel:"",_sliderHeight:null,_isZoomed:!1,_minZoomLabel:"",_maxZoomLabel:"",_maximumNumberEditor:null,_minimumNumberEditor:null,_valueDifferenceByIndex:[],_currentTopValue:[],_isLTR:!0,_ctrlDown:!1,_histogramSurface:null,_css:null,_minPrecisionForSmallNumbers:3,_handles:[],properties:{loaded:!1,intermediateChanges:!0,type:null,minimum:0,maximum:100,values:[],precision:2,handles:[],handlesVisible:!0,primaryHandleIndex:null,ticksVisible:!0,labelsVisible:!0,ratioLabelsVisible:null,minLabel:null,maxLabel:null,isDate:!1},constructor:function(e,t){this._css={container:"esri-renderer-slider",slidernode:"esri-slider-node",sliderarea:"esri-slider-area",sliderarearight:"esri-slider-area-right",moveable:"esri-moveable",handler:"esri-handle",handlerSpan:"esri-handle-span",handlerContainer:"esri-handle-container",handlerLabel:"esri-handle-label",handlerLabelSpan:"esri-handle-label-span",topLabelNode:"esri-top-label-node",bottomLabelNode:"esri-bottom-label-node",topLabelNodeHover:"esri-top-label-node-hover",bottomLabelNodeHover:"esri-bottom-label-node-hover",heatmapTick:"esri-heatmap-tick",handlerTick:"esri-handler-tick",handlerTickTop:"esri-handler-tick-top",handlerTickBottom:"esri-handler-tick-bottom"},this.labelsVisible=e.labelsVisible||this._visibleLabels},startup:function(){this.inherited(arguments);var e=h.get(this._sliderArea,"height");if(this._sliderHeight=e||200,this._checkMinMaxDefaults(),this._isLTR=this.isLeftToRight(),!this._isLTR){var t=h.get(this._sliderNode,"padding-left")+h.get(this._sliderNode,"padding-right"),i=Math.round(h.get(this._sliderNode,"width"));this._sliderNodeWidth_RTL=t+i}this._updateRoundedLabels(),this._generateMoveables(),this._generateMinMaxEditors(),this._generateCtrlKeyListener(),this.watch("values",this._valuesChange),this.watch("minimum, maximum, ratioLabelsVisible",this._updateTimeout),this.loaded=!0,this.emit("load")},setValue:function(e,t,i){var a=this.get("values"),s=a.slice(0);"object"==typeof a[0]?s[e].value=t:s[e]=t,(this.intermediateChanges||i)&&(this.values=s),i?this.emit("stop",{values:this.get("values")}):this.emit("slide",{values:s})},_updateTimeout:function(e,t,i){this._updateSlider()},_updateSlider:function(){this._reset(),this._checkMinMaxDefaults(),this._updateRoundedLabels(),this._generateMoveables(),this._generateMinMaxEditors(),this._generateCtrlKeyListener()},_checkMinMaxDefaults:function(){var e,t,a=this.values;this.minimum===this.maximum&&a&&a.length>0&&(isNaN(a[0])?this.set({minimum:0,maximum:2*a[0].value}):this.set({minimum:0,maximum:2*a[0]})),a&&a.length>0&&(e=isNaN(a[0])?a[0].value:a[0],this.minimum>e&&(this.minimum=e),t=isNaN(a[a.length-1])?a[a.length-1].value:a[a.length-1],this.maximum<t&&(this.maximum=t)),this.precision=i.getCombinedPrecision(this.minimum,this.maximum)},_calculateValueFromHandlePosition:function(e){var t=this.get("minimum"),i=this.get("maximum"),a=this.get("precision"),s=this.get("step")||Math.pow(10,-a);return t<=1&&t>=-1&&i<=1&&i>=-1||a>=this._minPrecisionForSmallNumbers?(e*(i-t)+t)/s*s:parseFloat((Math.round((e*(i-t)+t)/s)*s).toFixed(a))},_generateMoveables:function(){var e,t=this._sliderNode,a=this._sliderHeight,n=this.get("minimum"),l=this.get("maximum"),o=this.get("labelsVisible"),u=this.get("ticksVisible"),m=this.setValue.bind(this),b=this.get("values");this._updateMinMaxLabels(),e=(b||[]).map(function(b,_){var c,p,L,x,N,g,v;return"object"==typeof b&&b.hidden?null:("object"==typeof b&&(b=b.value),c=d.create("div",{style:this._getHandleStyleString(b),className:this._css.moveable},t),c.handleContainer=g=d.create("div",{className:this._css.handlerContainer},c),c.arrowSpan=x=d.create("span",{className:this._css.handlerSpan},g),c.handler=p=d.create("div",{className:this._css.handler},g),"HeatmapSlider"!==this.type&&(!0===o||"object"==typeof o&&-1!==o.indexOf("handles"))&&(L=this._generateHandleLabel(c,_)),u&&this._generateHandleTicks(c,_),N=new r.constrainedMoveable(c,{handle:g,within:!0,constraints:function(){return{t:0,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:a}}.bind(this)}),N.onMoveStart=function(t){var s,n,l,o,r,d,u,m,b=this.handles,p=(b||[]).indexOf(_);this._currentTopValue[_]=t.node.style.top,v=Number(t.node.style.top.replace("px","")),c.labelNode&&c.labelNode._autoPositioned&&(h.set(c.labelNode,"top","3px"),c.labelNode._autoPositioned=!1),i._autoPositionHandleLabels(this.get("moveables")),c._numberEditor&&(c._numberEditor.destroy(),c._numberEditor=null),_!==this.primaryHandleIndex?(b&&b.length>0?(s=null!==b[p-1]?b[p-1]:null,n=null!==b[p+1]?b[p+1]:null,l=e[s],o=e[n]):(l=e[_-1],o=e[_+1]),l&&o?(r=l.style.top,d=o.style.top,u=Number(r.replace("px","")),m=Number(d.replace("px","")),N.constraints=function(){return{t:m+2,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:a-m-(a-u+4)}}.bind(this)):l?(r=l.style.top,u=Number(r.replace("px","")),N.constraints=function(){return{t:0,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:a-(a-u+2)}}.bind(this)):o&&(d=o.style.top,m=Number(d.replace("px","")),N.constraints=function(){return{t:m+2,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:a-(m+2)}}.bind(this))):(b&&b.length>0?(s=null!==b[p-1]?b[p-1]:null,n=null!==b[p+1]?b[p+1]:null,l=e[s],o=e[n]):(l=e[_-1],o=e[_+1]),l&&o&&(r=l.style.top,d=o.style.top,u=Number(r.replace("px","")),m=Number(d.replace("px","")),N.constraints=function(){return{t:2,l:this._isLTR?0:this._sliderNodeWidth_RTL,w:0,h:a-4}}.bind(this)))}.bind(this),N.onMoved=function(t){var s,o,r,d,u,b,c,p;if(_===this.primaryHandleIndex&&(r=Number(this._currentTopValue[_].replace("px",""))-Number(t.node.style.top.replace("px","")),this._currentTopValue[_]=t.node.style.top,(e||[]).forEach(function(e,t){if(e){if(t===_)return;if(d=Number(e.style.top.replace("px","")),b=d-r,s=1-Number(b/a),(o=this._calculateValueFromHandlePosition(s))<n||o>l)return;h.set(e,"top",b+"px"),m(t,o,!1),e.labelNode&&(e.labelNode.spanNode.innerHTML=this.ratioLabelsVisible?this._getLabelValueFromIndex(t):this._formatValue(o.toFixed(6)))}},this)),s=1-Number(t.node.style.top.replace("px",""))/a,o=this._calculateValueFromHandlePosition(s),_!==this.primaryHandleIndex&&this._ctrlDown&&(r=Number(this._currentTopValue[_].replace("px",""))-Number(t.node.style.top.replace("px","")),this._currentTopValue[_]=t.node.style.top,0===_?(d=Number(e[e.length-1].style.top.replace("px","")),u=d+r,u>a&&(u=a),u<0&&(u=0),h.set(e[e.length-1],"top",u+"px"),p=1-u/a,c=this._calculateValueFromHandlePosition(p),m(e.length-1,c,!1),e[e.length-1].labelNode&&(e[e.length-1].labelNode.spanNode.innerHTML=this._formatValue(c.toFixed(6)))):_===e.length-1&&(d=Number(e[0].style.top.replace("px","")),u=d+r,u>a&&(u=a),u<0&&(u=0),h.set(e[0],"top",u+"px"),p=1-u/a,c=this._calculateValueFromHandlePosition(p),m(0,c,!1),e[0].labelNode&&(e[0].labelNode.spanNode.innerHTML=this._formatValue(c.toFixed(6))))),m(_,o,!1),this._updateRoundedLabels(),L){var x=this._formatValue(parseFloat(this._roundValue([o,parseFloat(this._getLabelValueFromIndex(_,!0))])[0]).toFixed(this.precision));L.spanNode.innerHTML=this.ratioLabelsVisible?this._getLabelValueFromIndex(_):x}i._autoPositionHandleLabels(this.get("moveables"))}.bind(this),N.onMoveStop=function(e){var t,n,l;if((l=Number(e.node.style.top.replace("px","")))===v)return void(v=null);if(t=1-l/a,n=this._calculateValueFromHandlePosition(t),m(_,n,!0),this._updateRoundedLabels(),L){var o=s.format(parseFloat(s.round([n,parseFloat(this._getLabelValueFromIndex(_,!0))])[0]).toFixed(this.precision));L.spanNode.innerHTML=this.ratioLabelsVisible?this._getLabelValueFromIndex(_):o}i._autoPositionHandleLabels(this.get("moveables"))}.bind(this),this.handlesVisible||(h.set(p,"display","none"),h.set(x,"display","none")),c)},this),this.moveables=e,i._autoPositionHandleLabels(this.get("moveables"))},_reset:function(){(this.moveables||[]).forEach(function(e){e&&e.parentElement.removeChild(e)},this),this.moveables=[]},_getHandleStyleString:function(e){var t=this.get("minimum"),i=this.get("maximum"),a=(e-t)/(i-t);return"top: "+Math.round((1-a)*this._sliderHeight)+"px; left: "+(this._isLTR?0:this._sliderNodeWidth_RTL)+"px;"},_generateHandleTicks:function(e,t){var i=this._css,a=i.handlerTick+" "+i.handlerTickTop,s=i.handlerTick+" "+i.handlerTickBottom,n=0===t?s:a;"HeatmapSlider"===this.type&&(n+=i.heatmapTick),e.tick=d.create("div",{className:n},e)},_updateLabels:function(){this._updateMinMaxLabels(),this._updateRoundedLabels()},_resetLabelPositions:function(){(this.moveables||[]).forEach(function(e){if(e){var t=e.labelNode;t&&(h.set(t,"top","3px"),e.labelNode._autoPositioned=!1)}})},_generateHandleLabel:function(e,t){var i,a;return i=d.create("div",{className:this._css.handlerLabel},e),a=d.create("span",{className:this._css.handlerLabelSpan,innerHTML:this._getLabelValueFromIndex(t)},i),i.spanNode=a,e.labelNode=i,m(i,"click",function(){this._generateHandleLabelEditor(e,t)}.bind(this)),i},_updateMinMaxLabels:function(){var e,t,i,a,s,n,l=this.minimum,o=this.maximum,r=this.labelsVisible,d=this.minLabel,h=this.maxLabel,u=this._topNodeSpan,m=this._bottomNodeSpan,b=this._isZoomed,_=this._maxZoomLabel,c=this._minZoomLabel,p=this.ratioLabelsVisible,L=this._maxRatioLabel,x=this._minRatioLabel,N=this._roundedDataLabels;!1===r||"object"==typeof r&&-1===r.indexOf("data")?(u.innerHTML="",m.innerHTML=""):b?p?(u.innerHTML=L,m.innerHTML=x):(u.innerHTML=this._formatValue(_),m.innerHTML=this._formatValue(c)):p?(u.innerHTML=L,m.innerHTML=x):(e=isNaN(d)?d:this._roundValue([d,h])[0],t=isNaN(h)?h:this._roundValue([d,h])[1],i=isNaN(e)||null===e?d:this._formatValue(e),a=isNaN(t)||null===t?h:this._formatValue(t),s=this._formatValue(N[0])||this._formatValue(l),n=this._formatValue(N[1])||this._formatValue(o),u.innerHTML=a||n,m.innerHTML=i||s)},_formatValue:function(e){return"string"==typeof e&&(e=Number(e)),this.isDate?n.formatDate(new Date(e),n.timelineDateFormatOptions):s.format(e)},_roundValue:function(e){return this.isDate?e.slice(0):s.round(e)},_updateRoundedLabels:function(){switch(this._roundedDataLabels=this._roundValue([this.minimum,this.maximum]),this.type){case"SizeSlider":case"ClassedSizeSlider":case"ClassedColorSlider":case"UnivariateColorSizeSlider":this._roundedHandleLabels=this._roundValue(this.values);break;case"ColorSlider":case"OpacitySlider":this._roundedHandleLabels=this._roundValue(this._getValuesFromObject(this.values))}this._updateRatioLabels()},_updateRatioLabels:function(){var e,t,i=this.get("ratioLabelsVisible"),a=this.get("minimum"),s=this.get("maximum"),n=this._getValuesFromObject(this.values),l=[];if(i){if("percent"!==i&&"percentTotal"!==i)return void(i=null);"percent"===i?((n||[]).forEach(function(e){l.push(this._getRatioFromValue(e))},this),e=this._formatValue(this._getRatioFromValue(a).toFixed(2)),t=this._formatValue(this._getRatioFromValue(s).toFixed(2))):"percentTotal"===i&&((n||[]).forEach(function(e){l.push(this._getRatioFromValue(e))},this),e=this._formatValue(this._getRatioFromValue(a).toFixed(2)),t=this._formatValue(this._getRatioFromValue(s).toFixed(2))),this._ratioLabels=l,this._minRatioLabel=e+"%",this._maxRatioLabel=t+"%"}},_generateMinMaxEditors:function(){!this.labelsVisible||"object"==typeof this.labelsVisible&&-1===this.labelsVisible.indexOf("data")||"HeatmapSlider"===this.type?(u.remove(this._topNode,this._css.topLabelNodeHover),u.remove(this._botNode,this._css.bottomLabelNodeHover)):(m(this._topNode,"click",this._generateMaxEditor.bind(this)),m(this._botNode,"click",this._generateMinEditor.bind(this)))},_generateMaxEditor:function(){if(!(this._maximumNumberEditor&&this._topLabelNode||this._isZoomed)){var e,i,a=this.get("minLabel"),s=this.get("maxLabel"),n=this.get("maximum"),l=this.handles;if(this._topNodeSpan.innerHTML="",this._topLabelNode=d.create("input",{type:"text"},this._topNode),e=l&&l.length>0?this.values[l[l.length-1]]:this.values[this.values.length-1],"object"==typeof e&&(e=e.value),this.ratioLabelsVisible&&(e=this._getLabelValueFromIndex(this.values.length-1,!0).replace("%",""),n=Number(this._maxRatioLabel.replace("%",""))),this.isDate){i=new t({date:new Date(Number(n)),required:!0,constraints:{min:new Date(e),max:null}},this._topLabelNode);var r={editor:i,editorPropName:"_maximumNumberEditor",spanNode:this._topNodeSpan,operator:"<"};i.on("keydown",this._minMaxKeydownDateHandler.bind(this,r)),i.on("blur",this._minMaxBlurDateValue.bind(this,r)),i.on("date",this._minMaxUpdateDateValue.bind(this,r))}else{i=new o({value:Number(n),required:!0,constraints:{min:e,max:"percentTotal"===this.ratioLabelsVisible?100:null,places:"0,20"}},this._topLabelNode);m(i,"keydown",this._keydownHandler.bind(this,{editor:i,originalValidate:!1})),m(i,"blur",this._minMaxBlurHandler.bind(this,{editor:i,editorPropName:"_maximumNumberEditor",label:s,current:n,spanNode:this._topNodeSpan,index:1,minLabel:a,maxLabel:s,ratioLabel:this._maxRatioLabel})),m(i,"change",this._minMaxChangeHandler.bind(this,{label:s,current:n,spanNode:this._topNodeSpan,index:1,minLabel:a,maxLabel:s,ratioLabel:this._maxRatioLabel,handleValue:e,operator:"<"}))}this._maximumNumberEditor=i,i.startup(),i.focus(),i.textbox.select()}},_generateMinEditor:function(){if(!(this._minimumNumberEditor&&this._botLabelNode||this._isZoomed)){var e,i,a=this.minLabel,s=this.maxLabel,n=this.minimum,l=this.handles;if(this._bottomNodeSpan.innerHTML="",this._botLabelNode=d.create("input",{type:"text"},this._botNode),e=l&&l.length>0?this.values[l[0]]:this.values[0],"object"==typeof e&&(e=e.value),this.ratioLabelsVisible&&(e=String(this._getLabelValueFromIndex(0,!0)).replace("%",""),n=Number(this._minRatioLabel.replace("%",""))),this.isDate){i=new t({date:new Date(Number(n)),required:!0,constraints:{min:null,max:new Date(e)}},this._botLabelNode);var r={editor:i,editorPropName:"_minimumNumberEditor",spanNode:this._bottomNodeSpan,operator:">"};i.on("keydown",this._minMaxKeydownDateHandler.bind(this,r)),i.on("blur",this._minMaxBlurDateValue.bind(this,r)),i.watch("date",this._minMaxUpdateDateValue.bind(this,r))}else{i=new o({value:Number(n),required:!0,constraints:{max:e,min:"percentTotal"===this.ratioLabelsVisible?0:null,places:"0,20"}},this._botLabelNode);m(i,"keydown",this._keydownHandler.bind(this,{editor:i,originalValidate:!1})),m(i,"blur",this._minMaxBlurHandler.bind(this,{editor:i,editorPropName:"_minimumNumberEditor",label:a,current:n,spanNode:this._bottomNodeSpan,index:0,minLabel:a,maxLabel:s,ratioLabel:this._minRatioLabel})),m(i,"change",this._minMaxChangeHandler.bind(this,{label:a,current:n,spanNode:this._bottomNodeSpan,index:0,minLabel:a,maxLabel:s,ratioLabel:this._minRatioLabel,handleValue:e,operator:">"}))}this._minimumNumberEditor=i,i.startup(),i.focus(),i.textbox.select()}},_minMaxBlurHandler:function(e,t){var i=e.editor,a=e.editorPropName,s=e.label,n=e.current,l=e.spanNode,o=e.index,r=e.minLabel,d=e.maxLabel,h=e.ratioLabel,u=isNaN(s)?s:this._roundValue([r,d])[o],m=isNaN(u)||null===u?s:this._formatValue(u),b=this._formatValue(this._roundedDataLabels[o])||this._formatValue(n);this.labelsVisible||"object"==typeof this.labelsVisible&&-1!==this.labelsVisible.indexOf("data")?this.ratioLabelsVisible?l.innerHTML=h:l.innerHTML=m||b:l.innerHTML="",i.destroy(),this[a]=null},_minMaxChangeHandler:function(e,t){var i,s,n,l,o=e.label,r=e.current,d=e.spanNode,h=e.index,u=e.minLabel,m=e.maxLabel,b=e.ratioLabel,_=e.handleValue,c=e.operator;if(("<"===c?t<Number(_):t>Number(_))||isNaN(t)||void 0===t)return i=isNaN(o)?o:this._roundValue([u,m])[h],s=isNaN(i)||null===i?o:this._formatValue(i),n=this._formatValue(this._roundedDataLabels[h])||this._formatValue(r),void(this.ratioLabelsVisible?d.innerHTML=b:d.innerHTML=s||n);l=this.ratioLabelsVisible?this._getValueFromPercent(t):t,d.innerHTML=this.ratioLabelsVisible?l:this._formatValue(t),this.set("<"===c?"maximum":"minimum",l),this._reset(),this._updateRoundedLabels(),this._generateMoveables(),this._generateMinMaxEditors(),this.emit("data-value-change",{min:this.minimum,max:this.maximum,values:a.clone(this.values)})},_minMaxKeydownDateHandler:function(e,t){13===t.keyCode&&e.editor.isValid()&&setTimeout(this._destroyMinMaxHandleEditor.bind(this,e),0)},_minMaxBlurDateValue:function(e,t){setTimeout(this._destroyMinMaxHandleEditor.bind(this,e),0)},_destroyMinMaxHandleEditor:function(e){var t="<"===e.operator?"maximum":"minimum";e.spanNode.innerHTML=this._formatValue(this.get(t)),e.editor.destroy(),this[e.editorPropName]=null},_minMaxUpdateDateValue:function(e){var t=e.editor,i=e.spanNode,s=e.operator,n=t.get("date"),l="<"===s?"maximum":"minimum",o=this.get(l);n=n&&n.getTime();var r=o!==n;r&&(i.innerHTML=this._formatValue(n),this.set(l,n)),this._reset(),this._updateRoundedLabels(),this._generateMoveables(),this._generateMinMaxEditors(),r&&this.emit("data-value-change",{min:this.minimum,max:this.maximum,values:a.clone(this.values)})},_generateHandleLabelEditor:function(e,i){if(!e._numberEditor){var a,s,n,l,r,h,u,b,_=this.get("handles"),c=this.get("maximum"),p=this.get("minimum"),L=this._isZoomed,x=this.get("values"),N=x[i],g=(_||[]).indexOf(i),v=e.labelNode;if("object"==typeof N&&(N=N.value),v.spanNode.innerHTML="",u=d.create("input",{type:"text"},v),_&&_.length>0?(a=null!==_[g-1]?_[g-1]:null,s=null!==_[g+1]?_[g+1]:null,n=x[a],l=x[s],"object"==typeof n&&(n=n.value),"object"==typeof l&&(l=l.value)):(n=x[i-1],l=x[i+1],"object"==typeof n&&(n=n.value),"object"==typeof l&&(l=l.value)),r=void 0!==n&&null!==n?n:L&&!isNaN(this._minZoomLabel)?this._minZoomLabel:p,h=void 0!==l&&null!==l?l:L&&!isNaN(this._maxZoomLabel)?this._maxZoomLabel:c,this.ratioLabelsVisible&&(N=this._getLabelValueFromIndex(i).replace("%",""),r=void 0!==n?Number(String(this._getLabelValueFromIndex(a,!0)).replace("%","")):Number(this._minRatioLabel.replace("%",""))||Number(this._getRatioFromValue(this.minimum)),h=void 0!==l?Number(String(this._getLabelValueFromIndex(s,!0)).replace("%","")):Number(this._maxRatioLabel.replace("%",""))||Number(this._getRatioFromValue(this.maximum))),this.isDate){b=new t({date:new Date(N),required:!0,constraints:{min:new Date(r),max:new Date(h)}},u);var f={editor:b,editorPropName:"_numberEditor",min:p,max:c,index:i,zoomed:L,spanNode:v.spanNode,moveable:e};b.on("keydown",this._stopKeydownDateHandler.bind(this,f)),b.on("blur",this._stopBlurDateHandler.bind(this,f)),b.watch("date",this._stopUpdateDateValue.bind(this,f))}else b=new o({value:N,constraints:{min:r,max:h,places:"0,20"}},u),m(b,"keydown",this._keydownHandler.bind(this,{editor:b,originalValidate:!1})),m(b,"blur",this._blurHandler.bind(this,{editor:b,editorPropName:"_numberEditor",updatedValue:N,min:p,max:c,index:i,zoomed:L,spanNode:v.spanNode,moveable:e})),m(b,"change",this._changeHandler.bind(this,{editor:b,index:i,spanNode:v.spanNode}));e._numberEditor=b,b.focus(),b.textbox.select()}},_keydownHandler:function(e,t){var i=e.originalValidate,a=e.editor;if(!1!==i&&(a.validate=i),13===t.keyCode){var s=a.get("value");void 0===s&&(s=a.get("displayedValue")),s<=a.constraints.max&&s>=a.constraints.min?a.focusNode.blur():(i=a.validate,a.validate(!1),a.validate=function(){return!1})}},_blurHandler:function(e,t){var i=e.editor,a=e.editorPropName,s=e.updatedValue,n=e.min,l=e.max,o=e.index,r=e.zoomed,d=e.spanNode,h=e.moveable;isNaN(i.get("value"))&&i.set("value",s),r&&(i.get("value")>l||i.get("value")<n)&&(this._isZoomed=!1,this.emit("zoom-out")),d.innerHTML=this._getLabelValueFromIndex(o),i.destroy(),h[a]=null},_changeHandler:function(e,t){var i=e.editor,a=e.index,s=e.spanNode,n=t;if(t>i.constraints.max||t<i.constraints.min||isNaN(t)||void 0===t)return void(s.innerHTML=this._getLabelValueFromIndex(a));this.ratioLabelsVisible&&(n=this._getValueFromPercent(t)),"object"==typeof this.values[a]?this.values[a].value=n:this.values[a]=n,this._reset(),this._updateRoundedLabels(),this._generateMoveables(),this._generateMinMaxEditors(),this.emit("handle-value-change",{values:this.values})},_stopKeydownDateHandler:function(e,t){13===t.keyCode&&e.editor.isValid()&&setTimeout(this._destroyHandleEditor.bind(this,e),0)},_stopBlurDateHandler:function(e,t){setTimeout(this._destroyHandleEditor.bind(this,e),0)},_destroyHandleEditor:function(e){e.spanNode.innerHTML=this._getLabelValueFromIndex(e.index),e.editor.destroy(),e.moveable[e.editorPropName]=null},_stopUpdateDateValue:function(e){var t=e.editor,i=e.min,a=e.max,s=e.index,n=e.zoomed,l=e.spanNode,o=t.get("date");o=o&&o.getTime(),n&&(o>a||o<i)&&(this._isZoomed=!1,this.emit("zoom-out"));var r="object"==typeof this.values[s]?this.values[s].value:this.values[s],d=r!==o;d&&("object"==typeof this.values[s]?this.values[s].value=o:this.values[s]=o),l.innerHTML=this._getLabelValueFromIndex(s),this._reset(),this._updateRoundedLabels(),this._generateMoveables(),this._generateMinMaxEditors(),d&&this.emit("handle-value-change",{values:this.values})},_getRatioFromValue:function(e){var t=this.get("ratioLabelsVisible");return"percent"===t?100*e:"percentTotal"===t?e/(1+e)*100:null},_getValueFromPercent:function(e){var t=this.get("ratioLabelsVisible");return"percent"===t?e/100:"percentTotal"===t?e>=100?100:e/(100-e):void 0},_getLabelValueFromIndex:function(e,t){return this.ratioLabelsVisible&&this._ratioLabels[e]?!0===t?parseFloat(this._ratioLabels[e].toFixed(2))+"%":this._formatValue(parseFloat(this._ratioLabels[e].toFixed(2)))+"%":!0===t?this._roundedHandleLabels[e]:this._formatValue(this._roundedHandleLabels[e])},_getValuesFromObject:function(e){var t=[];return(e||[]).forEach(function(e){t.push(e.value)}),t},_getDecimalPlaces:function(e){return s.format(e,{places:"0,20",round:-1}).replace(/^-?\d*\.?|0+$/g,"").length},_collisionCheck:function(e,t){return!(e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom)},_generateCtrlKeyListener:function(){},_valuesChange:function(){this.emit("data-change",{values:this.get("values")})}})});