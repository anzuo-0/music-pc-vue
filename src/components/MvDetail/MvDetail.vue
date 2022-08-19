<template>
  <div class="mvdetail">
    <div class="mvPlay">
      <div class="title">
        <span style="cursor: pointer" @click="$router.go(-1)"
          ><i class="iconfont icon-zuo"></i
        ></span>
        <span style="font-weight: 600; cursor: pointer" @click="$router.go(-1)"
          >MV详细</span
        >
      </div>
      <MvDetailVideo />
    </div>
    <div class="mvRecom">
      <div class="title">
        <span style="font-weight: 600">相似MV</span>
      </div>
      <MvDetailRecom />
    </div>
  </div>
</template>

<script>
import MvDetailRecom from "../MvDetail/MvDetail_Coms/MvDetailRecom.vue";
import MvDetailVideo from "../MvDetail/MvDetail_Coms/MvDetailVideo.vue";
export default {
  name: "MvDetail",
  inject: ["reload"],
  components: {
    MvDetailRecom,
    MvDetailVideo,
  },
  watch: {
    "$store.state.mvID": function () {
      this.reload();
    },
  },
};
</script>

<style scoped>
.mvdetail {
  float: right;
  width: 80%;
}
.mvPlay {
  float: left;
  box-sizing: border-box;
  padding: 0 10px 0 10px;
  width: 65%;
  height: 600px;
}
.title {
  margin-top: 5px;
  width: 100%;
  height: 30px;
  text-align: left;
  line-height: 30px;
  font-size: 18px;
}
.mvRecom {
  float: right;
  padding: 0 10px 0 10px;
  box-sizing: border-box;
  width: 35%;
  height: 600px;
}
</style>