// Select the container that will hold the stars
const starsContainer = document.getElementById('stars-container');

// Function to create stars and add them to the container
function createStars() {
    // Define the total number of stars
    const totalStars = 100;

    // Get the dimensions of the window
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // Loop to create each star
    for (let i = 0; i < totalStars; i++) {
        // Create the star element
        const star = document.createElement('div');
        star.classList.add('stars');

        // Set random positions for each star
        star.style.top = Math.random() * maxHeight + 'px';
        star.style.left = Math.random() * maxWidth + 'px';

        // Set a random animation duration
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';

        // Add the star to the container
        starsContainer.appendChild(star);
    }
}

// Run the star creation function when the page loads
window.onload = createStars;