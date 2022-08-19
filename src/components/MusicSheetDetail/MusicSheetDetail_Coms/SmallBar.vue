<template>
  <div class="smallBar">
    <ul>
      <li
        @click="$router.push('/musicSheet_detail/MusicSheetList')"
        :class="
          selectedPath == '/musicSheet_detail/MusicSheetList' ? 'active' : 're'
        "
      >
        歌曲列表
      </li>
      <li
        @click="$router.push('/musicSheet_detail/Comment')"
        :class="selectedPath == '/musicSheet_detail/Comment' ? 'active' : 're'"
      >
        评论
      </li>
      <li
        @click="$router.push('/musicSheet_detail/Collector')"
        :class="
          selectedPath == '/musicSheet_detail/Collector' ? 'active' : 're'
        "
      >
        收藏者
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SmallBar",
  data() {
    return {
      selectedPath: "/musicSheet_detail/MusicSheetList",
    };
  },
  watch: {
    $route: {
      handler: function (val) {
        this.selectedPath = val.path;
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>

<style scoped>
.smallBar {
  width: 100%;
  height: 40px;
}
.smallBar ul {
  margin-left: 30px;
  margin-top: auto;
  list-style: none;
}
.smallBar li {
  box-sizing: border-box;
  float: left;
  margin-left: 5px;
  width: 90px;
  height: 30px;
  line-height: 30px;
  color: #606266;
  font-size: 13px;
}
.smallBar li:hover {
  cursor: pointer;
  color: #000000;
}
.smallBar .active {
  color: #000000;
  font-weight: 600;
  border-bottom: 2px solid #ee5050;
}
.re {
  color: #606266;
}
</style>