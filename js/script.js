var App = {

	init: function() {
		this.menu();				// Menu
		this.articleSwitch();		// Switch between articles
		this.mobileCheck();			// Check if Mobile or Tablet
		this.itemCarousel();		// Carousel init
		this.countChar();			// Count characters in textarea
		this.timer();				// Timer init
	},


	// Collapse advanced filters section
	menu: function(){
		var header = $('header'),
			nav = header.find('nav'),
			link = nav.find('a'),
			logo = header.find('.logo a'),
			trigger = header.find('.menu-trigger');

		link.on('click', function(e){
			e.preventDefault();
			$(this).closest('li').addClass('current').siblings().removeClass('current');
		});

		// Bind logo click
		logo.on('click', function(e){
			e.preventDefault();
			// link.eq(0).closest('li').addClass('current').siblings().removeClass('current');
			link.closest('li').removeClass('current');
		});

		// Bind menu trigger
		trigger.on('click', function(){
			nav.removeClass('shrink');
		});
	},


	// Articles switch function
	articleSwitch: function(){
		var btn = $('a[data-part], button[data-part], span[data-part]'),
			nav = $('header').find('nav');

		btn.on('click', function(e){
			e.preventDefault();

			var num = $(this).attr('data-part');

			$('article.part-' + num).addClass('active').siblings().removeClass('active');
			$('header').find('a[data-part="'+num+'"]').parent('li').addClass('current').siblings().removeClass('current');

			// Set optional "srink" layout to navigation
			if($('.part-play-large.active, .part-play-medium.active, .part-play-small.active').length){
				nav.addClass('shrink');
			} else {
				nav.removeClass('shrink');
			}
		});
	},


	// Check for mobile users
	mobileCheck: function(){
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			// alert('You\'re using mobile device!');
			$('.mobile-screen').removeClass('hidden');
		}
	},


	// Items Carousel init
	itemCarousel: function() {
		$('.slick-carousel').slick({
			vertical: true,
			infinite: true,
			slidesToShow: 6
		});
	},


	// Count Characters in textarea
	countChar: function(){
		$('form textarea').each(function(){
			var val = $(this).val(),
				length = val.length,
				charNum = $(this).parent().find('.char-counter');

			charNum.text('Zostało ' + (500 - length) + ' znaków');

			$(this).on('keyup', function(){
				length = $(this).val().length;
				charNum.text('Zostało ' + (500 - length) + ' znaków');
				shortString();
			});

			function shortString(){
				if (length === 0) {
					charNum.text('max 500 znaków');
				} else {
					charNum.text('Zostało ' + (500 - length) + ' znaków');
				}
			}
			shortString();
		});
	},


	// Timer
	timer: function(){
		var base = $('.timer');

		if(base.length){

			base.each(function(){

				var t = $(this).attr('data-time'),
					ended_message = $('<span>Game over</span>');

				if(t !== undefined){
					$(this).countdown({
						date: t,
						render: function(data) {
							var el = $(this.el);
							el.empty()
							.append("<span>" + this.leadingZeros(data.min, 2) + "</span><span class=\"separ\">:</span>")
							.append("<span>" + this.leadingZeros(data.sec, 2) + "</span>");
						},
						onEnd: function() {
							$(this.el).parent('.timer-wrap').addClass('ended').html('').append(ended_message);
						}
					});
				} else {
					$(this).removeClass('timer').addClass('counter').prev().text('Bids left: ').parent().addClass('has-counter');
				}
			});
		}
	}
};


$(function(){
	App.init();
});
