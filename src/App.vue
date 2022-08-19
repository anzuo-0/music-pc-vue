<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
    window.addEventListener("unload", (e) => this.unloadHandler(e), false);
    window.addEventListener("load", () => {
      if (this.$route.path !== "/index") {
        this.$router.replace("/index");
      }
    });
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight;
        this.screenHeight = window.screenHeight;
      })();
    };
  },
  // created() {
  //   window.resizeTo(1219, 625);
  // },
  destroyed() {
    window.removeEventListener("beforeunload", (e) =>
      this.beforeunloadHandler(e)
    );
    window.removeEventListener("unload", (e) => this.unloadHandler(e));
  },
  // created() {
  //   window.resizeTo(1219, 625);
  // },
  watch: {
    screenHeight() {
      //  this.screenHeight = val
      //  this.tableHeight = this.screenHeight - 250
    },
  },
  methods: {
    beforeunloadHandler() {
      // debugger;
      this._beforeUnload_time = new Date().getTime();
      // e = e || window.event;
      // if (e) {
      //   e.returnValue = "关闭提示";
      // }
      // // debugger;
      // return "关闭提示";
    },
    unloadHandler() {
      const userId = this.$store.state.userId;
      this._gap_time = new Date().getTime() - this._beforeUnload_time;
      if (userId) {
        if (this._gap_time <= 5) {
          navigator.sendBeacon("http://localhost:3000/logout", null);
        }
      }
    },
  },
};
</script>

<style>
@import "./assets/css/iconfont/iconfont.css";
* {
  padding: 0;
  margin: 0;
}
#app {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
}
</style>
