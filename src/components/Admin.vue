<template>
  <div class="admin">
    <el-card class="box-card">
      <div class="isloginTop">
        <div class="isloginTop_item">
          <div class="count">
            {{ DCount }}
          </div>
          动态
        </div>
        <div class="isloginTop_item">
          <div class="count">
            {{ GCount }}
          </div>
          关注
        </div>
        <div class="isloginTop_item">
          <div class="count">
            {{ FCount }}
          </div>
          粉丝
        </div>
      </div>
      <div class="isloginBottom">
        <ul class="isloginBottom_item">
          <li>
            <div class="isloginBottom_item_left">
              <span class="isloginBottom_item_left_icon"
                ><i class="iconfont icon-gerenziliao"></i
              ></span>
              <span class="isloginBottom_item_left_text" @click="toPersondata"
                >个人信息
              </span>
            </div>
          </li>
          <li @click="showLevel">
            <div class="isloginBottom_item_left">
              <span class="isloginBottom_item_left_icon"
                ><i class="iconfont icon-xunzhang"></i
              ></span>
              <span class="isloginBottom_item_left_text">等级 </span>
              <span class="isloginBottom_item_left_text_level">
                LV{{ Level }}
              </span>
            </div>
          </li>
          <li>
            <div class="isloginBottom_item_left">
              <span class="isloginBottom_item_left_icon">
                <i class="iconfont icon-iconfonticon2"></i>
              </span>
              <span class="isloginBottom_item_left_text" @click="exit"
                >退出登录
              </span>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Admin",
  components: {},
  data() {
    return {
      DCount: 0,
      GCount: 0,
      FCount: 0,
      Level: 0,
    };
  },
  created() {
    this.getPersonalData(); //获取用户详细信息
  },
  methods: {
    //获取用户详细信息
    getPersonalData() {
      const userId = this.$store.state.userId;
      this.axios.get("user/detail?uid=" + userId).then((res) => {
        const level = res.data.level;
        const eventCount = res.data.profile.eventCount;
        const followeds = res.data.profile.followeds;
        const follows = res.data.profile.follows;
        this.DCount = eventCount;
        this.GCount = follows;
        this.FCount = followeds;
        this.Level = level;
      });
    },
    //显示等级
    showLevel() {
      this.$message("等级：" + this.Level);
    },
    exit() {
      this.$store.dispatch("LogOut").then(() => {
        this.$message({
          message: "退出成功",
          type: "success",
          duration: 800,
        });
      });
    },
    toPersondata() {
      this.$router.push("/persondata");
    },
  },
};
</script>
<style scoped>
.admin {
  z-index: 9999;
}
.box-card {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(0, 27%);
  width: 300px;
  height: 220px;
  z-index: 9999;
}
.isloginTop {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #c0c4cc;
}
.isloginTop_item {
  box-sizing: border-box;
  float: left;
  margin-top: 5px;
  width: 86px;
  font-size: 13px;
  color: #787a7c;
}
.isloginTop_item:hover {
  color: #4b4d4e;
  cursor: pointer;
}
.isloginTop_item .count {
  font-weight: 700;
  font-size: 20px;
}
.isloginBottom {
  width: 100%;
  height: 50px;
}
.isloginBottom_item {
  padding: 0;
  list-style: none;
}
.isloginBottom_item li {
  width: 260px;
  height: 32px;
  margin-top: 5px;
  font-size: 15px;
  line-height: 28px;
}
.isloginBottom_item li:hover {
  background-color: rgb(248, 245, 245);
  cursor: pointer;
}
.isloginBottom_item_left {
  float: left;
  padding: 0 20px;
  width: 230px;
  height: 30px;
  font-size: 13px;
  font-weight: 540;
  text-align: left;
  color: #606266;
}
.isloginBottom_item_left_icon {
  font-size: 28px;
}
.isloginBottom_item_left_text {
  margin-left: 15px;
  width: 80px;
  height: 30px;
}
.isloginBottom_item_left_text_level {
  float: right;
  height: 30px;
  line-height: 40px;
  color: #909399;
}
</style>
