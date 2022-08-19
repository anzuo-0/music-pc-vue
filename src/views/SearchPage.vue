<template>
  <div class="searchpage">
    <div class="total">找到{{ song_total }}首歌曲</div>
    <div class="navBar">
      <ul>
        <li class="active">单曲</li>
      </ul>
    </div>
    <div class="searchList">
      <el-table
        :data="songList"
        stripe
        @row-dblclick="playMusic"
        style="margin: 0 auto; width: 100%"
      >
        <el-table-column prop="index" width="50px"> </el-table-column>
        <el-table-column prop="down" width="80px">
          <template slot-scope="scope">
            <span
              class="mv"
              v-show="scope.row.mvid != ''"
              @click="toMv(scope.row)"
              ><i class="iconfont icon-MV"></i
            ></span>
            <span
              class="down"
              style="margin-left: 10px"
              @click="toDown(scope.row)"
              ><i class="iconfont icon-changyongicon-"></i
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="音乐标题"
          width="300"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="artists"
          label="歌手"
          width="215"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-for="(u, i) in scope.row.artists" :key="i">
              {{ u.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="album.name"
          label="专辑"
          width="215"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="duration" label="时长"> </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="song_total"
        layout="total, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { transTime } from "../utils/transTime";
import FileSaver from "file-saver";

export default {
  name: "Searchpage",
  components: {},
  inject: ["reload"],
  data() {
    return {
      song_total: 0,
      songList: [],
      currentPage: 1, // 当前页码
      pageSize: 7, // 每页的数据条数
    };
  },
  created() {
    const searchValue = this.$store.state.searchValue;
    this.getSearchData(searchValue); //获取搜索数据
  },
  methods: {
    //获取搜索数据
    getSearchData(searchValue) {
      this.axios
        .get(`search?keywords=${searchValue}&limit=8`)
        .then((res) => {
          this.song_total = res.data.result.songCount;
          const songLists = res.data.result.songs;
          for (let i = 0; i < songLists.length; i++) {
            songLists[i].duration = transTime(songLists[i].duration);
            songLists[i].index = i + 1;
          }
          this.songList = songLists;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //切换页面获取数据
    handleCurrentChange(val) {
      const searchValue = this.$store.state.searchValue;
      const page = val;
      const offset = (page - 1) * 7;
      this.axios
        .get(`search?keywords=${searchValue}&limit=7&offset=${offset}`)
        .then((res) => {
          const songLists = res.data.result.songs;
          for (let i = 0; i < songLists.length; i++) {
            songLists[i].duration = transTime(songLists[i].duration);
            songLists[i].index = offset + 1 + i;
          }
          this.songList = songLists;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    playMusic(row) {
      this.$store.dispatch("Playsong", row.id);
    },
    //播放mv
    toMv(row) {
      const mvId = row.mvid;
      this.$store.commit("getMvID", mvId);
      this.$router.push("/mvDetail");
    },
    //下载歌曲
    toDown(row) {
      const songId = row.id;
      const songName = row.name;
      const songArtistsArr = [];
      row.artists.forEach((val) => {
        songArtistsArr.push(val.name);
      });
      const songArtists = songArtistsArr.join(" ");
      const downLoadName = `${songArtists} - ${songName}.mp3`;
      this.axios.get("song/url?id=" + songId).then((res) => {
        const songUrl = res.data.data[0].url;
        if (songUrl != "") {
          this.$message({
            message: `正在下载歌曲：${downLoadName}`,
            type: "warning",
          });
          FileSaver.saveAs(songUrl, downLoadName);
        } else {
          this.$message.error("此音乐不支持下载");
        }
      });
    },
  },
  watch: {
    $route: {
      handler(val) {
        let that = this;
        if (val.name === "search") {
          that.reload();
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>

<style scoped>
.searchpage {
  box-sizing: border-box;
  float: right;
  width: 80%;
  height: 550px;
}
.searchpage .total {
  padding: 0 20px 0;
  height: 60px;
  text-align: left;
  font-size: 16px;
  line-height: 60px;
  font-weight: 650;
}
.navBar ul {
  padding: 0 20px 0;
  list-style: none;
}
.navBar li {
  float: left;
  margin-left: 5px;
  width: 80px;
  height: 35px;
  line-height: 35px;
  color: #606266;
}
.navBar li:hover {
  cursor: pointer;
  color: #000000;
}
.navBar .active {
  font-weight: 650;
  color: #000000;
  border-bottom: 3px solid #ac97db;
}
.mv:hover {
  cursor: pointer;
  color: #ac97db;
}
.down:hover {
  cursor: pointer;
  color: #ac97db;
}
</style>
