var onPointerDownPointerX = window.innerWidth / 2;
var onPointerDownPointerY = window.innerHeight / 2;
var camera, scene, renderer;
var texture_placeholder, isUserInteracting = false,
    onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    lon = 0, onMouseDownLon = 0,
    lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0,
    distance = 500;

    document.addEventListener('DOMContentLoaded', function() {
        $("body").vegas({
            slides: [
                {src: "/img/web/bg.jpg"},
            ]
        });
        document.getElementById('prefetch').addEventListener('load', function() {
            init();
            animate();
        });
    }, false);

    function init() {
        var loading = document.getElementById('loading');
        loading.style.display = 'none';

        var container, mesh;

        container = document.getElementById( 'container' );

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
        camera.target = new THREE.Vector3( 0, 0, 0 );

        scene = new THREE.Scene();

        var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
        geometry.scale( - 1, 1, 1 );

        var video = document.createElement( 'video' );
        video.loop = true;
        video.muted = true;
        video.autoplay = true;
        video.crossOrigin = "";
        video.src = "http://obfgoys2n.bkt.clouddn.com/xiaomi_VR_preview_727_2.mp4";

        var texture = new THREE.VideoTexture( video );
        //texture.needsUpdate = true;
        texture.minFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;

        var material   = new THREE.MeshBasicMaterial( { map : texture } );

        mesh = new THREE.Mesh( geometry, material );

        scene.add( mesh );
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
        document.addEventListener( 'MozMousePixelScroll', onDocumentMouseWheel, false);

        window.addEventListener( 'resize', onWindowResize, false );
    }

    function onDocumentMouseMove( event ) {
        event.preventDefault();
        if( isUserInteracting = false ) {
            onPointerDownPointerX = event.clientX;
            onPointerDownPointerY = event.clientY;
        }
        isUserInteracting = true;
        if ( isUserInteracting === true ) {

            lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + lon;
            lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + lat;

        }
        onPointerDownPointerX = event.clientX;
        onPointerDownPointerY = event.clientY;
        isUserInteracting = false;
    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    function onDocumentMouseWheel( event ) {
        // WebKit
        var temp = 500 / Math.sqrt(
            Math.pow(
                Math.tan(THREE.Math.degToRad(camera.fov / 2)), 2) * (1 + Math.pow(window.innerHeight / window.innerWidth , 2)
            )
        ) - 6;

        if ( event.wheelDeltaY ) {
            calDistance(event.wheelDeltaY, temp)
            // Opera / Explorer 9
        } else if ( event.wheelDelta ) {
            calDistance(event.wheelDelta, temp)
            // Firefox
        } else if ( event.detail ) {
            calDistance(event.detail, temp)
        }
    }

    function calDistance(delta, temp){
        if(distance < temp && distance + 500 < camera.far && distance > 10){
            distance -= delta * 0.05;
        } else if(distance >= temp) {
            if(delta > 0){
                distance -= delta * 0.05;
            }
        } else {
            if(event.wheelDeltaY < 0) {
                distance -= event.wheelDeltaY * 0.05;
            }
        }
    }

    function animate() {
        requestAnimationFrame( animate );
        update();
    }

    function update() {
        lat = Math.max( - 85, Math.min( 85, lat ) );
        phi = THREE.Math.degToRad( 90 - lat );
        theta = THREE.Math.degToRad( lon );

        camera.position.x = distance * Math.sin( phi ) * Math.cos( theta );
        camera.position.y = distance * Math.cos( phi );
        camera.position.z = distance * Math.sin( phi ) * Math.sin( theta );

        camera.lookAt( camera.target );
        renderer.render( scene, camera );
    }

