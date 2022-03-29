<template>
  <div class="persondata">
    <div class="title">编辑个人资料</div>
    <div style="margin-top: 50px">
      <div class="tebleLeft">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="昵称：">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="介绍：">
            <el-input type="textarea" v-model="form.signature"></el-input>
          </el-form-item>
          <el-form-item label="性别：" style="text-align: left">
            <el-radio-group v-model="form.gender">
              <el-radio :label="0">保密</el-radio>
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日：">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="请选择日期"
                v-model="form.birthday"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <div style="margin-top: 50px">
            <el-button type="danger" round @click="onSubmit">保存</el-button>
            <el-button @click="back" round>取消</el-button>
          </div>
        </el-form>
      </div>
      <div class="tebleRight">
        <img :src="avatarUrl" />
        <!-- <div>
          <button class="avatarUrl_btn">修改头像</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonData",
  components: {},
  data() {
    return {
      form: {
        nickname: "",
        gender: "",
        birthday: "",
        signature: "",
      },
      avatarUrl: "",
    };
  },
  created() {
    this.form.nickname = this.$store.state.nickname;
    const userId = this.$store.state.userId;
    this.axios.get("user/detail?uid=" + userId).then((res) => {
      this.avatarUrl = res.data.profile.avatarUrl;
      this.form.gender = res.data.profile.gender;
      this.form.signature = res.data.profile.description;
      const lastTime = res.data.profile.birthday;
      let date = new Date(lastTime);
      this.form.birthday = date;
    });
  },
  methods: {
    onSubmit() {
      let that = this;
      let time = +new Date(this.form.birthday);
      this.axios
        .get("user/update", {
          params: {
            gender: that.form.gender,
            birthday: time,
            nickname: that.form.nickname,
            signature: that.form.signature,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message.error("修改失败");
          }
        });
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
.persondata {
  box-sizing: border-box;
  float: right;
  width: 80%;
  height: 550px;
}
.persondata .title {
  padding: 0 20px 0;
  height: 60px;
  text-align: left;
  font-size: 18px;
  line-height: 60px;
  font-weight: 650;
}
.tebleLeft {
  float: left;
  width: 60%;
  height: 500px;
}
.tebleRight {
  float: right;
  width: 30%;
  height: 500px;
}
.tebleRight img {
  width: 200px;
  border-radius: 5px;
}
.avatarUrl_btn {
  margin: 20px auto;
  width: 100px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(116, 110, 110, 0.5);
  border-radius: 15px;
  cursor: pointer;
}
.avatarUrl_btn:hover {
  background-color: rgb(241, 241, 241);
}
</style>