const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch('4822993cf481ffe8cd8684c8083c357f826925d8d6164b7955d5665386d95410');

// Function to search for one image
function searchImage(query) {
  const params = {
    q: query,         // Search query (e.g., "cars")
    tbm: "isch",      // Image search
    num: 1            // Number of images to return
  };

  search.json(params, (data) => {
    if (data.images_results && data.images_results.length > 0) {
      const image = data.images_results[0]; // Get the first image result
      console.log(`Image URL: ${image.original}`);
    } else {
      console.log("No images found!");
    }
  });
}

// Example usage:
searchImage('tacoma 03');