import { loadBirds } from './components/birds/birds.js';

import { createLights } from './components/lights.js';


import { createControls } from './systems/controls.js';

import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

import { PerspectiveCamera, WebGLRenderer, Color, Scene, Raycaster, Vector2 } from 'three';

let camera;
let controls;
let renderer;
let scene;
let loop;




class World {
  constructor(container) {

    // 设置相机
    camera = new PerspectiveCamera(25, 1.78, 1, 3000);

    // camera.position.set(-100, 50, 160);
    camera.position.set(0, 0, 200);

    //相机看向的坐标
    // camera.lookAt(0, 0, 0)

    // 设置渲染器

    renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearAlpha(0.2);


    // renderer.physicallyCorrectLights = true;

    // 创建场景

    scene = new Scene();

    scene.background = new Color('#142233');


    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);


  }

  async init() {
    const { parrot } = await loadBirds();


    scene.add(parrot);

  }




  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
