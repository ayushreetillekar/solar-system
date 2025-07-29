const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('solarCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 50;

const light = new THREE.PointLight(0xffffff, 2, 500);
light.position.set(0, 0, 0);
scene.add(light);

const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const starsGeometry = new THREE.BufferGeometry();
const starsCount = 10000;
const positions = [];

for (let i = 0; i < starsCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000
  );
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

const planets = [];
const planetData = [
  { name: 'Mercury', color: 0xaaaaaa, distance: 10, size: 0.5, speed: 0.04 },
  { name: 'Venus', color: 0xffddaa, distance: 13, size: 0.9, speed: 0.015 },
  { name: 'Earth', color: 0x3399ff, distance: 16, size: 1, speed: 0.01 },
  { name: 'Mars', color: 0xff6633, distance: 19, size: 0.8, speed: 0.008 },
  { name: 'Jupiter', color: 0xffcc99, distance: 23, size: 2, speed: 0.005 },
  { name: 'Saturn', color: 0xffff99, distance: 28, size: 1.8, speed: 0.003 },
  { name: 'Uranus', color: 0x66ffff, distance: 32, size: 1.5, speed: 0.002 },
  { name: 'Neptune', color: 0x3366ff, distance: 36, size: 1.3, speed: 0.001 },
];

planetData.forEach(data => {
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: data.color });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  planets.push({ ...data, mesh, angle: Math.random() * Math.PI * 2 });
});

const controlPanel = document.getElementById('control-panel');
planetData.forEach((planet, i) => {
  const label = document.createElement('label');
  label.innerText = `${planet.name} Speed: `;
  const input = document.createElement('input');
  input.type = 'range';
  input.min = '0.001';
  input.max = '0.05';
  input.step = '0.001';
  input.value = planet.speed;
  input.addEventListener('input', (e) => {
    planets[i].speed = parseFloat(e.target.value);
  });
  controlPanel.appendChild(label);
  controlPanel.appendChild(input);
  controlPanel.appendChild(document.createElement('br'));
});

function animate() {
  requestAnimationFrame(animate);

  planets.forEach(planet => {
    planet.angle += planet.speed;
    planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
    planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
  });

  renderer.render(scene, camera);
}
animate();