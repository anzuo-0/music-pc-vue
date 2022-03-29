<template>
  <div class="toppoageBig">
    <div class="title">官方榜</div>
    <div>
      <ul class="topItem">
        <li v-for="(item, index) in list" :key="index" :index="index">
          <div class="item_img">
            <img :src="item.coverImgUrl" />
          </div>
          <div class="item_songList">
            <component :is="item.coms" />
            <!-- <el-table
              v-loading="loading"
              :data="song0"
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
            <div class="seeAll">查看全部></div> -->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from "../eventBus/eventBus";
import TopMusicList_F from "./TopMusicList/TopMusicList_F.vue";
import TopMusicList_X from "./TopMusicList/TopMusicList_X.vue";
import TopMusicList_Y from "./TopMusicList/TopMusicList_Y.vue";
import TopMusicList_R from "./TopMusicList/TopMusicList_R.vue";

export default {
  name: "TopMusicBig",
  components: {
    TopMusicList_F,
    TopMusicList_X,
    TopMusicList_Y,
    TopMusicList_R,
  },
  data() {
    return {
      navActiveIndex: 0,
      comList: [
        "TopMusicList_F",
        "TopMusicList_X",
        "TopMusicList_Y",
        "TopMusicList_R",
      ], // 组件列表
      topItem: [],
      song0Url: [],
      song1Url: [],
      song2Url: [],
      song3Url: [],
      song4Url: [],
    };
  },
  props: ["list", "EverySongId"],

  computed: {
    iscomponent() {
      return "record-" + this.comList[this.navActiveIndex];
    },
  },

  watch: {
    EverySongId: function (item) {
      //飙升榜
      const song0 = item[0];
      this.getSong0(song0);
      //新歌榜
      const song1 = item[1];
      this.getSong1(song1);
      //原创榜
      const song2 = item[2];
      this.getSong2(song2);
      //热歌榜
      const song3 = item[3];
      this.getSong3(song3);
    },
    list: function (item) {
      for (let i = 0; i < item.length; i++) {
        item[i].coms = this.comList[i];
      }
    },
  },
  methods: {
    //拼接歌单0的url并获取歌曲详细信息
    getSong0(songs) {
      songs.forEach((song) => {
        this.song0Url.push("/song/detail?ids=" + song.id);
      });
      this.axios
        .all(
          this.song0Url.map((url) => {
            return this.axios.get(url);
          })
        )
        .then((res) => {
          bus.$emit("song0", res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //拼接歌单1的url并获取歌曲详细信息
    getSong1(songs) {
      songs.forEach((song) => {
        this.song1Url.push("/song/detail?ids=" + song.id);
      });
      this.axios
        .all(
          this.song1Url.map((url) => {
            return this.axios.get(url);
          })
        )
        .then((res) => {
          bus.$emit("song1", res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //拼接歌单2的url并获取歌曲详细信息
    getSong2(songs) {
      songs.forEach((song) => {
        this.song2Url.push("/song/detail?ids=" + song.id);
      });
      this.axios
        .all(
          this.song2Url.map((url) => {
            return this.axios.get(url);
          })
        )
        .then((res) => {
          bus.$emit("song2", res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //拼接歌单3的url并获取歌曲详细信息
    getSong3(songs) {
      songs.forEach((song) => {
        this.song3Url.push("/song/detail?ids=" + song.id);
      });
      this.axios
        .all(
          this.song3Url.map((url) => {
            return this.axios.get(url);
          })
        )
        .then((res) => {
          bus.$emit("song3", res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<style scoped>
.toppoageBig {
  box-sizing: border-box;
  /* padding: 0 20px 0; */
  /* float: right; */
  width: 100%;
  height: 1080px;
}
.title {
  padding: 0 25px 0;
  width: 80%;
  height: 20px;
  line-height: 30px;
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  color: #000000;
}
.topItem {
  list-style: none;
}
.topItem li {
  margin-top: 5px;
  width: 100%;
  height: 230px;
}
.topItem .item_img {
  float: left;
  width: 25%;
  height: 220px;
  border-radius: 15px;
}
.item_img img {
  margin-top: 10px;
  width: 200px;
  height: 200px;
  border-radius: 15px;
}
.topItem .item_songList {
  float: right;
  margin-top: 15px;
  width: 75%;
  height: 220px;
}
</style>
