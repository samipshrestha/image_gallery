;(function($){
	'use strict';
/**
 * [ImageOverlay Overlay with transparent div]
 */
	function ImageOverlay(){
		this.overlay = document.createElement('div');
		$(this.overlay).attr('class','overlay');

		$(this.overlay).css({
			'top': '0',
			'left': '0'
		});
	}

/**
 * [ImageDisplay Container that contains pop up images]
 */
	function ImageDisplay(){
		var that = this;

		this.imageContainer = document.createElement('div'),
		this.centerDiv = document.createElement('div');

		$(this.centerDiv).css({
			'width': $(window).width()
		})

		$(this.centerDiv).attr('class','center-box');
		$(this.imageContainer).attr('class','image-box');
		$(this.imageContainer).append(that.centerDiv);
	}	

/**
 * [CurrentImage image tag for clicked image]
 * @param {[string]} source [contains source for image]
 */
	function CurrentImage(source){
		this.currentImage = document.createElement('img');

		$(this.currentImage).attr('src', source);
		$(this.currentImage).css({
			'height': ($(window).height() - 200)+'px',
			'margin': '0 auto',
		});
	}

	function setNavigationButtons( currentImageElement ){
		this.nextButton = document.createElement('div'),
		this.prevButton = document.createElement('div');
		var nextImageElement = $(currentImageElement).parent().next().find('img'),
		prevImageElement = $(currentImageElement).parent().prev().find('img'),
		$images = $('.gallery div').siblings(),
		totalImages = $images.length,
		firstImageElement = $images[0],
		lastImageElement = $images[totalImages-1];

		$(this.nextButton).addClass('btn-next');
		$(this.prevButton).addClass('btn-prev');

		// Click event for next button
		
		$(document).on('click', '.btn-next',function(e){
			// debugger;
			if( $('.center-box > img').attr('src') === $(lastImageElement).find('img').attr('src') ){
				e.preventDefault();
			}

			else{
				var nextImage = $(nextImageElement).attr('src');

				$('.center-box > img').attr('src',nextImage);
				updateNextImage();
			}
		});

		// Click event for prev button
		$(document).on('click', '.btn-prev',function(e){
			// debugger;
			if( $('.center-box > img').attr('src') ===  $(firstImageElement).find('img').attr('src') ){
				e.preventDefault();
			}

			else{
				var prevImage = $(prevImageElement).attr('src');

				$('.center-box > img').attr('src',prevImage);
				updatePrevImage();
			}
		});

		$(document).on('mousedown', '.btn-prev',function(){
			$(this).css({
				'background' : 'url(images/btn-prev-active.png) no-repeat',
				'background-size': 'cover'
			});
		});

		$(document).on('mouseup', '.btn-prev',function(){
			$(this).css({
				'background' : 'url(images/btn-prev.png) no-repeat',
				'background-size': 'cover'
			});
		});

		$(document).on('mousedown', '.btn-next',function(){
			$(this).css({
				'background' : 'url(images/btn-next-active.png) no-repeat',
				'background-size': 'cover'
			});
		});

		$(document).on('mouseup', '.btn-next',function(){
			$(this).css({
				'background' : 'url(images/btn-next.png) no-repeat',
				'background-size': 'cover'
			});
		});

		var updateNextImage = function(){
			prevImageElement = currentImageElement; // Copies current Image to previous image
			currentImageElement = nextImageElement; // Copies next image to current image

			nextImageElement = $(nextImageElement).parent().next().find('img');//update next image
		}

		var updatePrevImage = function(){
			nextImageElement = currentImageElement; // Copies current Image to next image
			currentImageElement = prevImageElement; // Copies previous Image to current image

			prevImageElement = $(prevImageElement).parent().prev().find('img');//update previous image
		}
		
	}

// Main function
	$.fn.imageGallery = function(){
		var _this = this,
		checkElement = function(evt){
			if( !$('.center-box > img').is(evt.target) && !$('.center-box .nav-wrapper').is(evt.target) && !$('.center-box .btn-next').is(evt.target) && !$('.center-box .btn-prev').is(evt.target) )
				return true;
			else
				return false;
		};

		$(_this).on('click', 'img', function(e){
			// debugger;
			var imgOverlay = new ImageOverlay(),	
			imgContainer = new ImageDisplay(),
			curImage = new CurrentImage( $(this).attr('src') ),
			navigaitonButtons = new setNavigationButtons( e.target );

			
			function appendToMainWrapper(){
				$(imgContainer.centerDiv).append(navigaitonButtons.prevButton);
				$(imgContainer.centerDiv).append(curImage.currentImage);
				$(imgContainer.centerDiv).append(navigaitonButtons.nextButton);

				// console.log(e.target);
				// debugger;

				$(_this).parent().append(imgOverlay.overlay);
				$(_this).parent().append(imgContainer.imageContainer);
			}

			function init(){
				appendToMainWrapper();
			}
			
			init();
		});
		console.log($(_this).parent());
		$($(_this).parent()).on('click', '.overlay, .image-box', function(e){
			if( checkElement(e) )
			{
				$('.overlay').remove();
				$('.image-box').remove();
			}
		});

	};


})(jQuery);