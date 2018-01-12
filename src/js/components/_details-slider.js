;(() => {
  const slider = $('.js-details-slider');
  slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000
  });
})();
