import * as THREE from "three";

// scene
const scene = new THREE.Scene();

// create sphere
const geometryShape = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});
const mesh = new THREE.Mesh(geometryShape, material);
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(45, 800, 600);
scene.add(camera);
