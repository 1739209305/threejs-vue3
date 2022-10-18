<template>
  <div class="scene_floating_ball" ref="scene_floating_ball"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import dat from 'dat.gui'
import { ref, onMounted } from 'vue'

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  cloudTexture: THREE.Texture,
  houseTexture: THREE.Texture,
  gui: unknown,
  cube: THREE.Mesh
const scene_floating_ball: any = ref(null)
gui = new dat.GUI()

const init = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    45,
    scene_floating_ball.value.clientWidth /
      scene_floating_ball.value.clientHeight,
    0.1,
    100000
  )
  camera.position.set(-100, 100, 600)
  camera.updateProjectionMatrix()
  scene.add(camera)

  let textureLoad: THREE.TextureLoader = new THREE.TextureLoader()
  cloudTexture = textureLoad.load('image/cloud.jpg')
  cloudTexture.mapping = THREE.EquirectangularReflectionMapping

  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('./hdr/vr_house.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    houseTexture = texture

    const geometry = new THREE.SphereGeometry(130, 1000, 1000)
    const material = new THREE.MeshBasicMaterial({ envMap: houseTexture })
    cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    scene.background = houseTexture

    render()
  })

  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  console.log(scene_floating_ball.value.clientHeight)
  renderer.setSize(
    scene_floating_ball.value.clientWidth,
    scene_floating_ball.value.clientHeight
  )
  renderer.setPixelRatio(window.devicePixelRatio)

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement)
  // 设置阻尼
  controls.enableDamping = true

  scene_floating_ball.value.appendChild(renderer.domElement)

  window.addEventListener('resize', () => {
    resize()
  })
}

const guiEvent = () => {
  const param = {
    house: function () {
      scene.background = houseTexture
      if (!Array.isArray(cube.material)) {
        cube.material.envMap = houseTexture
        cube.material.needsUpdate = true
      }
    },
    cloud: function () {
      scene.background = cloudTexture
      if (!Array.isArray(cube.material)) {
        cube.material.envMap = cloudTexture
        cube.material.needsUpdate = true
      }
    }
  }
  gui.add(param, 'cloud')
  gui.add(param, 'house')
}

const render = () => {
  controls && controls.update()

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

const resize = () => {
  camera.aspect =
    scene_floating_ball.value.clientWidth /
    scene_floating_ball.value.clientHeight
  camera.updateProjectionMatrix()

  renderer.setSize(
    scene_floating_ball.value.clientWidth,
    scene_floating_ball.value.clientHeight
  )
  renderer.setPixelRatio(window.devicePixelRatio)
}

onMounted(() => {
  init()
  guiEvent()

  window.addEventListener('resize', () => {
    resize()
  })
})
</script>

<style scoped>
.scene_floating_ball {
  width: 100%;
  height: 100%;
}
</style>
