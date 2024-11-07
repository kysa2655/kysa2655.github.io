// Fortune Teller Part
function tellFortune(children, partner, location, job) {
    const fortune = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    document.getElementById("fortuneOutput").innerHTML += `<p>${fortune}</p>`;
}
  

tellFortune(2, "Alice", "New York", "Engineer");
tellFortune(3, "Bob", "Paris", "Artist");
tellFortune(1, "Charlie", "Tokyo", "Chef");


function calculateDogAge(humanAge) {
    const dogAge = humanAge * 7;
    return `Your doggie is ${dogAge} years old in dog years!`;
}
document.getElementById("dogAgeOutput").innerHTML = `
    <p>${calculateDogAge(1)}</p>
    <p>${calculateDogAge(3)}</p>
    <p>${calculateDogAge(5)}</p>
  `;
  
// Dog Age Part
function userDogAge() {
    const userAge = document.getElementById("dogAgeInput").value;
    if (userAge) {
      document.getElementById("dogAgeOutput").innerHTML += `<p>${calculateDogAge(userAge)}</p>`;
    } else {
      alert("Please enter a valid age!");
    }
}


// Reverse Number Part
function reverseNumber(num) {
    const reversed = num.toString().split("").reverse().join("");
    return parseInt(reversed);
}
  
  
document.getElementById("reversedNumbersOutput").innerHTML = `
    <p>Reversed Number 1: ${reverseNumber(32243)}</p>
    <p>Reversed Number 2: ${reverseNumber(12345)}</p>
  `;

// Alphabet Part
function alphabetizeString(str) {
    // Convert string to an array of characters, sort the array, and join it back into a string
    return str.split('').sort().join('');
}
  
document.getElementById("alphabeticalOrderOutput").innerHTML = `
    <p>Alphabetized String 1: ${alphabetizeString("webmaster")}</p>
    <p>Alphabetized String 2: ${alphabetizeString("javascript")}</p>
  `;


// Capitalize First Letter Part
  function capitalizeWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
  
document.getElementById("capitalizeWordsOutput").innerHTML = `
    <p>Capitalized String 1: ${capitalizeWords("the quick brown fox")}</p>
    <p>Capitalized String 2: ${capitalizeWords("hello world from javascript")}</p>
  `;