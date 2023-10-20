// Create variables targetting the relevant DOM elements here 👇

// Pages or Views
const mainView = document.querySelector(".main-cover");
const savedView = document.querySelector(".saved-view");
const savedCoversSection = document.querySelector(".saved-covers-section");
const formView = document.querySelector(".form-view");
const cover = document.querySelector(".cover");
const duplicateMessage = document.querySelector(".duplicate-message");

// Elements on pages
const coverImage = document.querySelector(".cover-image");
const coverTitle = document.querySelector(".cover-title");
const tagLine = document.querySelector(".tagline");
const tagline1 = document.querySelector(".tagline-1");
const tagline2 = document.querySelector(".tagline-2");
const heartIcon = document.querySelector(".heart-icon");

// Input fields
const inputImage = document.querySelector(".user-cover");
const inputTitle = document.querySelector(".user-title");
const inputDesc1 = document.querySelector(".user-desc1")
const inputDesc2 = document.querySelector(".user-desc2");

// Buttons
const showNewRandomBtn = document.querySelector(".random-cover-button");
const saveCoverButton = document.querySelector(".save-cover-button");
const viewSavedButton = document.querySelector(".view-saved-button");
const makeNewButton = document.querySelector(".make-new-button");
const homeButton = document.querySelector(".home-button");
const makeUserCoverButton = document.querySelector(".create-new-book-button");

// Global Variables
var savedCovers = [];
var currentCover;

// Add your event listeners here 👇
window.addEventListener("load", createRandomCover);
showNewRandomBtn.addEventListener("click", renderNewCover);
saveCoverButton.addEventListener("click", saveCover);
viewSavedButton.addEventListener("click", viewSavedPage);
homeButton.addEventListener("click", goHome);
makeNewButton.addEventListener("click", viewFormPage);
makeUserCoverButton.addEventListener("click", makeUserCover);
heartIcon.addEventListener("click", saveCover);

// Create your event handlers and other functions here 👇
function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function createCover(imgSrc, title, descriptor1, descriptor2) {
  var cover = {
    id: Date.now(),
    coverImg: imgSrc,
    title: title,
    tagline1: descriptor1,
    tagline2: descriptor2,
  };
  return cover;
}

function createRandomCover() {
  hide(duplicateMessage)
  var randomCover = covers[getRandomIndex(covers)];
  var randomTitle = titles[getRandomIndex(titles)];
  var randomDescriptor1 = descriptors[getRandomIndex(descriptors)];
  var randomDescriptor2 = descriptors[getRandomIndex(descriptors)];
  var newCover = createCover(
    randomCover,
    randomTitle,
    randomDescriptor1,
    randomDescriptor2
  );

  coverImage.src = newCover.coverImg;
  coverTitle.innerText = newCover.title;
  tagline1.innerText = newCover.tagline1;
  tagline2.innerText = newCover.tagline2;

  cover.innerHTML = "";
  return (cover.innerHTML += `
  <img class="cover-image" src=${newCover.coverImg}>
  <h2 class="cover-title">${newCover.title}</h2>
  <h3 class="tagline">A tale of <span class="tagline-1">${newCover.tagline1}</span> and <span class="tagline-2">${newCover.tagline2}</span></h3>
  `);
}

function goHome() {
  createRandomCover();
  show(mainView);
  show(showNewRandomBtn);
  show(makeNewButton);
  show(saveCoverButton);
  show(viewSavedButton);
  hide(savedView);
  hide(formView);
  hide(homeButton);
  show(makeNewButton);
}

function renderNewCover() {
  hide(duplicateMessage)
  var randomCover = covers[getRandomIndex(covers)];
  var randomTitle = titles[getRandomIndex(titles)];
  var randomDescriptor1 = descriptors[getRandomIndex(descriptors)];
  var randomDescriptor2 = descriptors[getRandomIndex(descriptors)];
  var newCover = createCover(
    randomCover,
    randomTitle,
    randomDescriptor1,
    randomDescriptor2
  );

  console.log("newCover: ", newCover);
  coverImage.src = newCover.coverImg;
  coverTitle.innerText = newCover.title;
  tagline1.innerText = newCover.tagline1;
  tagline2.innerText = newCover.tagline2;

  cover.innerHTML = "";
  return (cover.innerHTML += `
  <img class="cover-image" src=${newCover.coverImg}>
  <h2 class="cover-title">${newCover.title}</h2>
  <h3 class="tagline">A tale of <span class="tagline-1">${newCover.tagline1}</span> and <span class="tagline-2">${newCover.tagline2}</span></h3>
  `);
}

function saveCover() {
  hide(duplicateMessage);
  var currentCover = {
    id: Date.now(),
    coverImg: coverImage.getAttribute("src"),
    title: `${coverTitle.innerText}`,
    tagline1: `${tagline1.innerText}`,
    tagline2: `${tagline2.innerText}`,
  };

  var duplicate = false;
  
  for (var i = 0; i < savedCovers.length; i++) {
    if (savedCovers[i].coverImg === currentCover.coverImg &&
      savedCovers[i].title === currentCover.title &&
      savedCovers[i].tagline1 === currentCover.tagline1 &&
      savedCovers[i].tagline2 === currentCover.tagline2
      ) {
        duplicateMessage.innerText = "This cover has already been saved 🫶🏼"
        show(duplicateMessage)     
        duplicate = true; 
      }
    }

    if (!duplicate || !savedCovers.length) {
      savedCovers.push(currentCover);
      duplicateMessage.innerText = "Successfully saved as a favorite!"
      show(duplicateMessage);
    }
    console.log("savedCovers: ", savedCovers);

}

function renderSavedCovers() {
  hide(duplicateMessage)
  savedCoversSection.innerHTML = ''
  for (var i = 0; i < savedCovers.length; i++) {
    // console.log("savedCovers in for loop", savedCovers[i])
    savedCoversSection.innerHTML += `
    <div class="mini-cover">
    <img class="mini-cover" src=${savedCovers[i].coverImg}>
    <button class="delete-button">🗑️</button>
    <h2 class="cover-title">${savedCovers[i].title}</h2>
    <h3 class="tagline">A tale of <span class="tagline-1">${savedCovers[i].tagline1}</span> and <span class="tagline-2">${savedCovers[i].tagline2}</span></h3>
    <img class="price-tag" src="./assets/price.png">
    <img class="overlay" src="./assets/overlay.png">
    </div>
    `

  }
}

function viewSavedPage() {
  show(savedView);
  show(homeButton);
  show(makeNewButton);
  hide(mainView);
  // hide(viewSavedButton)
  hide(saveCoverButton);
  hide(showNewRandomBtn);
  hide(formView);
  renderSavedCovers()
  // const deleteButtons = document.querySelectorAll(".delete-button")
  // console.log("deleteButtons", deleteButtons)
  // for (var i = 0; i < deleteButtons.length; i++) {
  // deleteButtons[1].addEventListener("click", () => {
  //   console.log("I was clicked")
  // })
  // }
}

// Functions for Make Your Own Cover Page
function viewFormPage() {
  resetForm()

  show(formView);
  show(homeButton);
  show(viewSavedButton);
  hide(savedView);
  hide(mainView);
  // hide(makeNewButton)
  hide(showNewRandomBtn);
  hide(saveCoverButton);
}

function resetForm() {
  inputImage.value = '';
  inputTitle.value = '';
  inputDesc1.value = '';
  inputDesc2.value = '';
}

function makeUserCover(event) {
  event.preventDefault();
console.log("inputImage: ", inputImage.value)
  console.log("title: ", inputTitle.value)
  console.log("inputDesc1: ", inputDesc1.value)
  console.log("inputDesc2: ", inputDesc2.value)

  var customCover = {
    id: Date.now(),
    coverImg: inputImage.value,
    title: inputTitle.value,
    tagline1: inputDesc1.value,
    tagline2: inputDesc2.value,
  }
  console.log("customCover: ", customCover)
  coverImage.src = customCover.coverImg;
  coverTitle.innerText = customCover.title;
  tagline1.innerText = customCover.tagline1;
  tagline2.innerText = customCover.tagline2;

  cover.innerHTML = "";
  hide(formView);
  show(mainView);
  show(saveCoverButton)
  hide(duplicateMessage)
  return (cover.innerHTML += `
  <img class="cover-image" src=${customCover.coverImg}>
  <h2 class="cover-title">${customCover.title}</h2>
  <h3 class="tagline">A tale of <span class="tagline-1">${customCover.tagline1}</span> and <span class="tagline-2">${customCover.tagline2}</span></h3>
  `);
}

function deleteFavorite() {
  console.log("savedCovers: ", savedCovers)
  // var unfavorite = e.target.closest('')
}