import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const generateSceneAndCamera = () => {
  const renderer = new THREE.WebGL1Renderer();
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const orbit = new OrbitControls(camera, renderer.domElement);

  camera.position.set(-90, 140, 140);
  orbit.update();

  return {
    renderer,
    camera,
    scene,
  };
};

const generateLighting = () => {
  const lights = [];
  const ambientLight = new THREE.AmbientLight(0x333333);
  return [ambientLight];
};
const { renderer, camera, scene } = generateSceneAndCamera();
scene.add(...generateLighting());

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  color: 0xff354ee,
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const generatePlanet = (rad) => {
  const planetGeo = new THREE.SphereGeometry(rad, 30, 30);
  const planetMat = new THREE.MeshBasicMaterial({
    color: 0xff3250,
  });
  return new THREE.Mesh(planetGeo, planetMat);
};
const myPlanets = [];
Array(30)
  .fill(0)
  .map((i) => {
    const generatedPlanet = generatePlanet(Math.random() * 10);
    generatedPlanet.position.set(
      Math.random() * 50 + 20,
      0,
      Math.random() * 50
    );
    myPlanets.push(generatedPlanet);
  });
scene.add(...myPlanets);
function animate() {
  sun.rotateY(0.004);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

function canvasSetup() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
canvasSetup();
window.addEventListener("resize", canvasSetup);
