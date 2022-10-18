<template>
  <div class="heart" ref="heart"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MeshBasicMaterial } from 'three'

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls
let theta = 0
const radius = 100
const heart: any = ref(null)

const init = () => {
  scene = new THREE.Scene()
  // 设置背景颜色
  scene.background = new THREE.Color(0xf0f0f0)
  camera = new THREE.PerspectiveCamera(
    45,
    heart.value.clientWidth / heart.value.clientHeight,
    0.1,
    100000
  )
  camera.position.set(-100, 100, 600)
  camera.updateProjectionMatrix()
  scene.add(camera)

  const x = 0,
    y = 0

  const heartShape = new THREE.Shape()

  heartShape.moveTo(x + 5, y + 5)
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5)

  const geometry = new THREE.ShapeGeometry(heartShape)

  for (let index = 0; index < 1000; index++) {
    const material = new MeshBasicMaterial({
      color: Math.random() * 0xffffff
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = Math.random() * 800 - 400
    mesh.position.y = Math.random() * 800 - 400
    mesh.position.z = Math.random() * 800 - 400

    mesh.rotation.x = Math.random() * 2 * Math.PI
    mesh.rotation.y = Math.random() * 2 * Math.PI
    mesh.rotation.z = Math.random() * 2 * Math.PI

    mesh.scale.x = Math.random() + 0.2
    mesh.scale.y = Math.random() + 0.2
    mesh.scale.z = Math.random() + 0.2
    scene.add(mesh)
  }

  renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(heart.value.clientWidth, heart.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  heart.value.appendChild(renderer.domElement)

  render()

  window.addEventListener('resize', () => {
    resize()
  })
}

const render = () => {
  theta += 0.1

  camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta))
  camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta))
  camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta))

  camera.updateMatrixWorld()

  controls && controls.update()

  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

const resize = () => {
  camera.aspect = heart.value.clientWidth / heart.value.clientHeight
  camera.updateProjectionMatrix()

  renderer.setSize(heart.value.clientWidt, heart.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.heart {
  width: 100%;
  height: 100%;
}
</style>
