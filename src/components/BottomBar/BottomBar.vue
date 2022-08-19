<template>
  <div class="bottomBar">
    <div class="bottomBarText">已经到底了~</div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
};
</script>

<style scoped>
.bottomBar {
  width: 100%;
  height: 150px;
}
.bottomBarText {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
}
</style>