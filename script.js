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

var swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

swiper.params.speed = 1000; //1 seconde de défilement

/* SLIDE AUTO*/

setInterval(function(){
    swiper.slideNext();
}, 1000); // 3 sec d'intervalle entre chaque slide


swiper.on('reachEnd', function () {
    setTimeout(function () {
        swiper.slideTo(0);
    }, 1000);
});
