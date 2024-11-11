const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Step 1: Declare an array of image filenames
const imageFilenames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Step 2: Declare the alternative text for each image file
const altText = [
  'Man by car in fall forest',
  'Concert from in crowd view with hands up and shining lights',
  'Artistic blurry photo of man playing guitar at concert',
  'Two men and dog at sunset in fall forest',
  'Man playing guitar at concert passionately'
];

// Step 3: Looping through images
imageFilenames.forEach((filename, index) => {
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/${filename}`);
  newImage.setAttribute('alt', altText[index]);
  thumbBar.appendChild(newImage);

  // Step 4: Add click event listener to each thumbnail
  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', newImage.getAttribute('src'));
    displayedImage.setAttribute('alt', newImage.getAttribute('alt'));
  });
});

// Step 5: Wiring up the Darken/Lighten button
btn.addEventListener('click', () => {
  if (btn.getAttribute('class') === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
  }
});