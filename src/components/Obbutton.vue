<template>
  <div class="obbutton">
    <i class="iconfont icon-xiangzuo2" id="back" @click="back"></i>
    <i class="iconfont icon-xiangyou2" id="front" @click="front"></i>
  </div>
</template>

<script>
export default {
  name: "Obbutton",
  components: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    front() {
      this.$router.go(1);
    },
  },
};
</script>
<style scoped>
.obbutton {
  position: absolute;
  left: 260px;
  top: 50%;
  transform: translate(0, -50%);
  width: 60px;
  height: 50px;
  line-height: 50px;
}
.obbutton i {
  cursor: pointer;
  font-size: 25px;
  color: rgb(240, 240, 240);
}
#back {
  float: left;
}
#front {
  float: right;
}
</style>
