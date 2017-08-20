define([], function() {
    var History = function(options) {
        this.mapType = options.stroly ? 'stroly' : options.drumsey ? 'drumsey' : options.warper ? 'warper' : null;
        this.appid = options.appid || (this.mapType ? options[mapType] : 'sample');
        this.mobileIF = false;
        this.noUI = options.no_ui;
        this.debug = options.debug;
        if (options.mobile_if) {
            this.mobileIF = true;
            this.noUI = true;
            this.debug = true;
        }
        this.lang = options.lang || History.browserLanguage();
        this.overlay = options.overlay == null ? true : options.overlay;
        this.noRotate = options.no_rotate;
        this.fake = options.fake;
        this.initial = true;

        this.analyzeURL();
    }

    History.prototype.analyzeURL = function() {
        if (!this.basePath) this.basePath = location.pathname;
        if (this.initial == true) {
            var options = {};
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                options[hash[0]] = hash[1] == 'true' ? true : hash[1] == 'false' ? false : hash[1];
            }
            this.mobileIF = false;
            if (this.noUI == null) this.noUI = options.no_ui || false;
            if (this.debug == null) this.debug = options.debug;
            if (this.mobileIF == null && options.mobile_if) {
                this.mobileIF = true;
                this.noUI = true;
                this.debug = true;
            }
            if (this.noRotate == null) this.noRotate = options.no_rotate || false;
            if (this.fake == null) this.fake = options.fake;
        }

        if (location.hash) {
            var hashArg = location.hash.replace('#', '').split('/');
            this.appid = hashArg[0];
        }
    };

    History.prototype.navigateURL = function() {
        var contentArg = this.appid;
        if (this.mapid) contentArg = contentArg + '/' + this.mapid;
        if (this.bakmap) contentArg = contentArg + '/' + this.bakmap;
        var url = this.basePath + '#' + contentArg;
        if (this.initial) {
            this.initial = false;
            history.replaceState('test', null, url);
        } else {
            history.pushState('test', null, url);
        }
    };

    History.browserLanguage = function() {
        var ua = window.navigator.userAgent.toLowerCase();
        try {
            // Chrome
            if( ua.indexOf( 'chrome' ) != -1 ) {
                return ( navigator.languages[0] || navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
            }
            // Other
            else{
                return ( navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
            }
        }
        catch( e ) {
            return undefined;
        }
    }

    return History;
});