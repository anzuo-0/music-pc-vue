<template>
  <div class="topBanner">
    <ul>
      <li
        @click="$router.push('/index')"
        :class="selectedPath == '/index' ? 'liactive' : 're'"
      >
        个性推荐
      </li>
      <li
        @click="$router.push('/index/top_music')"
        :class="selectedPath == '/index/top_music' ? 'liactive' : 're'"
      >
        排行榜
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TopBanner",
  components: {},
  data() {
    return {
      selectedPath: "/index",
    };
  },
  mounted() {
    this.selectedPath = this.$route.path;
  },
  watch: {
    $route: {
      handler: function (nval) {
        this.selectedPath = nval.path;
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>
<style scoped>
.topBanner {
  padding: 5px;
  width: 80%;
  height: 50px;
}
.topBanner ul {
  list-style: none;
  height: 50px;
  width: 100%;
}
.topBanner li {
  float: left;
  margin-left: 10px;
  width: 110px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #606266;
}

.topBanner li:hover {
  cursor: pointer;
  color: #000000;
}
.liactive {
  border-bottom: 3px solid #fd3131;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
}
.re {
  font-size: 14px;
  color: #606266;
}
</style>