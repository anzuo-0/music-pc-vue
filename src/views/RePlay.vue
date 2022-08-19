<template>
  <div class="replay">
    <div v-if="!isLogin">
      <div class="isntLogin">
        <router-link to="/login">请登录后再进行查看！</router-link>
      </div>
    </div>
    <div v-else>
      <div class="title">
        <span>最近一周播放</span>
        <span class="total"> 共{{ rePlayData.length }}首</span>
      </div>
      <div class="btn">
        <div class="play_all" @click="playAllMusic">播放全部</div>
      </div>
      <div class="replayList">
        <el-table
          :data="rePlayData"
          stripe
          style="width: 100%"
          v-loading="loading"
          @row-dblclick="playMusic"
        >
          <el-table-column type="index" label="id" width="80px" align="center">
          </el-table-column>

          <el-table-column
            prop="song.name"
            label="音乐标题"
            width="300"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="song.ar"
            label="歌手"
            width="240"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-for="(u, i) in scope.row.song.ar" :key="i">
                {{ u.name }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="song.al.name"
            label="专辑"
            width="245"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="song.dt" label="时长" width="90">
          </el-table-column>
        </el-table>
      </div>
      <div style="height: 80px"></div>
    </div>
  </div>
</template>

<script>
import { transTime } from "../utils/transTime";
export default {
  name: "RePlay",
  data() {
    return {
      isLogin: false,
      loading: true,
      rePlayData: [],
    };
  },
  created() {
    this.cheackLogin();
    if (!this.isLogin) {
      this.$message({
        message: "未登录",
        type: "warning",
      });
    } else {
      this.getRePlay();
    }
  },
  methods: {
    cheackLogin() {
      const userId = this.$store.state.userId;
      if (userId) {
        this.isLogin = true;
      }
    },
    //获取最近播放的数据
    getRePlay() {
      const userId = this.$store.state.userId;
      this.axios.get("user/record?uid=" + userId + "&type=1").then((res) => {
        const data = res.data.weekData;
        for (let i = 0; i < data.length; i++) {
          data[i].song.dt = transTime(data[i].song.dt);
        }
        this.rePlayData = data;
        this.loading = false;
      });
    },
    //播放全部歌曲
    playAllMusic() {
      const len = this.rePlayData.length;
      const list = [];
      for (let i = 0; i < len; i++) {
        list.push(this.rePlayData[i].song.id);
      }
      this.$store.dispatch("Playsong", list);
    },
    //双击播放音乐
    playMusic(row) {
      this.$store.dispatch("Playsong", row.song.id);
    },
  },
};
</script>

<style scoped>
.replay {
  float: right;
  width: 80%;
  height: 550px;
  overflow-y: scroll;
}
.isntLogin {
  margin: 200px auto;
  width: 600px;
  height: 50px;
  line-height: 50px;
}

.replay a {
  font-size: 25px;
  letter-spacing: 5px;
  text-decoration: none;
  color: #000000;
}
.replay a:hover {
  color: #ac97db;
;
}
.title {
  margin-top: 10px;
  padding: 0 20px 0 40px;
  width: 80%;
  height: 50px;
  text-align: left;
  line-height: 50px;
  font-size: 20px;
  font-weight: 600;
}
.total {
  display: inline-block;
  margin-left: 30px;
  font-size: 13px;
  font-weight: 500;
  color: #909399;
}
.btn {
  margin-top: 10px;
  margin-left: 40px;
  width: 120px;
  height: 40px;
}
.play_all {
  width: 100px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  letter-spacing: 3px;
  color: #fff;
  background-color: #ac97db;
  border: 0;
}
.play_all:hover {
  cursor: pointer;
  background-color: #ac97db;
}
.replayList {
  margin-top: 10px;
}
</style>