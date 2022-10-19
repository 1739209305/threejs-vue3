<template>
  <div class="car_exhibition" ref="car_exhibition"></div>
  <div class="car_text">
    <h3>Sports car exhibition</h3>
    <span class="colorPicker"
      >Body: &nbsp;&nbsp;<input id="body-color" type="color" value="#d57a8a"
    /></span>
  </div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { ref, onMounted, Ref } from 'vue'
import { Object3D } from 'three'

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  dracoLoader,
  loader
let wheels: any[] = []
// 获取dom
const car_exhibition: Ref = ref(null)

// 材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: '#d57a8a',
  metalness: 1.0,
  roughness: 0.8,
  clearcoat: 0.8,
  clearcoatRoughness: 0.03,
  sheen: 0.5
})
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.25,
  roughness: 0,
  transmission: 1.0
})
const yellowTrimMaterial = new THREE.MeshPhysicalMaterial({
  color: 'pink',
  metalness: 1.0,
  roughness: 0.8,
  clearcoat: 0.8,
  clearcoatRoughness: 0.03,
  sheen: 0.5
})

const init = () => {
  // 初始化场景
  scene = new THREE.Scene()
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    car_exhibition.value.clientWidth / car_exhibition.value.clientHeight,
    0.1,
    1000
  )
  // 设置相机位置
  camera.position.set(-3, 1.5, -3.5)
  camera.updateProjectionMatrix()
  // 添加相机到场景中
  scene.add(camera)

  dracoLoader = new DRACOLoader()
  loader = new GLTFLoader()
  // 文件从官网上找到的draco/gltf/
  dracoLoader.setDecoderPath('./draco/gltf/')
  loader.setDRACOLoader(dracoLoader)
  loader.load('./glb/car.glb', function (gltf) {
    const carModel: Object3D = gltf.scene.children[0]

    ;(carModel.getObjectByName('body') as any).material = bodyMaterial
    ;(carModel.getObjectByName('trim') as any).material = bodyMaterial
    ;(carModel.getObjectByName('glass') as any).material = glassMaterial
    ;(carModel.getObjectByName('yellow_trim') as any).material =
      yellowTrimMaterial

    wheels.push(
      carModel.getObjectByName('wheel_fl'),
      carModel.getObjectByName('wheel_fr'),
      carModel.getObjectByName('wheel_rl'),
      carModel.getObjectByName('wheel_rr')
    )
    scene.add(carModel)
  })

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(
    car_exhibition.value.clientWidth,
    car_exhibition.value.clientHeight
  )

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.update()

  renderer.setClearColor('#000')
  scene.background = new THREE.Color('#ccc')

  // 添加网格地面
  const gridHelper: THREE.LineSegments = new THREE.GridHelper(20, 50)

  if (!Array.isArray(gridHelper.material)) {
    // 设置透明度
    gridHelper.material.opacity = 0.3
    gridHelper.material.transparent = true
  }
  // 设置透明度
  scene.add(gridHelper)

  // // 添加灯光
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight1.position.set(0, 10, 0)
  scene.add(directionalLight1)
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(-10, 0, 0)
  scene.add(directionalLight2)
  const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(0, 0, -10)
  scene.add(directionalLight3)
  const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(0, 5, 10)
  scene.add(directionalLight4)
  const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(5, 0, 10)
  scene.add(directionalLight5)
  const directionalLight6 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(10, 0, 5)
  scene.add(directionalLight6)
}

// 渲染函数
const render = () => {
  controls && controls.update()
  renderer.render(scene, camera)

  // 让车轮转动起来
  const time = -performance.now() / 1000
  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.x = time * Math.PI * 2
  }
  requestAnimationFrame(render)
}

onMounted(() => {
  init()
  car_exhibition.value.appendChild(renderer.domElement)
  render()

  window.addEventListener('resize', () => {
    camera.aspect =
      car_exhibition.value.clientWidth / car_exhibition.value.clientHeight
    camera.updateProjectionMatrix()

    renderer.setSize(
      car_exhibition.value.clientWidth,
      car_exhibition.value.clientHeight
    )
    renderer.setPixelRatio(window.devicePixelRatio)
  })

  // 添加颜色变化监听
  const bodyColorInput: HTMLElement | null =
    document.getElementById('body-color')
  if (bodyColorInput) {
    bodyColorInput.addEventListener('input', function () {
      bodyMaterial.color.set((this as any).value)
    })
  }
})
</script>

<style scoped>
.car_exhibition {
  width: 100%;
  height: 100%;
}
.car_text {
  position: absolute;
  top: 2rem;
  left: 5%;
}

.car_text h3 {
  margin-bottom: 2rem;
}
</style>
