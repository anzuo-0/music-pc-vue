<template>
  <div class="likeMusic">
    <LikeMusicText :List="List" />
    <LikeMusicList :List="List"></LikeMusicList>
    <div style="height: 80px"></div>
  </div>
</template>

<script>
import LikeMusicText from "./MusicSheetDetail_Coms/LikeMusicText.vue";
import LikeMusicList from "./MusicSheetDetail_Coms/LikeMusicList.vue";

export default {
  name: "LikeMusic",
  props: ["LikeSongList"],
  components: {
    LikeMusicText,
    LikeMusicList,
  },
  data() {
    return {
      activeBtn: "",
      List: [],
    };
  },
  created() {},
  watch: {
    LikeSongList: function (newVal) {
      const List = newVal;
      this.List = List;
    },
  },
};
</script>

<style scoped>
.LikeMusic {
  width: 100%;
}
</style>