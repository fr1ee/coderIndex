<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="名称">
      <el-input v-model="form.name" type="text" placeholder="公众号名字" maxlength="7" show-word-limit></el-input>
    </el-form-item>
    <el-form-item label="头像">
      <el-upload
        class="avatar-uploader"
        :action="backendUrl+uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="coverImage" :src="coverImage" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="二维码">
      <el-upload
        class="avatar-uploader"
        :action="backendUrl+uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess2"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="erweima" :src="erweima" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即添加</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  name: "AddWechat",
  data() {
    return {
      currentDate: new Date(),
      backendUrl: "http://39.105.78.234:7001",
      uploadUrl: "/api/v1/fileupload",
      squareUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      data: [],
      form: {
        name: "",
        id: "",
        coverImage: "",
        erweima: "",
        discription: "",
        modifyTime: "",
        categoryId: ""
      },
      coverImage: "",
      erweima: ""
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      console.log("submit!");
      this.insertSites();
    },
    handleAvatarSuccess(res, file) {
      this.form.coverImage = res.url;
      this.coverImage = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    handleAvatarSuccess2(res, file) {
      this.form.erweima = res.url;
      this.erweima = URL.createObjectURL(file.raw);
    },
    insertSites() {
      let params = this.form;
      if (!params.name || !params.coverImage || !params.erweima) {
        this.$message.error('呼~信息要填全');
        return;
      }
      this.$http.post(this.backendUrl + "/insertWechats", params).then(data => {
        this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        });
        this.$router.push("/wechat/show");
      });
    }
  },
  created() {}
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>