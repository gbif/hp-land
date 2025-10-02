var siteConfig = {
  "version": 3,
  "pages": [
    {
      "id": "occurrenceSearch"
    }
  ],
  feedback: {
    enabled: true,
    // githubRepo: string, // do you want issues to be created in a specific repo?
    // githubMessage: string, // prefilled message in the issue
    // githubUsernames: string[], // to mention specific users
    // contactEmail: 'thore.engel@idiv.de', // do you want to offer a contact email in addition to github issues for those who cannot use github
  },
  "disableInlineTableFilterButtons": false,
  "dataHeader": {
    "enableApiPopup": false,
    "enableInfoPopup": false
  },
  "theme": {
    "primary": themeStyle.colors.primary,
    "borderRadius": 3,
    "stickyOffset": "0px"
  },
  "apiKeys": {
    "maptiler": "HILUubWr4O5xTtKJsy1y"
  },
  availableCatalogues: ['OCCURRENCE'],// options: OCCURRENCE DATASET INSTITUTION COLLECTION PUBLISHER LITERATURE 
  "maps": {
    "locale": "de",// map labels: en OR de
    "mapStyles": {
      "defaultProjection": "MERCATOR",
      "defaultMapStyle": "NATURAL",
      "options": {
        "ARCTIC": [
          "NATURAL",
          "BRIGHT"
        ],
        "PLATE_CAREE": [
          "NATURAL",
          "BRIGHT",
          "DARK"
        ],
        "MERCATOR": [
          "NATURAL",
          "BRIGHT",
          "SATELLITE",
          "DARK",
        ],
        "ANTARCTIC": [
          "NATURAL",
          "BRIGHT",
          "DARK"
        ]
      }
    },
  },
  "languages": [
    {
      "code": "de",
      "localeCode": "de",
      "label": "Deutsch",
      "default": true,
      "textDirection": "ltr",
      "iso3LetterCode": "deu",
      "cmsLocale": "en-GB",
      "gbifOrgLocalePrefix": "",
      "mapTileLocale": "de"
    },
    {
      "code": "en",
      "localeCode": "en",
      "label": "English",
      "default": false,
      "textDirection": "ltr",
      "iso3LetterCode": "eng",
      "cmsLocale": "en-GB",
      "gbifOrgLocalePrefix": "",
      "mapTileLocale": "en"
    }
  ],
  "suggest": {
    "gadm": {
      "type": "PARAMS",
      "value": {
        "gadmGid": "DEU"
      }
    }
  },
  "messages": {
    "de": {
      "filters.taxonKey.name": "Art/Taxonomische Gruppe",
      "filters.taxonKey.count": "{num, plural, one {Art/Taxongruppe} other {# Arten/Taxongruppen}}"
    },
    "en": {
      "filters.taxonKey.name": "Species/Taxonomic group",
      "filters.taxonKey.count": "{num, plural, one {species or group} other {# species or groups}}"
    }
  },
  "occurrenceSearch": {
    "scope": {
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
                '8a863029-f435-446a-821e-275f4f641165', // Observation org
                '4fa7b334-ce0d-4e88-aaae-2e0c138d049e', //eBird
                '8277b324-f762-11e1-a439-00145eb45e9a', // The Spider Collection SMNK
                'fb2ad96e-71d0-4735-815a-32371fec99f7', //RLZ Neuropteren
                'aa6c5ee6-d4d7-4a65-a04f-379cffbf4842', // Artenfinder
                '64dabd3c-4f34-4520-b9dd-d227a0bf1582', // Flora von Bayern
                '8ea4250e-0ff0-44f8-812e-bffc3b9ba2a4', //Bayerisches Landesamt für Umwelt (LfU) Pflanzen
                '11c5c7f0-08cf-4a8b-a0e2-dfbc9ad768e3', // Forstamtsdaten
                '3580c8a0-33eb-40ac-b172-995854622428', // Baggersee-Daten
                '94596968-b143-4622-9b66-01a733bccc33' // Tierfundkataster
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
                '98dbab03-09e5-4ceb-988e-04f3e803decb', // Edaphobase


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
    // available filters: q, country, publishingCountry, institutionKey, collectionKey, datasetKey, taxonKey, publishingOrg, hostingOrganizationKey, networkKey, gadmGid, institutionCode, collectionCode, recordNumber, establishmentMeans, sex, lifeStage, license, basisOfRecord, mediaType, month, continent, protocol, dwcaExtension, iucnRedListCategory, typeStatus, issue, taxonomicIssue, occurrenceStatus, projectId, recordedById, identifiedById, occurrenceId, organismId, higherGeography, eventId, fieldNumber, isInCluster, isSequenced, year, coordinateUncertaintyInMeters, depth, organismQuantity, relativeOrganismQuantity, sampleSizeValue, elevation, catalogNumber, preparations, biostratigraphy, lithostratigraphy, geologicalTime, sampleSizeUnit, locality, waterBody, stateProvince, datasetId, samplingProtocol, verbatimScientificName, recordedBy, identifiedBy, geometry, eventDate, taxonId, islandGroup, island, programme, datasetName, gbifRegion, gbifId, endDayOfYear, startDayOfYear, organismQuantityType, pathway, previousIdentifications, associatedSequences, degreeOfEstablishment, lastInterpreted, publishedByGbifRegion, georeferencedBy, repatriated, distanceFromCentroidInMeters
    excludedFilters: ['continent', 'country', 'depth', 'establishmentMeans', 'eventId', 'hostingOrganizationKey', 'identifiedById', 'occurrenceStatus', 'organismId', 'organismQuantity', 'protocol', 'publishingCountry', 'recordedById', 'relativeOrganismQuantity', 'sampleSizeUnit', 'sampleSizeValue', 'dwcaExtension', 'collectionKey', 'networkKey', 'verbatimScientificName', 'projectId', 'collectionCode', 'institutionCode'],
    highlightedFilters: ['q', 'taxonKey', 'year', 'month', 'gadmGid', 'locality', 'datasetKey', 'occurrenceIssue'],
    // available columns: ['commonName', 'features', 'media', 'country', 'coordinates', 'year', 'eventDate', 'basisOfRecord', 'datasetKey', 'publishingOrg', 'catalogNumber', 'recordedBy', 'identifiedBy', 'recordNumber', 'typeStatus', 'preparations', 'collectionCode', 'specimenTriplet', 'institutionCode', 'institutionKey', 'collectionKey', 'locality', 'fieldNumber', 'individualCount', 'higherGeography', 'stateProvince', 'establishmentMeans', 'sex', 'lifeStage', 'iucnRedListCategory']
    availableTableColumns: ['commonName', 'coordinates', 'year', 'dataset', 'publishingOrg', 'features'],
    "tabs": [
      "map",
      "table",
      "gallery",
      "dashboard",
      "datasets",
      "download"
    ],
    "mapSettings": {
      "lat": 50,
      "lng": 10,
      "zoom": 4.911544076366507,
      "userLocationEnabled": true
    }
  },
  "collectionSearch": {},
  "institutionSearch": {},
  "datasetSearch": {},
  "publisherSearch": {},
  "literatureSearch": {}
}
