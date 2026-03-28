import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// FECHA DE APERTURA (Cambia según necesites)
const FECHA_OBJETIVO = new Date("March 28, 2026 16:00:00").getTime(); 
let isUnlocked = false;

const recuerdos = [
    { fecha: "24 MARZO 2024", recuerdo: "EL BIG BANG.\nAquí empezó todo. Cuando despues de unos días hablando y retomando lo que dejemos un año atras, sin creerme que me responderias a ese mensaje vi que si lo hiciste. Pensaba que me ibas a ignorar y ya porque lo pasaste mal y pensaba que no querias saber más nada de mi. Unos días despues nos vimos por la mañana cuando tu viniste con Leire a mi calle y yo estaba muerto de vergüenza porque no sabia que iba a pasar pero al final estuvimos ahí los dos. Otros días despues hubo una huelga en el instituto y decidimos quedar, tu con tu grupito estabais paseando por Níjar y yo estaba con mi primo Adrian y decidimos pasar con el quad para ver donde estabais y bueno ya sabes (para hacerme el chulo, incluso adrian me dijo que si queria conducirlo jeje) y hablando dijimos que si iba nos besabamos y fui con Adrian y nos dimos nuestro primer beso despues de 1 año entero sin hablar y sin saber el uno del otro, en ese momento pense bua como hechaba de menos esos labios ejje. Creo que un día despues o dos días despues por la noche a las 00:15 te pedí salir y me dijiste que te lo ibas a pensar y al final me dijiste que si y así empezo esta bonita historia.", pos: [0, 0, 0], tipo: "sol" },
    { fecha: "1 JULIO 2024", recuerdo: "Buenooooo, nuestro primer verano juntos, aqui hay mucho que hablar por las inseguridades que tenia... Cada día nos enfadabamos por cualquier tonteria que se me pasaba por la cabeza que creia que podia pasar pero no pasaba porque mi niña es fiel jiji. Yo lo pasaba muy mal por el tema de la fiesta pero en el fondo sabia que no iba a pasar nada pero eso daba lugar a peleas. Te doy las gracias por aguantarme en esa etapa que era insoportable y eso demuestra que aunque haya problemas se pueden solucionar. Y bueno no me acuerdo de más cositas jejejejjejejej.", pos: [-75, 30, 45], tipo: "normal" },
    { fecha: "16 JULIO 2024", recuerdo: "Mi primer cumpleaños contigo mi amor!! Aqui fue mi primer cumpleaños con la mujer de mi vida, el cual yo nunca habia tenido y me acuerdo que me dijiste que de ahora en adelante tus cumpleaños iban a ser los mejores porque yo ya no los celebraba. Hasta que llegaste tu y buaaa. Ese cumpleaños me senti amado me senti apasionado y me senti hot por cositas que pasaron ;D pero bueno eso no es lo importante, lo importatnte que ese día me hiciste la persona más feliz del mundo solamente estando conmigo en el día de mi cumpleaños mi amor.", pos: [85, -20, 35], tipo: "normal" },
    { fecha: "15 SEPTIEMBRE 2024", recuerdo: "En esta fecha ya llevavamos 6 meses, y me acuerdo de este día porque fue el día en el que empezaste el Bachiller. Me acuerdo de esos días previos estabas tan inquieta porque no sabias si te iba a tocar con tus amigas o no y yo lo veia como una tonteria porque no te entendia y tuvimos una pelea. Pero bueno eso de la pelea va a parte. Me acuerdo de la emoción que tenias por empezar que 2 meses antes de empezar querias hacer ya un haul o como se llame y querias comprar cosas para el insti y todo jeje. Me acuerdo de esa emoción que tenia mi niña que creo que ahora ya no tienes jeje. Tambien me acuerdo que ese fue el primer día en el que nos dejaron dormir juntos y estabamos los dos con mazo de ganas de dormir juntos y hasta día de hoy mira jajaja, todas las semanas dormirmos juntitos :D", pos: [-40, -65, 75], tipo: "normal" },
    { fecha: "9 OCTUBRE 2024", recuerdo: "Como olvidar ese cumpleañitos de mi bibi! Cuando mi bibi hizo 16 añitos. Me acuerdo del la sorpresita que te hice aqui que sino mal no recuerdo fue un jueguecito para que fueras encontrando cosas y demas. Me acuerdo de tu cara de felicidad, de como lo celebramos con mis padres, de la tartita que te compremos y te veia y veia felicidad en tus ojos mi amor. Cuanto más feliz te veia más ganas tenia de hacerte aun más feliz :D", pos: [65, 75, -30], tipo: "normal" },
    { fecha: "31 DICIEMBRE 2024", recuerdo: "Jodeeeer, como no recordar el 31 de diciembre con esas risas que salieron con las uvas jajajaja. Me acuerdo de ese día por eso, por las risas que nos hechemos al comernos las uvas del momento en el que mi hermano empezo a reir y luego le siguio mi padre jajajaj lo recuerdo y me da por reir porque fue un momento inolvidable y quería meterlo aqui porque fue nuestra primera noche vieja juntos y va a ser una de muchas que vamos a tener mi amor. ❤️", pos: [-100, -15, -55], tipo: "normal" },
    { fecha: "15 ENERO 2025", recuerdo: "Bueno, este recuerdo me gusta recordarlo pero no tanto. El recuerdo de tu viaje a York el cual lo pase muy mal porque no estabas aqui a 15 mins de mi casa y me daba miedo lo que pudieras hacer porque era un desconfiado de mierda pero bueno, ya no soy asi jeje. Me acuerdo de esas llamadas cuando llegabais a casa que queria que llegaran y no porque yo estaba fatal y no queria que me vieras así pero al final te decia que si porque queria estar con mi bibi. Tambien recuerdo de las cositas que nos tragiste, de la tacita que me trajiste de alli, de la moneda del liverpool que le diste a mi hermano y el iman que le diste a mi madre de liverpool tambien bibi.", pos: [35, 90, 55], tipo: "normal" },
    { fecha: "14 FEBRERO 2025", recuerdo: "Nuestra primer San Valentin, me acuerdo que yo no sabia que regalarte y le pedi ayuda a mi madre porque ya sabes, soy hombre y los hombres no tenemos ni media neurona para esto. Y me acuerdo que empece a mirar cosas como un loco pero no me convencia nada y se los pasaba a mi madre y me decia lo mismo. Hasta que mi madre me dijo mira esto que esta haciendo una amiga suya y si te gusta se lo compramos y dije fua esta muy bien y así surgio el ramo de flores rosas con el peluchito que tienes encima de tu armario.", pos: [110, -55, -45], tipo: "normal" },
    { fecha: "24 MARZO 2025", recuerdo: "Nuestro primer aniversario! Aqui fue el día en el que hicimos 1 añito, el día en el que no me podia creer que llevava 1 año con la mujer perfecta. Ese día quise hacerlo especial como siempre regalandote algo que tambien le pedí ayuda a mi madre porque sigo siendo hombre jajajaj y no lo pongo como escusa pero no se me ocurren cosas jeje. Bueno, ese día fue uno de los más felices porque hice 1 añito con la mujer de mi vida. ❤️", pos: [-35, 45, -110], tipo: "aniversario" },
    { fecha: "23 JUNIO 2025", recuerdo: "Aquí empezo nuestro verano para los dos! Despues de mi graduación claro que es un momento que meto aqui porque ya eran vacaciones y jeje ibas muy guapa :D. Desde ese día empezaron nuestras vacaciones de verano las cuales tuvieron altos y bajos como todos, empece a salir un poquito aunque me cosatara de fiesta contigo pero al final me he dado cuenta de que si mi bibi quiere salir pues porque no bibi y bueno no me acuerdo de mas jeje", pos: [125, 30, -70], tipo: "normal" },
    { fecha: "16 JULIO 2025", recuerdo: "Como no recordar este momentazo! En el que me sacaron de mi casa por la mañana y porque teniamos que ver una cosa de mi coche y demas y aprovechasteis cabrones ajajja y como me la clavaste doblada con lo del que habia habido un accidente viniendo de campo a níjar cuando te venias con el autobus. Me acuerdo de cuando llegue a mi casa que subi a mi cuarto y ahí estabas tu con tu vestidito azul tan preciosa como siempre y con esa cacho de sorpresa que me diste. No olvidar tampoco del movil grabando en mi escritorio jeejej. Tambien los globitos puestos en el techo que luego al quitarlos nos llevamos medio techo jajaaa.", pos: [-20, -100, -45], tipo: "normal" },
    { fecha: "31 DICIEMBRE 2025", recuerdo: "Bueno, me acuerdo de este día como un día bueno y malo a la vez por mi parte. Me acuerdo de la cena y todo y cuando nos comimos las uvas nos fuimos a tu casa con tu hermano para que no estuviera solo. Estuvimos alli un rato y luego nos vinimos para Níjar con la casualidad de que no tenia llaves para entra y nos quedabamos en la calle porque no respondia nadie cuando tocaba la puerta. Me acuerdo que llamaba a mi madre y no me lo cogia y digo fua dormimos en la calle y en eso pense en llamar a mi prima y ella si me lo cogio. Entonces fuimos al bluemoon que no me gusta nada y no queria ir porque por huevos me iba a tocar quedarme y así fue y encima pues surgio el problema que surgio. A día de hoy me sigo sintiendo mal por como me puse contigo pero creo que he mejorado y no volvera a pasar esa situación :D", pos: [55, -35, 120], tipo: "normal" },
    { fecha: "14 FEBRERO 2026", recuerdo: "Bueno, esto fue hace una mes, pero lo recuerdo como si fuera ayer por ser nuestro segundo San Valentin!! Este san valentin fue más chill porque no teniamos dinero igual que este año en nuestro aniversario que estamos sin dinero jajajaja. Pero no pasa nada mi amor, yo trate de hacerte una cosa como estas para expresarte lo que siento. Este es el segundo de muchos San Valentines que vamos a tener porque yo contigo quiero mi vida entera mi amor. ❤️", pos: [-120, 70, 35], tipo: "normal" },
    { fecha: "24 MARZO 2026", recuerdo: "Por ultimo, tenemos nuestro segundo aniversario de 2 años de relación mi amor. Este apartado es diferente que los demas porque los demas son recuerdos que he querido recordar contigo porque son especiales para mi y queria revivirlos. Con este día quiero recordarte que eres el amor de mi vida, con la que quiero pasar 2 y 100 años porque contigo todo es especial. Estos días se que has estado estresada porque bueno el bachiller y todo eso pero mira como has sacado tiempo para hacerme unos detallitos y eso es muy significativo para mi porque se nota el cariño y el aprecio que me tienes mi amor. Cuando pienso que literalmente llevamos dos años no me lo creo, porque parece que fue ayer cuando volvimos a empezar a hablar con ese texto que me ayudo juanita a escribir porque yo no sabia como escribirte y no tenia cojones a escribirte. Quiero decirte que estar contigo es como estar en las nubes, con nadie he sido así de cariñoso nada más que con una persona que ya no esta, pero creo que te mereces sentir el cariño que yo le hacia sentir a ella porque eres especial y me haces muy feliz mi amor. Hoy ya no es 24 de Marzo el día en el que escribo esto porque no sabia como hacerlo pero aun así espero que te guste y siento el no poder comprarte aunque sea unas flores porque no tengo ni un solo euro mi amor. Que sepas que te quiero más que a mi vida y estoy pra lo que sea mi amor. Espero seguir creciendo a tu lado y con tu cariño mi amor. Felices 2 años bibi ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️", pos: [20, -20, -150], tipo: "aniversario" }
];

let scene, camera, renderer, labelRenderer, controls, sistemaSolar;

init3D();
animate();

// Lógica del Temporizador
const timer = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = FECHA_OBJETIVO - ahora;
    if (distancia < 0) {
        clearInterval(timer);
        if(!isUnlocked) unlockGalaxy();
    } else {
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segs = Math.floor((distancia % (1000 * 60)) / 1000);
        document.getElementById("countdown").innerHTML = `${horas.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${segs.toString().padStart(2,'0')}`;
    }
}, 1000);

function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.getElementById('labels-container').appendChild(labelRenderer.domElement);

    sistemaSolar = new THREE.Group();
    scene.add(sistemaSolar);

    crearEstrellas();
    crearRecuerdo(recuerdos[0]); // Crea el Sol fijo

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = false;
}

function crearRecuerdo(data) {
    const wrap = document.createElement('div');
    wrap.className = `heart-wrapper ${data.tipo === 'sol' ? 'sun-heart' : data.tipo === 'aniversario' ? 'anniversary-heart' : 'normal-heart'}`;
    wrap.style.pointerEvents = 'auto';
    
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

    // El 2024 (Sol) se añade a la escena para que NO rote.
    if (data.tipo === "sol") scene.add(obj);
    else sistemaSolar.add(obj);
}

function unlockGalaxy() {
    isUnlocked = true;
    document.getElementById("lock-screen").classList.add("unlocked");
    recuerdos.slice(1).forEach((data, i) => {
        setTimeout(() => crearRecuerdo(data), i * 180);
    });
}

function abrirModal(data) {
    document.getElementById('modal-date').textContent = data.fecha;
    // innerText respeta los saltos de línea \n
    document.getElementById('modal-text').innerText = data.recuerdo; 
    document.getElementById('memory-modal').classList.remove('hidden');
    // Reiniciar el scroll del modal al abrir uno nuevo
    document.querySelector('.scroll-area').scrollTop = 0;
}

function crearEstrellas() {
    const geo = new THREE.BufferGeometry();
    const pos = [];
    for(let i=0; i<18000; i++) pos.push((Math.random()-0.5)*1800, (Math.random()-0.5)*1800, (Math.random()-0.5)*1800);
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    scene.add(new THREE.Points(geo, new THREE.PointsMaterial({color: 0xffffff, size: 0.65})));
}

function animate() {
    requestAnimationFrame(animate);
    if(isUnlocked) sistemaSolar.rotation.y += 0.0012; // Velocidad de órbita suave
    controls.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

document.querySelector('.close-button').onclick = () => document.getElementById('memory-modal').classList.add('hidden');

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
});