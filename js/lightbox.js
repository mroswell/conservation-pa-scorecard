window.jQuery(function($) {
	var COOKIE_DATA = 'cvpa_scorecard_2020_email_opt_in_dismissed=true';
	var $emailOptIn = $('#email-opt-in');
	if (document.cookie.indexOf(COOKIE_DATA) !== -1) return;
	document.cookie = COOKIE_DATA;

	var myPostRender = function(args) {

	    $emailOptIn.find('.at-title').remove(); // strip the title on lightbox forms
	    $emailOptIn.find('legend').remove(); // and the legend

	    $emailOptIn.find('.at-row.PostalCode')
	    	.addClass('EmailAddress')
	    	.removeClass('at-row-solo');
	    $('.at.lightbox-form .at-row-solo.EmailAddress label.EmailAddress').prependTo('.at.lightbox-form .at-row.PostalCode.EmailAddress');
	    $('.at.lightbox-form .at-row-solo.EmailAddress').remove();

		return args;
	};

	var cb = window.nvtag_callbacks = (window.nvtag_callbacks || {});
	cb.postRender = cb.postRender || [];
	cb.postRender.push(myPostRender);

	$emailOptIn.modal('show');
});
