<template>
  <div class="scene_floating_ball" ref="scene_floating_ball"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// import dat from 'dat.gui'
import { ref, onMounted, Ref } from 'vue'

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  cloudTexture: THREE.Texture,
  houseTexture: THREE.Texture,
  // gui: any,
  cube: THREE.Mesh
const scene_floating_ball: Ref = ref(null)

const init = () => {
  // gui = new dat.GUI()
  // 设置场景
  scene = new THREE.Scene()
  // 初始化透视相机
  camera = new THREE.PerspectiveCamera(
    45,
    scene_floating_ball.value.clientWidth /
      scene_floating_ball.value.clientHeight,
    0.1,
    100000
  )
  // 设置相机位置
  camera.position.set(-100, 100, 600)
  // 更新像素比
  camera.updateProjectionMatrix()
  // 添加相机到场景中
  scene.add(camera)

  // 创建纹理
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
  })

  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
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

  render()
}

const guiEvent = () => {
  // const param = {
  //   house: function () {
  //     scene.background = houseTexture
  //     if (!Array.isArray(cube.material)) {
  //       ;(cube.material as any).envMap = houseTexture
  //       cube.material.needsUpdate = true
  //     }
  //   },
  //   cloud: function () {
  //     scene.background = cloudTexture
  //     if (!Array.isArray(cube.material)) {
  //       ;(cube.material as any).envMap = cloudTexture
  //       cube.material.needsUpdate = true
  //     }
  //   }
  // }
  // gui.add(param, 'house')
  // gui.add(param, 'cloud')
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
