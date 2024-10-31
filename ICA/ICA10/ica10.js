let slideIndex = 1;
let currentImageSet = 1; // which set is currently displayed

// the two image sets
const imageSet1 = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg"];
const imageSet2 = ["newpic1.jpg", "newpic2.jpg", "newpic3.jpg", "newpic4.jpg"];

// Define two sets of alt texts
const altTextSet1 = ["black and white concert photo", "two men playing video games in a van", "man alone on stage with guitar looking out over crowd at sunset", "three people leaving from tour van backstage"];
const altTextSet2 = ["artist holding guitar up to ear backstage", "three musicians during soundcheck at red rocks with rocks and stands in the background", "wide shot of single artist on stage playing guitar passionately", "artist interacting with fans getting a large reaction "];

showSlides(slideIndex);

// control next and previous
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// "thumbnail" image stuff
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// to actually show slides
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

// to change between image sets - for button
function switchImages() {
    // toggles image set and alt text set
    currentImageSet = (currentImageSet === 1) ? 2 : 1;
    
    // select new image set from toggle
    const newImageSet = (currentImageSet === 1) ? imageSet1 : imageSet2;
    const newAltTextSet = (currentImageSet === 1) ? altTextSet1 : altTextSet2;

    // update all 'src' for images in set
    const slides = document.querySelectorAll(".mySlides img");
    for (let i = 0; i < slides.length; i++) {
        slides[i].src = newImageSet[i];
        slides[i].alt = newAltTextSet[i];
    }

    // resets to first slide
    slideIndex = 1;
    showSlides(slideIndex);
}