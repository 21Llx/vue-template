import {request} from "./request"

export function testApi1(params={}){
  return request({
    url: "/api/api1",
    method: "post",
    params,
    option:{
      showSuccessMessage:true,
    }
  })
}

export function testApi2(params={}){
  return request({
    url: "/api/api2",
    method: "get",
    params,
    loading:false
  })
}