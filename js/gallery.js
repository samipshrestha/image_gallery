;(function($){
	'use strict';

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
			var imgOverlay = new ImageOverlay(),	
			imgContainer = new ImageDisplay(),
			curImage = new CurrentImage( $(this).attr('src') ),
			navigaitonButtons = new SetNavigationButtons( e.target );
			
			function appendToMainWrapper(){
				$(imgContainer.centerDiv).addClass( $(e.target).parent().attr('class') );
				$(imgContainer.centerDiv).removeClass('ui-sortable-handle');

				$(imgContainer.centerDiv).append(navigaitonButtons.prevButton);
				$(imgContainer.centerDiv).append(curImage.currentImage);
				$(imgContainer.centerDiv).append(navigaitonButtons.nextButton);
				
				$(_this).parent().append(imgOverlay.overlay);
				$(_this).parent().append(imgContainer.imageContainer);
			}

			function init(){
				appendToMainWrapper();
			}
			
			init();
		});
		$($(_this).parent()).on('click', '.overlay, .image-box', function(e){
			if( checkElement(e) )
			{
				$('.overlay').remove();
				$('.image-box').remove();
			}
		});
	};
/**
 * [ImageOverlay creates overlay with transparent div]
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
 * [ImageDisplay creates container that contains pop up images]
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

/**
 * [setNavigationButtons sets nvigation button properties and functions]
 * @param {[type]} currentImageElement [clicked img tag]
 */
	function SetNavigationButtons( currentImageElement ){
		this.nextButton = document.createElement('div'),
		this.prevButton = document.createElement('div');
		var nextImageElement = $(currentImageElement).parent().next().find('img'),
		prevImageElement = $(currentImageElement).parent().prev().find('img'),
		$images = $('.gallery div').siblings(),
		totalImages = $images.length,
		firstImageElement = $images[0],
		lastImageElement = $images[totalImages-1],
		checkIfFirstImage = function(){
			var firstImageClass = $(firstImageElement).attr('class').split(' ');
			for (var i = 0; i < firstImageClass.length; i++) {
				if ( $('.center-box').hasClass( firstImageClass[i] ) ) {
					return true;
				}
			};

			return false;
		},
		checkIfLastImage = function(){
			var lastImageClass = $(lastImageElement).attr('class').split(' ');
			for (var i = 0; i < lastImageClass.length; i++) {
				if ( $('.center-box').hasClass( lastImageClass[i] ) ) {
					return true;
				}
			};
			return false;
		};

		$(this.nextButton).addClass('btn-next');
		$(this.prevButton).addClass('btn-prev');

		console.log('test');
		$(document).unbind('.btn-next').on('click', '.btn-next',function(e){
			console.log('next button');
			if( !checkIfLastImage() ){
				var nextImage = $(nextImageElement).attr('src');
				$('.center-box').attr('class','center-box');
				$('.center-box').addClass( $(nextImageElement).parent().attr('class') );
				$('.center-box').removeClass('ui-sortable-handle');

				$('.center-box > img').attr('src',nextImage);
				updateNextImage();
			}
			console.log(nextImageElement);
		});

		// Click event for prev button
		$(document).unbind('.btn-prev').on('click', '.btn-prev',function(e){
			if( !checkIfFirstImage() ){
				var prevImage = $(prevImageElement).attr('src');
				$('.center-box').attr('class','center-box');
				$('.center-box').addClass( $(prevImageElement).parent().attr('class') );
				$('.center-box').removeClass('ui-sortable-handle');

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
})(jQuery);