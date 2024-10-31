let slideIndex = 1;
let currentImageSet = 1;

// Define two sets of image sources
const imageSet1 = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg"];
const imageSet2 = ["newpic1.jpg", "newpic2.jpg", "newpic3.jpg", "newpic4.jpg"];

// Define two sets of alt texts
const altTextSet1 = ["black and white concert photo", "two men playing video games in a van", "man alone on stage with guitar looking out over crowd at sunset", "three people leaving from tour van backstage"];
const altTextSet2 = ["artist holding guitar up to ear backstage", "three musicians during soundcheck at red rocks with rocks and stands in the background", "wide shot of single artist on stage playing guitar passionately", "artist interacting with fans getting a large reaction "];

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Function to display slides
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// Switch between image sets
function switchImages() {
    // Toggle the image set
    currentImageSet = (currentImageSet === 1) ? 2 : 1;
    
    // Select the new image set and alt text set based on the toggle
    const newImageSet = (currentImageSet === 1) ? imageSet1 : imageSet2;
    const newAltTextSet = (currentImageSet === 1) ? altTextSet1 : altTextSet2;

    // Update the `src` and `alt` attributes of each slide image
    const slides = document.querySelectorAll(".mySlides img");
    for (let i = 0; i < slides.length; i++) {
        slides[i].src = newImageSet[i];
        slides[i].alt = newAltTextSet[i];
    }

    // Reset to the first slide
    slideIndex = 1;
    showSlides(slideIndex);
}
