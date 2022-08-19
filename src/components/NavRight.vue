<template>
  <div class="navright">
    <div v-if="isLogin" key="Math.random()">
      <div
        class="login islogin"
        @mouseenter="onmouseenter"
        @mouseleave="onmouseleave"
      >
        <img :src="avatarUrl" alt="" id="lImg" />
        <span class="nickname">
          {{ nickname }}
          <i class="iconfont icon-webicon215"></i>
        </span>
      </div>
      <div
        v-show="openPage"
        @mouseenter="onmouseenter"
        @mouseleave="onmouseleave"
      >
        <Admin></Admin>
      </div>
    </div>
    <div v-else key="Math.random()">
      <div class="login" @click="tologin">
        <img src="../assets/images/login.png" alt="" id="lImg" />
        <span class="nickname">
          {{ nickname }}
          <i class="iconfont icon-webicon215"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Admin from "./Admin.vue";
export default {
  name: "NavRight",
  components: {
    Admin,
  },
  data() {
    return {
      isLogin: null,
      nickname: "",
      avatarUrl: "",
      openPage: false,
      enterTimer: null,
    };
  },
  created() {
    const cookie = sessionStorage.getItem("cookie");
    const nickname = sessionStorage.getItem("nickname");
    const avatarUrl = sessionStorage.getItem("avatarUrl");
    // let img = document.getElementById("lImg");
    if (cookie) {
      this.isLogin = true;
      this.nickname = nickname;
      this.avatarUrl = avatarUrl;
    } else {
      this.isLogin = false;
      this.nickname = "未登录";
      this.avatarUrl = "../assets/images/user_unlogin.png";
    }
  },
  methods: {
    onmouseenter() {
      this.openPage = true;
      clearTimeout(this.enterTimer);
    },
    onmouseleave() {
      this.enterTimer = setTimeout(() => {
        this.openPage = false;
      }, 100);
    },
    tologin() {
      this.$router.push("/login");
    },
  },
  computed: {},
};
</script>

<style scoped>
.navright {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
  width: 400px;
  height: 50px;
}
.login {
  float: right;
  margin: 15px 20px;
  width: 280px;
  height: 30px;
  text-align: left;
  color: rgb(226, 226, 226);
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.login img {
  float: left;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.login .nickname {
  margin-left: 8px;
  width: 280px;
  height: 30px;
  font-size: 13px;
  line-height: 30px;
}
.login .nickname i {
  font-size: 10px;
}
.login:hover {
  color: #fff;
  cursor: pointer;
}
</style>