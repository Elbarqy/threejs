import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper(30);
scene.add(axesHelper, gridHelper);

camera.position.set(0, 4, 15);
orbit.update();

// light
// const ambientLight = new THREE.AmbientLight(0x3333);
// const directionalLight = new THREE.DirectionalLight(0xfffffff, 0.8);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// const dlightShadowHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );
// directionalLight.shadow.camera.top = 10
// const directionalHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(
//   ambientLight,
//   directionalLight,
//   directionalHelper,
//   dlightShadowHelper
// );

const spotlight = new THREE.SpotLight(0xfffffff);
const spotlightHelper = new THREE.SpotLightHelper(spotlight);
spotlight.position.set(0, 10, 0);
spotlight.castShadow = true;
scene.add(spotlight, spotlightHelper);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff5015dc });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 2, 0);
scene.add(box);

const sphereGeometry = new THREE.SphereGeometry();
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xff305,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.name = "mySPh";
sphere.position.set(1, 5, 4);
sphere.castShadow = true;
scene.add(sphere);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: "0xFFF",
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
scene.add(plane);
const gui = new dat.GUI();
const options = {
  sphereColor: "#5015dc",
};
gui.addColor(options, "sphereColor").onChange((e) => {
  sphere.material.color.set(e);
});

const mousePosition = new THREE.Vector2();
window.addEventListener("mousemove", function (e) {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();
function animate(time) {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; ++i) {
    console.log(intersects[i].object.name);
    if (intersects[i].object.name === "mySPh") {
      intersects[i].object.material.color.set(0xff00000);
    }
  }
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

renderer.render(scene, camera);
