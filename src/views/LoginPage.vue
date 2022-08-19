<template>
  <div class="loginPage">
    <div class="mask" @click="close"></div>
    <el-card class="box-card" v-if="!QR">
      <div class="toErwei" @click="toQR">
        <img src="../assets/images/erwei.png" />
      </div>
      <div class="title">登录</div>
      <el-form
        label-position="right"
        label-width="80px"
        :model="formLabelAlign"
        :rules="rules"
        ref="formLabelAlign"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formLabelAlign.phone"
            placeholder="请输入手机号码"
            style="width: 280px"
            @keyup.enter.native="logining('formLabelAlign')"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="formLabelAlign.password"
            placeholder="请输入密码"
            style="width: 280px"
            @keyup.enter.native="logining('formLabelAlign')"
          ></el-input>
        </el-form-item>
      </el-form>
      <button class="loginbtn" @click="logining('formLabelAlign')">登录</button>
    </el-card>
    <el-card class="box-card" v-else>
      <div class="qrTop">扫码登录</div>
      <div class="qrCode">
        <img :src="qrurl" crossOrigin="anonymous" ref="getiDOM" />
      </div>
      <div class="content" ref="nickname">{{ nickname }}</div>
      <div class="qrBottom" @click="QR = false">使用手机号登录></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      QR: false,
      //手机号表单数据
      formLabelAlign: {
        phone: "",
        password: "",
      },
      qrurl: "",
      timeOut: false,
      nickname: "使用网易云App扫码登录",
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { max: 11, message: "请输入11位正确的手机号", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //遮罩关闭
    close() {
      this.$router.go(-1);
    },
    // 验证表单并提交
    logining(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("Login", this.formLabelAlign);
        } else {
          return false;
        }
      });
    },
    // 异步获取QR key
    async checkStatus(key) {
      const res = await this.axios({
        url: `login/qr/check?key=${key}`,
      });
      return res.data;
    },
    // 异步QR进行登录
    async toQR() {
      this.QR = true;
      this.timeOut = false;
      this.nickname = "使用网易云App扫码登录";
      let timer;
      const res = await this.axios({
        url: `login/qr/key`,
        // withCredentials: true, //关键
      });
      const key = res.data.data.unikey;
      const res2 = await this.axios({
        url: `login/qr/create?key=${key}&qrimg=true`,
        // withCredentials: true, //关键
      });
      this.$nextTick(() => {
        this.$refs.getiDOM.style.borderRadius = "0";
      });
      this.qrurl = res2.data.data.qrimg;

      timer = setInterval(async () => {
        const statusRes = await this.checkStatus(key);
        // 登录超时
        if (statusRes.code === 800) {
          this.timeOut = true;
          clearInterval(timer);
        }
        // 正在登录状态
        if (statusRes.code === 802) {
          this.$nextTick(() => {
            this.$refs.getiDOM.style.borderRadius = "50%";
          });
          this.$nextTick(() => {
            this.$refs.nickname.style.marginTop = "20px";
          });
          this.qrurl = statusRes.avatarUrl;
          this.nickname = statusRes.nickname;
        }
        // 登录成功
        if (statusRes.code === 803) {
          const cookie = statusRes.cookie;
          //将cookie提交到vuex
          this.$store.dispatch("QRLogin", cookie);
          clearInterval(timer);
          // await this.getLoginStatus();
        }
      }, 3000);
      // 组件销毁删除计时器
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    },
  },
  watch: {
    // 监听定时器
    timeOut: function (newVal) {
      if (newVal) {
        this.toQR();
      }
    },
    deep: true,
  },
};
</script>

<style scoped>
@import "../assets/css/loginBg.css";
.box-card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 500px;
  z-index: 99;
}
.title {
  margin-top: 70px;
  width: 100%;
  height: 80px;
  font-size: 25px;
}
.loginbtn {
  margin-top: 40px;
  width: 200px;
  height: 40px;
  border: 0;
  border-radius: 5px;
  background-color: #ec4747;
  color: #fff;
}
.loginbtn:hover {
  background-color: #cf3c3c;
  cursor: pointer;
}
.toErwei {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 64px;
  cursor: pointer;
}
.qrTop {
  margin-top: 40px;
  width: 100%;
  height: 80px;
  font-size: 25px;
  line-height: 80px;
}
.qrBottom {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 180px;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: #909399;
  cursor: pointer;
}
.qrCode img {
  width: 180px;
  height: 180px;
}
.el-form-item /deep/ .el-form-item__error {
  margin-left: 40px;
}
</style>
