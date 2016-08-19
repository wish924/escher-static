var Env = {
    weixin: navigator.userAgent.indexOf('MicroMessenger') > -1,
    android: /android/i.test(navigator.userAgent.toLowerCase()),
    ios: /(iphone|ipad|ipod|ios)/i.test(navigator.userAgent.toLowerCase()),
    ie: navigator.userAgent.match(/MSIE\s([\d.]+)/) || navigator.userAgent.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),

    isIE: function() {
        return this.ie != null;
    },

    isMobile: function() {
        return this.android || this.ios;
    },

    isWeixin: function() {
        return this.weixin;
    }
}

var Pano = {
    onPointerDownPointerX: window.innerWidth / 2,
    onPointerDownPointerY: window.innerHeight / 2,
    onPointerDownLon: null,
    onPointerDownLat: null,
    lon: 0,
    onMouseDownLon: 0,
    lat: 0,
    onMouseDownLat: 0,
    phi: 0,
    theta: 0,
    distance: 250,
    onMouseDownMouseX: 0,
    onMouseDownMouseY: 0,
    camera: null,
    scene: null,
    renderer: null,
    isUserInteracting: false,
    isPic: false,
    radius: 500,

    initVideo: function(url) {
        var video = document.createElement('video');
        video.loop = true;
        video.muted = true;
        video.autoplay = true;
        video.crossOrigin = "";
        video.src = url;

        var texture = new THREE.VideoTexture( video );
        texture.minFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        Pano.init(texture)
    },

    initPic: function(url) {
        Pano.isPic = true;

        var texture = new THREE.TextureLoader().load(url);
        texture.setCrossOrigin = ('');
        Pano.init(texture)
    },

    init: function(texture) {
        var container, mesh;
        container = document.getElementById('container');

        Pano.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
        Pano.camera.target = new THREE.Vector3( 0, 0, 0 );

        Pano.scene = new THREE.Scene();

        var geometry = new THREE.SphereBufferGeometry( Pano.radius, 60, 60 );
        geometry.scale( -1, 1, 1 );

        var material   = new THREE.MeshBasicMaterial( { map : texture } );

        mesh = new THREE.Mesh( geometry, material );

        Pano.scene.add( mesh );
        Pano.renderer = new THREE.WebGLRenderer();
        Pano.renderer.setPixelRatio( window.devicePixelRatio );
        Pano.renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( Pano.renderer.domElement );

        Pano.bindEvent();
        Pano.animate();
    },

    bindEvent: function() {
        document.addEventListener( 'mousemove', Pano.onDocumentMouseMove, false );
        document.addEventListener( 'mousewheel', Pano.onDocumentMouseWheel, false );
        document.addEventListener( 'MozMousePixelScroll', Pano.onDocumentMouseWheel, false);

        document.addEventListener( 'touchstart',  Pano.onDocumentTouchStart, false );
        document.addEventListener( 'touchmove',  Pano.onDocumentTouchMove, false );
        document.addEventListener( 'touchend',  Pano.onDocumentTouchEnd, false );

        window.addEventListener( 'resize', Pano.onWindowResize, false );
    },

    animate: function() {
        requestAnimationFrame( Pano.animate );
        Pano.update();
    },

    update: function() {
        if ( Pano.isPic && Pano.isUserInteracting === false ) {
            Pano.lon += 0.1;
        }

        Pano.lat = Math.max( - 85, Math.min( 85, Pano.lat ) );
        Pano.phi = THREE.Math.degToRad( 90 - Pano.lat );
        Pano.theta = THREE.Math.degToRad( Pano.lon );

        Pano.camera.position.x = Pano.distance * Math.sin( Pano.phi ) * Math.cos( Pano.theta );
        Pano.camera.position.y = Pano.distance * Math.cos( Pano.phi );
        Pano.camera.position.z = Pano.distance * Math.sin( Pano.phi ) * Math.sin( Pano.theta );

        Pano.camera.lookAt( Pano.camera.target );
        Pano.renderer.render( Pano.scene, Pano.camera );
    },

    onDocumentMouseMove: function(event) {
        event.preventDefault();
        if( isUserInteracting = false ) {
            Pano.onPointerDownPointerX = event.clientX;
            Pano.onPointerDownPointerY = event.clientY;
        }

        Pano.isUserInteracting = true;
        if ( Pano.isUserInteracting === true ) {
            Pano.lon = ( Pano.onPointerDownPointerX - event.clientX ) * 0.1 + Pano.lon;
            Pano.lat = ( event.clientY - Pano.onPointerDownPointerY ) * 0.1 + Pano.lat;
        }

        Pano.onPointerDownPointerX = event.clientX;
        Pano.onPointerDownPointerY = event.clientY;
        Pano.isUserInteracting = false;
    },

    onWindowResize: function() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        Pano.camera.aspect = window.innerWidth / window.innerHeight;
        Pano.camera.updateProjectionMatrix();

        Pano.renderer.setSize( window.innerWidth, window.innerHeight );
    },

    onDocumentTouchStart: function( event ) {
        var touch = event.touches[0];

        event.preventDefault();
        Pano.isUserInteracting = true;

        Pano.onPointerDownPointerX = touch.pageX;
        Pano.onPointerDownPointerY = touch.pageY;

        Pano.onPointerDownLon = lon;
        Pano.onPointerDownLat = lat;
    },

    onDocumentTouchMove: function( event ) {
        if ( Pano.isUserInteracting === true ) {
            Pano.lon = ( Pano.onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + Pano.onPointerDownLon;
            Pano.lat = ( event.touches[0].pageY - Pano.onPointerDownPointerY ) * 0.1 + Pano.onPointerDownLat;
        }
    },

    onDocumentTouchEnd: function( event ) {
        Pano.isUserInteracting = false;
    },

    onDocumentMouseWheel: function( event ) {
        var temp = 500 / Math.sqrt(
            Math.pow(
                Math.tan(THREE.Math.degToRad(Pano.camera.fov / 2)), 2) * (1 + Math.pow(window.innerHeight / window.innerWidth , 2)
            )
        ) - 6; 

        if ( event.wheelDeltaY ) {
            // Opera / Explorer 9
            Pano.calDistance(event.wheelDeltaY, temp)
        } else if ( event.wheelDelta ) {
            // Firefox
            Pano.calDistance(event.wheelDelta, temp)
        } else if ( event.detail ) {
            Pano.calDistance(event.detail, temp)
        }
    },

    calDistance: function(delta, temp) {
        if(Pano.distance < temp && Pano.distance + Pano.radius < Pano.camera.far && Pano.distance > Pano.radius / 10){
            Pano.distance -= delta * 0.05;
        } else if(Pano.distance >= temp) {
            if(delta > 0){
                Pano.distance -= delta * 0.05;
            }
        } else {
            if(event.wheelDeltaY < 0){
                Pano.distance -= event.wheelDeltaY * 0.05;
            }
        }
    }
}

var Preload = {
    add: function(source, callback) {
        var el = document.createElement("link");
        el.rel = "prefetch";

        el.addEventListener("load", function() {
            callback();
        }, false);

        el.href = source;
        document.body.appendChild(el);
    }
}
