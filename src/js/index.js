// Testing local imports
// import {helloWorld} from './hello.js';
// helloWorld();

import * as THREE from 'three';
import { AmbientLight, DirectionalLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class App {
  constructor(){
    const container = document.createElement('div');
    document.body.appendChild(container);

    // Set camera & scene
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0,0,4);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    this.directional = new DirectionalLight('white',2);
    this.directional.position.set(0,1,1);
    this.scene.add(this.directional);

    container.appendChild(this.renderer.domElement);

    // this.renderer.setAnimationLoop( this.render.bind(this));
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
      this.cube.rotation.y += 0.01;
    });

    window.addEventListener('resize', this.resize.bind(this), false);
  }
  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
  render () {
    this.renderer.render(this.scene, this.camera);
  }
}

export { App }