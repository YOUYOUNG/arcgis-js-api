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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/cookie","dojo/io-query","dojo/regexp","dojo/_base/url","../config","../kernel","../request","../core/Accessor","../core/deferredUtils","../core/Error","../core/Evented","../core/global","../core/has","../core/lang","../core/object","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","./OAuthCredential","./OAuthInfo","./ServerInfo"],function(e,r,t,i,s,n,o,a,l,u,h,c,p,d,f,v,_,g,m,S,y,w,I,k,U,A){Object.defineProperty(r,"__esModule",{value:!0});var T={},x=function(e){var r=new l(e.owningSystemUrl).host,t=new l(e.server).host,i=/.+\.arcgis\.com$/i;return i.test(r)&&i.test(t)},C=function(e,r){return!!(x(e)&&r&&r.some(function(r){return r.test(e.server)}))},P=function(e){function r(){var r=e.call(this)||this;return r._portalConfig=_.esriGeowConfig,r.serverInfos=[],r.oAuthInfos=[],r.credentials=[],r._soReqs=[],r._xoReqs=[],r._portals=[],r.defaultOAuthInfo=null,r.defaultTokenValidity=60,r.tokenValidity=null,r.signInPage=null,r.useSignInPage=!0,r.normalizeWebTierAuth=!1,r._busy=null,r._rejectOnPersistedPageShow=!1,r._oAuthHash=null,r._gwTokenUrl="/sharing/rest/generateToken",r._agsRest="/rest/services",r._agsPortal=/\/sharing(\/|$)/i,r._agsAdmin=/https?:\/\/[^\/]+\/[^\/]+\/admin\/?(\/.*)?$/i,r._adminSvcs=/\/admin\/services(\/|$)/i,r._agolSuffix=".arcgis.com",r._gwDomains=[{regex:/https?:\/\/www\.arcgis\.com/i,tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"},{regex:/https?:\/\/dev\.arcgis\.com/i,tokenServiceUrl:"https://dev.arcgis.com/sharing/rest/generateToken"},{regex:/https?:\/\/.*dev[^.]*\.arcgis\.com/i,tokenServiceUrl:"https://devext.arcgis.com/sharing/rest/generateToken"},{regex:/https?:\/\/.*qa[^.]*\.arcgis\.com/i,tokenServiceUrl:"https://qaext.arcgis.com/sharing/rest/generateToken"},{regex:/https?:\/\/.*\.arcgis\.com/i,tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"}],r._legacyFed=[],r._regexSDirUrl=/http.+\/rest\/services\/?/gi,r._regexServerType=/(\/(MapServer|GeocodeServer|GPServer|GeometryServer|ImageServer|NAServer|FeatureServer|GeoDataServer|GlobeServer|MobileServer|GeoenrichmentServer|VectorTileServer|SceneServer)).*/gi,r._gwUser=/http.+\/users\/([^\/]+)\/?.*/i,r._gwItem=/http.+\/items\/([^\/]+)\/?.*/i,r._gwGroup=/http.+\/groups\/([^\/]+)\/?.*/i,r._errorCodes=[499,498,403,401],r._rePortalTokenSvc=/\/sharing(\/rest)?\/generatetoken/i,r._publicUrls=[/\/arcgis\/tokens/i,/\/sharing(\/rest)?\/generatetoken/i,/\/rest\/info/i],r._createDefaultOAuthInfo=!0,r._hasTestedIfAppIsOnPortal=!1,r._getOAuthHash(),window.addEventListener("pageshow",function(e){r._pageShowHandler(e)}),r}return i(r,e),r.prototype.registerServers=function(e){var r=this,t=this.serverInfos;t?(e=e.filter(function(e){return!r.findServerInfo(e.server)}),this.serverInfos=t.concat(e)):this.serverInfos=e,e.forEach(function(e){e.owningSystemUrl&&r._portals.push(e.owningSystemUrl),e.hasPortal&&r._portals.push(e.server)})},r.prototype.registerOAuthInfos=function(e){var r=this,t=this.oAuthInfos;t?(e=e.filter(function(e){return!r.findOAuthInfo(e.portalUrl)}),this.oAuthInfos=t.concat(e)):this.oAuthInfos=e},r.prototype.registerToken=function(e){e=t({},e);var r,i=this._sanitizeUrl(e.server),s=this._isServerRsrc(i),n=this.findServerInfo(i),o=!0;n||(n=new A,n.server=this._getServerInstanceRoot(i),s?n.hasServer=!0:(n.tokenServiceUrl=this._getTokenSvcUrl(i),n.hasPortal=!0),this.registerServers([n])),r=this._findCredential(i),r?(delete e.server,m.mixin(r,e),o=!1):(r=new O({userId:e.userId,server:n.server,token:e.token,expires:e.expires,ssl:e.ssl,scope:s?"server":"portal"}),r.resources=[i],this.credentials.push(r)),r.emitTokenChange(!1),o||r.refreshServerTokens()},r.prototype.toJSON=function(){return m.fixJson({serverInfos:this.serverInfos.map(function(e){return e.toJSON()}),oAuthInfos:this.oAuthInfos.map(function(e){return e.toJSON()}),credentials:this.credentials.map(function(e){return e.toJSON()})})},r.prototype.initialize=function(e){var r=this;if(e){"string"==typeof e&&(e=JSON.parse(e));var t=e.serverInfos,i=e.oAuthInfos,s=e.credentials;if(t){var n=[];t.forEach(function(e){e.server&&e.tokenServiceUrl&&n.push(e.declaredClass?e:new A(e))}),n.length&&this.registerServers(n)}if(i){var o=[];i.forEach(function(e){e.appId&&o.push(e.declaredClass?e:new U(e))}),o.length&&this.registerOAuthInfos(o)}s&&s.forEach(function(e){e.server&&e.token&&e.expires&&e.expires>(new Date).getTime()&&(e=e.declaredClass?e:new O(e),e.emitTokenChange(),r.credentials.push(e))})}},r.prototype.findServerInfo=function(e){var r;e=this._sanitizeUrl(e);for(var t=0,i=this.serverInfos;t<i.length;t++){var s=i[t];if(this._hasSameServerInstance(s.server,e)){r=s;break}}return r},r.prototype.findOAuthInfo=function(e){var r;e=this._sanitizeUrl(e);for(var t=0,i=this.oAuthInfos;t<i.length;t++){var s=i[t];if(this._hasSameServerInstance(s.portalUrl,e)){r=s;break}}return r},r.prototype.findCredential=function(e,r){var t,i;if(e=this._sanitizeUrl(e),i=this._isServerRsrc(e)?"server":"portal",r)for(var s=0,n=this.credentials;s<n.length;s++){var o=n[s];if(this._hasSameServerInstance(o.server,e)&&r===o.userId&&o.scope===i){t=o;break}}else for(var a=0,l=this.credentials;a<l.length;a++){var o=l[a];if(this._hasSameServerInstance(o.server,e)&&-1!==this._getIdenticalSvcIdx(e,o)&&o.scope===i){t=o;break}}return t},r.prototype.getCredential=function(e,r){var t,i,s=!0;r&&(t=!!r.token,i=r.error,s=!1!==r.prompt),e=this._sanitizeUrl(e);var o,a=d.makeDeferredCancellingPending(),l=this._isAdminResource(e),u=t&&this._doPortalSignIn(e)?this._getEsriAuthCookie():null,h=t?this.findCredential(e):null;if(h&&i&&498===i.code)h.destroy(),u&&u.token===r.token&&n("esri_auth",null,{expires:-1,path:"/",domain:document.domain});else if(u||h){var c=u&&u.email||h&&h.userId;return o=new f("identity-manager:not-authorized","You are currently signed in as: '"+c+"'. You do not have access to this resource: "+e,{error:i}),a.reject(o),a.promise}var p=this._findCredential(e,r);if(p)return a.resolve(p),a.promise;var v=this.findServerInfo(e);if(v)!v.hasServer&&this._isServerRsrc(e)&&(v._restInfoPms=this._getTokenSvcUrl(e),v.hasServer=!0);else{var _=this._getTokenSvcUrl(e);if(!_)return o=new f("identity-manager:unknown-resource","Unknown resource - could not find token service endpoint."),a.reject(o),a.promise;v=new A,v.server=this._getServerInstanceRoot(e),"string"==typeof _?(v.tokenServiceUrl=_,v.hasPortal=!0):(v._restInfoPms=_,v.hasServer=!0),this.registerServers([v])}return s&&v.hasPortal&&void 0===v._selfReq&&!this._findOAuthInfo(e)&&(v._selfReq={owningTenant:r&&r.owningTenant,selfDfd:this._getPortalSelf(v.tokenServiceUrl.replace(this._rePortalTokenSvc,"/sharing/rest/portals/self"),e)}),this._enqueue(e,v,r,a,l)},r.prototype.getResourceName=function(e){return this._isRESTService(e)?e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"")||"":this._gwUser.test(e)&&e.replace(this._gwUser,"$1")||this._gwItem.test(e)&&e.replace(this._gwItem,"$1")||this._gwGroup.test(e)&&e.replace(this._gwGroup,"$1")||""},r.prototype.generateToken=function(e,r,t){var i,s,n,o,a,u,p,d,v,_=this._rePortalTokenSvc.test(e.tokenServiceUrl),g=new l(window.location.href.toLowerCase()),S=this._getEsriAuthCookie(),y=e.shortLivedTokenValidity;return r&&(v=h.id.tokenValidity||y||h.id.defaultTokenValidity)>y&&y>0&&(v=y),t&&(s=t.isAdmin,n=t.serverUrl,o=t.token,p=t.ssl,e.customParameters=t.customParameters),s?a=e.adminTokenServiceUrl:(a=e.tokenServiceUrl,u=new l(a.toLowerCase()),S&&(i=S.auth_tier,i=i&&i.toLowerCase()),("web"===i||e.webTierAuth)&&t&&t.serverUrl&&!p&&"http"===g.scheme&&(w.hasSameOrigin(g.uri,a,!0)||"https"===u.scheme&&g.host===u.host&&"7080"===g.port&&"7443"===u.port)&&(a=a.replace(/^https:/i,"http:").replace(/:7443/i,":7080"))),d=m.mixin({query:m.mixin({request:"getToken",username:r&&r.username,password:r&&r.password,serverUrl:n,token:o,expiration:v,referer:s||_?window.location.host:null,client:s?"referer":null,f:"json"},e.customParameters),method:"post",authMode:"anonymous",useProxy:this._useProxy(e,t),responseType:"json"},t&&t.ioArgs),_||(d.withCredentials=!1),c(a,d).then(function(t){var i=t.data;if(!i||!i.token)return new f("identity-manager:authentication-failed","Unable to generate token");var s=e.server;return T[s]||(T[s]={}),r&&(T[s][r.username]=r.password),i.validity=v,i})},r.prototype.isBusy=function(){return!!this._busy},r.prototype.checkSignInStatus=function(e){return this.checkAppAccess(e,"").then(function(e){return e.credential})},r.prototype.checkAppAccess=function(e,r,t){var i=this;return this.getCredential(e,{prompt:!1}).then(function(s){var n,o={f:"json"};if("portal"===s.scope)if(r&&(i._doPortalSignIn(e,!0)||t&&t.force))n=s.server+"/sharing/rest/oauth2/validateAppAccess",o.client_id=r;else{if(!s.token)return{credential:s};n=s.server+"/sharing/rest"}else{if(!s.token)return{credential:s};n=s.server+"/rest/services"}return s.token&&(o.token=s.token),c(n,{query:o,authMode:"anonymous"}).then(function(e){if(!1===e.data.valid)throw new f("identity-manager:not-authorized","You are currently signed in as: '"+s.userId+"'.");return{credential:s}}).catch(function(e){if("identity-manager:not-authorized"===e.name)throw e;var r=e.details&&e.details.httpStatus;if(498===r)throw s.destroy(),new f("identity-manager:not-authenticated","User is not signed in.");if(400===r)throw new f("identity-manager:invalid-request");return{credential:s}})})},r.prototype.setRedirectionHandler=function(e){this._redirectFunc=e},r.prototype.setProtocolErrorHandler=function(e){this._protocolFunc=e},r.prototype.destroyCredentials=function(){if(this.credentials){this.credentials.slice().forEach(function(e){e.destroy()})}this.emit("credentials-destroy")},r.prototype._getOAuthHash=function(){var e=window.location.hash;if(e){"#"===e.charAt(0)&&(e=e.substring(1));var r=o.queryToObject(e),t=!1;r.access_token&&r.expires_in&&r.state&&r.hasOwnProperty("username")?(r.state=JSON.parse(r.state),this._oAuthHash=r,t=!0):r.error&&r.error_description&&(console.log("IdentityManager OAuth Error: ",r.error," - ",r.error_description),"access_denied"===r.error&&(t=!0)),t&&(!g("ie")||g("ie")>8)&&(window.location.hash="")}},r.prototype._pageShowHandler=function(e){if(e.persisted&&this.isBusy()&&this._rejectOnPersistedPageShow){var r=new f("identity-manager:user-aborted","ABORTED");this._errbackFunc(r)}},r.prototype._findCredential=function(e,r){var t,i,s,n,o=this,a=-1,l=r&&r.token,u=r&&r.resource,h=this._isServerRsrc(e)?"server":"portal",c=this.credentials.filter(function(r){return o._hasSameServerInstance(r.server,e)&&r.scope===h});if(e=u||e,c.length)if(1===c.length){if(t=c[0],n=this.findServerInfo(t.server),i=n&&n.owningSystemUrl,s=i&&this.findCredential(i,t.userId),a=this._getIdenticalSvcIdx(e,t),!l)return-1===a&&t.resources.push(e),this._addResource(e,s),t;-1!==a&&(t.resources.splice(a,1),this._removeResource(e,s))}else{var p,d;if(c.some(function(r){return-1!==(d=o._getIdenticalSvcIdx(e,r))&&(p=r,n=o.findServerInfo(p.server),i=n&&n.owningSystemUrl,s=i&&o.findCredential(i,p.userId),a=d,!0)}),l)p&&(p.resources.splice(a,1),this._removeResource(e,s));else if(p)return this._addResource(e,s),p}},r.prototype._findOAuthInfo=function(e){var r=this.findOAuthInfo(e);if(!r)for(var t=0,i=this.oAuthInfos;t<i.length;t++){var s=i[t];if(this._isIdProvider(s.portalUrl,e)){r=s;break}}return r},r.prototype._addResource=function(e,r){r&&-1===this._getIdenticalSvcIdx(e,r)&&r.resources.push(e)},r.prototype._removeResource=function(e,r){var t=-1;r&&(t=this._getIdenticalSvcIdx(e,r))>-1&&r.resources.splice(t,1)},r.prototype._useProxy=function(e,r){return r&&r.isAdmin&&!w.hasSameOrigin(e.adminTokenServiceUrl,window.location.href)||!this._isPortalDomain(e.tokenServiceUrl)&&"10.1"===String(e.currentVersion)&&!w.hasSameOrigin(e.tokenServiceUrl,window.location.href)},r.prototype._getOrigin=function(e){var r=new l(e);return r.scheme+"://"+r.host+(null!=r.port?":"+r.port:"")},r.prototype._getServerInstanceRoot=function(e){var r=e.toLowerCase(),t=r.indexOf(this._agsRest);return-1===t&&this._isAdminResource(e)&&(t=r.indexOf("/admin")),-1===t&&(t=r.indexOf("/sharing")),-1===t&&"/"===r.substr(-1)&&(t=r.length-1),t>-1?e.substring(0,t):e},r.prototype._hasSameServerInstance=function(e,r){return"/"===e.substr(-1)&&(e=e.slice(0,-1)),e=e.toLowerCase(),r=this._getServerInstanceRoot(r).toLowerCase(),e=this._normalizeAGOLorgDomain(e),r=this._normalizeAGOLorgDomain(r),e=e.substr(e.indexOf(":")),r=r.substr(r.indexOf(":")),e===r},r.prototype._normalizeAGOLorgDomain=function(e){var r=/^https?:\/\/.+\.maps\.arcgis\.com/i,t=/^https?:\/\/.+\.mapsdevext\.arcgis\.com/i,i=/^https?:\/\/.+\.mapsqa\.arcgis\.com/i;return r.test(e)?e=e.replace(r,"https://www.arcgis.com"):t.test(e)?e=e.replace(t,"https://devext.arcgis.com"):i.test(e)&&(e=e.replace(i,"https://qaext.arcgis.com")),e},r.prototype._sanitizeUrl=function(e){var r=(u.request.proxyUrl||"").toLowerCase(),t=r?e.toLowerCase().indexOf(r+"?"):-1;return-1!==t&&(e=e.substring(t+r.length+1)),e=w.normalize(e),w.urlToObject(e).path},r.prototype._isRESTService=function(e){return e.indexOf(this._agsRest)>-1},r.prototype._isAdminResource=function(e){return this._agsAdmin.test(e)||this._adminSvcs.test(e)},r.prototype._isServerRsrc=function(e){return this._isRESTService(e)||this._isAdminResource(e)},r.prototype._isIdenticalService=function(e,r){var t;if(this._isRESTService(e)&&this._isRESTService(r)){var i=this._getSuffix(e).toLowerCase(),s=this._getSuffix(r).toLowerCase();if(!(t=i===s)){var n=/(.*)\/(MapServer|FeatureServer).*/gi;t=i.replace(n,"$1")===s.replace(n,"$1")}}else this._isAdminResource(e)&&this._isAdminResource(r)?t=!0:this._isServerRsrc(e)||this._isServerRsrc(r)||!this._isPortalDomain(e)||(t=!0);return t},r.prototype._isPortalDomain=function(e){var r=this;e=e.toLowerCase();var t=new l(e).authority,i=this._portalConfig,s=-1!==t.indexOf(this._agolSuffix);return!s&&i&&(s=this._hasSameServerInstance(this._getServerInstanceRoot(i.restBaseUrl),e)),s||(s=this._portals.some(function(t){return r._hasSameServerInstance(t,e)})),s=s||this._agsPortal.test(e)},r.prototype._isIdProvider=function(e,r){var t=-1,i=-1;this._gwDomains.forEach(function(s,n){-1===t&&s.regex.test(e)&&(t=n),-1===i&&s.regex.test(r)&&(i=n)});var s=!1;if(t>-1&&i>-1&&(0===t||4===t?0!==i&&4!==i||(s=!0):1===t?1!==i&&2!==i||(s=!0):2===t?2===i&&(s=!0):3===t&&3===i&&(s=!0)),!s){var n=this.findServerInfo(r),o=n&&n.owningSystemUrl;o&&x(n)&&this._isPortalDomain(o)&&this._isIdProvider(e,o)&&(s=!0)}return s},r.prototype._isPublic=function(e){return e=this._sanitizeUrl(e),this._publicUrls.some(function(r){return r.test(e)})},r.prototype._getIdenticalSvcIdx=function(e,r){for(var t=-1,i=0;i<r.resources.length;i++){var s=r.resources[i];if(this._isIdenticalService(e,s)){t=i;break}}return t},r.prototype._getSuffix=function(e){return e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"$1")},r.prototype._getTokenSvcUrl=function(e){var r,t,i,s=this,n=this._isRESTService(e);if(n||this._isAdminResource(e))return i=e.toLowerCase().indexOf(n?this._agsRest:"/admin/"),r=e.substring(0,i)+"/admin/generateToken",e=e.substring(0,i)+(n?"/rest/info":"/info"),t=c(e,{query:{f:"json"},responseType:"json"}).then(function(e){return e.data}),{adminUrl:r,promise:t};if(this._isPortalDomain(e)){var o="";if(this._gwDomains.some(function(r){return r.regex.test(e)&&(o=r.tokenServiceUrl),!!o}),o||this._portals.some(function(r){return s._hasSameServerInstance(r,e)&&(o=r+s._gwTokenUrl),!!o}),o||-1!==(i=e.toLowerCase().indexOf("/sharing"))&&(o=e.substring(0,i)+this._gwTokenUrl),o||(o=this._getOrigin(e)+this._gwTokenUrl),o){var a=new l(e).port;/^http:\/\//i.test(e)&&"7080"===a&&(o=o.replace(/:7080/i,":7443")),o=o.replace(/http:/i,"https:")}return o}return-1!==e.toLowerCase().indexOf("premium.arcgisonline.com")?"https://premium.arcgisonline.com/server/tokens":void 0},r.prototype._getPortalSelf=function(e,r){return"https:"===window.location.protocol?e=e.replace(/^http:/i,"https:").replace(/:7080/i,":7443"):/^http:/i.test(r)&&(e=e.replace(/^https:/i,"http:").replace(/:7443/i,":7080")),c(e,{query:{f:"json"},authMode:"anonymous",responseType:"json",withCredentials:!0}).then(function(e){return e.data})},r.prototype._hasPortalSession=function(){return!!this._getEsriAuthCookie()},r.prototype._getEsriAuthCookie=function(){var e=null;if(navigator.cookieEnabled)for(var r=this._getAllCookies("esri_auth"),t=0;t<r.length;t++){var i=JSON.parse(r[t]);if(i.portalApp){e=i;break}}if(e){var s=null;e.expires&&("number"==typeof e.expires?s=e.expires:"string"==typeof e.expires&&(s=Date.parse(e.expires)),isNaN(s)&&(s=null),e.expires=s),s&&s<Date.now()&&(e=null)}return e},r.prototype._getAllCookies=function(e){var r=[],t=document.cookie,i=t.match(new RegExp("(?:^|; )"+a.escapeString(e)+"=([^;]*)","g"));if(i)for(var s=0;s<i.length;s++){var n=i[s],o=n.indexOf("=");o>-1&&(n=n.substring(o+1),r.push(decodeURIComponent(n)))}return r},r.prototype._doPortalSignIn=function(e,r){if(n.isSupported()){var t=this._getEsriAuthCookie(),i=this._portalConfig,s=window.location.href,o=this.findServerInfo(e);if((r||this.useSignInPage)&&(i||this._isPortalDomain(s)||t)&&(o?o.hasPortal||o.owningSystemUrl&&this._isPortalDomain(o.owningSystemUrl):this._isPortalDomain(e))&&(this._isIdProvider(s,e)||i&&(this._hasSameServerInstance(this._getServerInstanceRoot(i.restBaseUrl),e)||this._isIdProvider(i.restBaseUrl,e))||w.hasSameOrigin(s,e,!0)))return!0}return!1},r.prototype._checkProtocol=function(e,r,t,i){var s=!0,n=i?r.adminTokenServiceUrl:r.tokenServiceUrl;if(0===n.trim().toLowerCase().indexOf("https:")&&0!==window.location.href.toLowerCase().indexOf("https:")&&w.getProxyRule(n)&&!(s=!!this._protocolFunc&&!!this._protocolFunc({resourceUrl:e,serverInfo:r}))){t(new f("identity-manager:aborted","Aborted the Sign-In process to avoid sending password over insecure connection."))}return s},r.prototype._enqueue=function(e,r,t,i,s,n){return i||(i=d.makeDeferredCancellingPending()),i.resUrl_=e,i.sinfo_=r,i.options_=t,i.admin_=s,i.refresh_=n,this._busy?this._hasSameServerInstance(this._getServerInstanceRoot(e),this._busy.resUrl_)?(this._oAuthDfd&&this._oAuthDfd.oAuthWin_&&this._oAuthDfd.oAuthWin_.focus(),this._soReqs.push(i)):this._xoReqs.push(i):this._doSignIn(i),i.promise},r.prototype._doSignIn=function(e){var r=this;this._busy=e,this._rejectOnPersistedPageShow=!1;var t=function(t){var i=e.options_&&e.options_.resource,s=e.resUrl_,n=e.refresh_,o=!1;-1===r.credentials.indexOf(t)&&(n&&-1!==r.credentials.indexOf(n)?(n.userId=t.userId,n.token=t.token,n.expires=t.expires,n.validity=t.validity,n.ssl=t.ssl,n.creationTime=t.creationTime,o=!0,t=n):r.credentials.push(t)),t.resources||(t.resources=[]),t.resources.push(i||s),t.scope=r._isServerRsrc(s)?"server":"portal",t.emitTokenChange();var a=r._soReqs,l={};r._soReqs=[],a.forEach(function(e){if(!r._isIdenticalService(s,e.resUrl_)){var i=r._getSuffix(e.resUrl_);l[i]||(l[i]=!0,t.resources.push(e.resUrl_))}}),e.resolve(t),a.forEach(function(e){r._hasSameServerInstance(r._getServerInstanceRoot(s),e.resUrl_)?e.resolve(t):r._soReqs.push(e)}),r._busy=e.resUrl_=e.sinfo_=e.refresh_=null,o||r.emit("credential-create",{credential:t}),r._soReqs.length?r._doSignIn(r._soReqs.shift()):r._xoReqs.length&&r._doSignIn(r._xoReqs.shift())},i=function(t){e.reject(t),r._busy=e.resUrl_=e.sinfo_=e.refresh_=null,r._soReqs.length?r._doSignIn(r._soReqs.shift()):r._xoReqs.length&&r._doSignIn(r._xoReqs.shift())},s=function(s,n,o,a){var l,u,h=e.sinfo_,c=!e.options_||!1!==e.options_.prompt,p=h.hasPortal&&r._findOAuthInfo(e.resUrl_);if(r._doPortalSignIn(e.resUrl_)){var d=r._getEsriAuthCookie(),v=r._portalConfig;if(d){if(!h.webTierAuth){"web"===(d.auth_tier&&d.auth_tier.toLowerCase())&&(h.webTierAuth=!0)}return void t(new O({userId:d.email,server:h.server,token:h.webTierAuth?null:d.token,expires:d.expires}))}if(c){var _="",g=window.location.href;return _=r.signInPage?r.signInPage:v?v.baseUrl+v.signin:r._isIdProvider(g,e.resUrl_)?r._getOrigin(g)+"/home/signin.html":h.tokenServiceUrl.replace(r._rePortalTokenSvc,"")+"/home/signin.html",_=_.replace(/http:/i,"https:"),v&&!1===v.useSSL&&(_=_.replace(/https:/i,"http:")),void(0===g.toLowerCase().replace("https","http").indexOf(_.toLowerCase().replace("https","http"))?(u=new f("identity-manager:unexpected-error","Cannot redirect to Sign-In page from within Sign-In page. URL of the resource that triggered this workflow: "+e.resUrl_),i(u)):(r._rejectOnPersistedPageShow=!0,r._redirectFunc?r._redirectFunc({signInPage:_,returnUrlParamName:"returnUrl",returnUrl:g,resourceUrl:e.resUrl_,serverInfo:h}):window.location.href=_+"?returnUrl="+encodeURIComponent(g)))}u=new f("identity-manager:not-authenticated","User is not signed in."),i(u)}else if(s)t(new O({userId:s,server:h.server,token:o,expires:null!=a?Number(a):null,ssl:!!n}));else if(p){var m=p._oAuthCred;if(!m){var S=new k(p,window.localStorage),y=new k(p,window.sessionStorage);S.isValid()&&y.isValid()?S.expires>y.expires?(m=S,y.destroy()):(m=y,S.destroy()):m=S.isValid()?S:y,p._oAuthCred=m}if(m.isValid())t(new O({userId:m.userId,server:h.server,token:m.token,expires:m.expires,ssl:m.ssl,_oAuthCred:m}));else if(r._oAuthHash&&r._oAuthHash.state.portalUrl===p.portalUrl){var w=r._oAuthHash;l=new O({userId:w.username,server:h.server,token:w.access_token,expires:(new Date).getTime()+1e3*Number(w.expires_in),ssl:"true"===w.ssl,oAuthState:w.state,_oAuthCred:m}),m.storage=w.persist?window.localStorage:window.sessionStorage,m.token=l.token,m.expires=l.expires,m.userId=l.userId,m.ssl=l.ssl,m.save(),r._oAuthHash=null,t(l)}else c?e._pendingDfd=r.oAuthSignIn(e.resUrl_,h,p,e.options_).then(t,i):(u=new f("identity-manager:not-authenticated","User is not signed in."),i(u))}else if(c){if(r._checkProtocol(e.resUrl_,h,i,e.admin_)){var I=e.options_;e.admin_&&(I=I||{},I.isAdmin=!0),e._pendingDfd=r.signIn(e.resUrl_,h,I).then(t,i)}}else u=new f("identity-manager:not-authenticated","User is not signed in."),i(u)},n=function(){var s,n,o,a,l=e.sinfo_,u=l.owningSystemUrl,h=e.options_;if(h&&(s=h.token,n=h.error,o=h.prompt),!(a=r._findCredential(u,{token:s,resource:e.resUrl_})))for(var c=0,p=r.credentials;c<p.length;c++){var d=p[c];if(r._isIdProvider(u,d.server)){a=d;break}}if(a){var f=r.findCredential(e.resUrl_,a.userId);if(f)t(f);else if(C(l,r._legacyFed)){var d=a.toJSON();d.server=l.server,d.resources=null,t(new O(d))}else{var v=e._pendingDfd=r.generateToken(r.findServerInfo(a.server),null,{serverUrl:e.resUrl_,token:a.token,ssl:a.ssl});v.then(function(r){t(new O({userId:a.userId,server:l.server,token:r.token,expires:null!=r.expires?Number(r.expires):null,ssl:!!r.ssl,isAdmin:e.admin_,validity:r.validity}))},i)}}else{r._busy=null,s&&(e.options_.token=null);(e._pendingDfd=r.getCredential(u.replace(/\/?$/,"/sharing"),{resource:e.resUrl_,owningTenant:l.owningTenant,token:s,error:n,prompt:o})).then(function(t){r._enqueue(e.resUrl_,e.sinfo_,e.options_,e,e.admin_)},function(e){i(e)})}};this._errbackFunc=i;var o=e.sinfo_.owningSystemUrl,a=this._isServerRsrc(e.resUrl_),l=e.sinfo_._restInfoPms;l?l.promise.then(function(t){var i=e.sinfo_;i.adminTokenServiceUrl=i._restInfoPms.adminUrl,i._restInfoPms=null,i.tokenServiceUrl=S.getDeepValue("authInfo.tokenServicesUrl",t)||S.getDeepValue("authInfo.tokenServiceUrl",t)||S.getDeepValue("tokenServiceUrl",t),i.shortLivedTokenValidity=S.getDeepValue("authInfo.shortLivedTokenValidity",t),i.currentVersion=t.currentVersion,i.owningTenant=t.owningTenant;var o=i.owningSystemUrl=t.owningSystemUrl;o&&r._portals.push(o),a&&o?n():s()},function(){e.sinfo_._restInfoPms=null;var r=new f("identity-manager:server-identification-failed","Unknown resource - could not find token service endpoint.");i(r)}):a&&o?n():e.sinfo_._selfReq?e.sinfo_._selfReq.selfDfd.then(function(t){var i,s,n,o,a={};return t&&(i=t.user&&t.user.username,a.username=i,a.allSSL=t.allSSL,s=t.supportsOAuth,n=t.currentVersion,"multitenant"===t.portalMode&&(o=t.customBaseUrl)),e.sinfo_.webTierAuth=!!i,i&&r.normalizeWebTierAuth?r.generateToken(e.sinfo_,null,{ssl:a.allSSL}).catch(function(){return null}).then(function(e){return a.portalToken=e&&e.token,a.tokenExpiration=e&&e.expires,a}):!i&&s&&parseFloat(n)>=4.4&&!r._doPortalSignIn(e.resUrl_)?r._generateOAuthInfo({portalUrl:e.sinfo_.server,customBaseUrl:o,owningTenant:e.sinfo_._selfReq.owningTenant}).catch(function(){return null}).then(function(){return a}):a}).catch(function(){return null}).then(function(r){e.sinfo_._selfReq=null,r?s(r.username,r.allSSL,r.portalToken,r.tokenExpiration):s()}):s()},r.prototype._generateOAuthInfo=function(e){var r,t,i=this,s=e.portalUrl,n=e.customBaseUrl,o=e.owningTenant,a=!this.defaultOAuthInfo&&this._createDefaultOAuthInfo&&!this._hasTestedIfAppIsOnPortal;if(a){t=window.location.href;var l=t.indexOf("?");l>-1&&(t=t.slice(0,l)),l=t.search(/\/(apps|home)\//),t=l>-1?t.slice(0,l):null}return a&&t?(this._hasTestedIfAppIsOnPortal=!0,r=c(t+"/sharing/rest",{query:{f:"json"},responseType:"json"}).then(function(){i.defaultOAuthInfo=new U({appId:"arcgisonline",popup:!0,popupCallbackUrl:t+"/home/oauth-callback.html"})})):r=y.resolve(),r.then(function(){if(i.defaultOAuthInfo)return s=s.replace(/^http:/i,"https:"),c(s+"/sharing/rest/oauth2/validateRedirectUri",{query:{accountId:o,client_id:i.defaultOAuthInfo.appId,redirect_uri:w.makeAbsolute(i.defaultOAuthInfo.popupCallbackUrl),f:"json"},responseType:"json"}).then(function(e){if(e.data.valid){var r=i.defaultOAuthInfo.clone();e.data.urlKey&&n?r.portalUrl="https://"+e.data.urlKey+"."+n:r.portalUrl=s,i.oAuthInfos.push(r)}})})},r=s([I.subclass("esri.identity.IdentityManagerBase")],r)}(I.declared(v));r.IdentityManagerBase=P;var O=function(e){function r(r){var t=e.call(this)||this;return t._oAuthCred=null,t.tokenRefreshBuffer=2,r&&r._oAuthCred&&(t._oAuthCred=r._oAuthCred),t}return i(r,e),r.prototype.initialize=function(){this.resources=this.resources||[],null==this.creationTime&&(this.creationTime=Date.now())},r.prototype.refreshToken=function(){var e,r,t=this,i=h.id.findServerInfo(this.server),s=i&&i.owningSystemUrl,n=!!s&&"server"===this.scope,o=n&&C(i,h.id._legacyFed),a=i.webTierAuth,l=a&&h.id.normalizeWebTierAuth,u=T[this.server],c=u&&u[this.userId],p=this.resources&&this.resources[0],d=n&&h.id.findServerInfo(s),f={username:this.userId,password:c};if((!a||l)&&(n&&!d&&h.id.serverInfos.some(function(e){return h.id._isIdProvider(s,e.server)&&(d=e),!!d}),e=d&&h.id.findCredential(d.server,this.userId),!n||e)){if(o)return void e.refreshToken();if(n)r={serverUrl:p,token:e&&e.token,ssl:e&&e.ssl};else if(l)f=null,r={ssl:this.ssl};else{if(!c){var v=void 0;return p&&(p=h.id._sanitizeUrl(p),this._enqueued=1,v=h.id._enqueue(p,i,null,null,this.isAdmin,this),v.then(function(){t._enqueued=0,t.refreshServerTokens()}).catch(function(){t._enqueued=0})),v}this.isAdmin&&(r={isAdmin:!0})}return h.id.generateToken(n?d:i,n?null:f,r).then(function(e){t.token=e.token,t.expires=null!=e.expires?Number(e.expires):null,t.creationTime=(new Date).getTime(),t.validity=e.validity,t.emitTokenChange(),t.refreshServerTokens()}).catch(function(){})}},r.prototype.refreshServerTokens=function(){var e=this;"portal"===this.scope&&h.id.credentials.forEach(function(r){var t=h.id.findServerInfo(r.server),i=t&&t.owningSystemUrl;r!==e&&r.userId===e.userId&&i&&"server"===r.scope&&(h.id._hasSameServerInstance(e.server,i)||h.id._isIdProvider(i,e.server))&&(C(t,h.id._legacyFed)?(r.token=e.token,r.expires=e.expires,r.creationTime=e.creationTime,r.validity=e.validity,r.emitTokenChange()):r.refreshToken())})},r.prototype.emitTokenChange=function(e){clearTimeout(this._refreshTimer);var r=this.server&&h.id.findServerInfo(this.server),t=r&&r.owningSystemUrl,i=t&&h.id.findServerInfo(t);!1===e||t&&"portal"!==this.scope&&(!i||!i.webTierAuth||h.id.normalizeWebTierAuth)||null==this.expires&&null==this.validity||this._startRefreshTimer(),this.emit("token-change")},r.prototype.destroy=function(){this.userId=this.server=this.token=this.expires=this.validity=this.resources=this.creationTime=null,this._oAuthCred&&(this._oAuthCred.destroy(),this._oAuthCred=null);var e=h.id.credentials.indexOf(this);e>-1&&h.id.credentials.splice(e,1),this.emitTokenChange(),this.emit("destroy")},r.prototype.toJSON=function(){var e=m.fixJson({userId:this.userId,server:this.server,token:this.token,expires:this.expires,validity:this.validity,ssl:this.ssl,isAdmin:this.isAdmin,creationTime:this.creationTime,scope:this.scope}),r=this.resources;return r&&r.length>0&&(e.resources=r.slice()),e},r.prototype._startRefreshTimer=function(){clearTimeout(this._refreshTimer);var e=6e4*this.tokenRefreshBuffer,r=this.validity?this.creationTime+6e4*this.validity:this.expires,t=r-(new Date).getTime();t<0&&(t=0),this._refreshTimer=setTimeout(this.refreshToken.bind(this),t>e?t-e:t)},s([I.property()],r.prototype,"creationTime",void 0),s([I.property()],r.prototype,"expires",void 0),s([I.property()],r.prototype,"isAdmin",void 0),s([I.property()],r.prototype,"oAuthState",void 0),s([I.property()],r.prototype,"resources",void 0),s([I.property()],r.prototype,"scope",void 0),s([I.property()],r.prototype,"server",void 0),s([I.property()],r.prototype,"ssl",void 0),s([I.property()],r.prototype,"token",void 0),s([I.property()],r.prototype,"tokenRefreshBuffer",void 0),s([I.property()],r.prototype,"userId",void 0),s([I.property()],r.prototype,"validity",void 0),r=s([I.subclass("esri.identity.Credential")],r)}(I.declared(p,v));r.Credential=O});