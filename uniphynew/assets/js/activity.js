function handleServiceChange(selectElement) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const url = selectedOption.value;
  if (url) { 
    window.location.href = url; 
  }
}

$(document).ready(function() {
    $('#headerContent').load("header.html");
    $('#footerContent').load("footer.html");
    const heroSection = document.querySelector('.hero-section');
    const indexHeroSection = document.querySelector('.hero-section-index');

    const linksSection = document.querySelector('.main-nav');
    const imageOurSection = document.querySelector('.our-journey-section');


  function animateHeroSection() {
    heroSection.querySelector('.hero-text').classList.add('animate__animated', 'animate__fadeInUp');
    heroSection.querySelector('.header-name').classList.add('animate__animated', 'animate__fadeInDown');
  
    setTimeout(() => {
      heroSection.querySelector('.hero-text').classList.remove('animate__animated', 'animate__fadeInUp');
      heroSection.querySelector('.header-name').classList.remove('animate__animated', 'animate__fadeInDown');
    }, 1000); 
  }
  function animateIndexHeroSection() {
    indexHeroSection.querySelector('.hero-text').classList.add('animate__animated', 'animate__fadeInUp');
    indexHeroSection.querySelector('.header-name').classList.add('animate__animated', 'animate__fadeInUp');
    setTimeout(() => {
      indexHeroSection.querySelector('.hero-text').classList.remove('animate__animated', 'animate__fadeInUp');
      indexHeroSection.querySelector('.header-name').classList.remove('animate__animated', 'animate__fadeInUp');
    }, 1000); 
  }

  function animateLinksSection() {
    linksSection.querySelector('.list-hover-slide').classList.add('animate__animated', 'animate__fadeInUp');
    setTimeout(() => {
      linksSection.querySelector('.list-hover-slide').classList.remove('animate__animated', 'animate__fadeInUp');
    }, 1000); 
  }

  function animateImageourSection() {
    imageOurSection.querySelector('.our-journey').classList.add('animate__animated', 'animate__fadeInUp');

    setTimeout(() => {
      imageOurSection.querySelector('.our-journey').classList.remove('animate__animated', 'animate__fadeInUp');

    }, 1000); 
  }


  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateHeroSection(); 
      }
    });
  });

  const indexHeroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateIndexHeroSection(); 
      }
    });
  });

  const linksObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateLinksSection();
      }
    });
  });

  const imageOurObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateImageourSection();
      }
    });
  });



if(heroSection){
  heroObserver.observe(heroSection);
}
if(indexHeroSection){
  indexHeroObserver.observe(indexHeroSection);
}

  if(linksSection){
  linksObserver.observe(linksSection);
  }

    if(imageOurSection){
      imageOurObserver.observe(imageOurSection);
      }

  //tabs switching
    const tabs = document.querySelectorAll('.services-tab-link');
  if(tabs){
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        const tabContent = document.getElementById(tabId);
  
        tabs.forEach(tab => tab.classList.remove('active'));
        const tabPanes = document.querySelectorAll('.tab-content');
        tabPanes.forEach(pane => pane.classList.remove('active'));
  
        this.classList.add('active');
        tabContent.classList.add('active');
        $(".service-tabs li").removeAttr('style');
       });
    });
    $(".service-tabs li").mouseover(function() {
        if (!$(this).hasClass("active")) {
         $(".service-tabs li.active").css('border-bottom', '0');
      }
      });
    $('.service-tabs li').mouseout(function(){
    $(".service-tabs li.active").css('border-bottom', 'rgb(94, 218, 211) 4px solid');
    });
    
  }
    $('#heroSliderNav').on('init', function (event, slick) {
        $(slick.$slider).find('.slick-pagination-line-progress .slick-pagination-line-progress-helper').each(function() {
          $(this).css({
            transitionDuration: (slick.options.autoplaySpeed - slick.options.speed) + 'ms'
          });
        });

        setTimeout(function() {
          $(slick.$slider).addClass('slick-dots-ready');
        });
      });

      $('#heroSliderNav').one('beforeChange', function (event, slick) {
        $(slick.$slider).find('.slick-pagination-line-progress .slick-pagination-line-progress-helper').each(function() {
          $(this).css({
            transitionDuration: (slick.options.autoplaySpeed + slick.options.speed) + 'ms'
          });
        });
      });


      // initialization of slick carousel
      $('.js-slick-carousel').each(function() {
        var slickCarousel = $.HSCore.components.HSSlickCarousel.init($(this));
      });

      // initialization of form validation
      $('.js-validate').each(function () {
        var validation = $.HSCore.components.HSValidation.init($(this));
      });

      // initialization of aos
      AOS.init({
        duration: 650,
        once: true
      });
           $('.js-go-to').each(function () {
        var goTo = new HSGoTo($(this)).init();
      });
  });

  var swiper = new Swiper(".swiper3", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 2,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    speed: 600, 
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1, 
        spaceBetween: 40
      },
      768: {
        slidesPerView: 2, 
        spaceBetween: 40
      },
      900: {
        slidesPerView: 2,
        spaceBetween: 60
      },
      1800: {
        slidesPerView: 2,
        spaceBetween: 60
      }
    },
    on: {
      slideChange: function () {
        let activeSlide = this.slides[this.activeIndex];
        let contentId = activeSlide.getAttribute("data-content");

        // hide all content items
        document.querySelectorAll("#content-area .content-item").forEach(item => {
          item.style.display = "none";
        });

        // show the matched content
        let activeContent = document.querySelector(
          `#content-area .content-item[data-id="${contentId}"]`
        );
        if (activeContent) {
          activeContent.style.display = "block";
        }
      }
    }
  });

  var swiper = new Swiper(".swiper5", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 600, 
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1, 
        spaceBetween: 40
      },
      768: {
        slidesPerView: 2, 
        spaceBetween: 40
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      1800: {
        slidesPerView: 3,
        spaceBetween: 60
      }
    }
  });

  // Initialize with the first active slide’s content
  let firstSlide = document.querySelector(".swiper-slide-active");
  if (firstSlide) {
    let contentId = firstSlide.getAttribute("data-content");

    document.querySelectorAll("#content-area .content-item").forEach(item => {
      item.style.display = "none";
    });

    let firstContent = document.querySelector(
      `#content-area .content-item[data-id="${contentId}"]`
    );
    if (firstContent) {
      firstContent.style.display = "block";
    }
  }
