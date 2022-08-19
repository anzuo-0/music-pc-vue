<template>
  <div id="content">
    <div id="sideMeun">
      <ul class="sideIn">
        <router-link to="/index">
          <li>发现音乐</li>
        </router-link>
      </ul>
      <ul class="rank">
        <router-link to="/top_music">
          <li>排行榜</li>
        </router-link>
      </ul>
      <ul class="sideIn">
        <router-link to="/rePlay">
          <li>
            <i
              class="iconfont icon-zuijinbofang"
              style="padding-right: 8px"
            />最近播放
          </li>
        </router-link>
      </ul>
      <ul class="sideIn">
        <router-link to="/myLikeMusic">
          <li>
            <i
              class="iconfont icon-aixin"
              style="padding-right: 8px"
            />我喜欢的音乐
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  components: {},
};
</script>
<style scoped>
* {
  text-decoration: none;
}
.sideIn a,.rank a:visited {
  color: #000000;
}
.sideIn a:visited,.rank a:visited {
  color: #000000;
}
.nav #content {
  width: 100%;
  height: 550px;
}
.sideIn {
  padding: 0;
}
.sideIn li ,.rank li{
  margin: 5px auto;
  padding-left: 20px;
  list-style: none;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
}
.sideIn li:hover ,.rank li:hover{
  background-color: rgb(236, 234, 234);
  cursor: pointer;
}
.sideContent {
  padding-left: 20px;
  font-size: 13px;
  color: rgb(116, 111, 111);
}
.router-link-active li {
  color: #000000;
  font-weight: 650;
  background-color: rgb(236, 234, 234);
}
</style>
