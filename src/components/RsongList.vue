<template>
  <div class="rsonglist">
    <div class="title">推荐歌单</div>
    <div class="rsonglist_item" v-if="isLogin">
      <div class="rsong" @click="playDailySongs">
        <div class="rsong_img">
          <img src="../assets/images/day.png" />
        </div>
        <div class="rsong_text">
          <span>每日歌曲推荐</span>
        </div>
      </div>
      <div class="rsong" v-for="(item, index) in rsonglist" :key="index">
        <div class="rsong_img" @click="playsonglist(item)">
          <img :src="item.picUrl" />
        </div>
        <div class="rsong_text" @click="toMusicSheetDetail(item)">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="rsonglist_item" v-else>
      <div class="rsong" v-for="(item, index) in rsonglist" :key="index">
        <div class="rsong_img" @click="playsonglist(item)">
          <img :src="item.picUrl" />
        </div>
        <div class="rsong_text" @click="toMusicSheetDetail(item)">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RsongList",
  components: {},
  data() {
    return {
      isLogin: false,
      dailySongList: [],
      rsonglist: [],
    };
  },
  created() {
    const userId = this.$store.state.userId;
    if (userId) {
      this.isLogin = true;
      this.getPersonalized(); //获取私人日推歌单
      this.getRecommendSongs(); //获取私人日推曲目
    } else {
      this.getIsntLoginSongs(); //未登录获取推荐歌曲
    }
  },
  methods: {
    //获取私人日推歌单
    getPersonalized() {
      this.axios.get("personalized").then((res) => {
        if (res.data.code === 200) {
          const result = res.data.result.slice(0, 12);
          this.rsonglist = result;
        } else {
          this.$message.error("获取推荐歌单失败");
        }
      });
    },
    //获取私人日推曲目
    getRecommendSongs() {
      this.axios.get("recommend/songs").then((res) => {
        const data = res.data.data.dailySongs;
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push(data[i].id);
        }
        this.dailySongList = arr;
      });
    },
    //未登录获取推荐歌曲
    getIsntLoginSongs() {
      this.axios
        .get("personalized?limit=12")
        .then((res) => {
          if (res.data.code === 200) {
            const result = res.data.result.slice(0, 10);
            this.rsonglist = result;
          } else {
            this.$message.error("获取推荐歌单失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //播放日推音乐
    playDailySongs() {
      this.$store.dispatch("Playsongs", this.dailySongList);
    },
    //播放歌单音乐
    playsonglist(item) {
      this.axios.get("playlist/detail?id=" + item.id).then((res) => {
        let ids = [];
        const sl = res.data.playlist.tracks;
        for (let i = 0; i < sl.length; i++) {
          let id = sl[i].id;
          ids.push(id);
        }
        this.$store.dispatch("Playsongs", ids);
      });
    },
    // 发送歌单id到Vuex
    toMusicSheetDetail(item) {
      this.$store.commit("MusicSheetDetailId", item.id);
    },
  },
  watch: {
    // 监听Vuex musicSheetDetailId变化跳转路由
    "$store.state.musicSheetDetailId": function (newd) {
      if (newd !== 0) {
        this.$router.push("/musicSheet_detail/MusicSheetList");
      }
    },
  },
};
</script>
<style scoped>
.rsonglist {
  width: 100%;
}
.rsonglist .title {
  padding: 0 30px 0;
  height: 50px;
  font-size: 20px;
  line-height: 60px;
  font-weight: 650;
  text-align: left;
}
.rsonglist_item {
  padding: 0 30px 0;
  display: flex;
  flex-wrap: wrap;
}

.rsong {
  margin-top: 10px;
  margin-left: 20px;
  width: 150px;
  height: 180px;
  border-radius: 8px;
}
.rsong:hover {
  cursor: pointer;
}
.rsong_img {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 8px;
}
.rsong_img img {
  width: 150px;
  height: 150px;
  border-radius: 8px;
}
.rsong_text {
  width: 100%;
  height: 30px;
  font-size: 13px;
  text-align: left;
}
</style>