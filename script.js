import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.166/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.166/examples/jsm/loaders/GLTFLoader.js";

// =====================
// Scene
// =====================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0, 1.5, 5);

// =====================
// Renderer
// =====================

const renderer = new THREE.WebGLRenderer({
antialias: true,
alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document
.getElementById("robot-container")
.appendChild(renderer.domElement);

// =====================
// Lights
// =====================

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0x00e5ff, 5);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// =====================
// Loader
// =====================

const loader = new GLTFLoader();

let mixer;
const clock = new THREE.Clock();

loader.load(

"assets/models/robot.glb",

(gltf) => {

const robot = gltf.scene;

robot.scale.set(1.8,1.8,1.8);

robot.position.set(0,-1,0);

scene.add(robot);

if(gltf.animations.length>0){

mixer = new THREE.AnimationMixer(robot);

const action = mixer.clipAction(gltf.animations[0]);

action.play();

}

},

undefined,

(error)=>{

console.log("Robot Error:",error);

}

);

// =====================
// Animation
// =====================

function animate(){

requestAnimationFrame(animate);

const delta = clock.getDelta();

if(mixer){

mixer.update(delta);

}

renderer.render(scene,camera);

}

animate();

// =====================
// Resize
// =====================

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

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
