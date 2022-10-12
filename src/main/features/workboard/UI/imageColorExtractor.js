var image = new Image();
image.onload = function () {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	var context = canvas.getContext("2d");
	context.drawImage(image, 0, 0);

	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

	// Now you can access pixel data from imageData.data.
	// It's a one-dimensional array of RGBA values.
	// Here's an example of how to get a pixel's color at (x,y)
	var index = (y * imageData.width + x) * 4;
	var red = imageData.data[index];
	var green = imageData.data[index + 1];
	var blue = imageData.data[index + 2];
	var alpha = imageData.data[index + 3];
};
image.src = base64EncodedImage;
