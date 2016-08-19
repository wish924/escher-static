$(function() {
    if(Env.isAndroid || Env.isiOS) {
        window.location.href = "http://m.es.wangweixi.greensfordev.com";
    }

    $("body").removeClass("ms-controller").vegas({
        slides: [
            {src: "/img/web/bg.jpg"},
        ]
    });

    if(Env.isIE() || true) {
        $("#loading").hide();
        return;
    }

    var video_src = "http://obfgoys2n.bkt.clouddn.com/xiaomi_VR_preview_727_2.mp4";
    Preload.add(video_src, function() {
        $("#loading").hide();
        Pano.initVideo(video_src);
    });
});

