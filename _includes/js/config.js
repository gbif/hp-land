var siteTheme = gbifReactComponents.themeBuilder.extend({
  baseTheme: 'light', extendWith: {
    primary: themeStyle.colors.primary,
    fontSize: '16px'
  }
});

function getSuggests({ client }) {
  return {
    gadmGid: {
      getSuggestions: ({ q }) => {
        const { promise, cancel } = client.v1Get(`/geocode/gadm/search?gadmGid=DEU&limit=100&q=${q}`); // this gadmGid=DEU is the new part, that means that the suggester will now only suggest things in Germany
        return {
          promise: promise.then(response => {
            return {
              data: response.data.results.map(x => ({ title: x.name, key: x.id, ...x }))
            }
          }),
          cancel
        }
      }
    }
  }
}

var siteConfig = {
  routes: {
    occurrenceSearch: {
      // The route you are currently using for occurrence search. The language prefix will be added automatically
      // If you need special routes per language, then you have to add locale specific overwrites. The page language is available as a global variable called `pageLang`
      // route: '/data'
    }
  },
  occurrence: {
    mapSettings: { lat: 50, lng: 10, zoom: 4.9115440763665068, userLocationEnabled: true },
    // You probably need help to configure the scope - so just ask
    // for his demo site we only show Fungi (taxonKey=5). It use the predicate structure known from GBIF download API. 
    // See https://www.gbif.org/developer/occurrence (long page without enough anchors - search for "Occurrence Download Predicates")
    // The format is however slightly different, in that is use camelCase for keys instead of CONSTANT_CASE. 
    rootPredicate: {
      type: "and",
      predicates: [
        {
            type: "or",
            predicates: [
                {
                  type: 'in', key: 'datasetKey',
                  values: [
                    '6ac3f774-d9fb-4796-b3e9-92bf6c81c084', //naturgucker
                    'e6fab7b3-c733-40b9-8df3-2a03e49532c1', //Flora von Deutschland (Phanerogamen)
                    'ad0d1a24-e952-11e2-961f-00145eb45e9a', //VegetWeb - Repositorium von Vegetationsaufnahmen
                    '77ecd330-b09e-11e2-a01d-00145eb45e9a', //Insekten Sachsen
                    '50c9509d-22c7-4a22-a47d-8c48425ef4a7', //iNaturalist Research-grade Observations
                    'e0908eee-ad49-4e91-b4d0-1f05dd17b291', //Harmonised freshwater fish data
                    '82a421d4-f762-11e1-a439-00145eb45e9a', //Edaphobase
                    '8a863029-f435-446a-821e-275f4f641165', // Observation org
                    '4fa7b334-ce0d-4e88-aaae-2e0c138d049e', //eBird
                    '8277b324-f762-11e1-a439-00145eb45e9a', // The Spider Collection SMNK
                    'fb2ad96e-71d0-4735-815a-32371fec99f7', //RLZ Neuropteren
                    'aa6c5ee6-d4d7-4a65-a04f-379cffbf4842', // Artenfinder
                    '64dabd3c-4f34-4520-b9dd-d227a0bf1582', // Flora von Bayern
                    '8ea4250e-0ff0-44f8-812e-bffc3b9ba2a4', //Bayerisches Landesamt für Umwelt (LfU) Pflanzen
                    '11c5c7f0-08cf-4a8b-a0e2-dfbc9ad768e3', // Forstamtsdaten
                    '3580c8a0-33eb-40ac-b172-995854622428', // Baggersee-Daten
                  ]
                },
                {
                  type: 'in', key: 'publishingOrg', 
                  values: [
                    '57254bd0-8256-11d8-b7ed-b8a03c50a862', // BGBM
                    '0674aea0-a7e1-11d8-9534-b8a03c50a862', // SNSB
                    '10980920-6dad-11da-ad13-b8a03c50a862', // MfN
                    '99ea0c90-61e5-11dc-a64c-b8a03c50a862', // SMNS
                    '463555b0-d081-11da-ae8f-b8a03c50a862', // DSMZ
                    '6e1cad80-bdf5-11d8-84ea-b8a03c50a862', // LIB/ZFMK
                    'c76cf030-2a95-11da-9cc1-b8a03c50a862', // Senckenberg
                    '48490260-8fc0-11dd-be72-b8a03c50a862', // Senckenberg CeDAMar
                    
                    
                  ]
                },
                {
                  type: 'in', key: 'networkKey', 
                  values: [
                    'd1627240-04ab-4162-aee9-b16df6bc8308', // Freshwater Network
                    '3aee7756-565e-4dc5-b22c-f997fbd7105c', // Virtual Herbarium Germany
                  ]
                }
            ]
        },
        { type: 'equals', key: 'country', value: 'DE' },
        {
          type: 'not', predicate:
            { type: 'equals', key: 'hasGeospatialIssue', value: 'true' }
        },
        //{
        //  type: 'not', predicate:
        //    { type: 'equals', key: 'datasetKey', value: '85703434-f762-11e1-a439-00145eb45e9a' }
        //}
      ]
    },
    occurrenceSearchTabs: ['MAP', 'TABLE', 'GALLERY', 'DATASETS'], // what tabs should be shown
    // see https://hp-theme.gbif-staging.org/data-exploration-config for more options
    //excludedFilters: ['continent', 'basisOfRecord', 'depth', 'establishmentMeans', 'eventId', 'hostingOrganizationKey', 'identifiedById', 'occurrenceStatus', 'organismId', 'organismQuantity', 'protocol', 'publishingCountryCode', 'recordedById', 'relativeOrganismQuantity', 'sampleSizeUnit', 'sampleSizeValue', 'samplingProtocol', 'dwcaExtension'],

    highlightedFilters: ['taxonKey', 'q', 'year', 'month', 'gadmGid', 'locality', 'datasetKey', 'occurrenceIssue'],
    availableTableColumns: ['coordinates', 'year', 'dataset', 'publisher', 'features'],
    filters: {
      datasetKey: {
        merge: true,
        config: {
          specific: {
            supportsNegation: true
          }
        }
      },
      taxonKey: {
        merge: true,
        config: {
          specific: {
            suggestHandle: 'taxonKeyVernacular'
          }
        }
      }
    },
    getSuggests: getSuggests
  },
  suggest: { // this is part of the new configuration and will be ignored for the existing site
    gadm: {
      type: 'PARAMS',
      value: { gadmGid: 'DEU' }
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
if (pageLang === 'de') {
  siteConfig.messages = {
    "filters.taxonKey.name": "Art/Taxonomische Gruppe",
    "filters.taxonKey.count": "{num, plural, one {Art/Taxongruppe} other {# Arten/Taxongruppen}}"
  }
}
