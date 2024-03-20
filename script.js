function scrollToDownload() {
  setTimeout(function () {
    var element = document.getElementById("download");
    element.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

let darktoggled = false;

const darkMode = document.querySelector(".dark-mode");

darkMode.addEventListener("click", toggleDarkMode, false);

function toggleDarkMode(e) {
  e.preventDefault();
  let root = document.documentElement;
  let darkMode = document.querySelector(".dark-mode");
  let srcmp4 = document.querySelector(".sourcemp4");
  let srcwebm = document.querySelector(".sourcewebm");
  let video = document.querySelector(".video");
  let overlay = document.querySelector(".overlay");
  if (!darktoggled) {
    root.style.setProperty("--color-primary", "#e6ebf1"); //light
    root.style.setProperty("--color-secondary", "#d9dde9");
    root.style.setProperty("--font-color", "black");
    root.style.setProperty("--highlight-color", "rgba(0,0,0,0.5)");

    video.pause();
    srcmp4.src = "assets/onyx_light.mp4";
    srcwebm.src = "assets/onyx_light.webm";
    let time = video.currentTime;
    video.load();
    video.play();
    video.currentTime = time;

    overlay.style.background = "rgba(255,255,255,0)";

    darkMode.innerHTML = "<img src='assets/light-mode.svg' />";

    darktoggled = true;
  } else {
    root.style.setProperty("--color-primary", "#434b5e"); //dark
    root.style.setProperty("--color-secondary", "#4b566a");
    root.style.setProperty("--font-color", "white");
    root.style.setProperty("--highlight-color", "transparent");

    video.pause();
    srcmp4.src = "assets/onyx_dark.mp4";
    srcwebm.src = "assets/onyx_dark.webm";
    let time = video.currentTime;
    video.load();
    video.play();
    video.currentTime = time;

    overlay.style.background = "rgba(0,0,0,0.5)";

    darkMode.innerHTML = "<img src='assets/dark-mode.svg' />";

    darktoggled = false;
  }
}

const texts = document.querySelectorAll(".anim");

texts.forEach((text) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        text.classList.add("visible");
      }
    });
  });

  observer.observe(text);
});

const swiper = new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  keyboard: true,
  spaceBetween: 0,
  grabCursor: true,
  slidesPerView: 1,
  effect: "slide",
});

swiper.params.speed = 1000; //1 seconde de défilement

/* SLIDE AUTO*/

swiper.autoplay.start();

swiper.params.autoplay.delay = 5000;

//Language switcher

let opened = false;
const arrayLanguages = ["en", "fr", "de"];

let data;
fetch("languages.json")
  .then((response) => response.json())
  .then((fetchedData) => {
    data = fetchedData;
  });

document.querySelector(".selected").addEventListener("click", function () {
  if (!opened) {
    document.querySelector(".lang").style.height =
      arrayLanguages.length * (200 / 3) + "px";
    opened = true;
    const languagesSwitch = document.querySelector(".languagesswitch");
    languagesSwitch.style.display = "flex";
    document.querySelectorAll(".lang-img").forEach((e) => {
      e.addEventListener("click", function (element) {
        const lang = element.target.getAttribute("language").toLowerCase();

        if (arrayLanguages.includes(lang)) {
          data.forEach((e) => {
            document.getElementById(e.id).innerHTML = e[lang];
          });
        }

        reformatLanguageSwitcher(lang);
      });
    });
  } else {
    document.querySelector(".lang").style.height = "60px";
    opened = false;
    const languagesSwitch = document.querySelector(".languagesswitch");
    languagesSwitch.style.display = "none";
  }
});

function reformatLanguageSwitcher(lg) {
  document.querySelector(".selected").innerHTML =
    "<img src='assets/" + lg + "-flag.png' />";
  document.querySelector(".lang").style.height = "60px";
  opened = false;
  const languagesSwitch = document.querySelector(".languagesswitch");
  languagesSwitch.style.display = "none";
  languagesSwitch.innerHTML = "";
  arrayLanguages.forEach((element) => {
    if (element != lg) {
      languagesSwitch.innerHTML +=
        "<div class='img-wrapper'><img class='lang-img' language='" +
        element +
        "' src='assets/" +
        element +
        "-flag.png' /></div>";
    }
  });
}

async function updateLastRelease() {
  const releases = await fetch(
    "https://api.github.com/repos/onyx-lyon1/onyx/releases"
  ).then((response) => response.json());

  releases.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
  const latest = releases[0]?.assets;
  const latestStable = releases.filter((r) => !r.prerelease)[0]?.assets;

  if (latest) {
    const assetUrl = latest.filter((asset) => asset.name.includes("v8a"))[0]
      ?.browser_download_url;
    if (assetUrl) {
      document.getElementById("prerelease-link").href = assetUrl;
    }
  }

  if (latestStable) {
    const assetUrl = latestStable.filter((asset) =>
      asset.name.includes("v8a")
    )[0]?.browser_download_url;

    if (assetUrl) {
      document.getElementById("release-link").href = assetUrl;
    }
  }
}

updateLastRelease();
