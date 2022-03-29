<template>
  <div class="mvDetailVideo">
    <div class="play">
      <video :src="videoUrl" controls="controls" autoplay="autoplay" />
    </div>
    <div class="playDetail">
      <div class="playDetailName">{{ mvName }}</div>
      <div class="playDetailArtists">歌手：{{ Artists }}</div>
      <div class="playDetailAbout">
        <span>发布：{{ publishTime }}</span>
        <span style="margin-left: 20px">播放：{{ playCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MvDetailVideo",
  data() {
    return {
      videoUrl: "",
      mvName: "",
      Artists: "",
      publishTime: "",
      playCount: "",
    };
  },
  created() {
    const mvID = this.$store.state.mvID;
    this.getMvUrl(mvID); //获取mvurl
    this.getMvDetail(mvID); //获取mv详细
  },
  methods: {
    //获取mvurl
    getMvUrl(mvID) {
      this.axios
        .get("/mv/url?id=" + mvID)
        .then((res) => {
          this.videoUrl = res.data.data.url;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //获取mv详细
    getMvDetail(mvID) {
      this.axios
        .get("mv/detail?mvid=" + mvID)
        .then((res) => {
          const data = res.data.data;
          this.mvName = data.name;
          this.Artists = data.artistName;
          this.publishTime = data.publishTime;
          this.playCount = data.playCount;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.mvDetailVideo {
  margin-top: 25px;
  width: 100%;
  height: 480px;
}
.play video {
  width: 100%;
  height: 344px;
}
.playDetail {
  box-sizing: border-box;
  padding: 10px 10px 10px 15px;
  width: 100%;
  height: 190px;
  text-align: left;
}
.playDetailName {
  margin-top: 5px;
  width: 100%;
  height: 30px;
  font-size: 30px;
  font-weight: 600;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.playDetailArtists {
  margin-top: 8px;
  width: 100%;
  height: 30px;
  font-size: 15px;
  line-height: 30px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.playDetailAbout {
  width: 100%;
  height: 30px;
  font-size: 13px;
  line-height: 30px;
  color: #acafb6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>