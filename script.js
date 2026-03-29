// Get the select element from the HTML
const breedSelect = document.getElementById('breed-select');

// Function to fetch dog breeds from the API
function fetchBreeds() {
  // Fetch the list of all dog breeds
  fetch('https://dog.ceo/api/breeds/list/all')
    // Convert the response to JSON
    .then(response => response.json())
    // Use the data to populate the select menu
    .then(data => {
      // Get the breeds object from the API response
      const breeds = data.message;

      // Loop through each breed
      for (const breed in breeds) {
        // Create a new option element
        const option = document.createElement('option');

        // Set the value and text content of the option
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);

        // Add the option to the select menu
        breedSelect.appendChild(option);
      }
    });
}

// Get the gallery element where images will be displayed
const gallery = document.getElementById('gallery');

// Function to fetch a random dog image for the selected breed
function fetchRandomDogImage() {
  // Get the selected breed from the select menu
  const selectedBreed = breedSelect.value;

  // Only fetch an image if a breed is selected
  if (selectedBreed === '') {
    // Clear the gallery if no breed is selected
    gallery.innerHTML = '';
    return;
  }

  // Fetch 9 random images of the selected breed
  fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/9`)
    // Convert the response to JSON
    .then(response => response.json())

    // Use the image URLs to display the dog images
    .then(data => {
      // Get the array of image URLs from the API response
      const imageUrls = data.message;

      // Clear the gallery before adding new images
      gallery.innerHTML = '';

      // Loop through each image URL
      for (const imageUrl of imageUrls) {
        // Create an img element
        const img = document.createElement('img');

        // Set the src attribute to the image URL
        img.src = imageUrl;

        // Set an alt text for accessibility
        img.alt = `A ${selectedBreed} dog`;

        // Add the image to the gallery
        gallery.appendChild(img);
      }
    });
}

// Add an event listener to the select menu that triggers when a breed is selected
breedSelect.addEventListener('change', fetchRandomDogImage);

// Call the function to fetch and display the breeds
fetchBreeds();
