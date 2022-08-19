<template>
  <div class="topmusiclist_x">
    <el-table
      v-loading="loading"
      :data="song1"
      stripe
      style="width: 98%; border-radius: 5px"
      :show-header="false"
      size="mini"
      @row-dblclick="playMusic"
    >
      <el-table-column type="index" width="30"> </el-table-column>
      <el-table-column
        prop="data.songs[0].name"
        width="220"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="data.songs[0].ar" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-for="(u, i) in scope.row.data.songs[0].ar" :key="i">
            {{ u.name }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="seeAll" @click="toDetail()">查看全部></div>
  </div>
</template>

<script>
import bus from "../../eventBus/eventBus";

export default {
  name: "TopMusicList_X",
  components: {},
  data() {
    return {
      loading: true,
      song1: [],
    };
  },
  created() {
    bus.$on("song1", (value) => {
      this.song1 = value;
      this.loading = false;
    });
  },
  methods: {
    //双击播放音乐
    playMusic(row) {
      this.$store.dispatch("Playsong", row.data.songs[0].id);
    },
    toDetail() {
      this.$store.dispatch("Open", {
        openPage: 1,
      });
      this.$router.push("/top_music_detail");
    },
  },
  beforeDestroy() {
    bus.$off("song1");
  },
};
</script>
<style scoped>
.seeAll {
  margin-top: 5px;
  margin-left: 12px;
  width: 60px;
  height: 18px;
  float: left;
  color: #606064;
  font-size: 12px;
}
.seeAll:hover {
  color: #000000;
  cursor: pointer;
}
</style>