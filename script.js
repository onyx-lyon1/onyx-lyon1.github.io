function scrollToDownload() {
    setTimeout(function () {
      var element = document.getElementById("download");
      element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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

swiper.params.autoplay.delay = 3000;