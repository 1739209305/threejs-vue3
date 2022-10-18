<template>
  <div class="vrHouseViewing" ref="vrHouseViewing"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// hdr加载需要RGBELoader
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer

const init = () => {
  // 创建场景
  scene = new THREE.Scene()
  // 创建透视相机
  camera = new THREE.PerspectiveCamera(
    75,
    vrHouseViewing.value.clientWidth / vrHouseViewing.value.clientHeight,
    0.1,
    1000
  )
  // 设置相机的位置
  camera.position.z = 0.1
  camera.updateProjectionMatrix()
  // 把相机添加到场景中
  scene.add(camera)

  // 创建几何体和材质
  const geometry = new THREE.SphereGeometry(50, 100, 100)
  // 设置纹理 加载hdr ，用RGBELoader
  const textureLoader = new RGBELoader()
  textureLoader.load('./hdr/vr_house_2.hdr', (texture) => {
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const mesh = new THREE.Mesh(geometry, material)

    // 反过来，进行查看
    mesh.geometry.scale(1, 1, -2)
    scene.add(mesh)
  })

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    // 抗锯齿
    antialias: true
  })
  renderer.setSize(
    vrHouseViewing.value.clientWidth,
    vrHouseViewing.value.clientHeight
  )

  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  // 设置阻尼
  controls.enableDamping = true
  controls.enableZoom = false
}

// 创建渲染函数，请求动画帧
const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

const vrHouseViewing: any = ref(null)
onMounted(() => {
  init()
  vrHouseViewing.value.appendChild(renderer.domElement)
  render()

  window.addEventListener('resize', () => {
    ;(camera.aspect =
      vrHouseViewing.value.clientWidth / vrHouseViewing.value.clientHeight),
      camera.updateProjectionMatrix()

    renderer.setSize(
      vrHouseViewing.value.clientWidth,
      vrHouseViewing.value.clientHeight
    )
    renderer.setPixelRatio(window.devicePixelRatio)
  })
})
</script>

<style scoped>
.vrHouseViewing {
  width: 100%;
  height: 100%;
}
</style>
