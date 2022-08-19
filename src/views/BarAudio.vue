<template>
  <div class="barAudio">
    <Audio></Audio>
  </div>
</template>

<script>
import Audio from "./components/Audio.vue";

export default {
  name: "BarAudio",
  components: { Audio },
};
</script>
<style scoped>
.barAudio {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
}
</style>
