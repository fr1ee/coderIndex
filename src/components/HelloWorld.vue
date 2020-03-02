<template>
  <div>
    <el-dialog title="添加菜单" :visible.sync="dialogFormVisible">
      <el-form :model="categorys">
        <el-form-item label="categoryName" :label-width="formLabelWidth">
          <el-input v-model="categorys.categoryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="sitesCount" :label-width="formLabelWidth">
          <el-input v-model="categorys.sitesCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="discription" :label-width="formLabelWidth">
          <el-input v-model="categorys.discription" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="parentCategoryId" :label-width="formLabelWidth">
          <el-input v-model="categorys.parentCategoryId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUrl">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加网址" :visible.sync="addWebsiteVisible">
      <el-form :model="newSite">
        <el-form-item label="urlName" :label-width="formLabelWidth">
          <el-input v-model="newSite.urlName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="URL" :label-width="formLabelWidth">
          <el-input v-model="newSite.URL" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="categoryId" :label-width="formLabelWidth">
          <el-input v-model="newSite.categoryId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="discription" :label-width="formLabelWidth">
          <el-input v-model="newSite.discription" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="heat" :label-width="formLabelWidth">
          <el-input v-model="newSite.heat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="clickCount" :label-width="formLabelWidth">
          <el-input v-model="newSite.clickCount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="coverimage" :label-width="formLabelWidth">
          <el-input v-model="newSite.coverimage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="webIcon" :label-width="formLabelWidth">
          <el-input v-model="newSite.webIcon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ip" :label-width="formLabelWidth">
          <el-input v-model="newSite.ip" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addWebsiteVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertSites">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除菜单" :visible.sync="delCategoryIdVisible">
      <el-form>
        <el-form-item label="delCategoryId" :label-width="formLabelWidth">
          <el-input v-model="delCategoryId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delCategoryIdVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteCategorys">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="删除网址" :visible.sync="delWebsiteVisible">
      <el-form>
        <el-form-item label="delWebsiteId" :label-width="formLabelWidth">
          <el-input v-model="delWebsiteId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delWebsiteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteSites">确 定</el-button>
      </div>
    </el-dialog>
    <div class="left-menu">
      <!--左侧菜单-->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpenLeft"
        @close="handleCloseLeft"
        @select="clickLeftMenu"
        :unique-opened=true
      >
        <el-submenu
          v-for="(classifications,index) in webdata"
          :key="classifications.id"
          :index="index.toString()"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{classifications.categoryName}}({{classifications.id}})</span>
          </template>
          <el-menu-item
            :index="items.categoryName"
            v-for="items in classifications.children"
            :key="items.id"
          >{{items.categoryName}}({{items.id}})</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="">
      <div class="wrap">
        <div v-for="classifications in webdata" :key="classifications.id">
          <div
            class="container mainblock"
            v-for="(item, index) in classifications.children"
            :key="item.id"
          >
            <div
              :id="item.categoryName"
              class="large button animationRepeat partTitle"
              v-bind:class="{ 'greenPulse': (index%4==1),'bluePulse': (index%4==2),'pinkPulse': (index%4==3), 'magentaPulse': (index%4==0) }"
            >{{item.categoryName}}</div>
            <div class="row">
              <div class="col-md-3 button_link" v-for="web in item.weburls" :key="web.id">
                <div class="card noradius">
                  <div class="card-body">
                    <h3>
                      <a :href="web.URL" target="_blank">{{web.urlName}}</a>
                    </h3>
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
    </div>
    <div class="">
      <div class="right-menu">
        <el-menu
          default-active="7"
          class=""
          @select="clickRightMenu"
          :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <i class="iconfont icon-baidu"></i>
            <!-- <span slot="title">百度</span> -->
          </el-menu-item>
          <el-menu-item index="2">
            <i class="iconfont icon-google"></i>
            <!-- <span slot="title">google</span> -->
          </el-menu-item>
          <el-menu-item index="3">
            <i class="iconfont icon-shanchufenlei"></i>
            <span slot="title">删除分类</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="iconfont icon-sort"></i>
            <span slot="title">添加分类</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="iconfont icon-shanchu"></i>
            <span slot="title">删除网址</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="iconfont icon-wangzhi"></i>
            <span slot="title">添加网址</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="iconfont icon-ai-top"></i>
            <span slot="title">返回顶部</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
  <!--右侧菜单-->
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
      backendUrl:"http://39.105.78.234:7001",
      message: "Hello Vue!",
      webdata: websiteDataJson,
      isCollapse: true,
      dialogFormVisible: false,
      delCategoryIdVisible: false,
      delWebsiteVisible: false,
      addWebsiteVisible: false,
      delWebsiteId: "",
      delCategoryId: "",
      formLabelWidth: "120px",
      newSite: {
        urlName: "",
        URL: "",
        categoryId: "",
        discription: "",
        heat: "",
        clickCount: "",
        coverimage: "",
        webIcon: "",
        ip: ""
      },
      categorys: {
        categoryName: "",
        sitesCount: 0,
        discription: "",
        parentCategoryId: ""
      }
    };
  },
  computed: {},
  methods: {
    gotoAnchor: function(url) {
      // alert();
      url = "/#" + url;
      this.$router.push({ path: url }); // -> /user/123
    },
    handleOpenLeft(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCloseLeft(key, keyPath) {
      console.log(key, keyPath);
    },
    clickLeftMenu(key, keyPath) {
      this.gotoAnchor(key);
    },
    clickRightMenu(key, keyPath) {
      console.log(key, keyPath);
      switch (key) {
        case "1":
          window.open("http://www.baidu.com");
          break;
        case "2":
          window.open(
            "https://www.google.com.hk/webhp?hl=zh-CN&sourceid=cnhp&gws_rd=ssl"
          );
          break;
        case "3":
          this.delCategoryIdVisible = true;
          break;
        case "4":
          this.dialogFormVisible = true;
          break;
        case "5":
          this.delWebsiteVisible = true;
          break;
        case "6":
          this.addWebsiteVisible = true;
          break;
        case "7":
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
          break;
      }
    },
    addUrl() {
      //   this.dialogFormVisible = false;
      this.insertCategorys();
    },
    insertCategorys() {
      let params = this.categorys;
      this.$http
        .post(this.backendUrl+"/insertCategorys", params)
        .then(data => {
          this.dialogFormVisible = false;
        });
    },
    deleteCategorys() {
      let params = { id: this.delCategoryId };
      this.$http
        .post(this.backendUrl+"/deleteCategorys", params)
        .then(data => {
          this.delCategoryIdVisible = false;
        });
    },
    insertSites() {
      let params = this.newSite;
      this.$http
        .post(this.backendUrl+"/insertSites", params)
        .then(data => {
          this.newSite = {
            urlName: "",
            URL: "",
            categoryId: "",
            discription: "",
            heat: "",
            clickCount: "",
            coverimage: "",
            webIcon: "",
            ip: ""
          };
          this.addWebsiteVisible = false;
        });
    },
    deleteSites() {
      let params = { id: this.delWebsiteId };
      this.$http
        .post(this.backendUrl+"/deleteSites", params)
        .then(data => {
          this.delWebsiteVisible = false;
        });
    },
    getAllCategorys() {
      this.$http.get(this.backendUrl+"/getAllCategorys").then(data => {
      // this.$http.get(backendUrl+"/getAllCategorys").then(data => {
        console.log("date:", data.body.category.children);
        this.webdata = data.body.category.children;
      });
    }
  },
  // 页面加载之前，用created钩子函数-获取网页数据
  created() {
    this.$http.get(this.backendUrl+"/getAllCategorys").then(data => {
    // this.$http.get("/getAllCategorys").then(data => {
      console.log("date:", data.body.category.children);
      this.webdata = data.body.category.children;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 200px; */
  min-height: 400px;
}
.el-row {
  /* margin-bottom: 20px; */
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
