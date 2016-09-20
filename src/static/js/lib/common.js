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
