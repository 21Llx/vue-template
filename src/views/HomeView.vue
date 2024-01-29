<template>
  <div class="home">
    <!-- <h1>this is Home</h1> -->
    <el-button @click="apiRequest">request</el-button>
    <el-button @click="apiRequest2">request2</el-button>
    <el-upload
    action=""
      class="upload-demo"
      multiple
      :limit="3"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="handleChange"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-button @click="handleFileUpload">上传</el-button>
    
  </div>
</template>

<script>
import { testApi1, testApi2, uploadFile } from "../api/testApi";
export default {
  name: "HomeView",
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    apiRequest() {
      testApi1({ a: 1 })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    apiRequest2() {
      testApi2({ a: 233 })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
    handleChange(file,fileList){
      console.log(file)
      console.log(fileList)
      // this.handleFileUpload(file.raw)
    },
    handleFileUpload(file) {
      const formData = new FormData();
        formData.append("file", file);
        uploadFile(formData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>
