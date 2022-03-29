<template>
  <div class="toppage">
    <TopMusicBig
      :list="TopMusicBigList"
      :EverySongId="EverySongId"
    ></TopMusicBig>
  </div>
</template>

<script>
import TopMusicBig from "../components/TopMusicBig.vue";

export default {
  name: "TopPage",
  components: { TopMusicBig },
  data() {
    return {
      TopMusicBigList: [],
      EverySongUrl: [],
      EverySong: [],
      EverySongId: [],
    };
  },
  created() {
    this.getTop(); //获取排行榜歌单
  },
  methods: {
    //获取排行榜歌单
    getTop() {
      this.axios
        .get("toplist")
        .then((res) => {
          const list = res.data.list;
          this.TopMusicBigList = list.slice(0, 4);
          this.TopMusicBigList.forEach((value) => {
            this.EverySong.push(value.id);
          });
          this.getSongList();
          this.axios
            .all(
              this.EverySongUrl.map((url) => {
                return this.axios.get(url);
              })
            )
            .then((res) => {
              this.EverySong = res;
              this.getSeeSong();
              this.toTopListDetail(this.EverySong);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //拼接歌单url
    getSongList() {
      this.EverySong.forEach((value) => {
        this.EverySongUrl.push("playlist/detail?id=" + value);
      });
    },
    //获取每个歌单前五首展示歌曲id
    getSeeSong() {
      this.EverySong.forEach((value) => {
        this.EverySongId.push(value.data.privileges.slice(0, 5));
      });
    },
    //传递toplist数据到vuex
    toTopListDetail(list) {
      this.$store.dispatch("GetsongDetail", list);
    },
  },
};
</script>

<style scoped>
.toppage {
  padding: 10px;
  height: 550px;
  overflow-y: scroll;
}
</style>
