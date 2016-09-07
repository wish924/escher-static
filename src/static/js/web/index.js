$(function() {

    if(!Env.isMobile()) {
        $("body").removeClass("ms-controller").vegas({
            slides: [
                {src: "/img/web/bg.jpg"},
            ]
        });
    }

    if(!Env.isIE()) {
        if(Env.isMobile()) {
            $("#loading").hide();
            $("body").removeClass("ms-controller");
            Pano.initPic("/img/wap/mountain.jpg");
        } else {
            var video_src = "http://obfgoys2n.bkt.clouddn.com/xiaomi_VR_preview_727_2.mp4";
            Preload.add(video_src, function() {
                $("#loading").hide();
                Pano.initVideo(video_src);
            });
        }
    } else {
        $("#loading").hide();
    }
});
