/*!
  Title: Dev Portfolio Template
  Version: 1.1.3
  Last Change: 03/25/17
  Author: Ryan Fitzgerald
  Repo: https://github.com/RyanFitzgerald/devportfolio-template
  Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

  Description: This file contains all the scripts associated with the single-page
  portfolio website.
*/

(function($) {

  // Remove no-js class
  $('html').removeClass('no-js');

  // Animate to section when nav is clicked
  $('.header-link').click(function(e) {

    // Treat as normal link if no-scroll class
    if ($(this).hasClass('no-scroll')) return;

    e.preventDefault();
    var heading = $(this).attr('href');
    var scrollDistance = $(heading).offset().top;

    // $('html, body').animate({
    //     scrollTop: scrollDistance + 'px'
    // }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

    $('html, body').animate({
      scrollTop: scrollDistance + 'px'
    }, Math.abs(window.pageYOffset - $(heading).offset().top) / 3);

    // Hide the menu once clicked if mobile
    if ($('header').hasClass('active')) {
      $('header, body').removeClass('active');
    }
  });

  // Scroll to top
  $('.to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  // Scroll to first element
  $('.lead-down span').click(function() {
    var scrollDistance = $('.lead').next().offset().top;
    $('html, body').animate({
      scrollTop: scrollDistance + 'px'
    }, 500);
  });

  // Create timeline
  $('.experience-timeline').each(function() {

    $this = $(this); // Store reference to this
    $userContent = $this.children('div'); // user content

    // Create each timeline block
    $userContent.each(function() {
      $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
    });

    // Add icons to each block
    $this.find('.vtimeline-point').each(function() {
      $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
    });

    // Add dates to the timeline if exists
    $this.find('.vtimeline-content').each(function() {
      var date = $(this).data('date');
      if (date) { // Prepend if exists
        $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
      }
    });

  });

  // Open mobile menu
  $('.mobile-menu-open').click(function() {
    $('header, body').addClass('active');
  });

  // Close mobile menu
  $('.mobile-menu-close').click(function() {
    $('header, body').removeClass('active');
  });

  // SVG
  var mySVG = $('svg').drawsvg({
    duration: 1600
  });
  function svg() {
    mySVG.drawsvg('animate');
  }
  setTimeout(svg,1000);

  //skillbar
  var skills = [
    { name: 'HTML5', level: '90%' },
    { name: 'CSS5', level: '90%' },
    { name: 'Stylus', level: '90%' },
    { name: 'JavaScript', level: '80%' },
    { name: 'jQuery', level: '80%' },
    { name: 'ES2016', level: '70%' },
    { name: 'React', level: '70%' },
    { name: 'Gulp', level: '70%' },
    { name: 'Webpack', level: '60%' },
    { name: 'Node.js', level: '60%' },
    { name: 'WordPress', level: '50%' }
  ];

  function skillbar(name, level) {
    $(
      '<div class="skills_row">' +
      '<p class="skills_skill"></p>' +
      '<div class="skills_bar"><span class="data"></span></div>' +
      '</div>'
    )
    .find('.skills_skill').text(name).end()
    .find('.data').text(level).end()
    .appendTo('.skills_barchart')
  };

  $.each(skills,function(index, elem){
    skillbar(elem.name, elem.level);
  });

  var timer = null;
  var animate = true;
  $(window).on('scroll',function(){
    clearTimeout( timer );
    timer = setTimeout(function(){
      var top = $('#skills').offset().top - $(window).scrollTop();
      if (top < 200 && animate) {
        $.each($('.data'), function(index, elem) {
          $(elem).css('width',skills[index].level).end()
        });
        $('.skills_barchart').addClass('js-animate');
        animate = false;
      }
    }, 30);
  });

})(jQuery);
