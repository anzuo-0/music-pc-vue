<template>
  <div class="audio">
    <aplayer
      :audio="audio"
      :lrcType="0"
      autoplay
      :listMaxHeight="155"
      ref="aplayer"
    ></aplayer>
  </div>
</template>

<script>
export default {
  name: "Audio",
  components: {},
  data() {
    return {
      audio: [],
      backSongsId: [],
    };
  },
  methods: {
    //获取歌曲url
    getSongUrl(songs) {
      return new Promise((resolve, reject) => {
        this.axios
          .get("song/url?id=" + songs)
          .then((res) => {
            let msongs = [];
            const data = res.data.data;
            for (let i = 0; i < data.length; i++) {
              let obj = {
                id: data[i].id,
                url: data[i].url,
              };
              msongs.push(obj);
            }
            resolve(msongs);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //获取歌曲详细信息
    getSongDetai(songs) {
      let that = this;
      return new Promise((resolve, reject) => {
        this.axios
          .get("song/detail?ids=" + songs)
          .then((res) => {
            let detai = [];
            that.backSongsId = res.data.songs;
            let data = that.backSongsId;
            if (data.length !== 0) {
              for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].ar.length; j++) {
                  const lrc =
                    "http://localhost:3000/" + "lyric?id=" + data[i].id;
                  let obj = {
                    id: data[i].id,
                    name: data[i].name,
                    artist: data[i].ar[j].name,
                    cover: data[i].al.picUrl,
                    lrc: lrc,
                  };
                  detai.push(obj);
                }
              }
            }
            resolve(detai);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //异步合并数据
    async playMusic(songs) {
      const getSongUrl = await this.getSongUrl(songs);
      const getSongDetai = await this.getSongDetai(songs);
      getSongUrl.map((val) => {
        getSongDetai.map((val1) => {
          if (val.id === val1.id) {
            return Object.assign(val, val1);
          }
        });
      });
      this.audio = getSongUrl;
    },
    async getLrc(e) {
      const songUrl = e.path[0].currentSrc;
      const playingSong = this.audio.filter((item) => {
        return item.url === songUrl;
      });
      const playingSongId = playingSong[0].id;
      this.axios
        .get("/lyric?id=" + playingSongId)
        .then((res) => {
          const LrcData = res.data.lrc.lyric;
          playingSong[0].lrc = LrcData;
        })
        .catch((err) => {
          console.error(err);
        });
      // console.log(e.path[0].currentSrc);
    },
  },
  computed: {
    contractSong() {
      return this.$store.state.songList;
    },
  },
  watch: {
    contractSong: {
      immediate: true,
      handler: function (songs) {
        if (songs.length != 0) {
          this.playMusic(songs);
        }
      },
    },
  },
};
</script>

<style scoped>
.audio {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid #c0c4cc;
  z-index: 9999;
}
</style>
