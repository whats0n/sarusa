;(() => {
  const slider = $('.js-topic-slider');
  slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000
  });
})();
