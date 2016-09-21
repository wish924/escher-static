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

    isAndroid: function() {
        return this.android;
    },

    isiOS: function() {
        return this.ios;
    },

    isWeixin: function() {
        return this.weixin;
    }
}

var Menu = {
    menu: $('#menu>ul'),
    icon: $('#menu-icon'),

    init: function() {
        this.icon.click(function() {
            Menu.toggle();
        });
    },

    toggle: function() {
        Menu.icon.toggleClass('close');
        Menu.menu.toggle().toggleClass('show');
    }
};

$(function() {
    Menu.init();
});

var Pano = function(container) {
    this.orbitControls = null;
    var camera = null,
    scene = null, renderer = null,
    radius = 500, distance = 250;

    var scope = this;

    this.initVideo = function(url) {
        var video = document.createElement('video');
        video.loop = false;
        video.muted = true;
        video.autoplay = true;
        video.crossOrigin = "";
        video.src = url;

        var texture = new THREE.VideoTexture( video );
        texture.minFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        init(texture);

        return video;
    };

    this.initPic = function(url) {
        var texture = new THREE.TextureLoader().load(url);
        texture.setCrossOrigin = ('');
        init(texture)
    };

    function init(texture) {
        camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 1, 1100 );
        camera.target = new THREE.Vector3( 0, 0, 0 );
        camera.position.z = distance;

        scope.orbitControls = new THREE.OrbitControls( camera, container.id == 'scene' ? document : container);

        scene = new THREE.Scene();

        var geometry = new THREE.SphereBufferGeometry( radius, 60, 60 );
        geometry.scale( -1, 1, 1 );

        var material = new THREE.MeshBasicMaterial( { map : texture } );

        mesh = new THREE.Mesh( geometry, material );

        scene.add( mesh );
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( container.clientWidth, container.clientHeight );
        container.appendChild( renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );

        animate();
    }

    function animate() {
        requestAnimationFrame( animate );
        scope.orbitControls.update();
        render();
    }

    function render() {
        renderer.render( scene, camera );
    }

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( container.clientWidth, container.clientHeight );
    }
}

if(typeof THREE == 'object') {
    THREE.OrbitControls = function ( object, domElement ) {
        this.domElement = ( domElement !== undefined ) ? domElement : document;
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
            var clientWidth = scope.domElement.clientWidth !== undefined ? scope.domElement.clientWidth : window.innerWidth;
            rotateLeft( 4 * Math.PI * rotateDelta.x / clientWidth * scope.rotateSpeed );

            // rotating up and down along whole screen attempts to go 360, but limited to 180
            var clientHeight = scope.domElement.clientHeight !== undefined ? scope.domElement.clientHeight : window.innerHeight;
            rotateUp( 2 * Math.PI * rotateDelta.y / clientHeight * scope.rotateSpeed );

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
            var clientWidth = scope.domElement.clientWidth !== undefined ? scope.domElement.clientWidth : window.innerWidth;
            rotateLeft( 2 * Math.PI * rotateDelta.x / clientWidth * scope.rotateSpeed );

            // rotating up and down along whole screen attempts to go 360, but limited to 180
            var clientHeight = scope.domElement.clientHeight !== undefined ? scope.domElement.clientHeight : window.innerHeight;
            rotateUp( 2 * Math.PI * rotateDelta.y / clientHeight * scope.rotateSpeed );

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

        this.domElement.addEventListener( 'mousemove', mousemove, false );
        this.domElement.addEventListener( 'touchstart', touchstart, false );
        this.domElement.addEventListener( 'touchend', touchend, false );
        this.domElement.addEventListener( 'touchmove', touchmove, false );

        // set mousemove base point is dom center
        var clientWidth = this.domElement.clientWidth !== undefined ? this.domElement.clientWidth : window.innerWidth;
        var clientHeight = this.domElement.clientHeight !== undefined ? this.domElement.clientHeight : window.innerHeight;
        rotateStart.set( clientWidth / 2, clientHeight / 2 );

        // force an update at start
        rotateLeft(THREE.Math.degToRad( -90 ));
        setTimeout(function() {
            scope.enable = true;
            scope.update({init: true});
        }, 200);
    }

    THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
    THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;
}
