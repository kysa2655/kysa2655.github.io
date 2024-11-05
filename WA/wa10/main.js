const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

let storyText = "There were hundreds of golden retrievers walking down the street so :insertx: walked out the door and started to run with them. When they had finally gotten to :inserty:, they all jumped in together, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: would always run with the golden retrievers, and he always will.";

let insertX = ["Cale Makar", "Kevin, the bird from Up,", "Mike Tyson"];

let insertY = ["the ball pit", "rubber ducky pond", "a massive pile of dog bones"];

let insertZ = ["died of happiness", "played together for hours", "became best friends forever"];

randomize.addEventListener('click', result);

function result() {
  
    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    let newStory = storyText.replace(/:insertx:/g, xItem)
                            .replace(':inserty:', yItem)
                            .replace(':insertz:', zItem);


    if(customName.value !== '') {
        const name = customName.value;
        newStory = newStory.replace('Bob', name);

    }

    if(document.getElementById("uk").checked) {
        const weight = Math.round(300 / 14) + " stone";
        const temperature =  Math.round((94-32) * 5 / 9) + " centigrade";
        
        newStory = newStory.replace("94 fahrenheit", temperature);
        newStory = newStory.replace("300 pounds", weight);

    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
}