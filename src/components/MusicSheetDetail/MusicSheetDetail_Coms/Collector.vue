<template>
  <div class="collector">
    <div class="collector-container">
      <div
        class="collectorItem"
        v-for="(item, index) in collectorData"
        :key="index"
      >
        <div class="collectImg">
          <img :src="item.avatarUrl" />
        </div>
        <div class="collectorName">{{ item.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collector",
  props: ["songListData"],
  data() {
    return {
      collectorData: [],
    };
  },
  created() {
    this.getCollectorData(this.songListData); //获取收藏者数据
  },
  methods: {
    //获取收藏者数据
    getCollectorData(value) {
      this.collectorData = value.subscribers.slice(0, 6);
    },
  },
};
</script>

<style scoped>
.collector {
  width: 100%;
}
.collector-container {
  width: 100%;
}
.collector {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px 0;
  width: 100%;
}
.collectorItem {
  display: inline-block;
  position: relative;
  margin-top: 20px;
  margin-left: 10px;
  width: 250px;
  height: 110px;
}
.collectImg {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(0, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.collectImg img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.collectorName {
  position: absolute;
  top: 50%;
  left: 90px;
  transform: translate(0, -50%);
  width: 180px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.collectorName:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>