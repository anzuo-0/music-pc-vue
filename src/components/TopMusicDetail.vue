<template>
  <div class="topmusicdetail">
    <TopTextDetail :detail="detail" />
    <div class="songstable">
      <el-table
        :data="detail"
        stripe
        style="width: 100%"
        @row-dblclick="playMusic"
      >
        <el-table-column type="index" label="id" width="80px" align="center">
        </el-table-column>

        <el-table-column
          prop="name"
          label="音乐标题"
          width="280"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="ar"
          label="歌手"
          width="240"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-for="(u, i) in scope.row.ar" :key="i">
              {{ u.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="al.name"
          label="专辑"
          width="255"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="dt" label="时长" width="100"> </el-table-column>
      </el-table>
    </div>
    <BottomBar />
  </div>
</template>

<script>
import TopTextDetail from "./TopMusicDetail_Coms/TopTextDetail.vue";
import BottomBar from "./BottomBar/BottomBar.vue";
import { transTime } from "../utils/transTime";

export default {
  name: "TopMusicDetail",
  components: { TopTextDetail, BottomBar },
  data() {
    return {
      detail: [],
    };
  },
  created() {
    const page = this.$store.state.openPage;
    const songDetail = this.$store.state.songDetail;
    const detail = songDetail[page].data.playlist.tracks;
    for (let i = 0; i < detail.length; i++) {
      detail[i].dt = transTime(detail[i].dt);
    }
    this.detail = detail;
  },
  methods: {
    playMusic(row) {
      this.$store.dispatch("Playsong", row.id);
    },
  },
};
</script>
<style scoped>
.topmusicdetail {
  /* width: 100%; */
  height: 550px;
  overflow-y: scroll;
}
.songstable {
  width: 100%;
}
</style>
