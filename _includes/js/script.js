document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch user's location and handle the click event
  function fetchLocationAndRedirect(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Check if Geolocation is supported by the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // Store the user's location in session storage
        sessionStorage.setItem("mapLat", JSON.stringify(position.coords.latitude));
        sessionStorage.setItem("mapLng", JSON.stringify(position.coords.longitude));
        sessionStorage.setItem("mapZoom", 12);

        // Redirect to the href of the link
        window.location.href = event.target.href;
      }, function (error) {
        // Handle any errors here
        console.error("Error getting user location:", error);
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
  locationLinks.forEach(function(link) {
    link.addEventListener("click", fetchLocationAndRedirect);
  });
});
