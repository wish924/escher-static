$(function(){if(Env.isMobile()||($("#container").removeClass("ms-controller"),$("body").vegas({slides:[{src:StaticFile.getUrl("/img/web/mountain.jpg")}],overlay:StaticFile.getUrl("/img/web/vegas/overlays/06.png")})),!Env.isIE(),0)$("#loading").hide(),$("#intro").show();else if(Env.isMobile()){$("#loading").hide(),$("#intro").show(),$("#container").removeClass("ms-controller");var e=new Pano($("#scene")[0]);e.initPic(StaticFile.getUrl("/img/wap/mountain.jpg"))}else{var i=[{video:["/video/web/web1.mp4","/video/web/web2.mp4"],text:["从森林漫步到雪山","从海洋游览到大地","我们带你去世界任何一个地方"]},{video:["/video/web/web3.mp4","/video/web/web4.mp4"],text:["对记忆深处的寻访","对无限宇宙的狂想","我们展现给你不可思议的景像"]},{video:["/video/web/web5.mp4","/video/web/web6.mp4"],text:["跨越时空的对望","体验极致的感官","我们为你呈现从未忘却的梦想"]}];IntroVideoPlay(i)}$("#download a").mouseover(function(e){Env.isMobile()||$("#qrcode").show(200)}).mouseout(function(e){Env.isMobile()||$("#qrcode").hide()}),$("#download a").click(function(e){Env.isMobile()||e.preventDefault()})});var IntroVideoPlay=function(e){function i(n){if(!(r>=u)){if(Env.isSafari())var o=e[r].video[l];else var o=StaticFile.getUrl(e[r].video[l]);Preload.add(o,function(){"function"==typeof n&&n(),i()}),++l>=2&&(l=0,r++)}}function n(){var i=new Pano($("#scene")[0]);v=Env.isSafari()?i.initVideo(e[d].video[s]):i.initVideo(StaticFile.getUrl(e[d].video[s])),v.addEventListener("ended",a,!1),$("#loading").hide();var n=o(e[d].text[s]);c.empty().append(n),c.show(),setTimeout(function(){n.addClass("show-up")},1e3)}function o(e){return $("<p>"+e+"</p>")}function t(){var i=o(e[d].text[s]);0==s&&(Env.isSafari()?v.src=e[d].video[s]:v.src=StaticFile.getUrl(e[d].video[s]),c.fadeOut(1e3,function(){c.empty().show(),c.append(i),setTimeout(function(){i.addClass("show-up")},100)})),1==s&&(c.append(i),setTimeout(function(){i.addClass("show-up")},100),setTimeout(function(){var i=o(e[d].text[s+1]);c.append(i),setTimeout(function(){i.addClass("show-up")},100)},5e3),Env.isSafari()?v.src=e[d].video[s]:v.src=StaticFile.getUrl(e[d].video[s]))}function a(){++s>=2&&(d=d+1<u?d+1:0,s=0),t()}var d=0,s=0,r=0,l=0,v=null,c=$("#intro"),u=e.length;Env.isSafari()||Env.isEdge()||Env.isIE()?n():i(n)},Preload={add:function(e,i){var n=document.createElement("link");n.rel="prefetch",n.addEventListener("load",function(){i()},!1),n.href=e,document.body.appendChild(n)}};