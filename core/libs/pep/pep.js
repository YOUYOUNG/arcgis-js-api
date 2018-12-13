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

/*!
 * PEP v0.4.2-pre | https://github.com/jquery/PEP
 * Copyright jQuery Foundation and other contributors | http://jquery.org/license
 */

define([],function(){"use strict";function t(t,e){e=e||Object.create(null);var n=document.createEvent("Event");n.initEvent(t,e.bubbles||!1,e.cancelable||!1);for(var i,r=2;r<v.length;r++)i=v[r],n[i]=e[i]||f[r];n.buttons=e.buttons||0;var o=0;return o=e.pressure?e.pressure:n.buttons?.5:0,n.x=n.clientX,n.y=n.clientY,n.pointerId=e.pointerId||0,n.width=e.width||0,n.height=e.height||0,n.pressure=o,n.tiltX=e.tiltX||0,n.tiltY=e.tiltY||0,n.pointerType=e.pointerType||"",n.hwTimestamp=e.hwTimestamp||0,n.isPrimary=e.isPrimary||!1,n}function e(){this.array=[],this.size=0}function n(t,e,n,i){this.addCallback=t.bind(i),this.removeCallback=e.bind(i),this.changedCallback=n.bind(i),C&&(this.observer=new C(this.mutationWatcher.bind(this)))}function i(t){return"body /shadow-deep/ "+r(t)}function r(t){return'[touch-action="'+t+'"]'}function o(t){return"{ -ms-touch-action: "+t+"; touch-action: "+t+"; touch-action-delay: none; }"}function a(){if(D){Y.forEach(function(t){String(t)===t?(_+=r(t)+o(t)+"\n",L&&(_+=i(t)+o(t)+"\n")):(_+=t.selectors.map(r)+o(t.rule)+"\n",L&&(_+=t.selectors.map(i)+o(t.rule)+"\n"))});var t=document.createElement("style");t.textContent=_,document.head.appendChild(t)}}function s(){if(!window.PointerEvent){if(window.PointerEvent=t,window.navigator.msPointerEnabled){var e=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:e,enumerable:!0}),w.registerSource("ms",V)}else w.registerSource("mouse",F),void 0!==window.ontouchstart&&w.registerSource("touch",j);w.register(document)}}function u(t){window.PointerEvent||(window.navigator.msPointerEnabled?w.registerSource("ms",V):(w.registerSource("mouse",F),void 0!==window.ontouchstart&&w.registerSource("touch",j)),w.register(document))}function c(t){if(!w.pointermap.has(t)){var e=new Error("InvalidPointerId");throw e.name="InvalidPointerId",e}}function h(t){if(!t.ownerDocument.contains(t)){var e=new Error("InvalidStateError");throw e.name="InvalidStateError",e}}function l(t){return 0!==w.pointermap.get(t).buttons}function p(){window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:z},releasePointerCapture:{value:H}})}function d(t){window.Element&&!Element.prototype.setPointerCapture&&(t.setPointerCapture=z.bind(t),t.releasePointerCapture=H.bind(t))}var v=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","pageX","pageY"],f=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0],m=window.Map&&window.Map.prototype.forEach,E=m?Map:e;e.prototype={set:function(t,e){if(void 0===e)return this.delete(t);this.has(t)||this.size++,this.array[t]=e},has:function(t){return void 0!==this.array[t]},delete:function(t){this.has(t)&&(delete this.array[t],this.size--)},get:function(t){return this.array[t]},clear:function(){this.array.length=0,this.size=0},forEach:function(t,e){return this.array.forEach(function(n,i){t.call(e,n,i,this)},this)}};var b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which","pageX","pageY","timeStamp"],g=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,0,0,0,0,0,0,0,"",0,!1,"",null,null,0,0,0,0],T={pointerover:1,pointerout:1,pointerenter:1,pointerleave:1},y="undefined"!=typeof SVGElementInstance,w={pointermap:new E,eventMap:Object.create(null),captureInfo:Object.create(null),eventSources:Object.create(null),eventSourceList:[],registerSource:function(t,e){var n=e,i=n.events;i&&(i.forEach(function(t){n[t]&&(this.eventMap[t]=n[t].bind(n))},this),this.eventSources[t]=n,this.eventSourceList.push(n))},register:function(t){for(var e,n=this.eventSourceList.length,i=0;i<n&&(e=this.eventSourceList[i]);i++)e.register.call(e,t)},unregister:function(t){for(var e,n=this.eventSourceList.length,i=0;i<n&&(e=this.eventSourceList[i]);i++)e.unregister.call(e,t)},contains:function(t,e){try{return t.contains(e)}catch(t){return!1}},down:function(t){t.bubbles=!0,this.fireEvent("pointerdown",t)},move:function(t){t.bubbles=!0,this.fireEvent("pointermove",t)},up:function(t){t.bubbles=!0,this.fireEvent("pointerup",t)},enter:function(t){t.bubbles=!1,this.fireEvent("pointerenter",t)},leave:function(t){t.bubbles=!1,this.fireEvent("pointerleave",t)},over:function(t){t.bubbles=!0,this.fireEvent("pointerover",t)},out:function(t){t.bubbles=!0,this.fireEvent("pointerout",t)},cancel:function(t){t.bubbles=!0,this.fireEvent("pointercancel",t)},leaveOut:function(t){this.out(t),this.propagate(t,this.leave,!1)},enterOver:function(t){this.over(t),this.propagate(t,this.enter,!0)},eventHandler:function(t){if(!t._handledByPE){var e=t.type,n=this.eventMap&&this.eventMap[e];n&&n(t),t._handledByPE=!0}},listen:function(t,e){e.forEach(function(e){this.addEvent(t,e)},this)},unlisten:function(t,e){e.forEach(function(e){this.removeEvent(t,e)},this)},addEvent:function(t,e){t.addEventListener(e,this.boundHandler)},removeEvent:function(t,e){t.removeEventListener(e,this.boundHandler)},makeEvent:function(e,n){this.captureInfo[n.pointerId]&&(n.relatedTarget=null);var i=new t(e,n);return n.preventDefault&&(i.preventDefault=n.preventDefault),i._target=i._target||n.target,i},fireEvent:function(t,e){var n=this.makeEvent(t,e);return this.dispatchEvent(n)},cloneEvent:function(t){for(var e,n=Object.create(null),i=0;i<b.length;i++)e=b[i],n[e]=t[e]||g[i],!y||"target"!==e&&"relatedTarget"!==e||n[e]instanceof SVGElementInstance&&(n[e]=n[e].correspondingUseElement);return t.preventDefault&&(n.preventDefault=function(){t.preventDefault()}),n},getTarget:function(t){var e=this.captureInfo[t.pointerId];return e?t._target!==e&&t.type in T?void 0:e:t._target},propagate:function(t,e,n){for(var i=t.target,r=[];!i.contains(t.relatedTarget)&&i!==document;)r.push(i),i=i.parentNode;n&&r.reverse(),r.forEach(function(n){t.target=n,e.call(this,t)},this)},setCapture:function(e,n){this.captureInfo[e]&&this.releaseCapture(e),this.captureInfo[e]=n;var i=new t("gotpointercapture");i.pointerId=e,this.implicitRelease=this.releaseCapture.bind(this,e),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease),i._target=n,this.asyncDispatchEvent(i)},releaseCapture:function(e){var n=this.captureInfo[e];if(n){var i=new t("lostpointercapture");i.pointerId=e,this.captureInfo[e]=void 0,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease),i._target=n,this.asyncDispatchEvent(i)}},dispatchEvent:function(t){var e=this.getTarget(t);if(e)return e.dispatchEvent(t)},asyncDispatchEvent:function(t){requestAnimationFrame(this.dispatchEvent.bind(this,t))}};w.boundHandler=w.eventHandler.bind(w);var P={shadow:function(t){if(t)return t.shadowRoot||t.webkitShadowRoot},canTarget:function(t){return t&&Boolean(t.elementFromPoint)},targetingShadow:function(t){var e=this.shadow(t);if(this.canTarget(e))return e},olderShadow:function(t){var e=t.olderShadowRoot;if(!e){var n=t.querySelector("shadow");n&&(e=n.olderShadowRoot)}return e},allShadows:function(t){for(var e=[],n=this.shadow(t);n;)e.push(n),n=this.olderShadow(n);return e},searchRoot:function(t,e,n){if(t){var i,r,o=t.elementFromPoint(e,n);for(r=this.targetingShadow(o);r;){if(i=r.elementFromPoint(e,n)){var a=this.targetingShadow(i);return this.searchRoot(a,e,n)||i}r=this.olderShadow(r)}return o}},owner:function(t){for(var e=t;e.parentNode;)e=e.parentNode;return e.nodeType!==Node.DOCUMENT_NODE&&e.nodeType!==Node.DOCUMENT_FRAGMENT_NODE&&(e=document),e},findTarget:function(t){var e=t.clientX,n=t.clientY,i=this.owner(t.target);return i.elementFromPoint(e,n)||(i=document),this.searchRoot(i,e,n)}},S=Array.prototype.forEach.call.bind(Array.prototype.forEach),O=Array.prototype.map.call.bind(Array.prototype.map),I=Array.prototype.slice.call.bind(Array.prototype.slice),M=Array.prototype.filter.call.bind(Array.prototype.filter),C=window.MutationObserver||window.WebKitMutationObserver,R={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};n.prototype={watchSubtree:function(t){this.observer&&P.canTarget(t)&&this.observer.observe(t,R)},enableOnSubtree:function(t){this.watchSubtree(t),t===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(t)},installNewSubtree:function(t){S(this.findElements(t),this.addElement,this)},findElements:function(t){return t.querySelectorAll?t.querySelectorAll("[touch-action]"):[]},removeElement:function(t){this.removeCallback(t)},addElement:function(t){this.addCallback(t)},elementChanged:function(t,e){this.changedCallback(t,e)},concatLists:function(t,e){return t.concat(I(e))},installOnLoad:function(){document.addEventListener("readystatechange",function(){"complete"===document.readyState&&this.installNewSubtree(document)}.bind(this))},isElement:function(t){return t.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(t){var e=O(t,this.findElements,this);return e.push(M(t,this.isElement)),e.reduce(this.concatLists,[])},mutationWatcher:function(t){t.forEach(this.mutationHandler,this)},mutationHandler:function(t){if("childList"===t.type){this.flattenMutationTree(t.addedNodes).forEach(this.addElement,this);this.flattenMutationTree(t.removedNodes).forEach(this.removeElement,this)}else"attributes"===t.type&&this.elementChanged(t.target,t.oldValue)}};var Y=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]}],_="",D=window.PointerEvent||window.MSPointerEvent,L=!window.ShadowDOMPolyfill&&document.head.createShadowRoot,N=w.pointermap,X=[1,4,2,8,16],A=!1;try{A=1===new MouseEvent("test",{buttons:1}).buttons}catch(t){}var k,F={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],register:function(t){w.listen(t,this.events)},unregister:function(t){w.unlisten(t,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(t){for(var e,n=this.lastTouches,i=t.clientX,r=t.clientY,o=0,a=n.length;o<a&&(e=n[o]);o++){var s=Math.abs(i-e.x),u=Math.abs(r-e.y);if(s<=25&&u<=25)return!0}},prepareEvent:function(t){var e=w.cloneEvent(t),n=e.preventDefault;return e.preventDefault=function(){t.preventDefault(),n()},e.pointerId=this.POINTER_ID,e.isPrimary=!0,e.pointerType=this.POINTER_TYPE,e},prepareButtonsForMove:function(t,e){var n=N.get(this.POINTER_ID);0!==e.which&&n?t.buttons=n.buttons:t.buttons=0,e.buttons=t.buttons},mousedown:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=N.get(this.POINTER_ID),n=this.prepareEvent(t);A||(n.buttons=X[n.button],e&&(n.buttons|=e.buttons),t.buttons=n.buttons),N.set(this.POINTER_ID,t),e&&0!==e.buttons?w.move(n):w.down(n)}},mousemove:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=this.prepareEvent(t);A||this.prepareButtonsForMove(e,t),e.button=-1,N.set(this.POINTER_ID,t),w.move(e)}},mouseup:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=N.get(this.POINTER_ID),n=this.prepareEvent(t);if(!A){var i=X[n.button];n.buttons=e?e.buttons&~i:0,t.buttons=n.buttons}N.set(this.POINTER_ID,t),n.buttons&=~X[n.button],0===n.buttons?w.up(n):w.move(n)}},mouseover:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=this.prepareEvent(t);A||this.prepareButtonsForMove(e,t),e.button=-1,N.set(this.POINTER_ID,t),w.enterOver(e)}},mouseout:function(t){if(!this.isEventSimulatedFromTouch(t)){var e=this.prepareEvent(t);A||this.prepareButtonsForMove(e,t),e.button=-1,w.leaveOut(e)}},cancel:function(t){var e=this.prepareEvent(t);w.cancel(e),this.deactivateMouse()},deactivateMouse:function(){N.delete(this.POINTER_ID)}},K=w.captureInfo,x=P.findTarget.bind(P),B=P.allShadows.bind(P),U=w.pointermap,j={events:["touchstart","touchmove","touchend","touchcancel"],register:function(t){k.enableOnSubtree(t)},unregister:function(t){},elementAdded:function(t){var e=t.getAttribute("touch-action"),n=this.touchActionToScrollType(e);n&&(t._scrollType=n,w.listen(t,this.events),B(t).forEach(function(t){t._scrollType=n,w.listen(t,this.events)},this))},elementRemoved:function(t){t._scrollType=void 0,w.unlisten(t,this.events),B(t).forEach(function(t){t._scrollType=void 0,w.unlisten(t,this.events)},this)},elementChanged:function(t,e){var n=t.getAttribute("touch-action"),i=this.touchActionToScrollType(n),r=this.touchActionToScrollType(e);i&&r?(t._scrollType=i,B(t).forEach(function(t){t._scrollType=i},this)):r?this.elementRemoved(t):i&&this.elementAdded(t)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(t){var e=t,n=this.scrollTypes;return"none"===e?"none":e===n.XSCROLLER?"X":e===n.YSCROLLER?"Y":n.SCROLLER.exec(e)?"XY":void 0},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(t){return this.firstTouch===t.identifier},setPrimaryTouch:function(t){(0===U.size||1===U.size&&U.has(1))&&(this.firstTouch=t.identifier,this.firstXY={X:t.clientX,Y:t.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(t){t.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var t=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(t,200)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},typeToButtons:function(t){var e=0;return"touchstart"!==t&&"touchmove"!==t||(e=1),e},touchToPointer:function(t){var e=this.currentTouchEvent,n=w.cloneEvent(t),i=n.pointerId=t.identifier+2;n.target=K[i]||x(n),n.bubbles=!0,n.cancelable=!0,n.detail=this.clickCount,n.button=0,n.buttons=this.typeToButtons(e.type),n.width=t.radiusX||t.webkitRadiusX||0,n.height=t.radiusY||t.webkitRadiusY||0,n.pressure=t.force||t.webkitForce||.5,n.isPrimary=this.isPrimaryTouch(t),n.pointerType=this.POINTER_TYPE,n.altKey=e.altKey,n.ctrlKey=e.ctrlKey,n.metaKey=e.metaKey,n.shiftKey=e.shiftKey;var r=this;return n.preventDefault=function(){r.scrolling=!1,r.firstXY=null,e.preventDefault()},n},processTouches:function(t,e){var n=t.changedTouches;this.currentTouchEvent=t;for(var i,r=0;r<n.length;r++)i=n[r],e.call(this,this.touchToPointer(i))},shouldScroll:function(t){if(this.firstXY){var e,n=t.currentTarget._scrollType;if("none"===n)e=!1;else if("XY"===n)e=!0;else{var i=t.changedTouches[0],r=n,o="Y"===n?"X":"Y",a=Math.abs(i["client"+r]-this.firstXY[r]),s=Math.abs(i["client"+o]-this.firstXY[o]);e=a>=s}return this.firstXY=null,e}},findTouch:function(t,e){for(var n,i=0,r=t.length;i<r&&(n=t[i]);i++)if(n.identifier===e)return!0},vacuumTouches:function(t){var e=t.touches;if(U.size>=e.length){var n=[];U.forEach(function(t,i){if(1!==i&&!this.findTouch(e,i-2)){var r=t.out;n.push(r)}},this),n.forEach(this.cancelOut,this)}},touchstart:function(t){this.vacuumTouches(t),this.setPrimaryTouch(t.changedTouches[0]),this.dedupSynthMouse(t),this.scrolling||(this.clickCount++,this.processTouches(t,this.overDown))},overDown:function(t){U.set(t.pointerId,{target:t.target,out:t,outTarget:t.target}),w.enterOver(t),w.down(t)},touchmove:function(t){this.scrolling||(this.shouldScroll(t)?(this.scrolling=!0,this.touchcancel(t)):(t.preventDefault(),this.processTouches(t,this.moveOverOut)))},moveOverOut:function(t){var e=t,n=U.get(e.pointerId);if(n){var i=n.out,r=n.outTarget;w.move(e),i&&r!==e.target&&(i.relatedTarget=e.target,e.relatedTarget=r,i.target=r,e.target?(w.leaveOut(i),w.enterOver(e)):(e.target=r,e.relatedTarget=null,this.cancelOut(e))),n.out=e,n.outTarget=e.target}},touchend:function(t){this.dedupSynthMouse(t),this.processTouches(t,this.upOut)},upOut:function(t){this.scrolling||(w.up(t),w.leaveOut(t)),this.cleanUpPointer(t)},touchcancel:function(t){this.processTouches(t,this.cancelOut)},cancelOut:function(t){w.cancel(t),w.leaveOut(t),this.cleanUpPointer(t)},cleanUpPointer:function(t){U.delete(t.pointerId),this.removePrimaryPointer(t)},dedupSynthMouse:function(t){var e=F.lastTouches,n=t.changedTouches[0];if(this.isPrimaryTouch(n)){var i={x:n.clientX,y:n.clientY};e.push(i);var r=function(t,e){var n=t.indexOf(e);n>-1&&t.splice(n,1)}.bind(null,e,i);setTimeout(r,2500)}}};k=new n(j.elementAdded,j.elementRemoved,j.elementChanged,j);var z,H,G=w.pointermap,q=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,V={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],register:function(t){w.listen(t,this.events)},unregister:function(t){w.unlisten(t,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(t){var e=t;return q&&(e=w.cloneEvent(t),e.pointerType=this.POINTER_TYPES[t.pointerType]),e},cleanup:function(t){G.delete(t)},MSPointerDown:function(t){G.set(t.pointerId,t);var e=this.prepareEvent(t);w.down(e)},MSPointerMove:function(t){var e=this.prepareEvent(t);w.move(e)},MSPointerUp:function(t){var e=this.prepareEvent(t);w.up(e),this.cleanup(t.pointerId)},MSPointerOut:function(t){var e=this.prepareEvent(t);w.leaveOut(e)},MSPointerOver:function(t){var e=this.prepareEvent(t);w.enterOver(e)},MSPointerCancel:function(t){var e=this.prepareEvent(t);w.cancel(e),this.cleanup(t.pointerId)},MSLostPointerCapture:function(t){var e=w.makeEvent("lostpointercapture",t);w.dispatchEvent(e)},MSGotPointerCapture:function(t){var e=w.makeEvent("gotpointercapture",t);w.dispatchEvent(e)}},W=window.navigator;W.msPointerEnabled?(z=function(t){c(t),h(this),l(t)&&this.msSetPointerCapture(t)},H=function(t){c(t),this.msReleasePointerCapture(t)}):(z=function(t){c(t),h(this),l(t)&&w.setCapture(t,this)},H=function(t){c(t),w.releaseCapture(t,this)});var $=window.PointerEvent||window.MSPointerEvent;return{dispatcher:w,Installer:n,PointerEvent:t,PointerMap:E,targetFinding:P,applyGlobal:function(){a(),s(),p()},applyLocal:function(t){$||(u(t),d(t),t.getAttribute("touch-action")||t.setAttribute("touch-action","none"))}}});