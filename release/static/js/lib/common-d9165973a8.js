var Config={STATIC_DOMAIN:"http://static.eschervr.com"},Env={win:window,nav:window.navigator,REG_APPLE:/^Apple/,weixin:navigator.userAgent.indexOf("MicroMessenger")>-1,android:/android/i.test(navigator.userAgent.toLowerCase()),ios:/(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase()),ie:navigator.userAgent.match(/MSIE\s([\d.]+)/)||navigator.userAgent.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),edge:navigator.userAgent.match(/Edge\/([\d.]+)/),chrome:navigator.userAgent.match(/Chrome\/([\d.]+)/)||navigator.userAgent.match(/CriOS\/([\d.]+)/),webview:!this.chrome&&navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),safari:this.webview||navigator.userAgent.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/),chromiumType:null,_getChromiumType:function(){if(null!=this.chromiumType)return this.chromiumType;var e=this.win;return this.isIE()||"undefined"!=typeof e.scrollMaxX||this.REG_APPLE.test(this.nav.vendor||"")?"":this._testExternal(/^sogou/i,0)?"sogou":this._testExternal(/^liebao/i,0)?"liebao":this.nav.mimeTypes[30]||!this.nav.mimeTypes.length?"360":e.clientInformation&&e.clientInformation.permissions?"chrome":""},_testExternal:function(e,t){var n=this.win.external||{};for(var i in n)if(e.test(t?n[i]:i))return!0;return!1},isIE:function(){return null!=this.ie},ieVersion:function(){return null!=this.ie&&parseInt(this.ie[1])},isEdge:function(){return null!=this.edge},isSafari:function(){return null!=this.safari},is360:function(){return this.chromiumType=this._getChromiumType(),"360"===this.chromiumType},isSogou:function(){return this.chromiumType=this._getChromiumType(),"sogou"===this.chromiumType},isMobile:function(){return this.android||this.ios},isAndroid:function(){return this.android},isiOS:function(){return this.ios},isWeixin:function(){return this.weixin}},StaticFile={getUrl:function(e){return Config.STATIC_DOMAIN+e}},Menu={menu:$("#menu>ul"),icon:$("#menu-icon"),init:function(){this.icon.click(function(){Menu.toggle()})},toggle:function(){Menu.icon.toggleClass("close"),Menu.menu.toggle().toggleClass("show")}};$(function(){Menu.init()});var Pano=function(e){function t(){try{var e=document.createElement("canvas");return!(!window.WebGLRenderingContext||!e.getContext("webgl")&&!e.getContext("experimental-webgl"))}catch(t){return!1}}function n(n){a=new THREE.PerspectiveCamera(75,e.clientWidth/e.clientHeight,1,1100),a.target=new THREE.Vector3(0,0,0),a.position.z=u,d.orbitControls=new THREE.OrbitControls(a,"scene"==e.id?document:e),s=new THREE.Scene;var o=new THREE.SphereBufferGeometry(h,60,60);o.scale(-1,1,1);var l=new THREE.MeshBasicMaterial({map:n,overdraw:!0});mesh=new THREE.Mesh(o,l),s.add(mesh),c=!Env.isIE()&&t()?new THREE.WebGLRenderer:new THREE.CanvasRenderer,c.setPixelRatio(window.devicePixelRatio),c.setSize(e.clientWidth,e.clientHeight),e.appendChild(c.domElement),window.addEventListener("resize",r,!1),i()}function i(){requestAnimationFrame(i),d.orbitControls.update(),o()}function o(){c.render(s,a)}function r(){a.aspect=e.clientWidth/e.clientHeight,a.updateProjectionMatrix(),c.setSize(e.clientWidth,e.clientHeight)}this.orbitControls=null;var a=null,s=null,c=null,h=500,u=250,d=this;this.initVideo=function(e){var t=document.createElement("video");t.loop=!1,t.muted=!0,t.autoplay=!0,t.crossOrigin="",t.src=e,t.width=2048,t.height=1024;var i=new THREE.VideoTexture(t);return i.minFilter=THREE.LinearFilter,i.format=THREE.RGBFormat,n(i),t},this.initPic=function(e){var t=(new THREE.TextureLoader).load(e);t.setCrossOrigin="",n(t)}};"object"==typeof THREE&&(THREE.OrbitControls=function(e,t){function n(e){g.theta-=e}function i(e){g.phi-=e}function o(e,t,n,i){var o,r,a,s=e*t+n*i;if(s>.499){a=2*Math.atan2(e,i),o=Math.PI/2,r=0;var c=new THREE.Vector3(o,r,a);return c}if(s<-.499){a=-2*Math.atan2(e,i),o=-Math.PI/2,r=0;var c=new THREE.Vector3(o,r,a);return c}var h=e*e,u=t*t,d=n*n;a=Math.atan2(2*t*i-2*e*n,1-2*u-2*d),o=Math.asin(2*s),r=Math.atan2(2*e*i-2*t*n,1-2*h-2*d);var c=new THREE.Vector3(o,r,a);return c}function r(e){v.set(e.clientX,e.clientY),w.subVectors(v,p);var t=void 0!==d.domElement.clientWidth?d.domElement.clientWidth:window.innerWidth;n(4*Math.PI*w.x/t*d.rotateSpeed);var o=void 0!==d.domElement.clientHeight?d.domElement.clientHeight:window.innerHeight;i(2*Math.PI*w.y/o*d.rotateSpeed),p.copy(v)}function a(e){p.set(e.touches[0].pageX,e.touches[0].pageY)}function s(e){e.preventDefault(),v.set(e.touches[0].pageX,e.touches[0].pageY),w.subVectors(v,p);var t=void 0!==d.domElement.clientWidth?d.domElement.clientWidth:window.innerWidth;n(2*Math.PI*w.x/t*d.rotateSpeed);var o=void 0!==d.domElement.clientHeight?d.domElement.clientHeight:window.innerHeight;i(2*Math.PI*w.y/o*d.rotateSpeed),p.copy(v),d.update()}function c(e){}function h(e){d.deviceOrientation=e}function u(e){d.screenOrientation=window.orientation||0}this.domElement=void 0!==t?t:document,this.object=e,this.enable=!1,this.target=new THREE.Vector3,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-(1/0),this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.25,this.rotateSpeed=.3,this.deviceOrientation={},this.screenOrientation=0;var d=this,l={type:"change"},m=1e-6,E=new THREE.Spherical,g=new THREE.Spherical,p=new THREE.Vector2,v=new THREE.Vector2,w=new THREE.Vector2,T=function(){var e=new THREE.Vector3(0,0,1),t=new THREE.Euler,n=new THREE.Quaternion,i=new THREE.Quaternion((-Math.sqrt(.5)),0,0,Math.sqrt(.5));return function(o,r,a,s,c){t.set(a,r,-s,"YXZ"),o.setFromEuler(t),o.multiply(i),o.multiply(n.setFromAxisAngle(e,-c))}}();this.update=function(){var t=new THREE.Vector3,r=(new THREE.Quaternion).setFromUnitVectors(e.up,new THREE.Vector3(0,1,0)),a=r.clone().inverse(),s=new THREE.Vector3,c=new THREE.Quaternion,h=0,u=0;return function(e){if(d.enable){e=e||{};var p=d.deviceOrientation.alpha?THREE.Math.degToRad(d.deviceOrientation.alpha):0,v=d.deviceOrientation.beta?THREE.Math.degToRad(d.deviceOrientation.beta):0,w=d.deviceOrientation.gamma?THREE.Math.degToRad(d.deviceOrientation.gamma):0,f=d.screenOrientation?THREE.Math.degToRad(d.screenOrientation):0,H=(new THREE.Quaternion).copy(d.object.quaternion);T(H,p,v,w,f);var R=o(H.x,H.y,H.z,H.w);e.init||(n(h-R.z),i(u-R.y)),u=R.y,h=R.z;var M=d.object.position;return t.copy(M).sub(d.target),t.applyQuaternion(r),E.setFromVector3(t),E.theta+=g.theta,E.phi+=g.phi,E.theta=Math.max(d.minAzimuthAngle,Math.min(d.maxAzimuthAngle,E.theta)),E.phi=Math.max(d.minPolarAngle,Math.min(d.maxPolarAngle,E.phi)),E.makeSafe(),t.setFromSpherical(E),t.applyQuaternion(a),M.copy(d.target).add(t),d.object.lookAt(d.target),d.enableDamping===!0?(g.theta*=1-d.dampingFactor,g.phi*=1-d.dampingFactor):g.set(0,0,0),(s.distanceToSquared(d.object.position)>m||8*(1-c.dot(d.object.quaternion))>m)&&(d.dispatchEvent(l),s.copy(d.object.position),c.copy(d.object.quaternion),!0)}}}(),window.addEventListener("orientationchange",u,!1),window.addEventListener("deviceorientation",h,!1),this.domElement.addEventListener("mousemove",r,!1),this.domElement.addEventListener("touchstart",a,!1),this.domElement.addEventListener("touchend",c,!1),this.domElement.addEventListener("touchmove",s,!1);var f=void 0!==this.domElement.clientWidth?this.domElement.clientWidth:window.innerWidth,H=void 0!==this.domElement.clientHeight?this.domElement.clientHeight:window.innerHeight;p.set(f/2,H/2),n(THREE.Math.degToRad(-90)),setTimeout(function(){d.enable=!0,d.update({init:!0})},200)},THREE.OrbitControls.prototype=Object.create(THREE.EventDispatcher.prototype),THREE.OrbitControls.prototype.constructor=THREE.OrbitControls);