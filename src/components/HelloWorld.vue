<template>
<div>
  <div class="wrap">
    <div v-for="classifications in webdata" :key="classifications.id">
        <div class="container mainblock" v-for="(item, index) in classifications.children" :key="item.id">
            <div :id="item.categoryName" class="large  button animationRepeat partTitle" v-bind:class="{ 'greenPulse': (index%4==1),'bluePulse': (index%4==2),'pinkPulse': (index%4==3), 'magentaPulse': (index%4==0) }">{{item.categoryName}}</div>
            <div class="row">
                <div class="col-md-3 button_link" v-for="web in item.weburls" :key="web.id">
                    <div class="card noradius">
                        <div class="card-body">
                            <h3><a :href="web.URL"  target="_blank">{{web.urlName}}</a></h3>
                            <!-- <img src="./images/code.png" alt="网站图标" class="float-left img-samllsize"> -->
                            <p class="card-text websitesentence">{{web.discription}}</p>
                        </div>
                    </div>
                    <span class="line line_top"></span>
                    <span class="line line_right"></span>
                    <span class="line line_bottom"></span>
                    <span class="line line_left"></span>
                </div>
            </div>
        </div>
    </div>
</div>
<!--左侧菜单-->
<div class="nav-main">
    <div class="nav-box">
        <div class="nav">
            <ul class="nav-ul">
                <li  v-for="classifications in webdata" :key="classifications.id">
                    <a href="#" class="home">
                        <span class="fontStrong">{{classifications.categoryName}}</span>
                    </a>
                </li>
             </ul>
        </div>
        <div class="nav-slide">
            <div class="nav-slide-o" v-for="classifications in webdata" :key="classifications.id">
                <ul>
                    <li v-on:click="gotoAnchor(items.categoryName)" class="leftmenuli" v-for="items in classifications.children" :key="items.id">
                        <span>
                            {{items.categoryName}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</div>
<!--右侧菜单-->
<div class="right-menu">
    <ul>
        <li>
            <a class="button" href="https://www.baidu.com" target="_blank">百度</a>
        </li>
        <li>
            <a class="button" href="https://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp&gws_rd=ssl" target="_blank">Google</a>
        </li>
    </ul>
    <div>
        <p id="back-to-top"><a href="#top"><span></span></a></p>
    </div>
</div>
</div>
</template>

<script>
import websiteDataJson from "../../static/websites.json";
import "../assets/js/jquery.min.js";
import "../assets/js/index.js";
// console.log(websiteData);
var webdata;
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      message: "Hello Vue!",
      webdata: websiteDataJson
    };
  },
  computed: {},
  methods: {
    gotoAnchor: function(url) {
      // alert();
      url = "/#" + url;
      this.$router.push({ path: url }); // -> /user/123
    }
  },
  // 页面加载之前，用created钩子函数-获取网页数据
  beforeCreate() {
    // this.$http.get("http://39.105.78.234:7001/getAllCategorys?wym").then(data => {
    this.$http.get("http://localhost:7001/getAllCategorys/1").then(data => {
      console.log("date:",data.body.category.children);
      this.webdata = data.body.category.children;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
