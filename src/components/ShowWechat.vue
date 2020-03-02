<template>

  <el-row :gutter="20">
    <el-col  :xs="24" :sm="12" :md="6" :lg="6" :xl="4" v-for="(o, index) in data" :key="o.id" >
      <el-card :body-style="{ padding: '0px' }">
        <img
          :src="backendUrl+o.erweima"
          class="image"
        > 

        <div style="padding: 14px;">
           <span class="title">{{o.name}}</span>
            <el-avatar class="headImg" shape="square" :size="64" :src="backendUrl+o.coverImage"></el-avatar>
            
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>


<script>
export default {
  name: "ShowWechat",
  data() {
    return {
      currentDate: new Date(),
      backendUrl:"http://39.105.78.234:7001",
      gongzhonghao: {
        name: "",
        id: "",
        coverImage: "",
        erweima: "",
        discription: "",
        modifyTime: "",
        categoryId: ""
      },
      squareUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      data:[]
    };
  },
  computed: {},
  methods: {},
  // 页面加载之前，用created钩子函数-获取网页数据
  created() {
    this.$http.get(this.backendUrl+"/getAllWechats").then(data => {
    // this.$http.get("/getAllCategorys").then(data => {
      console.log("date:", data.body.websites);
      this.data = data.body.websites;
    });
  }
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.title{
  font-size:24px;
  line-height:64px;
}
.headImg{
  margin-left:15px
}
</style>