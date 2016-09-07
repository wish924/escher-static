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
            $("#container").removeClass("ms-controller");
            Pano.initPic("/img/wap/mountain.jpg");
        } else {
            //var video_src = "http://obfgoys2n.bkt.clouddn.com/xiaomi_VR_preview_727_2.mp4";
            var video_src = "/video/web/intro-1.mp4";
            Preload.add(video_src, function() {
                Pano.initVideo(video_src);
            });
        }
    }
});
