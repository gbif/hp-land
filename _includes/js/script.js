function updateElementText(selector, value) {
  const $el = document.querySelector(selector);
  if (!$el) return;

  if (typeof value !== 'undefined') {
    var text = value;
    if (typeof value === 'number') {
      text = value.toLocaleString(currentLocale);
    }
    $el.textContent = text;
    $el.classList.remove('ajax-is-loading');
    $el.classList.add('ajax-is-loaded');
  }
}

{% assign graphqlEndpoint = site.graphqlEndpoint | default: "https://graphql.gbif.org/graphql" %}

document.addEventListener('DOMContentLoaded', () => {
  const predicate = siteConfig.occurrence.rootPredicate;
  const query = `query ($predicate: Predicate) {
    occurrenceSearch(predicate: $predicate, size: 10) {
      documents {
        total
      }
      facet {
        mediaType {
          key
          count
        }
        hasCoordinate {
          key
          count
        }
      }
      cardinality {
        datasetKey
      }
    }
  }`;
  const url = `{{ graphqlEndpoint }}?query=${encodeURIComponent(query)}&variables=${encodeURIComponent(JSON.stringify({ predicate }))}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      var occurrenceCount = jsonResponse.data.occurrenceSearch.documents.total;
      updateElementText('#occurrenceCount', occurrenceCount);

      var imageCount = jsonResponse.data.occurrenceSearch.facet.mediaType.filter(facet => facet.key === 'StillImage')[0].count;
      updateElementText('#imageCount', imageCount);

      var occurrenceMapCount = jsonResponse.data.occurrenceSearch.facet.hasCoordinate.filter(facet => facet.key === true)[0].count;
      updateElementText('#mapCount', occurrenceMapCount);

      var datasetCount = jsonResponse.data.occurrenceSearch.cardinality.datasetKey;
      updateElementText('#datasetCount', datasetCount);

      var publisherCount = jsonResponse.data.occurrenceSearch.cardinality.publishingOrg;
      updateElementText('#publisherCount', publisherCount);
    })
    .catch(function (err) {
      console.error('Error fetching occurrence count:', err);
    });
});
