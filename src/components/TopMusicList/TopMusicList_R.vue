<template>
  <div class="topmusiclist_r">
    <el-table
      v-loading="loading"
      :data="song3"
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
  name: "TopMusicList_R",
  components: {},
  data() {
    return {
      loading: true,
      song3: [],
    };
  },
  created() {
    bus.$on("song3", (value) => {
      this.song3 = value;
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
        openPage: 3,
      });
      this.$router.push("/top_music_detail");
    },
  },
  beforeDestroy() {
    bus.$off("song3");
  },
};
</script>
<style scoped>
.seeAll {
  margin-left: 12px;
  margin-top: 5px;
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