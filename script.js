function scrollToDownload() {
    setTimeout(function () {
      var element = document.getElementById("download");
      element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function toggleDarkMode(){
    let root = document.documentElement;
    let darkMode = document.querySelector('.dark-mode');
    if(root.style.getPropertyValue('--color-primary') == '#434b5e'){ 
      root.style.setProperty('--color-primary', '#e6ebf1'); //light
      root.style.setProperty('--color-secondary', '#d9dde9');
      root.style.setProperty('--font-color','black');
      root.style.setProperty('--highlight-color', 'rgba(0,0,0,0.5)');
      
      darkMode.innerHTML = "<img src='assets/light-mode.svg' />";
    }else{
      root.style.setProperty('--color-primary', '#434b5e'); //dark
      root.style.setProperty('--color-secondary', '#4b566a');
      root.style.setProperty('--font-color','white');
      root.style.setProperty('--highlight-color','transparent');

      darkMode.innerHTML = "<img src='assets/dark-mode.svg' />";
    }
}

const texts = document.querySelectorAll('.anim');

    texts.forEach(text => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            text.classList.add('visible');
          }
        });
      });

      observer.observe(text);   
});

const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    keyboard: true,
    spaceBetween: 0,
    grabCursor: true,
    slidesPerView: 1,
    effect: 'slide',
});

swiper.params.speed = 1000; //1 seconde de défilement

/* SLIDE AUTO*/

swiper.autoplay.start();

swiper.params.autoplay.delay = 5000;