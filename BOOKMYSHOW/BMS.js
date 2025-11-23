//NavBar

function UpdatingCity() {
  const selected_option = document.getElementById("Select_City").value;
  const City = document.querySelector("#City_Name");

  if (selected_option) {
    City.innerHTML = selected_option;
  } else {
    City.innerHTML = "No city selected";
  }
 
  return City;
}

document.getElementById("Select_City").addEventListener("change", UpdatingCity);

//Hero Section

const Slide = document.querySelectorAll(".Hero_Image");

let counter = 0;

// Position each slide side by side
Slide.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

// Slide function to shift all images
const SlideImage = () => {
  Slide.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
  counter = (counter + 1) % Slide.length;
};

setInterval(SlideImage, 5000);


const goPrev = () => {
  counter--
  SlideImage()
}

const goNext = () => {
  counter++
  SlideImage()
}