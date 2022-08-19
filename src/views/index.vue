<template>
  <div class="index">
    <Nav id="nav"></Nav>
    <Content id="content"></Content>
    <router-view v-if="isRouterAlive"></router-view>
    <BarAudio></BarAudio>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
import Content from "./Content.vue";
import BarAudio from "../components/Audio.vue";

export default {
  name: "Index",
  components: {
    Nav,
    Content,
    BarAudio,
  },
  provide() {
    // 在祖先组件中通过 provide 提供变量
    return {
      reload: this.reload, //  声明一个变量
    };
  },
  data() {
    return {
      isRouterAlive: true, //控制router-view刷新
      search: false,
      banner_active: true,
    };
  },
  mounted() {
    //判断登录状态
    this.trueLogin();
  },
  methods: {
    //判断登录状态
    trueLogin() {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        this.$message({
          message: "登录成功",
          type: "success",
          duration: 800,
        });
      } else {
        this.$message({
          message: "暂未登录",
          type: "warning",
          duration: 800,
        });
      }
    },
    //祖类注入刷新router-view
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
  watch: {
    "$store.state.status": function (newVal) {
      if (newVal) {
        this.sonRefresh = false;
        this.$nextTick(() => {
          this.sonRefresh = true;
        });
      }
    },
    "$store.state.banner": function (newVal) {
      if (!newVal) {
        this.$nextTick(() => {
          this.banner_active = newVal;
        });
      } else {
        this.$nextTick(() => {
          this.banner_active = newVal;
        });
      }
    },
    $route: {
      handler: function (val) {
        const basePath = val.path.slice(0, 6);
        if (basePath == "/index") {
          this.$store.dispatch("changeBanner", {
            open: true,
          });
        } else {
          this.$store.dispatch("changeBanner", {
            open: false,
          });
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>
<style scoped>
@import "../assets/css/iconfont/iconfont.css";

#content {
  box-sizing: border-box;
  float: left;
  width: 20%;
  height: 550px;
  background-color: #ffffff;
  text-align: left;
  border-right: 1px solid lightgray;
}
#nav {
  z-index: 99;
}
.bottombg {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 66px;
  background-color: #fff;
  border-top: 1px solid lightgray;
}
</style>
