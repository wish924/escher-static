$(function() {

    if(!Env.isMobile()) {
        $("#container").removeClass("ms-controller");
        $("body").vegas({
            slides: [
                {src: "/img/web/mountain.jpg"},
            ],
            overlay: "/img/web/vegas/overlays/06.png"
        });
    }

    if(!Env.isIE()) {
        if(Env.isMobile()) {
            $("#loading").hide();
            $("#intro").show();
            $("#container").removeClass("ms-controller");
            Pano.initPic("/img/wap/mountain.jpg");
        } else {
            var intros = [
                { 
                    video: "/video/web/intro-1.mp4", 
                    text: "从森林漫步到雪山，从海洋游览到大地<br />我们带你去世界任何一个地方"
                },
                {
                    video: "/video/web/intro-1.mp4?v=1", 
                    text: "对记忆深处的寻访，对无限宇宙的狂想<br />我们展现给你不可思议的景像"
                },
                {
                    video: "/video/web/intro-1.mp4?v=2", 
                    text: "跨越时空的对望，体验极致的感官<br />我们为你呈现从未忘却的梦想"
                }
            ];

            IntroVideoPlay(intros);
        }
    } else {
        $("#loading").hide();
    }
});

var IntroVideoPlay = function(intros) {
    var idx = 0, idxPreload = 0;
    var videoObj = null,
        introObj = $('#intro');
    var total = intros.length;

    function preload(callback) {
        if(idxPreload >= total) {
            return;
        }

        Preload.add(intros[idxPreload].video, function() {
            if(typeof callback == 'function') {
                callback();
            }

            preload();
        });

        idxPreload++;
    }

    function init() {
        videoObj = Pano.initVideo(intros[idx].video);
        videoObj.addEventListener('ended', current, false);

        $('#loading').hide();

        introObj.html(intros[idx].text);
        introObj.hide().fadeIn(2000);
    }

    function current() {
        if(++idx >= total) {
            idx = 0;
        }

        introObj.fadeOut(1000, function() {
            introObj.html(intros[idx].text);
            introObj.fadeIn(1000, function() {
                videoObj.src = intros[idx].video;
            });
        });
    };

    preload(init);
};

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

var Pano = {
    camera: null,
    scene: null,
    renderer: null,
    radius: 500,
    distance: 250,

    initVideo: function(url) {
        var video = document.createElement('video');
        video.loop = false;
        video.muted = true;
        video.autoplay = true;
        video.crossOrigin = "";
        video.src = url;

        var texture = new THREE.VideoTexture( video );
        texture.minFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        Pano.init(texture);

        return video;
    },

    initPic: function(url) {
        Pano.isPic = true;

        var texture = new THREE.TextureLoader().load(url);
        texture.setCrossOrigin = ('');
        Pano.init(texture)
    },

    init: function(texture) {
        var container, mesh;
        container = document.getElementById('scene');

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
        this.camera.target = new THREE.Vector3( 0, 0, 0 );
        this.camera.position.z = this.distance;

        this.orbitControls = new THREE.OrbitControls( this.camera );

        this.scene = new THREE.Scene();

        var geometry = new THREE.SphereBufferGeometry( Pano.radius, 60, 60 );
        geometry.scale( -1, 1, 1 );

        var material   = new THREE.MeshBasicMaterial( { map : texture } );

        mesh = new THREE.Mesh( geometry, material );

        this.scene.add( mesh );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( this.renderer.domElement );

        window.addEventListener( 'resize', Pano.onWindowResize, false );

        Pano.animate();
    },

    animate: function() {
        requestAnimationFrame( Pano.animate );
        Pano.orbitControls.update();
        Pano.render();
    },

    render: function() {
        this.renderer.render( this.scene, this.camera );
    },

    onWindowResize: function() {
        Pano.camera.aspect = window.innerWidth / window.innerHeight;
        Pano.camera.updateProjectionMatrix();

        Pano.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}

THREE.OrbitControls = function ( object ) {
    this.object = object;

    this.enable = false;

    this.target = new THREE.Vector3();

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    this.minPolarAngle = 0; // radians
    this.maxPolarAngle = Math.PI; // radians

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    this.minAzimuthAngle = - Infinity; // radians
    this.maxAzimuthAngle = Infinity; // radians

    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    this.enableDamping = false;
    this.dampingFactor = 0.25;

    this.rotateSpeed = 0.3;

    this.deviceOrientation = {};
    this.screenOrientation = 0;

    var scope = this;

    var changeEvent = { type: 'change' };
    var startEvent = { type: 'start' };
    var endEvent = { type: 'end' };

    var EPS = 0.000001;

    // current position in spherical coordinates
    var spherical = new THREE.Spherical();
    var sphericalDelta = new THREE.Spherical();

    var rotateStart = new THREE.Vector2();
    var rotateEnd = new THREE.Vector2();
    var rotateDelta = new THREE.Vector2();

    var setObjectQuaternion = function () {
        var zee = new THREE.Vector3( 0, 0, 1 );
        var euler = new THREE.Euler();
        var q0 = new THREE.Quaternion();
        // - PI/2 around the x-axis
        var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0,  Math.sqrt( 0.5 ) );

        //beta=beta-180;
        return function ( quaternion, alpha, beta, gamma, orient ) {
            // 'ZXY' for the device, but 'YXZ' for us
            euler.set( beta, alpha, - gamma, 'YXZ' );
            // orient the device
            quaternion.setFromEuler( euler );
            // camera looks out the back of the device, not the top
            quaternion.multiply( q1 );
            // adjust for screen orientation
            quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) );
        }
    }();

    // this method is exposed, but perhaps it would be better if we can make it private...
    this.update = function() {
        var offset = new THREE.Vector3();

        // so camera.up is the orbit axis
        var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
        var quatInverse = quat.clone().inverse();

        var lastPosition = new THREE.Vector3();
        var lastQuaternion = new THREE.Quaternion();
        var lastGamma = 0, lastBeta = 0;

        return function update (param) {
            if(!scope.enable) {
                return;
            }

            param = param || {};

            var alpha = scope.deviceOrientation.alpha ? THREE.Math.degToRad(scope.deviceOrientation.alpha) : 0; // Z
            var beta = scope.deviceOrientation.beta ? THREE.Math.degToRad(scope.deviceOrientation.beta) : 0; // X'
            var gamma = scope.deviceOrientation.gamma ? THREE.Math.degToRad(scope.deviceOrientation.gamma) : 0; // Y''
            var orient = scope.screenOrientation ? THREE.Math.degToRad(scope.screenOrientation) : 0; // O

            var currentQ = new THREE.Quaternion().copy(scope.object.quaternion);

            setObjectQuaternion(currentQ, alpha, beta, gamma, orient);
            var currentAngle = Quat2Angle(currentQ.x, currentQ.y, currentQ.z, currentQ.w);

            if(!param.init) {
                // currentAngle.z = Left-right
                // currentAngle.y = Up-down
                rotateLeft((lastGamma - currentAngle.z));
                rotateUp((lastBeta - currentAngle.y));
            }

            lastBeta = currentAngle.y;
            lastGamma = currentAngle.z;

            var position = scope.object.position;

            offset.copy( position ).sub( scope.target );

            // rotate offset to "y-axis-is-up" space
            offset.applyQuaternion( quat );

            // angle from z-axis around y-axis
            spherical.setFromVector3( offset );

            spherical.theta += sphericalDelta.theta;
            spherical.phi += sphericalDelta.phi;

            // restrict theta to be between desired limits
            spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

            // restrict phi to be between desired limits
            spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

            spherical.makeSafe();
            offset.setFromSpherical( spherical );

            // rotate offset back to "camera-up-vector-is-up" space
            offset.applyQuaternion( quatInverse );
            position.copy( scope.target ).add( offset );

            scope.object.lookAt( scope.target );

            if ( scope.enableDamping === true ) {
                sphericalDelta.theta *= ( 1 - scope.dampingFactor );
                sphericalDelta.phi *= ( 1 - scope.dampingFactor );
            } else {
                sphericalDelta.set( 0, 0, 0 );
            }

            // update condition is:
            // min(camera displacement, camera rotation in radians)^2 > EPS
            // using small-angle approximation cos(x/2) = 1 - x^2 / 8

            if ( lastPosition.distanceToSquared( scope.object.position ) > EPS ||
                    8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

                        scope.dispatchEvent( changeEvent );

                        lastPosition.copy( scope.object.position );
                        lastQuaternion.copy( scope.object.quaternion );

                        return true;
                    }

            return false;
        };
    }();

    function rotateLeft( angle ) {
        sphericalDelta.theta -= angle;
    }

    function rotateUp( angle ) {
        sphericalDelta.phi -= angle;
    }

    function Quat2Angle( x, y, z, w ) {
        var pitch, roll, yaw;

        var test = x * y + z * w;
        if (test > 0.499) { // singularity at north pole
            yaw = 2 * Math.atan2(x, w);
            pitch = Math.PI / 2;
            roll = 0;

            var euler = new THREE.Vector3( pitch, roll, yaw);
            return euler;
        }

        if (test < -0.499) { // singularity at south pole
            yaw = -2 * Math.atan2(x, w);
            pitch = -Math.PI / 2;
            roll = 0;
            var euler = new THREE.Vector3( pitch, roll, yaw);
            return euler;
        }

        var sqx = x * x;
        var sqy = y * y;
        var sqz = z * z;

        yaw = Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz);
        pitch = Math.asin(2 * test);
        roll = Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz);

        var euler = new THREE.Vector3( pitch, roll, yaw);
        return euler;
    }

    function mousemove( event ) {
        rotateEnd.set( event.clientX, event.clientY );
        rotateDelta.subVectors( rotateEnd, rotateStart );

        // rotating across whole screen goes 360 degrees around
        rotateLeft( 4 * Math.PI * rotateDelta.x / window.innerWidth * scope.rotateSpeed );

        // rotating up and down along whole screen attempts to go 360, but limited to 180
        rotateUp( 2 * Math.PI * rotateDelta.y / window.innerHeight * scope.rotateSpeed );

        rotateStart.copy( rotateEnd );
    }

    function touchstart( event ) {
        //console.log( 'handleTouchStartRotate' );
        rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
    }

    function touchmove( event ) {
        //console.log( 'handleTouchMoveRotate' );

        event.preventDefault();

        rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        rotateDelta.subVectors( rotateEnd, rotateStart );

        // rotating across whole screen goes 360 degrees around
        rotateLeft( 2 * Math.PI * rotateDelta.x / window.innerWidth * scope.rotateSpeed );

        // rotating up and down along whole screen attempts to go 360, but limited to 180
        rotateUp( 2 * Math.PI * rotateDelta.y / window.innerHeight * scope.rotateSpeed );

        rotateStart.copy( rotateEnd );

        scope.update();
    }

    function touchend( event ) {
        //console.log( 'handleTouchEnd' );
    }

    function deviceorientation( event ) {
        scope.deviceOrientation = event;
    }

    function orientationchange( event ) {
        scope.screenOrientation = window.orientation || 0;
    }

    window.addEventListener( 'orientationchange', orientationchange, false );
    window.addEventListener( 'deviceorientation', deviceorientation, false );

    document.addEventListener( 'mousemove', mousemove, false );
    document.addEventListener( 'touchstart', touchstart, false );
    document.addEventListener( 'touchend', touchend, false );
    document.addEventListener( 'touchmove', touchmove, false );

    // set mousemove base point is window center
    rotateStart.set( window.innerWidth / 2, window.innerHeight / 2 );

    // force an update at start
    rotateLeft(THREE.Math.degToRad( -90 ));
    setTimeout(function() {
        scope.enable = true;
        scope.update({init: true});
    }, 200);
}

THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;
