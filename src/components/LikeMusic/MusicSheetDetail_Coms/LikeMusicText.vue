<template>
  <div class="textdetail">
    <div class="Img">
      <img :src="coverImgUrl" />
    </div>
    <div class="text">
      <div class="title">
        <span class="title_icon">
          <i class="iconfont icon-gedan"></i>
        </span>
        我喜欢的音乐
      </div>
      <div class="title2">
        <div class="creator_img">
          <img :src="avatarUrl" />
        </div>
        <div class="creator">{{ nickname }}</div>
      </div>
      <div class="todo">
        <div class="play_all" @click="playAllMusic">播放全部</div>
      </div>
      <div class="detail">
        <div class="songsCount">
          歌曲：
          <span style="color: #909399">{{ trackCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LikeMusicText",
  components: {},
  props: ["List"],
  data() {
    return {
      playlist: [],
      coverImgUrl: "",
      nickname: "",
      avatarUrl: "",
      trackCount: "",
    };
  },
  created() {
    const avatarUrl = this.$store.state.avatarUrl;
    const nickname = this.$store.state.nickname;
    this.avatarUrl = avatarUrl;
    this.nickname = nickname;
  },
  methods: {
    playAllMusic() {
      this.$store.dispatch("Playsong", this.playlist);
    },
  },
  watch: {
    List: function (newVal) {
      if (newVal) {
        this.playlist = newVal;
        const TopSongId = newVal[0];
        const songLength = newVal.length;
        this.trackCount = songLength;
        this.axios.get("song/detail?ids=" + TopSongId).then((res) => {
          this.coverImgUrl = res.data.songs[0].al.picUrl;
        });
      }
    },
  },
};
</script>
<style scoped>
@import "../../../assets/css/iconfont/iconfont.css";
.textdetail {
  position: relative;
  width: 80%;
  height: 250px;
  line-height: 40px;
}
.Img {
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translate(0, -50%);
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.Img img {
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.text {
  position: absolute;
  left: 240px;
  top: 50%;
  transform: translate(0, -50%);
  padding-left: 15px;
  width: 70%;
  height: 200px;
  background-color: #fff;
  text-align: left;
}
.title {
  font-size: 23px;
  font-weight: 580;
}
.title .icon-gedan {
  color: rgb(230, 7, 44);
  font-size: 28px;
}
.title2 {
  margin-top: 5px;
  width: 100%;
  height: 30px;
  text-align: left;
}
.title2 .creator_img {
  float: left;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.title2 .creator_img img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.creator {
  float: left;
  margin-left: 10px;
  width: 180px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  color: #2479ce;
  overflow: hidden;
  text-overflow: ellipse;
}

.todo {
  margin-top: 15px;
  width: 100%;
  height: 30px;
}
.play_all {
  width: 100px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  letter-spacing: 3px;
  color: #fff;
  background-color: #ee5050;
  border: 0;
}
.play_all:hover {
  cursor: pointer;
  background-color: #ac2727;
}

.songsCount {
  float: left;
  width: 100px;
  height: 30px;
  overflow: hidden;
}
.playCount {
  float: left;
  width: 250px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipse;
}
</style>
