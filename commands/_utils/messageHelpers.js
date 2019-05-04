module.exports.flexWrapper = function (altText, obj) {
	let isCarousel = Array.isArray(obj)

	if (!isCarousel) {
		return {
			"type": "flex",
			"altText": altText,
			"contents": obj
		}
	}

	return {
		"type": "flex",
		"altText": altText,
		"contents": {
			"type": "carousel",
			"contents": obj
		}
	}
}
