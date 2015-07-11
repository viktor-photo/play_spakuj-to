var App = {

	init: function() {
		this.menu();				// Menu
		this.articleSwitch();		// Switch between articles
		this.simpleScroll();		// Custom simple bar
		this.mobileTabletCheck();	// Check if Mobile or Tablet
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

		logo.on('click', function(e){
			e.preventDefault();
			// link.eq(0).closest('li').addClass('current').siblings().removeClass('current');
			link.closest('li').removeClass('current');
		});

		trigger.on('click', function(){
			nav.removeClass('shrink');
		});
	},


	// Articles switch function
	articleSwitch: function(){
		var btn = $('a[data-part], button[data-part], span[data-part]');

		btn.on('click', function(e){
			var num = $(this).attr('data-part');

			e.preventDefault();

			if($('.modal-box').hasClass('active')) {
				$('.modal-box').removeClass('active');
			}

			$('article.part-' + num).addClass('active').siblings().removeClass('active');
		});
	},


	// Custom scrollbar
	simpleScroll: function(){
		var simpleScroll = $('.simplebar');

		if(simpleScroll.length){
			simpleScroll.simplebar();

			$(window).on('resize', function(){
				simpleScroll.simplebar('recalculate');
			});
		}
	},


	// Check for mobile/tablet users
	mobileTabletCheck: function(){
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			// alert('You\'re using mobile device!');
			$('.mobile-screen').removeClass('hidden');
		}
	}
};


$(function(){
	App.init();
});
