var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
  primary: themeStyle.colors.primary
}});

var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
  primary: themeStyle.colors.primary,
  fontSize: '16px'
}});

var siteConfig = {
  routes: {
    occurrenceSearch: {
      // The route you are currently using for occurrence search. The language prefix will be added automatically
      // If you need special routes per language, then you have to add locale specific overwrites. The page language is available as a global variable called `pageLang`
      // route: '/data'
    }
  },
  occurrence: {
    mapSettings: {lat: 50, lng: 10, zoom: 4.9115440763665068},
    // You probably need help to configure the scope - so just ask
    // for his demo site we only show Fungi (taxonKey=5). It use the predicate structure known from GBIF download API. 
    // See https://www.gbif.org/developer/occurrence (long page without enough anchors - search for "Occurrence Download Predicates")
    // The format is however slightly different, in that is use camelCase for keys instead of CONSTANT_CASE. 
    rootPredicate: {type: 'in', key: 'datasetKey', values: ['6ac3f774-d9fb-4796-b3e9-92bf6c81c084', 'e6fab7b3-c733-40b9-8df3-2a03e49532c1', 'ad0d1a24-e952-11e2-961f-00145eb45e9a', '77ecd330-b09e-11e2-a01d-00145eb45e9a']},
    occurrenceSearchTabs: ['MAP', 'TABLE', 'DATASETS'], // what tabs should be shown
    // see https://hp-theme.gbif-staging.org/data-exploration-config for more options
    //excludedFilters: ['continent', 'basisOfRecord', 'depth', 'establishmentMeans', 'eventId', 'hostingOrganizationKey', 'identifiedById', 'occurrenceStatus', 'organismId', 'organismQuantity', 'protocol', 'publishingCountryCode', 'recordedById', 'relativeOrganismQuantity', 'sampleSizeUnit', 'sampleSizeValue', 'samplingProtocol', 'dwcaExtension'],
    //highlightedFilters: ['q', 'taxonKey', 'typeStatus', 'recordedBy', 'recordNumber', 'locality', 'country', 'year'],
    // defaultTableColumns: ['features', 'typeStatus', 'country', 'coordinates', 'year', 'basisOfRecord', 'dataset', 'publisher', 'catalogNumber', 'recordedBy', 'recordNumber', 'identifiedBy', collectionCode, institutionCode, locality]
  }
  maps: {
    locale: 'en', // what language should be used for GBIF base maps? See https://tile.gbif.org/ui/ for available languages in basemaps
    // defaultProjection: 'MERCATOR', // what is the default projection
    // defaultMapStyle: 'NATURAL', // what is the default style
    // what options are avialable for which projections. Default styles are included, but you can also add your own if you are a carthography and style json expert. If not you probably need help.
    /*mapStyles: {
      ARCTIC: ['NATURAL', 'BRIGHT'],
      PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
      MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK'],
      ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
    },*/
    // you can optionally add your own map styles or overwrite existing ones
    /*addMapStyles: function ({ mapStyleServer, language, pixelRatio, apiKeys, mapComponents }) {
      return {
        BRIGHT_MERCATOR_TEST: { // the name of your style
          component: mapComponents.OpenlayersMap, // what map component to use OpenlayersMap | OpenlayersMapbox
          labelKey: 'My custom bright map', // the label in the select. Use a translation key
          mapConfig: {
            basemapStyle: `https://route.to.your.style.json`,
            projection: 'EPSG_3857'// one of 4326 | 3031 | 3857 | 3575
          }
        }
      }
    },*/
    // rewire style names to show a different style
    /*styleLookup: {
      MERCATOR: {
        BRIGHT: 'BRIGHT_MERCATOR_TEST' // when showing the map type NATURAL in Mercator, then use the style 'BRIGHT_MERCATOR_TEST'.
      }
    }*/
  }
};

// example of a language specific route overwrite
if (pageLang === 'da')  {
  siteConfig.routes.occurrenceSearch.route = '/observationer/sog';
}