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
    rootPredicate: {
		type: "and",
		predicates: [
				{type: 'in', key: 'datasetKey', values: ['6ac3f774-d9fb-4796-b3e9-92bf6c81c084', 'e6fab7b3-c733-40b9-8df3-2a03e49532c1', 'ad0d1a24-e952-11e2-961f-00145eb45e9a', '77ecd330-b09e-11e2-a01d-00145eb45e9a', '50c9509d-22c7-4a22-a47d-8c48425ef4a7']},
				{type: 'equals', key: 'country', value: 'DE'},
				{type: 'not', predicate:
						{type: 'equals', key: 'hasGeospatialIssue', value: 'true'}
				}
		]
	},
    occurrenceSearchTabs: ['MAP', 'TABLE', 'DATASETS'], // what tabs should be shown
    // see https://hp-theme.gbif-staging.org/data-exploration-config for more options
    //excludedFilters: ['continent', 'basisOfRecord', 'depth', 'establishmentMeans', 'eventId', 'hostingOrganizationKey', 'identifiedById', 'occurrenceStatus', 'organismId', 'organismQuantity', 'protocol', 'publishingCountryCode', 'recordedById', 'relativeOrganismQuantity', 'sampleSizeUnit', 'sampleSizeValue', 'samplingProtocol', 'dwcaExtension'],

    highlightedFilters: ['taxonKey','q', 'year','month', 'gadmGid', 'locality', 'occurrenceIssue'],
    defaultTableColumns: ['coordinates', 'year',  'dataset', 'publisher', 'features'],
    filters: {
      taxonKey: {
        type: 'SUGGEST',
        config: {
          std: {
            filterHandle: 'taxonKey',// if nothing else provided, then this is the filterName used
            id2labelHandle: 'taxonKey',
            translations: {
              count: 'filters.taxonKey.count', // translation path to display names with counts. e.g. "3 scientific names"
              name: 'filters.taxonKey.name',// translation path to a title for the popover and the button
              description: 'filters.taxonKey.description', // translation path for the filter description
            },
          },
          specific: {
            suggestHandle: 'taxonKeyVernacular',
            id2labelHandle: 'taxonKey'
          }
        }
      }
    }
  },
  apiKeys: {
    // see https://hp-theme.gbif-staging.org/data-exploration-config#map-options and https://github.com/gbif/hosted-portals/issues/229
    "maptiler": "HILUubWr4O5xTtKJsy1y",
  },
  maps: {
    locale: 'en', // what language should be used for GBIF base maps? See https://tile.gbif.org/ui/ for available languages in basemaps
    defaultProjection: 'MERCATOR', // what is the default projection
    defaultMapStyle: 'NATURAL', // what is the default style
    // what options are avialable for which projections. Default styles are included, but you can also add your own if you are a carthography and style json expert. If not you probably need help.
    mapStyles: {
      ARCTIC: ['NATURAL', 'BRIGHT'],
      PLATE_CAREE: ['NATURAL', 'BRIGHT', 'DARK'],
      MERCATOR: ['NATURAL', 'BRIGHT', 'SATELLITE', 'DARK', 'TEST'],
      ANTARCTIC: ['NATURAL', 'BRIGHT', 'DARK']
    },
    // you can optionally add your own map styles or overwrite existing ones
    addMapStyles: function ({ mapStyleServer, language, pixelRatio, apiKeys, mapComponents }) {
      return {
        EXAMPLE_MAP: { // the name of your style
          component: mapComponents.OpenlayersMap, // what map component to use OpenlayersMap | OpenlayersMapbox
          labelKey: 'I ❤️ GBIF', // the label in the select. Use a translation key
          mapConfig: {
            basemapStyle: '/assets/maps/example.json',
            projection: 'EPSG_3857'// one of 4326 | 3031 | 3857 | 3575
          }
        }
      }
    },
    // rewire style names to show a different style
    styleLookup: {
      MERCATOR: {
        TEST: 'EXAMPLE_MAP'
      }
    }
  },
  messages: {
    "filters.taxonKey.name": "Species/Taxonomic group",
    "filters.taxonKey.count": "{num, plural, one {species or group} other {# species or groups}}"
  },
};

// example of a language specific route overwrite
if (pageLang === 'de')  {
  siteConfig.messages = {
	  "filters.taxonKey.name": "Art/Taxonomische Gruppe",
	  "filters.taxonKey.count": "{num, plural, one {Art/Taxongruppe} other {# Arten/Taxongruppen}}"
  }
}