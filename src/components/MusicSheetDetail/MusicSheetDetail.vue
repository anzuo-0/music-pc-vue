<template>
  <div class="musicSheetdetail">
    <TextDetail :TextDetailData="TextDetailData" />
    <SmallBar />
    <keep-alive>
      <router-view :key="$route.fullpath" :songListData="TextDetailData"
    /></keep-alive>
  </div>
</template>

<script>
import TextDetail from "./MusicSheetDetail_Coms/TextDetail.vue";
import SmallBar from "./MusicSheetDetail_Coms/SmallBar.vue";

export default {
  name: "MusicSheetDetail",
  components: {
    TextDetail,
    SmallBar,
  },

  data() {
    return {
      activeBtn: "",
      TextDetailData: null,
    };
  },
  created() {
    this.getSongListDetail(); //获取歌单详细
  },
  destroyed() {
    //清除VueX(MusicSheetDetailId)id
    this.clearMusicSheetDetailId();
  },
  methods: {
    //获取歌单详细
    getSongListDetail() {
      const musicSheetDetailId = this.$store.state.musicSheetDetailId;
      this.axios
        .get("playlist/detail?id=" + musicSheetDetailId)
        .then((res) => {
          this.TextDetailData = res.data.playlist;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async clearMusicSheetDetailId() {
      this.$store.commit("MusicSheetDetailId", 0);
    },
  },
};
</script>

<style scoped>
.musicSheetdetail {
  width: 80%;
  height: 550px;
  overflow-y: scroll;
}
</style>