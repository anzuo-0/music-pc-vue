<template>
  <div class="mvDetailRecom">
    <div class="mvDetailRecomList">
      <ul v-for="(item, index) in mvs" :key="index">
        <li @click="playRecom(item)">
          <div class="img">
            <img :src="item.cover" />
          </div>
          <div class="detail">
            <div class="name">{{ item.name }}</div>
            <div class="artistName">by {{ item.artistName }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvDetailRecom",
  data() {
    return {
      mvs: [],
    };
  },
  created() {
    const mvID = this.$store.state.mvID;
    this.getSimiMV(mvID); //获取推荐mv
  },
  methods: {
    //获取推荐mv
    getSimiMV(mvID) {
      this.axios.get("simi/mv?mvid=" + mvID).then((res) => {
        this.mvs = res.data.mvs;
      });
    },
    //播放推荐mv
    playRecom(item) {
      const mvID = item.id;
      this.$store.commit("getMvID", mvID);
    },
  },
};
</script>

<style scoped>
.mvDetailRecom {
  margin-top: 5px;
  width: 100%;
  height: 30px;
}
.mvDetailRecomList ul {
  list-style: none;
}
.mvDetailRecomList li {
  margin-top: 8px;
  width: 100%;
  height: 95px;
}
.mvDetailRecomList li:hover {
  cursor: pointer;
}
.img {
  float: left;
  width: 45%;
  height: 100px;
  border-radius: 5px;
}
.img img {
  width: 100%;
  height: 95px;
  border-radius: 5px;
}
.detail {
  float: right;
  width: 55%;
  height: 100px;
}
.detail .name {
  box-sizing: border-box;
  margin-top: 10px;
  padding-left: 10px;
  width: 100%;
  height: 30px;
  text-align: left;
  line-height: 50px;
  color: #303133;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail .artistName {
  box-sizing: border-box;
  padding-left: 10px;
  width: 100%;
  height: 50px;
  text-align: left;
  line-height: 50px;
  color: #909399;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>