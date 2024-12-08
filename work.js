/*This code will take an image from a specified path, read the image file using
 the FileReader API, and then extract the pixel data to create a tensor without 
 using a canvas. Make sure to replace 'path/to/your/image.jpg' with the actual 
 path to your image file.*/



// Create an Image object
const img = new Image();
img.src = 'path/to/your/image.jpg'; // Specify the path to your image

img.onload = function() {
    // Create a FileReader object
    const reader = new FileReader();

    // Read the image file
    reader.readAsDataURL(img.src);

    // Handle the file load event
    reader.onload = function(event) {
        // Get the image data URL
        const imageDataUrl = event.target.result;

        // Create a blob from the data URL
        const blob = dataURLToBlob(imageDataUrl);

        // Create a file reader to read the blob
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(blob);

        // Handle the file load event
        fileReader.onload = function(event) {
            // Get the image data as an array buffer
            const imageDataArrayBuffer = event.target.result;

            // Create a Uint8Array from the array buffer
            const imageDataUint8Array = new Uint8Array(imageDataArrayBuffer);

            // Check if the data length is sufficient
            if (imageDataUint8Array.length < 49152) {
                console.error(`Image data length (${imageDataUint8Array.length}) is less than expected (49152).`);
                return; // Exit if the data is insufficient
            }

            // Prepare arrays for RGB channels
            const redArray = new Float32Array(imageDataUint8Array.length / 4);
            const greenArray = new Float32Array(imageDataUint8Array.length / 4);
            const blueArray = new Float32Array(imageDataUint8Array.length / 4);

            // Extract RGB values
            for (let i = 0; i < imageDataUint8Array.length; i += 4) {
                redArray[i / 4] = imageDataUint8Array[i] / 255.0;       // Normalize to [0, 1]
                greenArray[i / 4] = imageDataUint8Array[i + 1] / 255.0; // Normalize to [0, 1]
                blueArray[i / 4] = imageDataUint8Array[i + 2] / 255.0;  // Normalize to [0, 1]
            }

            // Concatenate RGB arrays
            const transposedData = new Float32Array(49152); // Total size for [1, 3, 128, 128]
            for (let i = 0; i < redArray.length; i++) {
                transposedData[i] = redArray[i];       // Red channel
                transposedData[i + redArray.length] = greenArray[i]; // Green channel
                transposedData[i + 2 * redArray.length] = blueArray[i]; // Blue channel
            }

            // Create the tensor
            const tensor = new onnx.Tensor('float32', transposedData, [1, 3, 128, 128]);

            console.log('Tensor created successfully:', tensor);
        };
    };
};

// Helper function to convert a data URL to a blob
function dataURLToBlob(dataURL) {
    const binary = atob(dataURL.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}