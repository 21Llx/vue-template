import service from "./index";

export function request({
  url,
  params,
  method = "POST",
  headers = {},
  loading = true,
  option = {},
}) {
  /**
   * 处理option配置参数
   * TODO
   * 。。。。。。
   */
  let defaultOption = {
    // 请求失败消息参数
    showErrorMessage: true,
    useErrorResMessage: true,
    customErrorMessage: "操作失败",
    // 请求成功消息参数
    showSuccessMessage: false,
    useSuccessResMessage: false,
    customSuccessMessage:"操作成功"

  };
  let _option = {
    ...defaultOption,
    ...option,
  };
  return service({
    url,
    params, //接口参数
    method,
    headers,
    loading,
    option: _option,
  });
}
