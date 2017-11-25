require.config({
    baseUrl: 'js',
    paths: {
        'ol3': 'ol-debug',
        'ol-custom': 'ol-custom',
        'mapshaper': 'mapshaper_maplat',
        'turf': 'turf_maplat.min', //4.7.3
        'bootstrap': 'vendors/bootstrap-native',
        'resize': 'vendors/detect-element-resize',
        'aigle': 'vendors/aigle-es5.min',
        'i18nxhr': 'vendors/i18nextXHRBackend.min',
        'i18n': 'vendors/i18next.min', //8.4.2
        'swiper': 'vendors/swiper.min', //3.4.2
    },
    shim: {
        'i18nxhr': {
            deps: ['i18n']
        },
        'turf': {
            exports: 'turf'
        },
        'aigle': {
            exports: 'Promise'
        },
        'resize': {
            exports: 'addResizeListener'
        }
    }
});
window.Maplat = {};
Maplat.onLoad = function(func) {
    Maplat.__func = func;
    if (Maplat.__app) func(Maplat.__app);
};
require(['app'], function(app) {
    Maplat.__app = app;
    if (Maplat.__func) Maplat.__func(app);
});
Maplat.createObject = function(option) {
    return new Promise(function(resolve) {
        Maplat.onLoad(function(MaplatApp) {
            var app = new MaplatApp(option);
            app.waitReady.then(function() {
                resolve(app);
            });
        })
    });
};
