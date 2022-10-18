<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap'
import datGui from 'dat.gui'
// 1. 创建场景
const scene = new THREE.Scene()
// 2. 创建相机
const camere = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
// 3. 改变相机的位置
camere.position.set(0, 0, 10)
// 4. 添加相机到场景中
scene.add(camere)
// 5. 添加物体（点、线、面），材质
const geometry = new THREE.BoxGeometry(5, 5, 5)
// 纹理
const textureLoader = new THREE.TextureLoader()
// vue写法
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoTextureLoader = textureLoader.load(require('./assets/logo.png'))
// 纹理的偏移、旋转和重复
// logoTextureLoader.offset.x = 0.2;
// logoTextureLoader.offset.y = 0.2;
// logoTextureLoader.rotation = Math.PI / 4;
// logoTextureLoader.repeat.set(2, 3);
// 纹理贴图显示算法
// 可以让贴图知道怎么计算这个纹理
// 一个纹素大于一个像素， 近看
logoTextureLoader.magFilter = THREE.NearstFilter // 默认值为THREE.LinearFilter
const material = new THREE.MeshBasicMaterial({
  map: logoTextureLoader
}) // 不透光材质
// 6. 创建物体
const cube = new THREE.Mesh(geometry, material)

// 7. 添加物体到场景中
scene.add(cube)

// 添加坐标辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// gsap
// const animation = gsap.to(cube.position, {
//   x: 2,
//   duration: 5,
//   ease: "elastic",
// });

// dat.gui
const gui = new datGui.GUI()
// 修改位置
gui
  .add(cube.position, 'x')
  .min(0)
  .max(10)
  .step(0.01)
  .name('位置')
  .onChange((val) => {
    console.log('值被修改', val)
  })
  .onFinishChange((val) => {
    console.log('完全被修改', val)
  })
// 旋转
gui
  .add(cube.rotation, 'x')
  .min(0)
  .max(89)
  .step(0.01)
  .name('旋转')
  .onChange((val) => {
    console.log('值被修改', val)
  })
// 缩放
gui
  .add(cube.scale, 'x')
  .min(0)
  .max(89)
  .step(0.01)
  .name('缩放')
  .onChange((val) => {
    console.log('值被修改', val)
  })
// 8. 初始化渲染器
const renderer = new THREE.WebGLRenderer()
// 9. 设置渲染器的大小
renderer.setSize(window.innerWidth, window.innerHeight)

const render = () => {
  // 11. 使用渲染器将相机场景渲染出来
  renderer.render(scene, camere)
  requestAnimationFrame(render)
}

const container = ref(null)
onMounted(() => {
  // 初始化轨道控制器
  const controlls = new OrbitControls(camere, renderer.domElement)
  controlls.enableDamping = true
  // 10. 将webgl渲染的canvas内容添加到dom节点中
  container.value.append(renderer.domElement)
  render()

  // 控制物体移动
  // setTimeout(() => {
  //   cube.position.set(10, 10, 10)
  // }, 2000);
  // setInterval(() => {
  //   cube.position.x += 0.1;
  // }, 1000);

  // 物体的缩放与旋转
  // setInterval(() => {
  //   // cube.scale.set(3, 1, 1);
  //   cube.scale.x += 0.1;
  //   cube.rotation.set(Math.PI / 3, 20, 10);
  // }, 1000);

  // 监听画面的变化，更新渲染
  window.addEventListener('resize', () => {
    // 首先更新摄像头
    camere.aspect = window.innerWidth / window.innerHeight
    camere.updateProjectionMatrix()

    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
  })

  // 双击进入全屏
  window.addEventListener('dblclick', () => {
    const fullScreenElement = document.fullscreenElement
    if (!fullScreenElement) {
      renderer.domElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  })
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
}
</style>
