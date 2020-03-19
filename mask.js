// get the canvas DOM element
var canvas = document.getElementById('canvas');

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true);

var createScene = function (meshPoints) {
  var scene = new BABYLON.Scene(engine);

  var light = new BABYLON.DirectionalLight("hemi", new BABYLON.Vector3(0, 0, 1), scene);

  var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.setPosition(new BABYLON.Vector3(0, 5, -30));
  camera.attachControl(canvas, true);

  //Create a custom mesh  
  var customMesh = new BABYLON.Mesh("custom", scene);

  //Set arrays for positions and indices
  meshPoints.forEach(vertex => {
    let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {}, scene)
    sphere.setAbsolutePosition(new BABYLON.Vector3(vertex[0], vertex[1], vertex[2]))
  });

  return scene;
};

