import * as THREE from "three";

import "./styles.css";
// scene
const scene = new THREE.Scene();

// create sphere
const geometryShape = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#FFC0CB",
});
const mesh = new THREE.Mesh(geometryShape, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// add light on black screen
const light = new THREE.PointLight(0xffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
// z index to move back camera
camera.position.z = 20;
scene.add(camera);

// render scene
const canvas = document.querySelector(".webgl");
const renderScene = new THREE.WebGLRenderer({ canvas });

renderScene.setSize(sizes.width, sizes.height);
renderScene.render(scene, camera);

window.addEventListener("resize", () => {
  // resize window
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
});
