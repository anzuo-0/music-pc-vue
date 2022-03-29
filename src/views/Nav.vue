<template>
  <div class="nav" id="nav">
    <div class="logo">
      <!-- <img src="../assets/images/logo.png" alt="logo" />
      <span>网易云音乐</span> -->
    </div>
    <Obbutton></Obbutton>
    <Search></Search>
    <NavRight v-if="sonRefresh"></NavRight>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import NavRight from "../components/NavRight.vue";
import Obbutton from "../components/Obbutton.vue";

export default {
  name: "Nav",
  components: {
    Search,
    NavRight,
    Obbutton,
  },
  data() {
    return {
      sonRefresh: true,
    };
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
  },
};
</script>
<style scoped>
img {
  float: left;
  max-height: 100%;
  max-width: 100%;
}
.logo span {
  float: left;
  font-size: 20px;
  line-height: 50px;
  font-family: MingLiU, Arial;
  letter-spacing: 4px;
  color: #ffffff;
}
#nav {
  position: relative;
  height: 70px;
  background-color: #e20001;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav .logo {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(0, -50%);
  width: 200px;
  height: 50px;
}
</style>