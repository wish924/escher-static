var Env={weixin:navigator.userAgent.indexOf("MicroMessenger")>-1,android:/android/i.test(navigator.userAgent.toLowerCase()),ios:/(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase()),ie:navigator.userAgent.match(/MSIE\s([\d.]+)/)||navigator.userAgent.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),isIE:function(){return null!=this.ie},isMobile:function(){return this.android||this.ios},isWeixin:function(){return this.weixin}},Pano={onPointerDownPointerX:window.innerWidth/2,onPointerDownPointerY:window.innerHeight/2,onPointerDownLon:null,onPointerDownLat:null,lon:0,onMouseDownLon:0,lat:0,onMouseDownLat:0,phi:0,theta:0,distance:250,onMouseDownMouseX:0,onMouseDownMouseY:0,camera:null,scene:null,renderer:null,isUserInteracting:!1,isPic:!1,radius:500,initVideo:function(n){var e=document.createElement("video");e.loop=!0,e.muted=!0,e.autoplay=!0,e.crossOrigin="",e.src=n;var o=new THREE.VideoTexture(e);o.minFilter=THREE.LinearFilter,o.format=THREE.RGBFormat,Pano.init(o)},initPic:function(n){Pano.isPic=!0;var e=(new THREE.TextureLoader).load(n);e.setCrossOrigin="",Pano.init(e)},init:function(n){var e,o;e=document.getElementById("container"),Pano.camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1100),Pano.camera.target=new THREE.Vector3(0,0,0),Pano.scene=new THREE.Scene;var a=new THREE.SphereBufferGeometry(Pano.radius,60,60);a.scale(-1,1,1);var t=new THREE.MeshBasicMaterial({map:n});o=new THREE.Mesh(a,t),Pano.scene.add(o),Pano.renderer=new THREE.WebGLRenderer,Pano.renderer.setPixelRatio(window.devicePixelRatio),Pano.renderer.setSize(window.innerWidth,window.innerHeight),e.appendChild(Pano.renderer.domElement),Pano.bindEvent(),Pano.animate()},bindEvent:function(){document.addEventListener("mousemove",Pano.onDocumentMouseMove,!1),document.addEventListener("mousewheel",Pano.onDocumentMouseWheel,!1),document.addEventListener("MozMousePixelScroll",Pano.onDocumentMouseWheel,!1),document.addEventListener("touchstart",Pano.onDocumentTouchStart,!1),document.addEventListener("touchmove",Pano.onDocumentTouchMove,!1),document.addEventListener("touchend",Pano.onDocumentTouchEnd,!1),window.addEventListener("resize",Pano.onWindowResize,!1)},animate:function(){requestAnimationFrame(Pano.animate),Pano.update()},update:function(){Pano.isPic&&Pano.isUserInteracting===!1&&(Pano.lon+=.1),Pano.lat=Math.max(-85,Math.min(85,Pano.lat)),Pano.phi=THREE.Math.degToRad(90-Pano.lat),Pano.theta=THREE.Math.degToRad(Pano.lon),Pano.camera.position.x=Pano.distance*Math.sin(Pano.phi)*Math.cos(Pano.theta),Pano.camera.position.y=Pano.distance*Math.cos(Pano.phi),Pano.camera.position.z=Pano.distance*Math.sin(Pano.phi)*Math.sin(Pano.theta),Pano.camera.lookAt(Pano.camera.target),Pano.renderer.render(Pano.scene,Pano.camera)},onDocumentMouseMove:function(n){n.preventDefault(),(isUserInteracting=!1)&&(Pano.onPointerDownPointerX=n.clientX,Pano.onPointerDownPointerY=n.clientY),Pano.isUserInteracting=!0,Pano.isUserInteracting===!0&&(Pano.lon=.1*(Pano.onPointerDownPointerX-n.clientX)+Pano.lon,Pano.lat=.1*(n.clientY-Pano.onPointerDownPointerY)+Pano.lat),Pano.onPointerDownPointerX=n.clientX,Pano.onPointerDownPointerY=n.clientY,Pano.isUserInteracting=!1},onWindowResize:function(){windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,Pano.camera.aspect=window.innerWidth/window.innerHeight,Pano.camera.updateProjectionMatrix(),Pano.renderer.setSize(window.innerWidth,window.innerHeight)},onDocumentTouchStart:function(n){var e=n.touches[0];n.preventDefault(),Pano.isUserInteracting=!0,Pano.onPointerDownPointerX=e.pageX,Pano.onPointerDownPointerY=e.pageY,Pano.onPointerDownLon=lon,Pano.onPointerDownLat=lat},onDocumentTouchMove:function(n){Pano.isUserInteracting===!0&&(Pano.lon=.1*(Pano.onPointerDownPointerX-n.touches[0].pageX)+Pano.onPointerDownLon,Pano.lat=.1*(n.touches[0].pageY-Pano.onPointerDownPointerY)+Pano.onPointerDownLat)},onDocumentTouchEnd:function(n){Pano.isUserInteracting=!1},onDocumentMouseWheel:function(n){var e=500/Math.sqrt(Math.pow(Math.tan(THREE.Math.degToRad(Pano.camera.fov/2)),2)*(1+Math.pow(window.innerHeight/window.innerWidth,2)))-6;n.wheelDeltaY?Pano.calDistance(n.wheelDeltaY,e):n.wheelDelta?Pano.calDistance(n.wheelDelta,e):n.detail&&Pano.calDistance(n.detail,e)},calDistance:function(n,e){Pano.distance<e&&Pano.distance+Pano.radius<Pano.camera.far&&Pano.distance>Pano.radius/10?Pano.distance-=.05*n:Pano.distance>=e?n>0&&(Pano.distance-=.05*n):event.wheelDeltaY<0&&(Pano.distance-=.05*event.wheelDeltaY)}},Preload={add:function(n,e){var o=document.createElement("link");o.rel="prefetch",o.addEventListener("load",function(){e()},!1),o.href=n,document.body.appendChild(o)}};