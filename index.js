
function drawCanvas(canvas_id,width,height,drawing){
  const canvas=document.getElementById(canvas_id);
  const ctx=canvas.getContext('2d');
  canvas.width=width;
  canvas.height=height;
  ctx.drawImage(drawing,0,0,canvas.width,canvas.height);
 }
let srcImgElement = document.getElementById('imageSrc');
let srcInputElement = document.getElementById('srcFileInput');
let trgImgElement = document.getElementById('imageTrg');
let trgInputElement = document.getElementById('trgFileInput');



srcInputElement.addEventListener('change', (e) => {
 srcImgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

trgInputElement.addEventListener('change', (e) => {
 trgImgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);
//100% 
//console.log(faceapi);
//console.log(faceapi.nets);

console.log(ort);
const run=async () => {
   /* await Promise.all([
        await faceapi.nets.ssdMobilenetv1.loadFromUri('./assets/js/libraries/face-api.js/weights'),
        await faceapi.nets.faceLandmark68Net.loadFromUri('./assets/js/libraries/face-api.js/weights'),
        await faceapi.nets.faceRecognitionNet.loadFromUri('./assets/js/libraries/face-api.js/weights'),
        await faceapi.nets.faceExpressionNet.loadFromUri('./assets/js/libraries/face-api.js/weights'),
    ])
    // Detect faces
      let srcImageDetailes  = await faceapi.detectAllFaces(srcImgElement).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
      //let trgImageDetailes  = await faceapi.detectAllFaces(trgImgElement).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
      let trgImageDetailes  = await faceapi.detectAllFaces(trgImgElement).withFaceLandmarks();
      console.log(trgImageDetailes[0]);
*/
drawCanvas('canvasOutput',trgImgElement.width,trgImgElement.height,trgImgElement);
/*source input start */
//source image input
function src_img(canvas_reff){
const canvas = document.getElementById(canvas_reff);
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const { data } = imageData;
const pixelValues = new Array(data.length / 4);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const avg = (r + g + b) / 3;
  pixelValues[i / 4] = avg;
}

const resizedValues = new Array(512);
for (let i = 0; i < 512; i++) {
  const idx = Math.floor(i * pixelValues.length / 512);
  resizedValues[i] = pixelValues[idx];
}

const float32Values = new Float32Array(resizedValues.length);

for (let i = 0; i < resizedValues.length; i++) {
  float32Values[i] = resizedValues[i] / 255.0;
}

const Src_tensor = new ort.Tensor('float32', float32Values, [1, 512]);
console.log('Src_Tensor created successfully:', Src_tensor);
return Src_tensor;
}
//src_img('canvasOutput');

/*source input end */

/*target input start*/
function trg_img(canvas_reff){
  //target image input
const canvas = document.getElementById(canvas_reff);
const ctx = canvas.getContext('2d');

// Ensure the canvas is the correct size
canvas.width = 128;  // Set canvas width
canvas.height = 128; // Set canvas height

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const { data } = imageData; // data is a Uint8ClampedArray

// Check if the data length is sufficient
if (data.length < 49152) {
    console.error(`Image data length (${data.length}) is less than expected (49152).`);
    // Handle the error accordingly (e.g., resize the canvas or provide a default image)
}

// Prepare arrays for RGB channels
const redArray = new Float32Array(data.length / 4);
const greenArray = new Float32Array(data.length / 4);
const blueArray = new Float32Array(data.length / 4);

// Extract RGB values
for (let i = 0; i < data.length; i += 4) {
    redArray[i / 4] = data[i] / 255.0;       // Normalize to [0, 1]
    greenArray[i / 4] = data[i + 1] / 255.0; // Normalize to [0, 1]
    blueArray[i / 4] = data[i + 2] / 255.0;  // Normalize to [0, 1]
}

// Concatenate RGB arrays
const transposedData = new Float32Array(49152); // Total size for [1, 3, 128, 128]
for (let i = 0; i < redArray.length; i++) {
    transposedData[i] = redArray[i];       // Red channel
    transposedData[i + redArray.length] = greenArray[i]; // Green channel
    transposedData[i + 2 * redArray.length] = blueArray[i]; // Blue channel
}

// Create the tensor
const Trg_tensor = new ort.Tensor('float32', transposedData, [1, 3, 128, 128]);
console.log('Trg_Tensor created successfully:', Trg_tensor);
return Trg_tensor;
}

//trg_img('canvasOutput');

console.log('ok');
//const Trg_tensor = new Tensor('float32', float32Data, [1, 3, 128, 128])
/*target input end*/
      //onnx start
      

// Create an inference session
//const session = await ort.InferenceSession.create('./assets/js/model/inswapper_128.onnx', { executionProviders: ['webgl'] });
const session = await ort.InferenceSession.create('./assets/js/model/inswapper_128.onnx');
console.log('loaded');

const sourceInput = src_img('canvasOutput');;
const targetInput = trg_img('canvasOutput');;

const inputs = {
  "target": targetInput,
  "source": sourceInput
};

console.log(session);
// Feed inputs and run
const results = await session.run(inputs);

      const onnxSession=new ort.InferenceSession();
      onnxSession.loadModel("./assets/js/libraries/onnxruntime.js");



      //onnx end

      function drawCanvas(canvas_id,width,height,drawing){
       const canvas=document.getElementById(canvas_id);
       const ctx=canvas.getContext('2d');
       canvas.width=width;
       canvas.height=height;
       ctx.drawImage(drawing,0,0,canvas.width,canvas.height);
      }
      
      //const r=drawCanvas('canvasOutput',trgImgElement.width,trgImgElement.height,trgImgElement);
       /*const pixels=ctx.getImageData(0,0,canvas.width,canvas.height,canvas.height);
       console.log(pixels);*/
       //console.log(trgImgElement);
}
run();

/*
// Load the ONNX model
const session = await ort.InferenceSession.create('./model.onnx');

// Prepare input data
const inputData = new Float32Array([1, 2, 3, 4]);
const inputTensor = new ort.Tensor('float32', inputData, [2, 2]);

// Run the model
const output = await session.run({ input: inputTensor });

// Get the output tensor
const outputTensor = output.values().next().value;
console.log(`Output tensor: ${outputTensor.data}`);
*/

/*
//target image input
const canvas = document.getElementById('input-canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const { data } = imageData;
const redArray = new Array(data.length / 4);
const greenArray = new Array(data.length / 4);
const blueArray = new Array(data.length / 4);

for (let i = 0; i < data.length; i += 4) {
  redArray[i / 4] = data[i];
  greenArray[i / 4] = data[i + 1];
  blueArray[i / 4] = data[i + 2];
}

const transposedData = redArray.concat(greenArray).concat(blueArray);
const float32Data = new Float32Array(transposedData.length);

for (let i = 0; i < transposedData.length; i++) {
  float32Data[i] = transposedData[i] / 255.0;
}

const tensor = new Tensor('float32', float32Data, [1, 3, 128, 128]);
 */

/*
//source image input
const canvas = document.getElementById('source-canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const { data } = imageData;
const pixelValues = new Array(data.length / 4);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const avg = (r + g + b) / 3;
  pixelValues[i / 4] = avg;
}

const resizedValues = new Array(512);
for (let i = 0; i < 512; i++) {
  const idx = Math.floor(i * pixelValues.length / 512);
  resizedValues[i] = pixelValues[idx];
}

const float32Values = new Float32Array(resizedValues.length);

for (let i = 0; i < resizedValues.length; i++) {
  float32Values[i] = resizedValues[i] / 255.0;
}

const tensor = new Tensor('float32', float32Values, [1, 512]);
 */


/*
//raw output
const tensorValues = tensor.data;

const normalizedValues = new Uint8ClampedArray(tensorValues.length);

for (let i = 0; i < tensorValues.length; i++) {
  normalizedValues[i] = Math.floor((tensorValues[i] + 1) * 127.5);
}

const reshapedValues = new Uint8ClampedArray(3 * 128 * 128);

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 128; j++) {
    for (let k = 0; k < 128; k++) {
      const idx = i * 128 * 128 + j * 128 + k;
      reshapedValues[idx] = normalizedValues[i * 128 * 128 + j * 128 + k];
    }
  }
}

const imageData = new ImageData(reshapedValues, 128, 128);

const canvas = document.getElementById('output-canvas');
const ctx = canvas.getContext('2d');
ctx.putImageData(imageData, 0, 0);
 */



/*

const sourceInput = new onnx.Tensor(new Float32Array([1.0, 2.0, 3.0, 4.0]), "float32", [2, 2]);
const targetInput = new onnx.Tensor(new Float32Array([5.0, 6.0, 7.0, 8.0]), "float32", [2, 2]);

const inputs = {
  "source": sourceInput,
  "target": targetInput
};

const results = await session.run(inputs);
*/
/*
target img modifided for  [1, 3, 128, 128]=49152

//target image input
const canvas = document.getElementById('canvasOutput');
const ctx = canvas.getContext('2d');

// Ensure the canvas is the correct size
canvas.width = 128;  // Set canvas width
canvas.height = 128; // Set canvas height

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const { data } = imageData; // data is a Uint8ClampedArray

// Check if the data length is sufficient
if (data.length < 49152) {
    console.error(`Image data length (${data.length}) is less than expected (49152).`);
    // Handle the error accordingly (e.g., resize the canvas or provide a default image)
}

// Prepare arrays for RGB channels
const redArray = new Float32Array(data.length / 4);
const greenArray = new Float32Array(data.length / 4);
const blueArray = new Float32Array(data.length / 4);

// Extract RGB values
for (let i = 0; i < data.length; i += 4) {
    redArray[i / 4] = data[i] / 255.0;       // Normalize to [0, 1]
    greenArray[i / 4] = data[i + 1] / 255.0; // Normalize to [0, 1]
    blueArray[i / 4] = data[i + 2] / 255.0;  // Normalize to [0, 1]
}

// Concatenate RGB arrays
const transposedData = new Float32Array(49152); // Total size for [1, 3, 128, 128]
for (let i = 0; i < redArray.length; i++) {
    transposedData[i] = redArray[i];       // Red channel
    transposedData[i + redArray.length] = greenArray[i]; // Green channel
    transposedData[i + 2 * redArray.length] = blueArray[i]; // Blue channel
}

// Create the tensor
const Trg_tensor = new ort.Tensor('float32', transposedData, [1, 3, 128, 128]);
*/