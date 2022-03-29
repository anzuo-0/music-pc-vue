<template>
  <div class="musicSheetList">
    <el-table
      :data="songs"
      stripe
      style="width: 100%"
      v-loading="loading"
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
      <el-table-column prop="ar" label="歌手" width="255" show-overflow-tooltip>
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
      <el-table-column prop="dt" label="时长" width="80"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { transTime } from "../../../utils/transTime";
export default {
  name: "MusicSheetList",
  props: ["songListData"],
  data() {
    return {
      songs: [],
      loading: true,
    };
  },
  methods: {
    playMusic(row) {
      this.$store.dispatch("Playsong", row.id);
    },
  },
  watch: {
    songListData: function (newValue) {
      if (newValue) {
        const songs = newValue.tracks;
        for (let i = 0; i < songs.length; i++) {
          songs[i].dt = transTime(songs[i].dt);
        }
        this.songs = songs;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.musicSheetList {
  width: 100%;
}
</style>