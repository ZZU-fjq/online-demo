import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

import { Box3, AnimationMixer } from 'three';

async function loadBirds() {
  const loader = new GLTFLoader();

  const [parrotData] = await Promise.all([
    loader.loadAsync('./assets/yutian.glb'),

  ]);

  // console.log('Squaaawk!', parrotData);

  const { model } = setupModel(parrotData);
  const parrot = model;

  // console.log('Squaaawk!', parrot);


  let box = new Box3().setFromObject(parrot);
  let mdlen = box.max.x - box.min.x; // 模型长度
  let mdwid = box.max.z - box.min.z; // 模型宽度
  let mdhei = box.max.y - box.min.y; // 模型高度
  let x1 = box.min.x + mdlen / 2; // 模型中心点坐标X
  let y1 = box.min.y + mdhei / 2; // 模型中心点坐标Y
  let z1 = box.min.z + mdwid / 2; // 模型中心点坐标Z

  parrot.position.set(-x1, -y1, -z1); // 将模型进行偏移




  return {
    parrot
  };

}

export { loadBirds };
