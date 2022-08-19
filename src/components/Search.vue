<template>
  <div class="search">
    <div>
      <i class="iconfont icon-sousuo"></i>
    </div>
    <input type="text" v-model="searchV" @keyup.enter="toSearch" />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      searchV: "",
    };
  },
  methods: {
    //回车搜索动作
    toSearch() {
      if (this.searchV === "") {
        this.$message({
          message: "输入值不能为空！",
          type: "warning",
        });
      } else {
        this.$store.dispatch("Search", this.searchV);
        this.$router.push("/search/" + this.searchV);
      }
    },
  },
  watch: {
    $route: {
      handler(val) {
        if (val.name === "search") {
          this.searchV = val.params.searchValue;
          this.$store.dispatch("Search", this.searchV);
        } else {
          this.searchV = "";
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>

<style scoped>
.search {
  position: absolute;
  left: 400px;
  top: 50%;
  transform: translate(0, -50%);
  width: 330px;
  height: 30px;
}
.search input {
  float: left;
  width: 280px;
  height: 30px;
  padding: 0;
  outline: none;
  background-color:  #b7afc7;
  border: 1px solid  #b7afc7;
  color: #ffffff;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
.search div {
  float: left;
  width: 30px;
  height: 30px;
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  background-color:  #b7afc7;
  border: 1px solid #b7afc7;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}
.search i {
  font-size: 20px;
}
</style>