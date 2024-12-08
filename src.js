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


//model start
console.log(faceapi.nets);
const run=async () => {
    // Load models
    await Promise.all([ 
      //face detection
      await faceapi.nets.ssdMobilenetv1.loadFromUri('./assets/js/libraries/face-api.js/weights'),
      await faceapi.nets.faceLandmark68Net.loadFromUri('./assets/js/libraries/face-api.js/weights'),
      await faceapi.nets.faceRecognitionNet.loadFromUri('./assets/js/libraries/face-api.js/weights'),
      await faceapi.nets.faceExpressionNet.loadFromUri('./assets/js/libraries/face-api.js/weights'),
    ])
  }
    run();


      // Detect faces
      /*let srcImageDetailes  = await faceapi.detectAllFaces(srcImgElement).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
      let trgImageDetailes  = await faceapi.detectAllFaces(trgImgElement).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
     */
      /*let trgImageDetailes  = await faceapi.detectAllFaces(trgImgElement).withFaceLandmarks();
     console.log(trgImageDetailes[0]);*/
     //test start
     /*let trgImageDetailes  = await faceapi.detectAllFaces(trgImgElement).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
     console.log(trgImageDetailes);








const canvas=document.getElementById('canvasOutput');
       const ctx=canvas.getContext('2d');
       canvas.width=trgImgElement.width;
       canvas.height=trgImgElement.height;
       ctx.drawImage(trgImgElement,0,0,canvas.width,canvas.height);
       const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
       console.log(pixels);
/*const canvas=document.getElementById('canvasOutput');

canvas.width = srcImgElement.width;
canvas.height = srcImgElement.height;
const ctx = canvas.getContext('2d');

// Draw the target image on the canvas
ctx.drawImage(srcImgElement, 0, 0);*/

/*console.log(faceapi);
console.log(faceapi.nets);
const run=async () => {
    // Load models
    await Promise.all([
        //face detection
        await faceapi.nets.ssdMobilenetv1.loadFromUri('./assets/js/libraries/face-api.js/weights'),
        await faceapi.nets.faceLandmark68Net.loadFromUri('./assets/js/libraries/face-api.js/weights'),
        await faceapi.nets.faceRecognitionNet.loadFromUri('./assets/js/libraries/face-api.js/weights'),
        await faceapi.nets.faceExpressionNet.loadFromUri('./assets/js/libraries/face-api.js/weights'),
      ])


        // Detect faces
        /*let srcImageDetailes  = await faceapi.detectAllFaces(srcImgElement).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
        let trgImageDetailes  = await faceapi.detectAllFaces(trgImgElement).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
       */
        /*let trgImageDetailes  = await faceapi.detectAllFaces(trgImgElement).withFaceLandmarks();
       console.log(trgImageDetailes[0]);*/
       //test start
       /*let trgImageDetailes  = await faceapi.detectAllFaces(trgImgElement).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
       console.log(trgImageDetailes);
       */

       //test end
       
       /*const canvas=document.getElementById('canvasOutput');
       const ctx=canvas.getContext('2d');
       canvas.width=trgImgElement.width;
       canvas.height=trgImgElement.height;
       ctx.drawImage(trgImgElement,0,0,canvas.width,canvas.height);
       const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
       console.log(pixels);
       
//test start
console.log(ort);


/*
const onnxModelURL = './assets/js/model/inswapper_128.onnx';
      const sessionOption = { executionProviders: ['wasm', 'webgl'] };

      var inferenceSession;

      async function createInferenceSession(onnxModelURL, sessionOption) {
        try {
          inferenceSession = await ort.InferenceSession.create(onnxModelURL, sessionOption);
        } catch (e) {
          console.log(`failed to load ONNX model: ${e}.`);
        }
      }

      createInferenceSession(onnxModelURL, sessionOption);

      async function runMnistInference(inputDataArray, inferenceSession) {
        try {
          const inputData = Float32Array.from(inputDataArray);
          const inputTensor = new ort.Tensor('float32', inputData, [1, 1, 28, 28]);

          const feeds = { Input3: inputTensor };

          const results = await inferenceSession.run(feeds);
          const outputData = results.Plus214_Output_0.data;
        } catch (e) {
          console.log(`failed to inference ONNX model: ${e}.`);
        }
      }*/


      //model operations start
     /* const model='./assets/js/model/inswapper_128.onnx';
      const session = new ort.InferenceSession();
      session.loadModel(model).then(()=>{
        console.log("model loaded")
      })
      
      //model operations end

      

console.log('model loaded sucess full')
/*
//test end
       //face detection test
       function faceDetection(pixels){
        //Define the skin tone Range
        const skinToneMin=[40,30,30];
        const skinToneMax=[100,80,80];
        //Loop through pixels
        for(let i=0;i<pixels.data.length;i+=4){
          const r=pixels.data[i];
          const g=pixels.data[i+1];
          const b=pixels.data[i+2];
          // check if pixel is within skin tone range
          if(r>=skinToneMin[0] && r<=skinToneMax[0] && g>=skinToneMin[1] && g<=skinToneMax[1] && b>=skinToneMin[2] && b<=skinToneMax[2]){
            //mark pixelas skin tone
            pixels.data[i]=255;
            pixels.data[i+1]=255;
            pixels.data[i+2]=255;
          }else{
            pixels.data[i]=0;
            pixels.data[i+1]=0;
            pixels.data[i+2]=0;
          }
        }
        //put a modified pixel data back into the canvas
        ctx.putImageData(pixels,0,0);

       }
       
//faceDetection(pixels);
       
        /*console.log(srcImageDetailes);
        console.log(trgImageDetailes);
        const displaySize = { width: srcImgElement.width, height: srcImgElement.height }
        // resize the overlay canvas to the input dimensions
        const canvas = document.getElementById('canvasOutput');
        faceapi.matchDimensions(canvas, displaySize);
        const resizedDetections = faceapi.resizeResults(srcImageDetailes, displaySize);
        // draw detections into the canvas
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        // draw a textbox displaying the face expressions with minimum probability into the canvas
        const minProbability = 0.05;
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections, minProbability);
*/


        
        // Align faces

        // Generate masks
        // Swap faces
        // Generate masks
        // Blend faces
        // Post-processing
        // Display result
     // Align faces
  

//}
   //  run();

//aditional functions
function alignFaces(srcFace, tgtFace) {
        // Calculate the centroids of the source and target faces
        const srcCentroid = getCentroid(srcFace);
        const tgtCentroid = getCentroid(tgtFace);
      
        // Calculate the rotation and scale factors
        const rotation = getRotation(srcFace, tgtFace);
        const scale = getScale(srcFace, tgtFace);
      
        // Create the transformation matrix
        const matrix = [
          scale * Math.cos(rotation), scale * Math.sin(rotation), tgtCentroid.x - scale * srcCentroid.x * Math.cos(rotation) - scale * srcCentroid.y * Math.sin(rotation),
          -scale * Math.sin(rotation), scale * Math.cos(rotation), tgtCentroid.y + scale * srcCentroid.x * Math.sin(rotation) - scale * srcCentroid.y * Math.cos(rotation)
        ];
      
        return matrix;
      }
      
      // Helper functions to calculate the centroid, rotation, and scale
      function getCentroid(face) {
        // Calculate the centroid of the face region
        // This implementation assumes the face region is a rectangle
        const x = face.x + face.width / 2;
        const y = face.y + face.height / 2;
        return { x, y };
      }
      
      function getRotation(srcFace, tgtFace) {
        // Calculate the rotation angle between the source and target faces
        // This implementation assumes the faces are rectangles
        const srcAngle = Math.atan2(srcFace.height, srcFace.width);
        const tgtAngle = Math.atan2(tgtFace.height, tgtFace.width);
        return tgtAngle - srcAngle;
      }
      
      function getScale(srcFace, tgtFace) {
        // Calculate the scale factor between the source and target faces
        // This implementation assumes the faces are rectangles
        const srcSize = Math.sqrt(srcFace.width ** 2 + srcFace.height ** 2);
        const tgtSize = Math.sqrt(tgtFace.width ** 2 + tgtFace.height ** 2);
        return tgtSize / srcSize;
      }