<template>
  <div class="comment">
    <div class="main">
      <el-input
        type="textarea"
        v-model="myComment"
        maxlength="140"
        show-word-limit
        @keyup.enter.native="postComment"
      >
      </el-input>
      <div class="btn" style="margin-top: 15px; text-align: right">
        <el-button round size="small" @click="postComment">评论</el-button>
      </div>
      <div class="wonComment">
        <div class="title">精彩评论</div>
        <div class="wonCommentList">
          <ul v-for="(item, index) in hotComments" :key="index">
            <li>
              <template>
                <span class="wConmmentAvatar">
                  <img :src="item.user.avatarUrl" />
                </span>
                <div class="wConmmentDetailed">
                  <div class="wConmmentDetailed_top">
                    <span class="wConmmentnickName">
                      {{ item.user.nickname }}：
                    </span>
                    <span>{{ item.content }}</span>
                  </div>
                  <div class="wConmmentDetailed_bottom">{{ item.time }}</div>
                </div>
              </template>
            </li>
          </ul>
        </div>
      </div>
      <div class="wonComment">
        <div class="title">最新评论({{ total }})</div>
        <div class="wonCommentList">
          <ul v-for="(item, index) in Comments" :key="index">
            <li>
              <span class="wConmmentAvatar">
                <img :src="item.user.avatarUrl" />
              </span>
              <div class="wConmmentDetailed">
                <div class="wConmmentDetailed_top">
                  <span class="wConmmentnickName">
                    {{ item.user.nickname }}：
                  </span>
                  <span>{{ item.content }}</span>
                </div>
                <div class="wConmmentDetailed_bottom">{{ item.time }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { commentTime } from "../../../utils/commentTime";
export default {
  name: "Comment",
  data() {
    return {
      myComment: "",
      total: 0,
      hotComments: [],
      Comments: [],
      currentPage: 1,
    };
  },
  created() {
    //获取第一页评论的数据
    this.getFirstComment();
  },
  methods: {
    //获取第一页评论的数据
    getFirstComment() {
      const musicSheetDetailId = this.$store.state.musicSheetDetailId;
      this.axios
        .get("comment/playlist?id=" + musicSheetDetailId)
        .then((res) => {
          const commentData = res.data;
          const hotComments = commentData.hotComments;
          const comments = commentData.comments;
          //转换热评时间
          for (let i = 0; i < hotComments.length; i++) {
            hotComments[i].time = commentTime(hotComments[i].time);
          }
          //转换普通评论时间
          for (let i = 0; i < comments.length; i++) {
            comments[i].time = commentTime(comments[i].time);
          }
          this.total = commentData.total;
          this.hotComments = hotComments;
          this.Comments = comments;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //切换页面获取数据
    handleCurrentChange(val) {
      const musicSheetDetailId = this.$store.state.musicSheetDetailId;
      const page = val;
      const offset = (page - 1) * 20;
      this.axios
        .get(`comment/playlist?id=${musicSheetDetailId}&offset=${offset}`)
        .then((res) => {
          const commentData = res.data;
          const comments = commentData.comments;
          //转换普通评论时间
          for (let i = 0; i < comments.length; i++) {
            comments[i].time = commentTime(comments[i].time);
          }
          this.Comments = comments;
        });
    },
    //发送评论
    postComment() {
      const userID = this.$store.state.userId;
      if (userID) {
        const musicSheetDetailId = this.$store.state.musicSheetDetailId;
        const content = this.myComment;
        this.axios
          .get(`comment?t=1&type=2&id=${musicSheetDetailId}&content=${content}`)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: "评论成功",
                type: "success",
              });
              const nowTime = Date.now();
              const myData = {
                user: {
                  nickname: this.$store.state.nickname,
                  avatarUrl: this.$store.state.avatarUrl,
                },
                content: content,
                time: commentTime(nowTime),
              };
              this.Comments.unshift(myData);
              this.myComment = "";
            } else {
              this.$message.error("评论失败");
            }
          });
      } else {
        this.$message.error("请先进行登录");
      }
    },
  },
};
</script>

<style scoped>
.comment {
  width: 100%;
}
.main {
  margin: 10px auto;
  width: 95%;
}
.wonComment .title {
  margin: 15px 10px;
  width: 100%;
  text-align: left;
  color: #000000;
  font-weight: 600;
  font-size: 15px;
}

.wonCommentList ul {
  list-style: none;
}
.wonCommentList li {
  margin: 0 auto;
  width: 95%;
  height: 70px;
  border-bottom: 1px solid #dcdfe6;
}
.wConmmentAvatar {
  display: block;
  margin-top: 10px;
  float: left;
  width: 50px;
  height: 50px;
  background-color: pink;
  border-radius: 50%;
  z-index: 99;
}
.wConmmentAvatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.wConmmentDetailed {
  float: left;
  margin-left: 10px;
  width: 80%;
  height: 60px;
}
.wConmmentDetailed_top {
  display: -webkit-box;
  margin-top: 10px;
  width: 100%;
  height: 35px;
  text-align: left;
  font-size: 13px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.wConmmentDetailed_bottom {
  box-sizing: border-box;
  margin-top: 5px;
  width: 80%;
  height: 30px;
  text-align: left;
  color: #606266;
  font-size: 12px;
}
.wonCommentList .wConmmentnickName {
  color: #2979c9;
}
</style>