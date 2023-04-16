// This script injects an element at the top of the page.
// It doesn't work yet. To make it work, handle the TODO.

// Create an image
// const element = document.createElement("img");
// element.src = "https://i.giphy.com/media/Elr7sRhF0iByw/giphy.webp";

// creates wrapper div includes both a button and a content region
const wrapperDiv = document.createElement("div");

// creating the button
const toSummarizeButton = document.createElement("button");
toSummarizeButton.innerHTML = "Summarize Page";
// add event listener to click for the button
toSummarizeButton.addEventListener("click", doStuff);

// Do something after button is clicked
function doStuff() {
  const url = "http://localhost:2333/summarize";
  
  // NOTE: this is the body paragraphs for Medium.com
  // to summarize other media, please insert smarter logic here
  const txts = document.getElementsByClassName("pw-post-body-paragraph");
  var text = "";
  for (var i = 0; i < txts.length; i++) {
    text += txts[i].textContent;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: text
  };

  fetch(url, options)
    .then(response => {
      console.log("got response");
      return response.text();
    })
    .then(responseData => {
      console.log("got resposne data");
      // this step sets response data to content region
      document.getElementById("contentRegion").innerHTML = responseData;
    })
    .catch(err => {
      console.log(err);
    })
  
}

// This creates the content region to fill data with after we got response from open AI
const pageUrl = document.createElement("div");
pageUrl.id = "contentRegion"

// This is to add both button and content region to the page
wrapperDiv.appendChild(toSummarizeButton);
wrapperDiv.appendChild(pageUrl);

// Add it to the top of the document
document.body.prepend(wrapperDiv);


