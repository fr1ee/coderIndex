<template>
<div>
  <div class="wrap">
    <div class="container mainblock" v-for="(item, index) in webdata" :key="item.id">
        <div :id="item.name" class="large greenPulse button animationRepeat partTitle">{{item.typeTitle}}</div>
        <div class="row">
            <div class="col-md-4 button_link" v-for="web in item.websites" :key="web.id">
                <div class="card">
                    <div class="card-body">
                        <h3><a :href="web.url"  target="_blank">{{web.name}}</a></h3>
                        <!-- <img src="./images/code.png" alt="网站图标" class="float-left img-samllsize"> -->
                        <p class="card-text">{{web.sentence}}</p>
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
<!--左侧菜单-->
<div class="nav-main">
    <div class="nav-box">
        <div class="nav">
            <ul class="nav-ul">
                <li><a href="#" class="home"><span>学习</span></a></li>
                <li><a href="#" class="develop"><span>Web Developer</span></a></li>
                <li><a href="#" class="wechat"><span>Java Programmer</span></a></li>
                <li><a href="#" class="case"><span>项目相关</span></a></li>
                <li><a href="#" class="news"><span>耳聪目明</span></a></li>
                <li><a href="#" class="contact"><span>Ming</span></a></li>
            </ul>
        </div>
        <div class="nav-slide">
            <div class="nav-slide-o">
                <ul>
                    <li><a href="#英语"><span>英语</span></a></li>
                    <li><a href="#日语"><span>日语</span></a></li>
                    <li><a href="#口琴"><span>口琴</span></a></li>
                    <li><a href="#文档"><span>文档</span></a></li>
                    <li><a href="#自学站点"><span>自学站点</span></a></li>
                    <li><a href="#在线工具"><span>在线工具</span></a></li>
                    <li><a href="#开发工具链"><span>开发工具链</span></a></li>
                    <li><a href="#安全"><span>安全</span></a></li>
                    <li><a href="#大数据"><span>大数据</span></a></li>
                </ul>
            </div>
            <div class="nav-slide-o">
                <ul>
                    <li><a href="#CSS框架"><span>CSS框架</span></a></li>
                    <li><a href="#JS特效"><span>JS特效</span></a></li>
                    <li><a href="#React"><span>React</span></a></li>
                    <li><a href="#Angular"><span>Angular</span></a></li>
                    <li><a href="#Vue"><span>Vue</span></a></li>
                    <li><a href="#UI"><span>UI</span></a></li>
                    <li><a href="#源码"><span>源码</span></a></li>
                    <li><a href="#H5游戏"><span>H5游戏</span></a></li>
                    <li><a href="#微信开发"><span>微信开发</span></a></li>
                    <li><a href="#chrome插件开发"><span>chrome插件开发</span></a></li>
                </ul>
            </div>
            <div class="nav-slide-o">
                <ul>
                    <li><a href="#JAVA基础"><span>JAVA基础</span></a></li>
                    <li><a href="#SQL"><span>SQL</span></a></li>
                    <li><a href="#JSP"><span>JSP</span></a></li>
                    <li><a href="#微服务"><span>微服务</span></a></li>
                </ul>
            </div>
            <div class="nav-slide-o">
                <ul>
                    <li><a href="#采编发"><span>采编发</span></a></li>
                    <li><a href="#评论管理平台"><span>评论管理平台</span></a></li>
                    <li><a href="#网站导航"><span>网站导航</span></a></li>
                </ul>
            </div>
            <div class="nav-slide-o">
                <ul>
                    <li><a href="#行业动态"><span>行业动态</span></a></li>
                    <li><a href="#科技新闻"><span>科技新闻</span></a></li>
                    <li><a href="#社会新闻"><span>社会新闻</span></a></li>
                    <li><a href="#优秀论坛"><span>优秀论坛</span></a></li>
                </ul>
            </div>
            <div class="nav-slide-o">
                <ul>
                    <li><a href="#服务器"><span>服务器</span></a></li>
                    <li><a href="#代码托管"><span>代码托管</span></a></li>
                    <li><a href="#东软常用"><span>东软常用</span></a></li>
                    <li><a href="#娱乐"><span>娱乐</span></a></li>
                    <li><a href="#购物"><span>购物</span></a></li>
                    <li><a href="#个人介绍"><span>个人介绍</span></a></li>
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
import websiteData from "../../static/websites.json";
import "../assets/js/jquery.min.js"
import "../assets/js/index.js";
console.log(websiteData);
websiteData;
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      message: "Hello Vue!",
      webdata: websiteData
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
