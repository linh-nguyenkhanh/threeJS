import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
light.intensity = 1.25;
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
renderScene.setPixelRatio(2);
renderScene.render(scene, camera);

//controls movement of sphere
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;

window.addEventListener("resize", () => {
  // resize window
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderScene.setSize(sizes.width, sizes.height);
});

const loop = () => {
  controls.update();
  // mesh.position.x += 0.1;
  renderScene.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

// timeline magic
const timeline = gsap.timeline({
  defaults: { duration: 1 },
});
timeline.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
timeline.fromTo("nav", { y: "-100%" }, { x: "0%" });
timeline.fromTo(".title", { opacity: 0 }, { opacity: 1 });

// mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => {
  mouseDown = true;
});

window.addEventListener("mouseup", () => {
  mouseDown = false;
});

window.addEventListener("mousemove", (event) => {
  if (mouseDown) {
    rgb = [
      Math.round((event.pageX / sizes.width) * 255),
      Math.round((event.pageY / sizes.height) * 255),
      150,
    ];
    // animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
