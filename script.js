import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// --- FECHA DE APERTURA REAL ---
const FECHA_OBJETIVO = new Date("March 28, 2026 16:00:00").getTime(); 
let isUnlocked = false;

const recuerdos = [
    { fecha: "24 MARZO 2024", recuerdo: "EL INICIO DE TODO.\nDonde nuestra galaxia nació.\nGracias por ser parte de mi vida.", pos: [0, 0, 0], especial: true },
    { fecha: "15 ABRIL 2024", recuerdo: "Nuestra primera cita inolvidable.", pos: [-45, 30, -10] },
    { fecha: "10 JUNIO 2024", recuerdo: "Ese viaje que lo cambió todo.", pos: [40, -25, 20] },
    { fecha: "24 DICIEMBRE 2024", recuerdo: "Primera Navidad juntos.", pos: [-30, -30, -40] },
    { fecha: "14 FEBRERO 2025", recuerdo: "San Valentín.", pos: [35, 35, -15] }
];

let scene, camera, renderer, labelRenderer, controls;

init3D();
animate();

const timer = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = FECHA_OBJETIVO - ahora;

    if (distancia < 0) {
        clearInterval(timer);
        unlockGalaxy();
    } else {
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segs = Math.floor((distancia % (1000 * 60)) / 1000);
        
        // Si queda más de un día, mostramos días. Si no, formato HH:MM:SS
        if (dias > 0) {
            document.getElementById("countdown").innerHTML = `${dias}d ${horas}h ${mins}m`;
        } else {
            document.getElementById("countdown").innerHTML = 
                `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
        }
    }
}, 1000);

function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 120;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    document.getElementById('labels-container').appendChild(labelRenderer.domElement);

    crearEstrellas();
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(6, 32, 32), new THREE.MeshBasicMaterial({ color: 0x000000 })));

    crearCorazonEspecial();

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    window.addEventListener('resize', onWindowResize);
}

function crearCorazonEspecial() {
    const data = recuerdos[0];
    const wrap = document.createElement('div');
    wrap.className = 'heart-wrapper special-heart';
    
    const heart = document.createElement('div');
    heart.className = 'heart-shape';
    
    const label = document.createElement('div');
    label.className = 'label-date';
    label.textContent = data.fecha;

    wrap.appendChild(heart);
    wrap.appendChild(label);

    wrap.onclick = () => {
        if (isUnlocked) abrirModal(data);
    };

    const obj = new CSS2DObject(wrap);
    obj.position.set(data.pos[0], data.pos[1], data.pos[2]);
    scene.add(obj);
}

function unlockGalaxy() {
    isUnlocked = true;
    document.getElementById("lock-screen").classList.add("unlocked");
    
    recuerdos.slice(1).forEach((data, index) => {
        setTimeout(() => {
            const wrap = document.createElement('div');
            wrap.className = 'heart-wrapper';
            const heart = document.createElement('div');
            heart.className = 'heart-shape';
            const label = document.createElement('div');
            label.className = 'label-date';
            label.textContent = data.fecha;
            wrap.appendChild(heart);
            wrap.appendChild(label);
            
            wrap.onclick = () => abrirModal(data);

            const obj = new CSS2DObject(wrap);
            obj.position.set(data.pos[0], data.pos[1], data.pos[2]);
            scene.add(obj);
        }, index * 200); 
    });
}

function abrirModal(data) {
    document.getElementById('modal-date').textContent = data.fecha;
    document.getElementById('modal-text').textContent = data.recuerdo;
    document.getElementById('memory-modal').classList.remove('hidden');
}

function crearEstrellas() {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    for(let i=0; i<15000; i++) pos.push((Math.random()-0.5)*1000, (Math.random()-0.5)*1000, (Math.random()-0.5)*1000);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({color: 0xffffff, size: 0.5})));
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

document.querySelector('.close-button').onclick = () => document.getElementById('memory-modal').classList.add('hidden');