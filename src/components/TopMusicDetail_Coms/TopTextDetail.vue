<template>
  <div class="toptextdetail">
    <div class="Img">
      <img :src="coverImgUrl" />
    </div>
    <div class="text">
      <div class="title">
        <span class="title_icon">
          <i class="iconfont icon-gedan"></i>
        </span>
        {{ title }}
      </div>
      <div class="title2">
        <div class="creator_img">
          <img :src="avatarUrl" />
        </div>
        <div class="creator">{{ nickname }}</div>
        <div class="updateTime">最近更新：{{ updateTime }}</div>
      </div>
      <div class="todo">
        <div class="play_all" @click="playAllMusic">播放全部</div>
      </div>
      <div class="detail">
        <div class="songsCount">
          歌曲：
          <span style="color: #909399">{{ songsCount }}</span>
        </div>
        <div class="playCount">
          播放： <span style="color: #909399">{{ playCount }}</span>
        </div>
      </div>
      <div class="detail_text">
        简介：
        <span style="color: #909399">{{ sdetail }}</span>
      </div>
    </div>
    <div class="songList"></div>
  </div>
</template>

<script>
export default {
  name: "TopTextDetail",
  components: {},
  props: ["detail"],
  data() {
    return {
      playlist: [],
      title: "",
      coverImgUrl: "",
      nickname: "",
      avatarUrl: "",
      updateTime: "",
      songsCount: "",
      playCount: 0,
      sdetail: "",
    };
  },
  mounted() {
    if (this.$store.state.songDetail) {
      const page = this.$store.state.openPage;
      this.playlist = this.$store.state.songDetail[page].data.playlist;
      this.title = this.playlist.name;
      this.coverImgUrl = this.playlist.coverImgUrl;
      this.nickname = this.playlist.creator.nickname;
      this.avatarUrl = this.playlist.creator.avatarUrl;
      const ttime = new Date(this.playlist.updateTime);
      this.updateTime = ttime.toString().slice(4, 10);
      this.songsCount = this.playlist.trackCount;
      this.playCount = this.playlist.playCount;
      this.sdetail = this.playlist.description;
    } else {
      const playlist = this.detail.data.playlist;
      this.title = playlist.name;
      this.coverImgUrl = playlist.coverImgUrl;
      this.nickname = playlist.creator.nickname;
      this.avatarUrl = playlist.creator.avatarUrl;
      const ttime = new Date(playlist.updateTime);
      this.updateTime = ttime.toString().slice(4, 10);
      this.songsCount = playlist.trackCount;
      this.playCount = playlist.playCount;
      this.sdetail = playlist.description;
    }
  },
  methods: {
    playAllMusic() {
      const len = this.playlist.tracks.length;
      const list = [];
      for (let i = 0; i < len; i++) {
        list.push(this.playlist.tracks[i].id);
      }
      this.$store.dispatch("Playsong", list);
    },
  },
};
</script>
<style scoped>
@import "../../assets/css/iconfont/iconfont.css";
.toptextdetail {
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
  width: 100px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  color: #2479ce;
}
.updateTime {
  float: left;
  margin-left: 10px;
  width: 180px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
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
.detail {
  margin-top: 5px;
  width: 100%;
  height: 30px;
  font-size: 14px;
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
.detail_text {
  margin-top: 5px;
  width: 100%;
  height: 30px;
  text-align: left;
  font-size: 12px;
  overflow: hidden;
}
</style>
