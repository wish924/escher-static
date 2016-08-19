$(function() {
    $("body").removeClass("ms-controller").vegas({
        slides: [
            {src: "/img/web/bg.jpg"},
        ]
    });

    if(Env.isIE()) {
        $("#loading").hide();
        return;
    }

    if(Env.isMobile()) {
        $("#loading").hide();
        Pano.initPic("http://obfgoys2n.bkt.clouddn.com/environment.jpg");
    } else {
        var video_src = "http://obfgoys2n.bkt.clouddn.com/xiaomi_VR_preview_727_2.mp4";
        Preload.add(video_src, function() {
            $("#loading").hide();
            Pano.initVideo(video_src);
        });
    }
});
