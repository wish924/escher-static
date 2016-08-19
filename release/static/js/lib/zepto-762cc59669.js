!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t)}):e(t)}(this,function(t){var e=function(){function e(t){return null==t?String(t):W[Y.call(t)]||"object"}function n(t){return"function"==e(t)}function i(t){return null!=t&&t==t.window}function r(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function o(t){return"object"==e(t)}function a(t){return o(t)&&!i(t)&&Object.getPrototypeOf(t)==Object.prototype}function s(t){var e=!!t&&"length"in t&&t.length,n=C.type(t);return"function"!=n&&!i(t)&&("array"==n||0===e||"number"==typeof e&&e>0&&e-1 in t)}function u(t){return L.call(t,function(t){return null!=t})}function c(t){return t.length>0?C.fn.concat.apply([],t):t}function l(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function f(t){return t in k?k[t]:k[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function h(t,e){return"number"!=typeof e||Z[l(t)]?e:e+"px"}function p(t){var e,n;return F[t]||(e=$.createElement(t),$.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),F[t]=n),F[t]}function d(t){return"children"in t?D.call(t.children):C.map(t.childNodes,function(t){if(1==t.nodeType)return t})}function m(t,e){var n,i=t?t.length:0;for(n=0;n<i;n++)this[n]=t[n];this.length=i,this.selector=e||""}function v(t,e,n){for(j in e)n&&(a(e[j])||tt(e[j]))?(a(e[j])&&!a(t[j])&&(t[j]={}),tt(e[j])&&!tt(t[j])&&(t[j]=[]),v(t[j],e[j],n)):e[j]!==T&&(t[j]=e[j])}function y(t,e){return null==e?C(t):C(t).filter(e)}function g(t,e,i,r){return n(e)?e.call(t,i,r):e}function x(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function b(t,e){var n=t.className||"",i=n&&n.baseVal!==T;return e===T?i?n.baseVal:n:void(i?n.baseVal=e:t.className=e)}function E(t){try{return t?"true"==t||"false"!=t&&("null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?C.parseJSON(t):t):t}catch(e){return t}}function w(t,e){e(t);for(var n=0,i=t.childNodes.length;n<i;n++)w(t.childNodes[n],e)}var T,j,C,S,N,O,P=[],A=P.concat,L=P.filter,D=P.slice,$=t.document,F={},k={},Z={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},M=/^\s*<(\w+|!)[^>]*>/,z=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,R=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,q=/^(?:body|html)$/i,_=/([A-Z])/g,I=["val","css","html","text","data","width","height","offset"],H=["after","prepend","before","append"],V=$.createElement("table"),B=$.createElement("tr"),X={tr:$.createElement("tbody"),tbody:V,thead:V,tfoot:V,td:B,th:B,"*":$.createElement("div")},U=/complete|loaded|interactive/,J=/^[\w-]*$/,W={},Y=W.toString,G={},K=$.createElement("div"),Q={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},tt=Array.isArray||function(t){return t instanceof Array};return G.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=K).appendChild(t),i=~G.qsa(r,e).indexOf(t),o&&K.removeChild(t),i},N=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},O=function(t){return L.call(t,function(e,n){return t.indexOf(e)==n})},G.fragment=function(t,e,n){var i,r,o;return z.test(t)&&(i=C($.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(R,"<$1></$2>")),e===T&&(e=M.test(t)&&RegExp.$1),e in X||(e="*"),o=X[e],o.innerHTML=""+t,i=C.each(D.call(o.childNodes),function(){o.removeChild(this)})),a(n)&&(r=C(i),C.each(n,function(t,e){I.indexOf(t)>-1?r[t](e):r.attr(t,e)})),i},G.Z=function(t,e){return new m(t,e)},G.isZ=function(t){return t instanceof G.Z},G.init=function(t,e){var i;if(!t)return G.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&M.test(t))i=G.fragment(t,RegExp.$1,e),t=null;else{if(e!==T)return C(e).find(t);i=G.qsa($,t)}else{if(n(t))return C($).ready(t);if(G.isZ(t))return t;if(tt(t))i=u(t);else if(o(t))i=[t],t=null;else if(M.test(t))i=G.fragment(t.trim(),RegExp.$1,e),t=null;else{if(e!==T)return C(e).find(t);i=G.qsa($,t)}}return G.Z(i,t)},C=function(t,e){return G.init(t,e)},C.extend=function(t){var e,n=D.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){v(t,n,e)}),t},G.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,a=J.test(o);return t.getElementById&&a&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:D.call(a&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},C.contains=$.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},C.type=e,C.isFunction=n,C.isWindow=i,C.isArray=tt,C.isPlainObject=a,C.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},C.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},C.inArray=function(t,e,n){return P.indexOf.call(e,t,n)},C.camelCase=N,C.trim=function(t){return null==t?"":String.prototype.trim.call(t)},C.uuid=0,C.support={},C.expr={},C.noop=function(){},C.map=function(t,e){var n,i,r,o=[];if(s(t))for(i=0;i<t.length;i++)n=e(t[i],i),null!=n&&o.push(n);else for(r in t)n=e(t[r],r),null!=n&&o.push(n);return c(o)},C.each=function(t,e){var n,i;if(s(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},C.grep=function(t,e){return L.call(t,e)},t.JSON&&(C.parseJSON=JSON.parse),C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){W["[object "+e+"]"]=e.toLowerCase()}),C.fn={constructor:G.Z,length:0,forEach:P.forEach,reduce:P.reduce,push:P.push,sort:P.sort,splice:P.splice,indexOf:P.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=G.isZ(e)?e.toArray():e;return A.apply(G.isZ(this)?this.toArray():this,n)},map:function(t){return C(C.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return C(D.apply(this,arguments))},ready:function(t){return U.test($.readyState)&&$.body?t(C):$.addEventListener("DOMContentLoaded",function(){t(C)},!1),this},get:function(t){return t===T?D.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return P.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return n(t)?this.not(this.not(t)):C(L.call(this,function(e){return G.matches(e,t)}))},add:function(t,e){return C(O(this.concat(C(t,e))))},is:function(t){return this.length>0&&G.matches(this[0],t)},not:function(t){var e=[];if(n(t)&&t.call!==T)this.each(function(n){t.call(this,n)||e.push(this)});else{var i="string"==typeof t?this.filter(t):s(t)&&n(t.item)?D.call(t):C(t);this.forEach(function(t){i.indexOf(t)<0&&e.push(t)})}return C(e)},has:function(t){return this.filter(function(){return o(t)?C.contains(this,t):C(this).find(t).size()})},eq:function(t){return t===-1?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!o(t)?t:C(t)},last:function(){var t=this[this.length-1];return t&&!o(t)?t:C(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?C(t).filter(function(){var t=this;return P.some.call(n,function(e){return C.contains(e,t)})}):1==this.length?C(G.qsa(this[0],t)):this.map(function(){return G.qsa(this,t)}):C()},closest:function(t,e){var n=[],i="object"==typeof t&&C(t);return this.each(function(o,a){for(;a&&!(i?i.indexOf(a)>=0:G.matches(a,t));)a=a!==e&&!r(a)&&a.parentNode;a&&n.indexOf(a)<0&&n.push(a)}),C(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=C.map(n,function(t){if((t=t.parentNode)&&!r(t)&&e.indexOf(t)<0)return e.push(t),t});return y(e,t)},parent:function(t){return y(O(this.pluck("parentNode")),t)},children:function(t){return y(this.map(function(){return d(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||D.call(this.childNodes)})},siblings:function(t){return y(this.map(function(t,e){return L.call(d(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return C.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=p(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=n(t);if(this[0]&&!e)var i=C(t).get(0),r=i.parentNode||this.length>1;return this.each(function(n){C(this).wrapAll(e?t.call(this,n):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){C(this[0]).before(t=C(t));for(var e;(e=t.children()).length;)t=e.first();C(t).append(this)}return this},wrapInner:function(t){var e=n(t);return this.each(function(n){var i=C(this),r=i.contents(),o=e?t.call(this,n):t;r.length?r.wrapAll(o):i.append(o)})},unwrap:function(){return this.parent().each(function(){C(this).replaceWith(C(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var e=C(this);(t===T?"none"==e.css("display"):t)?e.show():e.hide()})},prev:function(t){return C(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return C(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;C(this).empty().append(g(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=g(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(t,e){var n;return"string"!=typeof t||1 in arguments?this.each(function(n){if(1===this.nodeType)if(o(t))for(j in t)x(this,j,t[j]);else x(this,t,g(this,e,n,this.getAttribute(t)))}):0 in this&&1==this[0].nodeType&&null!=(n=this[0].getAttribute(t))?n:T},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){x(this,t)},this)})},prop:function(t,e){return t=Q[t]||t,1 in arguments?this.each(function(n){this[t]=g(this,e,n,this[t])}):this[0]&&this[0][t]},removeProp:function(t){return t=Q[t]||t,this.each(function(){delete this[t]})},data:function(t,e){var n="data-"+t.replace(_,"-$1").toLowerCase(),i=1 in arguments?this.attr(n,e):this.attr(n);return null!==i?E(i):T},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each(function(e){this.value=g(this,t,e,this.value)})):this[0]&&(this[0].multiple?C(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(e){if(e)return this.each(function(t){var n=C(this),i=g(this,e,t,n.offset()),r=n.offsetParent().offset(),o={top:i.top-r.top,left:i.left-r.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(!this.length)return null;if($.documentElement!==this[0]&&!C.contains($.documentElement,this[0]))return{top:0,left:0};var n=this[0].getBoundingClientRect();return{left:n.left+t.pageXOffset,top:n.top+t.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(t,n){if(arguments.length<2){var i=this[0];if("string"==typeof t){if(!i)return;return i.style[N(t)]||getComputedStyle(i,"").getPropertyValue(t)}if(tt(t)){if(!i)return;var r={},o=getComputedStyle(i,"");return C.each(t,function(t,e){r[e]=i.style[N(e)]||o.getPropertyValue(e)}),r}}var a="";if("string"==e(t))n||0===n?a=l(t)+":"+h(t,n):this.each(function(){this.style.removeProperty(l(t))});else for(j in t)t[j]||0===t[j]?a+=l(j)+":"+h(j,t[j])+";":this.each(function(){this.style.removeProperty(l(j))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(C(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return!!t&&P.some.call(this,function(t){return this.test(b(t))},f(t))},addClass:function(t){return t?this.each(function(e){if("className"in this){S=[];var n=b(this),i=g(this,t,e,n);i.split(/\s+/g).forEach(function(t){C(this).hasClass(t)||S.push(t)},this),S.length&&b(this,n+(n?" ":"")+S.join(" "))}}):this},removeClass:function(t){return this.each(function(e){if("className"in this){if(t===T)return b(this,"");S=b(this),g(this,t,e,S).split(/\s+/g).forEach(function(t){S=S.replace(f(t)," ")}),b(this,S.trim())}})},toggleClass:function(t,e){return t?this.each(function(n){var i=C(this),r=g(this,t,n,b(this));r.split(/\s+/g).forEach(function(t){(e===T?!i.hasClass(t):e)?i.addClass(t):i.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===T?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===T?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=q.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(C(t).css("margin-top"))||0,n.left-=parseFloat(C(t).css("margin-left"))||0,i.top+=parseFloat(C(e[0]).css("border-top-width"))||0,i.left+=parseFloat(C(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||$.body;t&&!q.test(t.nodeName)&&"static"==C(t).css("position");)t=t.offsetParent;return t})}},C.fn.detach=C.fn.remove,["width","height"].forEach(function(t){var e=t.replace(/./,function(t){return t[0].toUpperCase()});C.fn[t]=function(n){var o,a=this[0];return n===T?i(a)?a["inner"+e]:r(a)?a.documentElement["scroll"+e]:(o=this.offset())&&o[t]:this.each(function(e){a=C(this),a.css(t,g(this,n,e,a[t]()))})}}),H.forEach(function(n,i){var r=i%2;C.fn[n]=function(){var n,o,a=C.map(arguments,function(t){var i=[];return n=e(t),"array"==n?(t.forEach(function(t){return t.nodeType!==T?i.push(t):C.zepto.isZ(t)?i=i.concat(t.get()):void(i=i.concat(G.fragment(t)))}),i):"object"==n||null==t?t:G.fragment(t)}),s=this.length>1;return a.length<1?this:this.each(function(e,n){o=r?n:n.parentNode,n=0==i?n.nextSibling:1==i?n.firstChild:2==i?n:null;var u=C.contains($.documentElement,o);a.forEach(function(e){if(s)e=e.cloneNode(!0);else if(!o)return C(e).remove();o.insertBefore(e,n),u&&w(e,function(e){if(!(null==e.nodeName||"SCRIPT"!==e.nodeName.toUpperCase()||e.type&&"text/javascript"!==e.type||e.src)){var n=e.ownerDocument?e.ownerDocument.defaultView:t;n.eval.call(n,e.innerHTML)}})})})},C.fn[r?n+"To":"insert"+(i?"Before":"After")]=function(t){return C(t)[n](this),this}}),G.Z.prototype=m.prototype=C.fn,G.uniq=O,G.deserializeValue=E,C.zepto=G,C}();return t.Zepto=e,void 0===t.$&&(t.$=e),function(e){function n(t){return t._zid||(t._zid=p++)}function i(t,e,i,a){if(e=r(e),e.ns)var s=o(e.ns);return(y[n(t)]||[]).filter(function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||s.test(t.ns))&&(!i||n(t.fn)===n(i))&&(!a||t.sel==a)})}function r(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function o(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function a(t,e){return t.del&&!x&&t.e in b||!!e}function s(t){return E[t]||x&&b[t]||t}function u(t,i,o,u,c,f,p){var d=n(t),m=y[d]||(y[d]=[]);i.split(/\s/).forEach(function(n){if("ready"==n)return e(document).ready(o);var i=r(n);i.fn=o,i.sel=c,i.e in E&&(o=function(t){var n=t.relatedTarget;if(!n||n!==this&&!e.contains(this,n))return i.fn.apply(this,arguments)}),i.del=f;var d=f||o;i.proxy=function(e){if(e=l(e),!e.isImmediatePropagationStopped()){e.data=u;var n=d.apply(t,e._args==h?[e]:[e].concat(e._args));return n===!1&&(e.preventDefault(),e.stopPropagation()),n}},i.i=m.length,m.push(i),"addEventListener"in t&&t.addEventListener(s(i.e),i.proxy,a(i,p))})}function c(t,e,r,o,u){var c=n(t);(e||"").split(/\s/).forEach(function(e){i(t,e,r,o).forEach(function(e){delete y[c][e.i],"removeEventListener"in t&&t.removeEventListener(s(e.e),e.proxy,a(e,u))})})}function l(t,n){return!n&&t.isDefaultPrevented||(n||(n=t),e.each(C,function(e,i){var r=n[e];t[e]=function(){return this[i]=w,r&&r.apply(n,arguments)},t[i]=T}),t.timeStamp||(t.timeStamp=Date.now()),(n.defaultPrevented!==h?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(t.isDefaultPrevented=w)),t}function f(t){var e,n={originalEvent:t};for(e in t)j.test(e)||t[e]===h||(n[e]=t[e]);return l(n,t)}var h,p=1,d=Array.prototype.slice,m=e.isFunction,v=function(t){return"string"==typeof t},y={},g={},x="onfocusin"in t,b={focus:"focusin",blur:"focusout"},E={mouseenter:"mouseover",mouseleave:"mouseout"};g.click=g.mousedown=g.mouseup=g.mousemove="MouseEvents",e.event={add:u,remove:c},e.proxy=function(t,i){var r=2 in arguments&&d.call(arguments,2);if(m(t)){var o=function(){return t.apply(i,r?r.concat(d.call(arguments)):arguments)};return o._zid=n(t),o}if(v(i))return r?(r.unshift(t[i],t),e.proxy.apply(null,r)):e.proxy(t[i],t);throw new TypeError("expected function")},e.fn.bind=function(t,e,n){return this.on(t,e,n)},e.fn.unbind=function(t,e){return this.off(t,e)},e.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var w=function(){return!0},T=function(){return!1},j=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,C={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(t,e,n){return this.on(e,t,n)},e.fn.undelegate=function(t,e,n){return this.off(e,t,n)},e.fn.live=function(t,n){return e(document.body).delegate(this.selector,t,n),this},e.fn.die=function(t,n){return e(document.body).undelegate(this.selector,t,n),this},e.fn.on=function(t,n,i,r,o){var a,s,l=this;return t&&!v(t)?(e.each(t,function(t,e){l.on(t,n,i,e,o)}),l):(v(n)||m(r)||r===!1||(r=i,i=n,n=h),r!==h&&i!==!1||(r=i,i=h),r===!1&&(r=T),l.each(function(l,h){o&&(a=function(t){return c(h,t.type,r),r.apply(this,arguments)}),n&&(s=function(t){var i,o=e(t.target).closest(n,h).get(0);if(o&&o!==h)return i=e.extend(f(t),{currentTarget:o,liveFired:h}),(a||r).apply(o,[i].concat(d.call(arguments,1)))}),u(h,t,r,i,n,s||a)}))},e.fn.off=function(t,n,i){var r=this;return t&&!v(t)?(e.each(t,function(t,e){r.off(t,n,e)}),r):(v(n)||m(i)||i===!1||(i=n,n=h),i===!1&&(i=T),r.each(function(){c(this,t,i,n)}))},e.fn.trigger=function(t,n){return t=v(t)||e.isPlainObject(t)?e.Event(t):l(t),t._args=n,this.each(function(){t.type in b&&"function"==typeof this[t.type]?this[t.type]():"dispatchEvent"in this?this.dispatchEvent(t):e(this).triggerHandler(t,n)})},e.fn.triggerHandler=function(t,n){var r,o;return this.each(function(a,s){r=f(v(t)?e.Event(t):t),r._args=n,r.target=s,e.each(i(s,t.type||t),function(t,e){if(o=e.proxy(r),r.isImmediatePropagationStopped())return!1})}),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t){e.fn[t]=function(e){return 0 in arguments?this.bind(t,e):this.trigger(t)}}),e.Event=function(t,e){v(t)||(e=t,t=e.type);var n=document.createEvent(g[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),l(n)}}(e),function(e){function n(t,n,i){var r=e.Event(n);return e(t).trigger(r,i),!r.isDefaultPrevented()}function i(t,e,i,r){if(t.global)return n(e||b,i,r)}function r(t){t.global&&0===e.active++&&i(t,null,"ajaxStart")}function o(t){t.global&&!--e.active&&i(t,null,"ajaxStop")}function a(t,e){var n=e.context;return e.beforeSend.call(n,t,e)!==!1&&i(e,n,"ajaxBeforeSend",[t,e])!==!1&&void i(e,n,"ajaxSend",[t,e])}function s(t,e,n,r){var o=n.context,a="success";n.success.call(o,t,a,e),r&&r.resolveWith(o,[t,a,e]),i(n,o,"ajaxSuccess",[e,n,t]),c(a,e,n)}function u(t,e,n,r,o){var a=r.context;r.error.call(a,n,e,t),o&&o.rejectWith(a,[n,e,t]),i(r,a,"ajaxError",[n,r,t||e]),c(e,n,r)}function c(t,e,n){var r=n.context;n.complete.call(r,e,t),i(n,r,"ajaxComplete",[e,n]),o(n)}function l(t,e,n){if(n.dataFilter==f)return t;var i=n.context;return n.dataFilter.call(i,t,e)}function f(){}function h(t){return t&&(t=t.split(";",2)[0]),t&&(t==C?"html":t==j?"json":w.test(t)?"script":T.test(t)&&"xml")||"text"}function p(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function d(t){t.processData&&t.data&&"string"!=e.type(t.data)&&(t.data=e.param(t.data,t.traditional)),!t.data||t.type&&"GET"!=t.type.toUpperCase()&&"jsonp"!=t.dataType||(t.url=p(t.url,t.data),t.data=void 0)}function m(t,n,i,r){return e.isFunction(n)&&(r=i,i=n,n=void 0),e.isFunction(i)||(r=i,i=void 0),{url:t,data:n,success:i,dataType:r}}function v(t,n,i,r){var o,a=e.isArray(n),s=e.isPlainObject(n);e.each(n,function(n,u){o=e.type(u),r&&(n=i?r:r+"["+(s||"object"==o||"array"==o?n:"")+"]"),!r&&a?t.add(u.name,u.value):"array"==o||!i&&"object"==o?v(t,u,i,n):t.add(n,u)})}var y,g,x=+new Date,b=t.document,E=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,w=/^(?:text|application)\/javascript/i,T=/^(?:text|application)\/xml/i,j="application/json",C="text/html",S=/^\s*$/,N=b.createElement("a");N.href=t.location.href,e.active=0,e.ajaxJSONP=function(n,i){if(!("type"in n))return e.ajax(n);var r,o,c=n.jsonpCallback,l=(e.isFunction(c)?c():c)||"Zepto"+x++,f=b.createElement("script"),h=t[l],p=function(t){e(f).triggerHandler("error",t||"abort")},d={abort:p};return i&&i.promise(d),e(f).on("load error",function(a,c){clearTimeout(o),e(f).off().remove(),"error"!=a.type&&r?s(r[0],d,n,i):u(null,c||"error",d,n,i),t[l]=h,r&&e.isFunction(h)&&h(r[0]),h=r=void 0}),a(d,n)===!1?(p("abort"),d):(t[l]=function(){r=arguments},f.src=n.url.replace(/\?(.+)=\?/,"?$1="+l),b.head.appendChild(f),n.timeout>0&&(o=setTimeout(function(){p("timeout")},n.timeout)),d)},e.ajaxSettings={type:"GET",beforeSend:f,success:f,error:f,complete:f,context:null,global:!0,xhr:function(){return new t.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:j,xml:"application/xml, text/xml",html:C,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:f},e.ajax=function(n){var i,o,c=e.extend({},n||{}),m=e.Deferred&&e.Deferred();for(y in e.ajaxSettings)void 0===c[y]&&(c[y]=e.ajaxSettings[y]);r(c),c.crossDomain||(i=b.createElement("a"),i.href=c.url,i.href=i.href,c.crossDomain=N.protocol+"//"+N.host!=i.protocol+"//"+i.host),c.url||(c.url=t.location.toString()),(o=c.url.indexOf("#"))>-1&&(c.url=c.url.slice(0,o)),d(c);var v=c.dataType,x=/\?.+=\?/.test(c.url);if(x&&(v="jsonp"),c.cache!==!1&&(n&&n.cache===!0||"script"!=v&&"jsonp"!=v)||(c.url=p(c.url,"_="+Date.now())),"jsonp"==v)return x||(c.url=p(c.url,c.jsonp?c.jsonp+"=?":c.jsonp===!1?"":"callback=?")),e.ajaxJSONP(c,m);var E,w=c.accepts[v],T={},j=function(t,e){T[t.toLowerCase()]=[t,e]},C=/^([\w-]+:)\/\//.test(c.url)?RegExp.$1:t.location.protocol,O=c.xhr(),P=O.setRequestHeader;if(m&&m.promise(O),c.crossDomain||j("X-Requested-With","XMLHttpRequest"),j("Accept",w||"*/*"),(w=c.mimeType||w)&&(w.indexOf(",")>-1&&(w=w.split(",",2)[0]),O.overrideMimeType&&O.overrideMimeType(w)),(c.contentType||c.contentType!==!1&&c.data&&"GET"!=c.type.toUpperCase())&&j("Content-Type",c.contentType||"application/x-www-form-urlencoded"),c.headers)for(g in c.headers)j(g,c.headers[g]);if(O.setRequestHeader=j,O.onreadystatechange=function(){if(4==O.readyState){O.onreadystatechange=f,clearTimeout(E);var t,n=!1;if(O.status>=200&&O.status<300||304==O.status||0==O.status&&"file:"==C){if(v=v||h(c.mimeType||O.getResponseHeader("content-type")),"arraybuffer"==O.responseType||"blob"==O.responseType)t=O.response;else{t=O.responseText;try{t=l(t,v,c),"script"==v?(0,eval)(t):"xml"==v?t=O.responseXML:"json"==v&&(t=S.test(t)?null:e.parseJSON(t))}catch(i){n=i}if(n)return u(n,"parsererror",O,c,m)}s(t,O,c,m)}else u(O.statusText||null,O.status?"error":"abort",O,c,m)}},a(O,c)===!1)return O.abort(),u(null,"abort",O,c,m),O;var A=!("async"in c)||c.async;if(O.open(c.type,c.url,A,c.username,c.password),c.xhrFields)for(g in c.xhrFields)O[g]=c.xhrFields[g];for(g in T)P.apply(O,T[g]);return c.timeout>0&&(E=setTimeout(function(){O.onreadystatechange=f,O.abort(),u(null,"timeout",O,c,m)},c.timeout)),O.send(c.data?c.data:null),O},e.get=function(){return e.ajax(m.apply(null,arguments))},e.post=function(){var t=m.apply(null,arguments);return t.type="POST",e.ajax(t)},e.getJSON=function(){var t=m.apply(null,arguments);return t.dataType="json",e.ajax(t)},e.fn.load=function(t,n,i){if(!this.length)return this;var r,o=this,a=t.split(/\s/),s=m(t,n,i),u=s.success;return a.length>1&&(s.url=a[0],r=a[1]),s.success=function(t){o.html(r?e("<div>").html(t.replace(E,"")).find(r):t),u&&u.apply(o,arguments)},e.ajax(s),this};var O=encodeURIComponent;e.param=function(t,n){var i=[];return i.add=function(t,n){e.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(O(t)+"="+O(n))},v(i,t,n),i.join("&").replace(/%20/g,"+")}}(e),function(t){t.fn.serializeArray=function(){var e,n,i=[],r=function(t){return t.forEach?t.forEach(r):void i.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(i,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&r(t(o).val())}),i},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(e),function(){try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;t.getComputedStyle=function(t,e){try{return n(t,e)}catch(i){return null}}}}(),e}),function(t,e){function n(t){return t.replace(/([A-Z])/g,"-$1").toLowerCase()}function i(t){return r?r+t:t.toLowerCase()}var r,o,a,s,u,c,l,f,h,p,d="",m={Webkit:"webkit",Moz:"",O:"o"},v=document.createElement("div"),y=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,g={};v.style.transform===e&&t.each(m,function(t,n){if(v.style[t+"TransitionProperty"]!==e)return d="-"+t.toLowerCase()+"-",r=n,!1}),o=d+"transform",g[a=d+"transition-property"]=g[s=d+"transition-duration"]=g[c=d+"transition-delay"]=g[u=d+"transition-timing-function"]=g[l=d+"animation-name"]=g[f=d+"animation-duration"]=g[p=d+"animation-delay"]=g[h=d+"animation-timing-function"]="",t.fx={off:r===e&&v.style.transitionProperty===e,speeds:{_default:400,fast:200,slow:600},cssPrefix:d,transitionEnd:i("TransitionEnd"),animationEnd:i("AnimationEnd")},t.fn.animate=function(n,i,r,o,a){return t.isFunction(i)&&(o=i,r=e,i=e),t.isFunction(r)&&(o=r,r=e),t.isPlainObject(i)&&(r=i.easing,o=i.complete,a=i.delay,i=i.duration),i&&(i=("number"==typeof i?i:t.fx.speeds[i]||t.fx.speeds._default)/1e3),a&&(a=parseFloat(a)/1e3),this.anim(n,i,r,o,a)},t.fn.anim=function(i,r,d,m,v){var x,b,E,w={},T="",j=this,C=t.fx.transitionEnd,S=!1;if(r===e&&(r=t.fx.speeds._default/1e3),v===e&&(v=0),t.fx.off&&(r=0),"string"==typeof i)w[l]=i,w[f]=r+"s",w[p]=v+"s",w[h]=d||"linear",C=t.fx.animationEnd;else{b=[];for(x in i)y.test(x)?T+=x+"("+i[x]+") ":(w[x]=i[x],b.push(n(x)));T&&(w[o]=T,b.push(o)),r>0&&"object"==typeof i&&(w[a]=b.join(", "),w[s]=r+"s",w[c]=v+"s",w[u]=d||"linear")}return E=function(e){if("undefined"!=typeof e){if(e.target!==e.currentTarget)return;t(e.target).unbind(C,E)}else t(this).unbind(C,E);S=!0,t(this).css(g),m&&m.call(this)},r>0&&(this.bind(C,E),setTimeout(function(){S||E.call(j)},1e3*(r+v)+25)),this.size()&&this.get(0).clientLeft,this.css(w),r<=0&&setTimeout(function(){j.each(function(){E.call(this)})},0),this},v=null}(Zepto),function(t,e){function n(n,i,r,o,a){"function"!=typeof i||a||(a=i,i=e);var s={opacity:r};return o&&(s.scale=o,n.css(t.fx.cssPrefix+"transform-origin","0 0")),n.animate(s,i,null,a)}function i(e,i,r,o){return n(e,i,0,r,function(){a.call(t(this)),o&&o.call(this)})}var r=window.document,o=(r.documentElement,t.fn.show),a=t.fn.hide,s=t.fn.toggle;t.fn.show=function(t,i){return o.call(this),t===e?t=0:this.css("opacity",0),n(this,t,1,"1,1",i)},t.fn.hide=function(t,n){return t===e?a.call(this):i(this,t,"0,0",n)},t.fn.toggle=function(n,i){return n===e||"boolean"==typeof n?s.call(this,n):this.each(function(){var e=t(this);e["none"==e.css("display")?"show":"hide"](n,i)})},t.fn.fadeTo=function(t,e,i){return n(this,t,e,null,i)},t.fn.fadeIn=function(t,e){var n=this.css("opacity");return n>0?this.css("opacity",0):n=1,o.call(this).fadeTo(t,n,e)},t.fn.fadeOut=function(t,e){return i(this,t,null,e)},t.fn.fadeToggle=function(e,n){return this.each(function(){var i=t(this);i[0==i.css("opacity")||"none"==i.css("display")?"fadeIn":"fadeOut"](e,n)})}}(Zepto);