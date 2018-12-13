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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","dojo/i18n!../nls/common","dojo/i18n!./Directions/nls/Directions","../moment","../core/Collection","../core/Handles","../core/lang","../core/on","../core/watchUtils","../core/accessorSupport/decorators","./Search","./Widget","./Directions/DirectionsViewModel","./Directions/support/CostSummary","./Directions/support/DatePicker","./Directions/support/directionsUtils","./Directions/support/maneuverUtils","./Directions/support/RouteSections","./Directions/support/TimePicker","./support/widget"],function(e,t,r,i,o,s,n,a,l,c,d,u,p,h,v,_,m,g,S,y,f,w,x,T){function b(e){return e.results[0].results[0]}function M(){return[{},{}]}var C="now",I={base:"esri-directions esri-widget esri-widget--panel",directionsButton:"esri-directions__button",clearRouteButton:"esri-directions__clear-route-button",scroller:"esri-directions__scroller",panelContent:"esri-directions__panel-content",panelContentLoading:"esri-directions__panel-content--loading",panelContentError:"esri-directions__panel-content--error",panelContentSignIn:"esri-directions__panel-content--sign-in",loader:"esri-directions__loader",message:"esri-directions__message",travelModeSelect:"esri-directions__travel-modes-select",departureTime:"esri-directions__departure-time",departureTimeSelect:"esri-directions__departure-time-select",directionsSection:"esri-directions__directions-section",departureTimeControls:"esri-directions__departure-time-controls",section:"esri-directions__section",summary:"esri-directions__summary",stopIcon:"esri-directions__stop-icon",interactiveStopIcon:"esri-directions__stop-icon--interactive",removeStopButton:"esri-directions__remove-stop",removeStop:"esri-directions__remove-stop-icon",reverseStops:"esri-directions__reverse-stops",stopIconContainer:"esri-directions__stop-icon-container",lastStopIconContainer:"esri-directions__stop-icon-container--last",stopHandle:"esri-directions__stop-handle",stopInput:"esri-directions__stop-input",stopOptions:"esri-directions__stop-options",stopUnderline:"esri-directions__stop-underline",underlineDragInProcess:"esri-directions__stop-underline--drag-in-process",stopHandleIcon:"esri-directions__stop-handle-icon",verticalSplitter:"esri-directions__vertical-splitter",stopRow:"esri-directions__stop-row",stopRowGhost:"esri-directions__stop-row-ghost",stopRowDragged:"esri-directions__stop-row--dragged",stopRowDropTarget:"esri-directions__stop-row--target",validStopRow:"esri-directions__stop-row--valid",stops:"esri-directions__stops",addStop:"esri-directions__add-stop",addStopText:"esri-directions__add-stop-text",directionCosts:"esri-directions__costs",costsDetails:"esri-directions__costs-details",primaryCosts:"esri-directions__costs-value",secondaryCosts:"esri-directions__other-costs-total",routeActions:"esri-directions__route-actions",maneuvers:"esri-directions__maneuvers",maneuverList:"esri-directions__maneuver-list",maneuverSection:"esri-directions__maneuver-section",maneuverSectionHeader:"esri-directions__maneuver-section-header",maneuverSectionHeaderButton:"esri-directions__maneuver-section-header-toggle-button",maneuverSectionTitle:"esri-directions__maneuver-section-title",collapsibleSection:"esri-directions__maneuver-section--collapsible",maneuverSectionToggle:"esri-directions__maneuver-section-toggle",maneuver:"esri-directions__maneuver",maneuverActive:"esri-directions__maneuver--active",maneuverCosts:"esri-directions__maneuver-costs",maneuverCostsContainer:"esri-directions__maneuver-costs-container",maneuverIcon:"esri-directions__maneuver-icon",cumulativeCost:"esri-directions__cost--cumulative",intermediateCost:"esri-directions__cost--intermediate",horizontalSplitter:"esri-directions__horizontal-splitter",sectionSplitter:"esri-directions__section-splitter",disclaimer:"esri-directions__disclaimer",signInContent:"esri-directions__sign-in-content",signInButton:"esri-directions__sign-in-button",contentTitle:"esri-directions__content-title",warningCard:"esri-directions__warning-card",warningHeader:"esri-directions__warning-header",warningHeading:"esri-directions__warning-heading",warningMessage:"esri-directions__warning-message",stopsIcon:"esri-icon-radio-unchecked",lastStopIcon:"esri-icon-radio-checked",handleIcon:"esri-icon-handle-vertical",addStopIcon:"esri-icon-plus",removeStopIcon:"esri-icon-close",reverseStopIcon:"esri-icon-up-down-arrows",openIcon:"esri-icon-right-triangle-arrow",closeIcon:"esri-icon-down-arrow",warningIcon:"esri-icon-notice-triangle",widgetIcon:"esri-icon-directions",anchor:"esri-widget__anchor",button:"esri-button",buttonSecondary:"esri-button--secondary",buttonTertiary:"esri-button--tertiary",emptyContent:"esri-widget__content--empty",emptyIllustration:"esri-widget__content-illustration--empty",heading:"esri-widget__heading",offscreen:"esri-offscreen",select:"esri-select",screenReaderText:"esri-icon-font-fallback-text"},k={awaitingViewClickStop:"awaiting-view-click-stop"},R=e.toUrl("../themes/base/images/maneuvers/"),D=100;return function(e){function t(t){var r=e.call(this)||this;return r._autoStopRemovalDelay=D,r._costSummary=new g,r._departureTime=C,r._datePicker=new S,r._handles=new c,r._newPlaceholderStop=null,r._routeSections=new w,r._stops=new l(M()),r._stopsToSearches=new Map,r._timePicker=new x,r.goToOverride=null,r.iconClass=I.widgetIcon,r.label=n.widgetLabel,r.maxStops=null,r.routeServiceUrl=null,r.routeSymbol=null,r.searchProperties=null,r.stopSymbols=null,r.view=null,r.viewModel=new m,r}return r(t,e),t.prototype.postInitialize=function(){var e=this;this.own([p.init(this,"viewModel.lastRoute",function(){e._routeSections.routePath=e.get("viewModel.directionLines"),e._activeManeuver=null,e._focusedManeuver=null,e.scheduleRender()}),p.init(this,"viewModel.selectedTravelMode, viewModel.departureTime",function(){e.get("viewModel.stops.length")>1&&e.getDirections()}),p.when(this,"view",function(t,r){if(r&&(e._viewClickHandle=null,e._handles.remove(r)),t){var i=e._prepViewClick();e._handles.add([u.on(t.surface,"mousedown",function(){return e._autoStopRemovalDelay=500}),u.on(t.surface,"mouseup",function(){return e._autoStopRemovalDelay=D}),i],e.view.surface),e._viewClickHandle=i}}),p.whenOnce(this,"routeServiceUrl",function(){return e.viewModel.load()}),p.watch(this,"viewModel.stops.length",function(t){0===t&&(e._stops.toArray().forEach(function(t){return e._removeStop(t,!0)}),e._stops.addMany(M()),e.scheduleRender())})])},t.prototype.destroy=function(){this._datePicker.destroy(),this._timePicker.destroy(),this._stopsToSearches.forEach(function(e){return e.destroy()})},t.prototype.getDirections=function(){return null},t.prototype.zoomToRoute=function(){},t.prototype.render=function(){return T.tsx("div",{class:this.classes(I.base,I.scroller)},this._renderPanelContent())},t.prototype._renderPanelContent=function(){var e,t=this.viewModel.state,r="initializing"===t,i="error"===t&&!this.viewModel.serviceDescription,o="unauthenticated"===t,s=(e={},e[I.panelContentLoading]=r,e[I.panelContentError]=i,e[I.panelContentSignIn]=o,e),a=r?"presentation":"group",l=o?this._renderSignIn():i?this._renderMessage(n.serviceError):r?this._renderLoader():this._renderReadyContent();return T.tsx("div",{class:this.classes(I.panelContent,s),role:a},l)},t.prototype._renderReadyContent=function(){return[this._renderStopsContainer(),this._renderTravelModeOptions(),this._renderDepartureTimeControls(),this._renderSectionSplitter(),this._renderDirectionsContainer(),this._renderDisclaimer()]},t.prototype._renderSignIn=function(){return T.tsx("div",{key:"sign-in",class:I.signInContent},T.tsx("h2",{class:this.classes(I.heading,I.contentTitle)},n.widgetLabel),this._renderPlaceholder(),T.tsx("h3",{class:I.heading},n.signInRequired),T.tsx("button",{class:this.classes(I.button,I.buttonSecondary,I.signInButton),tabIndex:0,onclick:this._handleSignInClick,bind:this},s.auth.signIn))},t.prototype._handleSignInClick=function(){this.viewModel.load()},t.prototype._renderTravelModeOptions=function(){var e=this.viewModel.travelModes;if(0===e.length)return null;var t=this.viewModel.selectedTravelMode,r=t.name||n.travelMode;return T.tsx("select",{"aria-label":r,bind:this,class:this.classes(I.travelModeSelect,I.select),key:"esri-directions__travel-mode-options",onchange:this._handleTravelModeChange,title:r},e.map(function(e){var r=e.id===t.id;return T.tsx("option",{key:e,"data-mode":e,selected:r,value:e.id},e.name)}))},t.prototype._handleTravelModeChange=function(e){var t=e.currentTarget,r=t.item(t.selectedIndex);this.viewModel.selectedTravelMode=r["data-mode"]},t.prototype._renderStopsContainer=function(){return T.tsx("div",{class:I.section,key:"esri-directions__stops-container",role:"group"},this._renderStops())},t.prototype._renderDepartureTimeControls=function(){var e=this._departureTime===C,t=n.departureTime;return T.tsx("div",{class:I.departureTime,key:"esri-directions__departure-time-controls",role:"group"},T.tsx("select",{"aria-label":t,bind:this,class:this.classes(I.departureTimeSelect,I.select),onchange:this._handleDepartureOptionChange,title:t},T.tsx("option",{value:C,selected:e},n.leaveNow),T.tsx("option",{value:"depart-by",selected:!e},n.departBy)),e?null:this._renderTimeControls())},t.prototype._renderStops=function(){var e=this,t=this._stops,r=t.toArray().map(function(r,i){var o,s,a,l,c=t.length,u=i>1&&!r.result,p=(o={},o[I.stopsIcon]=i>=0&&i<c-1,o[I.lastStopIcon]=i===c-1,o),h=(s={},s[I.lastStopIconContainer]=i===c-1,s),v=(a={},a[I.stopRowDragged]=e._draggedStopIndex===i,a[I.stopRowDropTarget]=e._dropTargetStopIndex===i,a[I.validStopRow]=!u,a),_=(l={},l[I.underlineDragInProcess]=!isNaN(e._draggedStopIndex),l),m=t.getItemAt(c-1),g=m&&m.result,S=t.getItemAt(i+1),y=S&&S.result,f=i===c-1,w=i===c-2,x=2===c&&0===i||c>2&&!f&&!w||c>2&&w&&y||c>2&&f&&!r.result,b=2===c||3===c&&!g||u,M=u?"false":"true",C=e._acquireSearch(r),k=n.removeStop,R=n.reverseStops,D=n.unlocated,P=d.substitute({number:i+1,label:r.result?r.result.name:D},n.stopLabelTemplate),H=e.id+"__stop--"+i,z=!!C.searchTerm&&!!C.selectedResult&&!!r.result&&C.selectedResult===r.result;return T.tsx("li",{"aria-label":P,afterCreate:e._handleStopFieldCreation,bind:e,class:e.classes(I.stopRow,v),id:H,key:i,"data-stop-index":i,ondragend:e._handleStopFieldDragEnd,ondragover:e._handleStopFieldDragOver,ondragstart:e._handleStopFieldDragStart,ondrop:e._handleStopFieldDrop},T.tsx("div",{class:I.stopHandle,draggable:M},T.tsx("span",{"aria-hidden":"true",class:e.classes(I.stopIcon,I.handleIcon,I.stopHandleIcon,I.interactiveStopIcon)}),T.tsx("div",{bind:e,"aria-labelledby":H,class:e.classes(I.stopIconContainer,h),"data-stop-index":i,onclick:e._handleStopIconClick,onkeydown:e._handleStopIconClick,role:"button"},T.tsx("span",{class:e.classes(I.stopIcon,p),tabindex:z?"0":null}))),T.tsx("div",{class:I.stopInput},C.render(),T.tsx("div",{class:e.classes(I.stopUnderline,_)})),T.tsx("div",{class:I.stopOptions,role:"group"},T.tsx("div",{"aria-label":k,class:I.removeStopButton,bind:e,"data-stop-index":i,hidden:b,onkeydown:e._handleRemoveStop,onclick:e._handleRemoveStop,role:"button",tabIndex:0,title:k},T.tsx("span",{"aria-hidden":"true",class:e.classes(I.stopIcon,I.removeStop,I.removeStopIcon,I.interactiveStopIcon)}),T.tsx("span",{class:I.screenReaderText},"removeStopTitle")),T.tsx("div",{"aria-label":R,class:I.reverseStops,bind:e,hidden:x,onkeydown:e._handleReverseStops,onclick:e._handleReverseStops,role:"button",tabIndex:0,title:R},T.tsx("span",{"aria-hidden":"true",class:e.classes(I.stopIcon,I.reverseStopIcon,I.interactiveStopIcon)}),T.tsx("span",{class:I.screenReaderText},"removeStopTitle"))))}),i=t.every(function(t){var r=e._stopsToSearches.get(t);return t.result&&r.selectedResult===t.result}),o=this._stops.length>=this.maxStops,s=n.addStop,a=t.length>=2&&i&&!o?T.tsx("div",{"aria-label":s,bind:this,class:I.addStop,key:"esri-directions__add-stop",onfocus:this._handleAddStopFocus,tabIndex:0},T.tsx("span",{"aria-hidden":"true",class:this.classes(I.addStopIcon,I.stopIcon,I.interactiveStopIcon)}),T.tsx("div",{"aria-hidden":"true",class:I.addStopText},s)):null;return T.tsx("div",null,T.tsx("ol",{class:I.stops,role:"group"},r),a)},t.prototype._handleStopIconClick=function(e){var t=e.currentTarget,r=t["data-stop-index"],i=this._stops.getItemAt(r);i&&i.result&&this._centerAtStop(i)},t.prototype._handleClearRouteClick=function(){this.viewModel.reset()},t.prototype._centerAtStop=function(e){this.viewModel.centerAt(e.result.feature)},t.prototype._handleStopFieldCreation=function(e){var t=this._newPlaceholderStop;if(t){var r=e["data-stop-index"],i=this._stops.getItemAt(r);t===i&&this._acquireSearch(i).focus(),this._newPlaceholderStop=null}},t.prototype._handleStopInputBlur=function(e,t){var r=this;if(this._handles.remove(k.awaitingViewClickStop),this.view.cursor=this._previousCursor,!(!!e.selectedResult&&!!t.result&&e.selectedResult===t.result))return"none"!==e.activeMenu||!e.searchTerm||e.selectedResult===t.result&&(e.selectedResult||t.result)?void(e.searchTerm||(this._viewClickHandle.resume(),clearTimeout(this._autoStopRemovalTimeoutId),this._autoStopRemovalTimeoutId=setTimeout(function(){r.destroyed||(r._viewClickHandle.pause(),"searching"===e.viewModel.state)||(r._removeStop(t),!!t.result&&(t.result=null,r._processStops()),r.scheduleRender())},this._autoStopRemovalDelay))):void e.search()},t.prototype._handleStopInputFocus=function(e,t){if(!this._handles.has(k.awaitingViewClickStop)){var r=this,i=r.view,o=r.view.cursor;this._previousCursor=o,this._handles.add(p.init(e,"searchTerm",function(e){i.cursor=0===e.length?"copy":o}),k.awaitingViewClickStop),this._activeStop=t}},t.prototype._prepViewClick=function(){var e=this,t=this.get("viewModel.view"),r=u.pausable(t,"click",this._handleViewClick.bind(this)),i=u.pausable(t.surface,"click",function(){clearTimeout(e._autoStopRemovalTimeoutId),i.pause()});return{remove:function(){i.remove(),r.remove()},pause:function(){i.pause(),r.pause()},resume:function(){i.resume(),r.resume()}}},t.prototype._handleViewClick=function(e){var t=this,r=this._stopsToSearches.get(this._activeStop);r&&!r.searchTerm&&(r.search(e.mapPoint).then(function(e){var i=b(e),o=t._activeStop;o.result=i,o.result.feature.attributes.Name=i.name,r.searchTerm=i.name}),this.scheduleRender()),this._viewClickHandle.pause(),clearTimeout(this._autoStopRemovalTimeoutId)},t.prototype._handleAddStopFocus=function(e){this._addNewPlaceholder()},t.prototype._addNewPlaceholder=function(){if(!this._newPlaceholderStop){var e={};this._stops.add(e),this._newPlaceholderStop=e}},t.prototype._handleReverseStops=function(){this._reverseStops()},t.prototype._reverseStops=function(){this._stops.reverse(),this._processStops()},t.prototype._handleRemoveStop=function(e){var t=e.currentTarget,r=t["data-stop-index"];this._removeStop(this._stops.getItemAt(r)),this._processStops()},t.prototype._removeStop=function(e,t){void 0===t&&(t=!1),this._stops.length<=2&&!t||(this._disposeSearch(e),this._stops.remove(e))},t.prototype._getStopFieldGhost=function(){var e=this._ghost;return e||(e=document.createElement("div"),e.classList.add(I.stopRowGhost,I.offscreen),this._ghost=e),e},t.prototype._handleStopFieldDragStart=function(e){var t=e.currentTarget,r=e.dataTransfer,i=t,o=Number(i["data-stop-index"]);this._draggedStopIndex=o;var s=this._getStopFieldGhost(),n=this._acquireSearch(this._stops.getItemAt(o));s.innerHTML=n.searchTerm||n.activeSource.placeholder,document.body.appendChild(s);var a=s.getBoundingClientRect().height;r.effectAllowed="move",r.setDragImage(s,20,a/2),r.setData("text/plain",i["data-stop-index"])},t.prototype._handleStopFieldDragEnd=function(){this._draggedStopIndex=null,this._dropTargetStopIndex=null,document.body.removeChild(this._getStopFieldGhost())},t.prototype._handleStopFieldDragOver=function(e){var t=e.currentTarget,r=Number(t["data-stop-index"]);if(e.preventDefault(),this._draggedStopIndex===r)return void(this._dropTargetStopIndex=null);this._dropTargetStopIndex=r},t.prototype._handleStopFieldDrop=function(e){e.stopPropagation(),e.preventDefault();var t=e.currentTarget,r=Number(t["data-stop-index"]),i=Number(e.dataTransfer.getData("text/plain"));if(i!==r){var o=this._stops;o.reorder(o.getItemAt(i),r),this._processStops()}},t.prototype._handleDepartureOptionChange=function(){var e=this,t=event.currentTarget,r=t.item(t.selectedIndex);r.value===C?(this._departureTime=C,this.viewModel.departureTime=C,this._handles.remove("departure-time-controls")):"depart-by"===r.value&&(this._departureTime="depart-by",this._handles.add([p.init(this._datePicker,"value",function(){return e._updateDepartureTime()}),p.init(this._timePicker,"value",function(){return e._updateDepartureTime()})],"departure-time-controls"))},t.prototype._updateDepartureTime=function(){var e=this._datePicker.value,t=this._timePicker.value,r=a({date:e.date(),month:e.month(),year:e.year(),hour:t.hour(),minute:t.minute()});this.viewModel.departureTime=r.toDate()},t.prototype._renderTimeControls=function(){return T.tsx("div",{class:I.departureTimeControls,key:"esri-directions__time-controls",role:"group"},this._datePicker.render(),this._timePicker.render())},t.prototype._renderSectionSplitter=function(){return T.tsx("div",{class:I.sectionSplitter})},t.prototype._renderDisclaimer=function(){var e='<a class="'+I.anchor+'" href="http://www.esri.com/legal/software-license" target="_blank">'+n.esriTerms+"</a>",t=d.substitute({esriTerms:e},n.disclaimer);return T.tsx("div",{class:I.disclaimer,innerHTML:t,key:"esri-directions__disclaimer"})},t.prototype._renderDirectionsContainer=function(){return T.tsx("div",{class:this.classes(I.directionsSection,I.section),key:"esri-directions__container"},this._renderDirectionsContainerContent())},t.prototype._renderLoader=function(){return T.tsx("div",{class:I.loader,key:"loader"})},t.prototype._renderWarningCard=function(){return T.tsx("div",{class:I.warningCard,role:"alert"},T.tsx("div",{class:I.warningHeader},T.tsx("span",{class:I.warningIcon,"aria-hidden":"true"}),T.tsx("div",{class:this.classes(I.heading,I.warningHeading)},s.warning)),T.tsx("div",{class:I.warningMessage},n.serviceError))},t.prototype._renderDirectionsContainerContent=function(){var e=this.viewModel,t=e.lastRoute,r=e.state,i="error"===r,o="routing"===r;return i?this._renderWarningCard():o?this._renderLoader():t?T.tsx("div",{class:I.summary,key:"esri-directions__summary",role:"group"},this._renderCosts(),this._renderRouteActions(),this._renderManeuverSections()):T.tsx("div",{key:"esri-directions__placeholder",class:I.emptyContent},this._renderPlaceholder(),T.tsx("h3",{class:this.classes(I.message,I.heading)},n.directionsPlaceholder))},t.prototype._renderPlaceholder=function(){return T.tsx("svg",{class:I.emptyIllustration,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256"},T.tsx("path",{fill:"currentcolor",d:"M192 36c-15.477 0-24 6.034-24 16.99v45.822l24 24 24-24v-45.82C216 42.033 207.477 36 192 36zm20 61.155l-20 20-20-20V52.99c0-8.62 6.73-12.99 20-12.99s20 4.37 20 12.99zM192 52a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 20a8 8 0 1 1 8-8 8.008 8.008 0 0 1-8 8zM92 140.99C92 130.035 83.477 124 68 124s-24 6.034-24 16.99v45.822l24 24 24-24zm-4 44.165l-20 20-20-20V140.99c0-8.62 6.73-12.99 20-12.99s20 4.37 20 12.99zM68 140a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 20a8 8 0 1 1 8-8 8.008 8.008 0 0 1-8 8zm84-44h16v4h-16zm-24 80h4v12h-12v-4h8zm0-28h4v16h-4zm0-52h12v4h-8v8h-4zm0 24h4v16h-4zm-36 64h16v4H92z"}))},t.prototype._renderMessage=function(e){return T.tsx("h3",null,e)},t.prototype._renderRouteActions=function(){return T.tsx("div",{class:I.routeActions},T.tsx("button",{"aria-label":n.clearRoute,class:this.classes(I.clearRouteButton,I.button,I.buttonTertiary),tabIndex:0,onclick:this._handleClearRouteClick,bind:this},n.clearRoute))},t.prototype._renderManeuverSections=function(){var e=this,t=this._routeSections.sections;return T.tsx("div",{class:I.maneuvers,role:"group"},t.map(function(r,i){var o,n,a,l=r.open;r.maneuvers.length>0&&l&&(a=T.tsx("ol",{class:I.maneuverList},r.maneuvers.map(function(t){return e._renderManeuver(t)})));var c,d=t.length>2,u=i===t.length-1,p=(o={},o[I.collapsibleSection]=d,o),h=(n={},n[I.openIcon]=!l,n[I.closeIcon]=l,n);if(d)if(u)c=T.tsx("header",{class:I.maneuverSectionHeader,key:"esri-directions__maneuver-section-header"},T.tsx("span",{"aria-hidden":"true",class:I.lastStopIcon}),T.tsx("h2",{class:e.classes(I.heading,I.maneuverSectionTitle)},r.name));else{var v=l?s.open:s.close;c=T.tsx("header",{class:e.classes(I.maneuverSectionHeader,I.maneuverSectionToggle),key:"esri-directions__maneuver-section-header"},T.tsx("div",{"aria-expanded":l,"aria-label":v,bind:e,class:I.maneuverSectionHeaderButton,"data-maneuver-section":r,onkeydown:e._handleSectionToggle,onclick:e._handleSectionToggle,role:"button",tabIndex:0,title:v},T.tsx("span",{"aria-hidden":"true",class:e.classes(h)}),T.tsx("h2",{class:e.classes(I.heading,I.maneuverSectionTitle)},r.name)))}else c=null;return T.tsx("section",{class:e.classes(I.maneuverSection,p)},c,a)}))},t.prototype._handleSectionToggle=function(e){var t=e.currentTarget,r=t["data-maneuver-section"];r.open=!r.open},t.prototype._renderCosts=function(){var e=this.get("viewModel.directionLines"),t=e[e.length-1],r=a(t.attributes.arriveTimeUTC),i=r.format("LT"),o=r.format("[GMT]ZZ"),s=this._costSummary.set({directionsViewModel:this.viewModel}),l=n.zoomToRoute,c=d.substitute({time:"<strong>"+i+"</strong>",gmt:o},n.etaTemplate),u=n.primaryCosts,p=n.secondaryCosts,h=n.eta;return T.tsx("div",{"aria-label":l,bind:this,class:I.directionCosts,onkeydown:this._handleSummaryInteraction,onclick:this._handleSummaryInteraction,role:"button",tabIndex:0,title:l},T.tsx("div",{class:I.costsDetails,role:"group"},T.tsx("div",{"aria-label":u,class:I.primaryCosts,title:u},s.primary),T.tsx("div",{class:I.verticalSplitter}),T.tsx("div",{"aria-label":p,class:I.secondaryCosts,title:p},s.secondary)),T.tsx("div",{"aria-label":h,innerHTML:c,title:h}))},t.prototype._handleSummaryInteraction=function(){this._activeManeuver=null,this._focusedManeuver=null,this.viewModel.clearHighlights(),this.zoomToRoute()},t.prototype._overrideDefaultSources=function(e){var t=e.view?n.searchFieldPlaceholder:n.viewlessSearchFieldPlaceholder;e.viewModel.defaultSources.forEach(function(e){e.placeholder=t,e.autoNavigate=!1})},t.prototype._acquireSearch=function(e){var t=this,r=this.get("viewModel.view");if(this._stopsToSearches.has(e)){var i=this._stopsToSearches.get(e);return i.view=r,this._overrideDefaultSources(i),i}var s=new v(o({view:r,resultGraphicEnabled:!1,popupEnabled:!1},this.searchProperties));return this._handles.add([s.watch("defaultSources",function(){return t._overrideDefaultSources(s)}),s.on("select-result",function(){e.result=s.selectedResult,e.result.feature.attributes.Name=s.selectedResult.name,t._processStops(),t.scheduleRender()}),s.on("search-focus",function(){return t._handleStopInputFocus(s,e)}),s.on("search-blur",function(){return t._handleStopInputBlur(s,e)})],s),this._stopsToSearches.set(e,s),s},t.prototype._disposeSearch=function(e){this._stopsToSearches.get(e).destroy(),this._stopsToSearches.delete(e)},t.prototype._processStops=function(){var e=this.viewModel;e.stops.removeAll(),e.stops.addMany(this._stops.filter(function(e){return!!e.result}).map(function(e){return e.result.feature})),e.stops.length>1&&e.getDirections()},t.prototype._renderManeuver=function(e){var t,r,i=e.attributes,o=this.get("viewModel.routeParameters.directionsLengthUnits"),s=y.formatDistance(i.length,{toUnits:o}),a=y.formatTime(i.time),l=y.getAssociatedStop(e);y.useSpatiallyLocalTime(e,this.get("viewModel.routeParameters.startTime"))?r=y.toSpatiallyLocalTimeString(i.arriveTimeUTC,i.ETA,this._departureTime===C):s&&(r=a?s+"&nbsp;&middot;<wbr>&nbsp;"+a:s);var c=l,d=this._getFormattedManeuverText(e),u=this._getIconPath(i.maneuverType);if(c)return T.tsx("li",{class:I.maneuver,key:e},T.tsx("header",null,l.attributes.Name));var p="esri-directions__maneuver-"+e.uid,h="esri-directions__cumulative-costs-"+e.uid,v="esri-directions__intermediate-costs-"+e.uid,_=(t={},t[I.maneuverActive]=this._activeManeuver===e,t);return T.tsx("li",{"aria-labelledby":p+" "+h+" "+v,bind:this,class:this.classes(I.maneuver,_),"data-maneuver":e,key:e,onclick:this._handleManeuverClick,onkeydown:this._handleManeuverClick,onfocus:this._handleManeuverFocus,onmouseover:this._handleManeuverMouseOver,onmouseout:this._handleManeuverMouseOut,onblur:this._handleManeuverBlur,tabIndex:0},T.tsx("img",{alt:"",class:I.maneuverIcon,src:u}),T.tsx("div",{class:I.maneuverCostsContainer},T.tsx("span",{id:p,innerHTML:d}),T.tsx("div",{class:I.maneuverCosts},T.tsx("div",{class:I.horizontalSplitter}),T.tsx("div",{id:h,"aria-label":n.cumulativeCosts,class:I.cumulativeCost,innerHTML:"",title:n.cumulativeCosts}),T.tsx("div",{id:v,"aria-label":n.intermediateCosts,class:I.intermediateCost,innerHTML:r,title:n.intermediateCosts}))))},t.prototype._getIconPath=function(e){var t=f.toIconName(e),r=2===window.devicePixelRatio?"@2x":"";return""+R+t+r+".png"},t.prototype._handleManeuverClick=function(e){var t=e.currentTarget,r=t["data-maneuver"];if(this._activeManeuver===r)return this._activeManeuver=null,void this.zoomToRoute();this._activeManeuver=r,this.viewModel.centerAt(r),this.viewModel.highlightSegment(r)},t.prototype._handleManeuverMouseOver=function(e){if(!this._activeManeuver&&!this._focusedManeuver){var t=e.currentTarget,r=t["data-maneuver"];this.viewModel.highlightSegment(r)}},t.prototype._handleManeuverMouseOut=function(){this._activeManeuver||this._focusedManeuver||this.viewModel.clearHighlights()},t.prototype._handleManeuverBlur=function(){this._activeManeuver||(this._focusedManeuver=null,this.viewModel.clearHighlights())},t.prototype._handleManeuverFocus=function(e){if(!this._activeManeuver){var t=e.currentTarget,r=t["data-maneuver"];this._focusedManeuver=r,this.viewModel.highlightSegment(r)}},t.prototype._getFormattedManeuverText=function(e){var t=e.attributes.text,r=e.strings;if(!r)return t;var i=t;return r.forEach(function(e){i=i.replace(e.string,"<strong>"+e.string+"</strong>")}),i},i([h.aliasOf("viewModel.goToOverride")],t.prototype,"goToOverride",void 0),i([h.property()],t.prototype,"iconClass",void 0),i([h.property()],t.prototype,"label",void 0),i([h.aliasOf("viewModel.maxStops")],t.prototype,"maxStops",void 0),i([h.aliasOf("viewModel.routeServiceUrl")],t.prototype,"routeServiceUrl",void 0),i([h.aliasOf("viewModel.routeSymbol")],t.prototype,"routeSymbol",void 0),i([h.property()],t.prototype,"searchProperties",void 0),i([h.aliasOf("viewModel.stopSymbols")],t.prototype,"stopSymbols",void 0),i([h.aliasOf("viewModel.view")],t.prototype,"view",void 0),i([T.renderable(["lastRoute","state","travelModes"]),h.property({type:m})],t.prototype,"viewModel",void 0),i([h.aliasOf("viewModel.getDirections")],t.prototype,"getDirections",null),i([h.aliasOf("viewModel.zoomToRoute")],t.prototype,"zoomToRoute",null),i([T.accessibleHandler()],t.prototype,"_handleStopIconClick",null),i([T.accessibleHandler()],t.prototype,"_handleClearRouteClick",null),i([T.accessibleHandler()],t.prototype,"_handleReverseStops",null),i([T.accessibleHandler()],t.prototype,"_handleRemoveStop",null),i([T.accessibleHandler()],t.prototype,"_handleSectionToggle",null),i([T.accessibleHandler()],t.prototype,"_handleSummaryInteraction",null),i([T.accessibleHandler()],t.prototype,"_handleManeuverClick",null),t=i([h.subclass("esri.widgets.Directions")],t)}(h.declared(_))});