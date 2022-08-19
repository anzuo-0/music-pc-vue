<template>
  <div class="Main" ref="barparent">
    <div class="runCard">
      <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img :src="item.imageUrl" alt="banner" style="height: 200px" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <RsongList></RsongList>
    <RmvList></RmvList>
    <div style="height: 60px"></div>
  </div>
</template>

<script>
import RsongList from "../components/RsongList.vue";
import RmvList from "../components/RmvList.vue";

export default {
  name: "Main",
  components: {
    RsongList,
    RmvList,
  },
  data() {
    return {
      topBanner: [],
      banners: [],
    };
  },
  created() {
    //获取banner数据
    this.getBanner();
  },
  methods: {
    //获取banner数据
    getBanner() {
      this.axios.get("banner").then((res) => {
        this.banners = res.data.banners;
      });
    },
  },
};
</script>
<style scoped>
.Main {
  padding: 15px;
  box-sizing: border-box;
  float: right;
  width: 80%;
  height: 550px;
  overflow-y: scroll;
}

.runCard {
  margin: 30px auto;
  width: 95%;
}
.el-carousel__item {
  height: 200px;
  border-radius: 10px;
}

.runCard /deep/ .el-carousel__indicator .el-carousel__button {
  height: 8px;
  width: 8px;
  border-radius: 50%;
}
.runCard /deep/.el-carousel__indicator.is-active .el-carousel__button {
  background: #e20001;
}
</style>