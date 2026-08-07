import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.166/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.166/examples/jsm/loaders/GLTFLoader.js";

const robotContainer = document.getElementById("robot-container");

if (robotContainer) {
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  35,
  robotContainer.clientWidth / robotContainer.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1.1, 8);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(robotContainer.clientWidth, robotContainer.clientHeight);
robotContainer.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0x00e5ff, 3.1);
keyLight.position.set(4, 5, 5);
scene.add(keyLight);

const rimLight = new THREE.PointLight(0x7c3aed, 18, 10);
rimLight.position.set(-4, -1, 3);
scene.add(rimLight);

const loader = new GLTFLoader();
const clock = new THREE.Clock();
let robot = null;
let mixer = null;

loader.load(
  "assets/models/robot.glb",
  (gltf) => {
    robot = gltf.scene;
    robot.scale.set(1.8, 1.8, 1.8);
    robot.position.set(0, -1.2, 0);
    robot.rotation.y = Math.PI * 0.25;
    scene.add(robot);

    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(robot);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
    }
  },
  undefined,
  (error) => {
    console.error("Robot model failed to load:", error);
    const fallback = new THREE.Group();

    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 2, 1),
      new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x0f172a })
    );
    torso.position.y = 0.6;
    fallback.add(torso);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.58, 32, 16),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, emissive: 0x0f172a })
    );
    head.position.y = 2.2;
    fallback.add(head);

    const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x67e8f9, emissive: 0x67e8f9 });
    const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.08), eyeMaterial);
    const rightEye = leftEye.clone();
    leftEye.position.set(-0.16, 2.2, 0.52);
    rightEye.position.set(0.16, 2.2, 0.52);
    fallback.add(leftEye, rightEye);

    const armGeometry = new THREE.BoxGeometry(0.28, 1.5, 0.28);
    const armMaterial = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    const rightArm = leftArm.clone();
    leftArm.position.set(-1.15, 0.8, 0);
    rightArm.position.set(1.15, 0.8, 0);
    fallback.add(leftArm, rightArm);

    const legGeometry = new THREE.BoxGeometry(0.32, 1.6, 0.32);
    const leftLeg = new THREE.Mesh(legGeometry, armMaterial);
    const rightLeg = leftLeg.clone();
    leftLeg.position.set(-0.35, -1.1, 0);
    rightLeg.position.set(0.35, -1.1, 0);
    fallback.add(leftLeg, rightLeg);

    fallback.scale.setScalar(0.78);
    fallback.position.y = -0.2;
    fallback.userData.baseY = -0.2;
    scene.add(fallback);
    robot = fallback;
  }
);

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta);
  }

  if (robot) {
    robot.rotation.y += 0.012;
    const baseY = robot.userData.baseY ?? -1.2;
    robot.position.y = Math.sin(clock.elapsedTime * 2) * 0.12 + baseY;
  }

  renderer.render(scene, camera);
}

animate();

const resizeObserver = new ResizeObserver(() => {
  const width = robotContainer.clientWidth;
  const height = robotContainer.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

resizeObserver.observe(robotContainer);
}

// =====================
// Typing Effect
// =====================

const words=[

"Artificial Intelligence Engineer",

"Machine Learning Engineer",

"Python Developer",

"Full Stack Developer"

];

let wordIndex=0;
let letterIndex=0;
let deleting=false;

const typing=document.getElementById("typing");

function type(){

const word=words[wordIndex];

if(!deleting){

typing.textContent=word.substring(0,letterIndex++);

}else{

typing.textContent=word.substring(0,letterIndex--);

}

let speed=100;

if(!deleting && letterIndex===word.length+1){

deleting=true;

speed=1500;

}

if(deleting && letterIndex===0){

deleting=false;

wordIndex++;

if(wordIndex>=words.length){

wordIndex=0;

}

speed=300;

}

setTimeout(type,speed);

}

type();

const headingTargets = document.querySelectorAll(".section-title, .about h2");

headingTargets.forEach((heading) => {
    const robot = document.createElement("span");
    robot.className = "heading-robot";
    robot.setAttribute("aria-hidden", "true");
    robot.innerHTML = '<span class="heading-robot-head"><i></i><i></i></span><span class="heading-robot-body"></span>';
    heading.append(robot);
});

document.addEventListener("pointermove", (event) => {
    headingTargets.forEach((heading) => {
        const robot = heading.querySelector(".heading-robot");
        const bounds = robot.getBoundingClientRect();
        const x = (event.clientX - (bounds.left + bounds.width / 2)) / window.innerWidth;
        const y = (event.clientY - (bounds.top + bounds.height / 2)) / window.innerHeight;
        robot.style.setProperty("--look-x", `${Math.max(-1, Math.min(1, x)) * 28}deg`);
        robot.style.setProperty("--look-y", `${Math.max(-1, Math.min(1, y)) * -28}deg`);
    });
});

// Scroll To Top Button

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    try {
        const response = await fetch("http://localhost:5001/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        alert(result.message);

        contactForm.reset();

    } catch (error) {
        console.error(error);
        alert("Server Error");
    }
});
