
function updateElementText(selector, value) {
  const $el = document.querySelector(selector);
  if (!$el) return;
  var text = value;
  if (typeof value === 'number') {
    // Use browser locale or fallback
    var locale = (window.currentLocale || navigator.language || 'en');
    text = value.toLocaleString(locale);
  }
  $el.textContent = (typeof text !== 'undefined') ? text : '—';
  $el.classList.remove('ajax-is-loading');
  $el.classList.add('ajax-is-loaded');
}


document.addEventListener('DOMContentLoaded', () => {
  // Fallbacks for config
  var graphqlEndpoint = window.siteConfig?.graphqlEndpoint || 'https://graphql.gbif.org/graphql';
  // Use the correct subset predicate from config.js
  var predicate = window.siteConfig?.occurrenceSearch?.scope || {};

  const query = `query ($predicate: Predicate) {
    occurrenceSearch(predicate: $predicate, size: 0) {
      documents { total }
      facet {
        mediaType { key count }
        hasCoordinate { key count }
      }
      cardinality { datasetKey }
    }
  }`;

  const url = `${graphqlEndpoint}?query=${encodeURIComponent(query)}&variables=${encodeURIComponent(JSON.stringify({ predicate }))}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      var data = jsonResponse?.data?.occurrenceSearch || {};
      updateElementText('#occurrenceCount', data.documents?.total);

      // Find StillImage facet safely
      var imageFacet = (data.facet?.mediaType || []).find(f => f.key === 'StillImage');
      updateElementText('#imageCount', imageFacet?.count);

      // Find hasCoordinate true facet safely
      var mapFacet = (data.facet?.hasCoordinate || []).find(f => f.key === true);
      updateElementText('#mapCount', mapFacet?.count);

      updateElementText('#datasetCount', data.cardinality?.datasetKey);
      // publisherCount removed (not in query)
    })
    .catch(function (err) {
      console.error('Error fetching occurrence stats:', err);
    });
});
