;(() => {

  $('.js-product').each((i, product) => {
    product = $(product);
    const prev = product.find('.js-product-prev');
    const next = product.find('.js-product-next');
    const slider = product.find('.js-product-slider');

    slider.slick({
      prevArrow: prev,
      nextArrow: next,
      dots: false,
      fade: true,
      dots: true
    });
  });

})();
