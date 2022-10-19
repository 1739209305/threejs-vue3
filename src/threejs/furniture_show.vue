<template>
  <div class="furniture_show" ref="furniture_show"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { ref, onMounted, Ref } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
// import dat from 'dat.gui'

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls
// gui = new dat.GUI()
const furniture_show: Ref = ref(null)

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    45,
    furniture_show.value.clientWidth / furniture_show.value.clientHeight,
    0.1,
    100000
  )
  camera.position.set(-0.75, 0.7, 1)
  camera.updateProjectionMatrix()
  scene.add(camera)

  const gltfLoader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('./draco/gltf/')
  gltfLoader.setDRACOLoader(dracoLoader)
  gltfLoader.setPath('./gltf/')
  gltfLoader.load('ArmChair_01_4k.gltf', function (gltf) {
    const model = gltf.scene.children[0]
    model.scale.x = 0.7
    model.scale.y = 0.7
    model.scale.z = 0.7

    model.position.y = -0.3
    scene.add(model)

    // gui.open()
    render()
  })

  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(
    furniture_show.value.clientWidth,
    furniture_show.value.clientHeight
  )
  renderer.setPixelRatio(window.devicePixelRatio)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  // ---------------------------------------------------------------------
  const environment = new RoomEnvironment()
  const pmremGenerator = new THREE.PMREMGenerator(renderer)

  scene.background = new THREE.Color('#2d2d2d')
  scene.environment = pmremGenerator.fromScene(environment).texture
  // ---------------------------------------------------------------------

  furniture_show.value.appendChild(renderer.domElement)

  window.addEventListener('resize', () => {
    resize()
  })

  // // 添加灯光
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight1.position.set(-10, 0, 0)
  scene.add(directionalLight1)
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight2.position.set(0, 0, -10)
  scene.add(directionalLight2)
}

const render = () => {
  controls && controls.update()

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

const resize = () => {
  camera.aspect =
    furniture_show.value.clientWidth / furniture_show.value.clientHeight
  camera.updateProjectionMatrix()

  renderer.setSize(
    furniture_show.value.clientWidth,
    furniture_show.value.clientHeight
  )
  renderer.setPixelRatio(window.devicePixelRatio)
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.furniture_show {
  width: 100%;
  height: 100%;
}
</style>
