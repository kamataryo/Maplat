({
    baseUrl: 'js',
    name: 'config',
    out: 'bundle.js',
    include: ['require.min'],
    paths: {
        'turf': 'turf_maplat.min',
        'ol3': 'ol-debug',
        'ol-custom': 'ol-custom',
        'mapshaper': 'mapshaper_maplat',
        'bootstrap': 'vendors/bootstrap-native',
        'resize': 'vendors/detect-element-resize',
        'i18n': 'vendors/i18next.min',
        'i18nxhr': 'vendors/i18nextXHRBackend.min',
        'aigle': 'vendors/aigle-es5.min',
        'swiper': 'vendors/swiper.min',
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
        },
        'app': {
            deps: ['histmap', 'histmap_tin']
        }
    }
})
