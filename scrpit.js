const showNaw = document.querySelector(".showNav");
const navList = document.querySelector("nav");
const header = document.querySelector("header");
const navSection = document.querySelectorAll(".navSection");
const navBtn = document.querySelectorAll(".navBtn");
const titleName = document.querySelectorAll(".title");
const segments = document.querySelectorAll(".segment");
const copyTextButton = document.querySelectorAll(".copyText");
const showElementbtn = document.querySelectorAll(".show");

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

copyTextButton.forEach((button) => {
  button.addEventListener("click", () => {
    inpt = document.createElement("input");
    inpt.value = button.innerText;
    document.body.appendChild(inpt);
    inpt.select();
    document.execCommand("copy");
    document.body.removeChild(inpt);
    button.classList.add("copyInfo");
    setTimeout(() => {
      button.classList.remove("copyInfo");
    }, 1000);
  });
});

showNaw.addEventListener("click", () => {
  navList.classList.toggle("active");
  showNaw.classList.toggle("active");
});
navSection.forEach((section) => {
  section.children[0].addEventListener("click", () => {
    const currentActive = document.querySelector(".activeSection");
    section.classList.toggle("activeSection");
    currentActive && currentActive.classList.remove("activeSection");
  });
});

// navBtn.forEach((element) => {
//   element.addEventListener("click", () => {
//     const matchTitle = [...titleName].filter(
//       (title) =>
//         title.children[0].innerText.toLowerCase() ==
//         element.innerText.toLowerCase()
//     );
//     matchTitle[0].scrollIntoView({ behavior: "instant", block: "start" });
//     navList.classList.remove("active");
//   });
// });

const galerySlider = document.querySelectorAll(".galery");
const galerySliderSwapHandle = (value, pickIMG, visibleIMG) => {
  const index = [...pickIMG.children].findIndex(
    //get index of pickIMG matchet witch visibleIMG
    (img) => img.children[0].src == visibleIMG.children[0].src
  );
  if (index === pickIMG.children.length - 1 && value > 0) {
    //swap visibleIMG base on button value and index^
    visibleIMG.children[0].src = pickIMG.children[0].children[0].src;
  } else if (index === 0 && value < 0) {
    visibleIMG.children[0].src =
      pickIMG.children[pickIMG.children.length - 1].children[0].src;
  } else {
    visibleIMG.children[0].src =
      pickIMG.children[index + value].children[0].src;
  }
};

galerySlider.forEach((galery) => {
  galery = [...galery.children];
  const visibleIMG = galery[0]; //div.activeIMG > img
  const pickIMG = galery[1]; //ul.galeryList > li > img
  const swapLeftButton = galery[2]; //button.arrowLeft
  const swapRightButton = galery[3]; //button.arrowRight
  [...pickIMG.children].forEach((galeryElement) => {
    //swap visibleIMG.src in to click target.src from pickIMG
    galeryElement.addEventListener("click", (e) => {
      if (e.target.src) {
        visibleIMG.children[0].src = e.target.src;
      }
    });
  });
  window.addEventListener("keydown", (e) => {
    console.log(e.keyCode);
    if (e.keyCode == 37) {
      console.log("left");
      galerySliderSwapHandle(-1, pickIMG, visibleIMG);
    } else if (e.keyCode == 39) {
      galerySliderSwapHandle(1, pickIMG, visibleIMG);
    }
  });
  swapLeftButton.addEventListener("click", () =>
    galerySliderSwapHandle(-1, pickIMG, visibleIMG)
  );
  swapRightButton.addEventListener("click", () =>
    galerySliderSwapHandle(1, pickIMG, visibleIMG)
  );
  visibleIMG.addEventListener("click", () => {
    visibleIMG.classList.toggle("zoom");
    swapLeftButton.classList.toggle("zoom");
    swapRightButton.classList.toggle("zoom");
  });
});

document.addEventListener("scroll", () => {
  ``;
  header.getBoundingClientRect();
  if (window.pageYOffset > 5 * rem) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

showElementbtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentActive = document.querySelector(".activeSection");
    currentActive && currentActive.classList.remove("activeSection");

    navList.classList.add("active");
    showNaw.classList.add("active");
    if (btn.innerText === "Oferta") {
      navList.children[0].classList.add("activeSection");
    } else if (btn.innerText === "Kontakt") {
      navList.children[1].classList.add("activeSection");
    }
  });
});

// function getClosestSegmentAbove(offset) {
//   let closestSegment = null;
//   let closestDistance = Infinity;

//   segments.forEach((segment) => {
//     const segmentTop = segment.getBoundingClientRect().top + offset - 10;

//     if (segmentTop <= offset) {
//       const distance = offset - segmentTop;

//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestSegment = segment;
//       }
//     }
//   });
//   if (closestSegment) {
//     const segmentAboveStyle = [...closestSegment.classList].filter((element) =>
//       element.match(/(color)/)
//     );
//     const currentHeaderStyle = [...header.classList].filter((element) =>
//       element.match(/(color)/)
//     );
//     if (segmentAboveStyle[0] !== currentHeaderStyle[0]) {
//       header.classList.remove(currentHeaderStyle);
//       header.classList.add(segmentAboveStyle);
//     }
//   }
// }
// document.addEventListener("click", (e) => {
//   navList.classList.contains("active") &&
//     e.target.tagName == "HEADER" &&
//     navList.classList.remove("active");
// });
