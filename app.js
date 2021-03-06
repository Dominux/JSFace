async function main() {
  // Load the MediaPipe facemesh model.
  const model = await facemesh.load()

  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain an
  // array of detected faces from the MediaPipe graph.

  const predictions = await model.estimateFaces(video)

  if (predictions.length > 0) {
    /*
    `predictions` is an array of objects describing each detected face, for example:

    [
      {
        faceInViewConfidence: 1, // The probability of a face being present.
        boundingBox: { // The bounding box surrounding the face.
          topLeft: [232.28, 145.26],
          bottomRight: [449.75, 308.36],
        },
        mesh: [ // The 3D coordinates of each facial landmark.
          [92.07, 119.49, -17.54],
          [91.97, 102.52, -30.54],
          ...
        ],
        scaledMesh: [ // The 3D coordinates of each facial landmark, normalized.
          [322.32, 297.58, -17.54],
          [322.18, 263.95, -30.54]
        ],
        annotations: { // Semantic groupings of the `scaledMesh` coordinates.
          silhouette: [
            [326.19, 124.72, -3.82],
            [351.06, 126.30, -3.00],
            ...
          ],
          ...
        }
      }
    ]
    */

    return createScene(predictions[0].mesh)
  }
}

const constraints = { video: { width: 1280, height: 720 } }
navigator.mediaDevices.getUserMedia(constraints)
  .then(function (mediaStream) {
    const video = document.querySelector('video')
    video.srcObject = mediaStream
    video.onloadeddata = async () => {
      video.play()

      scene = await main()

      // run the render loop
      engine.runRenderLoop(function () {
        scene.render();
      });

      // the canvas/window resize event handler
      window.addEventListener('resize', function () {
        engine.resize();
      })
    }
  })
