$(function() {

    if(!Env.isMobile()) {
        $("#container").removeClass("ms-controller");
        $("body").vegas({
            slides: [
                {src: StaticFile.getUrl("/img/web/mountain.jpg")},
            ],
            overlay: StaticFile.getUrl("/img/web/vegas/overlays/06.png")
        });
    }

    if(!Env.isIE() || true) {
        if(Env.isMobile()) {
            $("#loading").hide();
            $("#intro").show();
            $("#container").removeClass("ms-controller");
            var pano = new Pano($('#scene')[0]);
            pano.initPic( StaticFile.getUrl("/img/wap/mountain.jpg") );
        } else {
            var intros = [
                {
                    video: ["/video/web/web1.mp4", "/video/web/web2.mp4"],
                    text: ["从森林漫步到雪山", "从海洋游览到大地", "我们带你去世界任何一个地方"]
                },
                {
                    video: ["/video/web/web3.mp4", "/video/web/web4.mp4"],
                    text: ["对记忆深处的寻访", "对无限宇宙的狂想", "我们展现给你不可思议的景像"]
                },
                {
                    video: ["/video/web/web5.mp4", "/video/web/web6.mp4"],
                    text: ["跨越时空的对望", "体验极致的感官", "我们为你呈现从未忘却的梦想"]
                }
            ];

            IntroVideoPlay(intros);
        }
    } else {
        $("#loading").hide();
        $("#intro").show();
    }

    $('#download a').mouseover(function(e) {
        if(!Env.isMobile()) {
            $('#qrcode').show(200);
        }
    }).mouseout(function(e) {
        if(!Env.isMobile()) {
            $('#qrcode').hide();
        }
    });

    $('#download a').click(function(e) {
        if(Env.isMobile()) {
            return;
        }

        e.preventDefault();
    });
});

var IntroVideoPlay = function(intros) {
    var i = 0, n = 0, i_p = 0, n_p = 0;
    var videoObj = null,
        introObj = $('#intro');
    var total = intros.length;

    function preload(callback) {
        if(i_p >= total) {
            return;
        }

        if(Env.isSafari()) {
            var url = intros[i_p].video[n_p];
        } else {
            var url = StaticFile.getUrl(intros[i_p].video[n_p]);
        }

        Preload.add(url, function() {
            if(typeof callback == 'function') {
                callback();
            }

            preload();
        });

        if(++n_p >= 2) {
            n_p = 0;
            i_p++;
        }
    }

    function init() {
        var pano = new Pano($('#scene')[0]);
        if(Env.isSafari()) {
            videoObj = pano.initVideo(intros[i].video[n]);
        } else {
            videoObj = pano.initVideo(StaticFile.getUrl(intros[i].video[n]));
        }
        videoObj.addEventListener('ended', current, false);

        $('#loading').hide();

        var el = getElement(intros[i].text[n]);
        introObj.empty().append(el);
        introObj.show();
        setTimeout(function() {
            el.addClass('show-up');
        }, 1000);
    }

    function getElement(text) {
        return $("<p>" + text + "</p>");
    }

    function show() {
        var el = getElement(intros[i].text[n]);

        if(n == 0) {
            if(Env.isSafari()) {
                videoObj.src = intros[i].video[n];
            } else {
                videoObj.src = StaticFile.getUrl(intros[i].video[n]);
            }

            introObj.fadeOut(1000, function() {
                introObj.empty().show();
                introObj.append(el);

                setTimeout(function() {
                    el.addClass('show-up');
                }, 100);

            });
        }

        if(n == 1) {
            introObj.append(el);
            setTimeout(function() {
                el.addClass('show-up');
            }, 100);

            setTimeout(function() {
                var el1 = getElement(intros[i].text[n+1]);
                introObj.append(el1);
                setTimeout(function() {
                    el1.addClass('show-up');
                }, 100);
            }, 5000);

            if(Env.isSafari()) {
                videoObj.src = intros[i].video[n];
            } else {
                videoObj.src = StaticFile.getUrl(intros[i].video[n]);
            }
        }
    }

    function current() {
        if(++n >= 2) {
            i = i + 1 < total ? i + 1 : 0;
            n = 0;
        }

        show();
    };

    if(!Env.isSafari() && !Env.isEdge() && !Env.isIE()) {
        preload(init);
    } else {
        init();
    }
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
