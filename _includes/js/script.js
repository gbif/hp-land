document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch user's location and handle the click event
  function fetchLocationAndRedirect(event) {
    event.preventDefault(); // Prevent the default link behavior

    const link = event.target;

    // Check if Geolocation is supported by the browser
    if ("geolocation" in navigator) {
      link.classList.add("is-loading"); // Add loading class to the link
      navigator.geolocation.getCurrentPosition(function (position) {
        // Store the user's location in session storage
        sessionStorage.setItem("mapLat", position.coords.latitude);
        sessionStorage.setItem("mapLng", position.coords.longitude);
        sessionStorage.setItem("mapZoom", 12);

        // Redirect to the href of the link
        window.location.href = link.href;
      }, function (error) {
        // Handle any errors here
        console.error("Error getting user location:", error);
      }).finally(function () {
        link.classList.remove("is-loading"); // Remove loading class
      });
    } else {
      // Geolocation is not supported by the browser
      alert("Geolocation is not supported by your browser.");
      window.location.href = event.target.href;
    }
  }

  // Attach the click event handler to the link
  // Get all <a> tags with the class "exploreMyArea"
  const locationLinks = document.querySelectorAll("a.gbifExploreMyAreaLink");

  // Attach the click event handler to each matching link
  locationLinks.forEach(function (link) {
    link.addEventListener("click", fetchLocationAndRedirect);
  });
});


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
      }
      cardinality {
        datasetKey
      }
    }
  }`;
  const url = `https://graphql.gbif-staging.org/graphql?query=${encodeURIComponent(query)}&variables=${encodeURIComponent(JSON.stringify({ predicate }))}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      var occurrenceCount = jsonResponse.data.occurrenceSearch.documents.total;
      updateElementText('#occurrenceCount', occurrenceCount);

      var imageCount = jsonResponse.data.occurrenceSearch.facet.mediaType.filter(facet => facet.key === 'StillImage')[0].count;
      updateElementText('#imageCount', imageCount);

      var datasetCount = jsonResponse.data.occurrenceSearch.cardinality.datasetKey;
      updateElementText('#datasetCount', datasetCount);
    })
    .catch(function (err) {
      console.error('Error fetching occurrence count:', err);
    });
});
