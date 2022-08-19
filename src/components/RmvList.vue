<template>
  <div class="rmvlist">
    <div class="title">推荐MV</div>
    <div class="rmvlist_item">
      <div
        class="rmv"
        v-for="(item, index) in rmvList"
        :key="index"
        @click="playMv(item)"
      >
        <div class="rmv_img">
          <div class="playCount">
            <span><i class="iconfont icon-icon-"></i></span>
            {{ item.playCount }}
          </div>
          <img :src="item.picUrl" />
        </div>
        <div class="rmv_text">
          <span class="rmv_text_name">{{ item.name }}</span>
          <div class="rmv_text_artists">
            <span v-for="(u, i) in item.artists" :key="i">
              {{ u.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RmvList",
  data() {
    return {
      rmvList: [],
    };
  },
  created() {
    this.getMvData(); //获取mv列表
  },
  methods: {
    //获取mv列表
    getMvData() {
      this.axios
        .get("personalized/mv")
        .then((res) => {
          this.rmvList = res.data.result.slice(0, 3);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    playMv(item) {
      this.$store.commit("getMvID", item.id);
      this.$router.push("/mvDetail");
    },
  },
};
</script>

<style scoped>
.rmvlist {
  margin-top: 20px;
  width: 100%;
}
.rmvlist .title {
  padding: 0 30px 0;
  height: 50px;
  font-size: 20px;
  line-height: 60px;
  font-weight: 650;
  text-align: left;
}
.rmvlist_item {
  padding: 0 40px 0;
  display: flex;
  flex-wrap: wrap;
}

.rmv {
  margin-top: 10px;
  margin-left: 10px;
  width: 275px;
  height: 240px;
  border-radius: 8px;
}
.rmv:hover {
  cursor: pointer;
}

.rmv_img {
  position: relative;
  width: 275px;
  height: 180px;
  border-radius: 8px;
}

.rmv_img img {
  width: 275px;
  height: 180px;
  border-radius: 8px;
}
.playCount {
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 10px;
  height: 20px;
  background: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  border-top-right-radius: 8px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 12px;
  text-align: center;
}
.rmv_text {
  margin-top: 5px;
  width: 100%;
  height: 30px;
  font-size: 13px;
  text-align: left;
}
.rmv_text_name {
  display: inline-block;
  width: 275px;
  height: 15px;
  font-size: 13px;
  color: #4e4f52;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rmv_text_name:hover {
  color: #000;
}
.rmv_text_artists {
  display: inline-block;
  margin-top: 5px;
  width: 275px;
  height: 15px;
  color: #717479;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rmv_text_artists:hover {
  color: #000;
}
</style>