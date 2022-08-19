<template>
  <div class="myLikeMusic">
    <div v-if="!isLogin">
      <div class="isntLogin">
        <router-link to="/login">请登录后再进行查看！</router-link>
      </div>
    </div>
    <div v-else>
      <LikeMusic :LikeSongList="LikeSongList"></LikeMusic>
      <div style="height: 60px"></div>
    </div>
  </div>
</template>

<script>
import LikeMusic from "../components/LikeMusic/LikeMusic.vue";
export default {
  name: "MyLikeMusic",
  components: { LikeMusic },
  data() {
    return {
      isLogin: false,
      LikeSongList: [],
    };
  },
  created() {
    this.cheackLogin();
    if (!this.isLogin) {
      this.$message({
        message: "未登录",
        type: "warning",
      });
    } else {
      //获取喜欢的歌曲
      this.getLikeSongData();
    }
  },
  methods: {
    cheackLogin() {
      const userId = this.$store.state.userId;
      if (userId) {
        this.isLogin = true;
      }
    },
    //获取喜欢的歌曲
    getLikeSongData() {
      const userId = this.$store.state.userId;
      this.axios.get("likelist?uid=" + userId).then((res) => {
        if (res.data.code == 200) {
          this.LikeSongList = res.data.ids;
        } else {
          this.$message.error("获取个人喜欢歌曲失败");
        }
      });
    },
  },
};
</script>

<style scoped>
.myLikeMusic {
  float: right;
  width: 80%;
  height: 550px;
  overflow-y: scroll;
}
.isntLogin {
  margin: 200px auto;
  width: 600px;
  height: 50px;
  line-height: 50px;
}

.myLikeMusic a {
  font-size: 25px;
  letter-spacing: 5px;
  text-decoration: none;
  color: #000000;
}
.myLikeMusic a:hover {
  color: #ac97db;
;
}
</style>