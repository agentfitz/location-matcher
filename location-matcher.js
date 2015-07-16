'use strict';

var $ = require('jquery');

var dom;
var options;

var setupDom = function() {

	dom = {};

	dom.locationMatchItems = $('[data-location-matcher]');

};

var setupOptions = function(opts) {

	options = {
		selectedClass: 'location-matcher--is-selected',
		selectedParentClass: 'location-matcher--is-selected',
		parentSelector: 'li', // override to empty string to prevent parent matching
		locationProperty: 'pathname'
	};

	$.extend(options, opts);

};

var removeClasses = function() {

	dom.locationMatchItems.removeClass(options.selectedClass);

	dom.locationMatchItems
		.parents(options.parentSelector)
		.removeClass(options.selectedParentClass);

};

var applyClasses = function() {

	var locationPath = window.location[options.locationProperty];

	// loop over each node which should be tested for location matches
	$.each(dom.locationMatchItems, function(i, item) {

		var $item = $(item);

		// grab comma-delimited regex pattern to match out of dom (for this item)
		var patternArr = $item.attr('data-location-matcher').split(',');

		// loop over each pattern to match against (for this item)
		// *note* arr.some() method breaks out of the loop upon returning "true"
		patternArr.some(function(pattern) {

			// we have found a match
			if (locationPath.search(pattern) >= 0) {

				$item.addClass(options.selectedClass);

				$item.parents(options.parentSelector).addClass(options.selectedParentClass);

				return true;

			}

		});

	});

};

var destroy = function() {

	dom = null;
	options = null;

};

var init = function(opts) {

	setupDom();

	setupOptions(opts);

	removeClasses();

	applyClasses();

};

module.exports = {
	init: init,
	destroy: destroy
};
