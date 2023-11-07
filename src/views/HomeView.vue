<template>
  <div class="home">
    <h1>this is Home</h1>
    <el-button @click="apiRequest">request</el-button>
    <el-button @click="apiRequest2">request2</el-button>
  </div>
</template>

<script>
import {testApi1,testApi2} from "../api/testApi";
export default {
  name: "HomeView",
  created(){
  },
  methods: {
    apiRequest() {
      testApi1({a:1}).then(res=>{
        console.log(res)
      }).catch(err=>{

      })
    },
    apiRequest2() {
      testApi2({a:233}).then(res=>{
        console.log(res)
      }).catch(err=>{

      })
    },
  },
};
</script>
