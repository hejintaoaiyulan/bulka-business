"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_uv_textarea2 = common_vendor.resolveComponent("uv-textarea");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_textarea2 + _easycom_uv_button2)();
}
const _easycom_uv_textarea = () => "../../../uni_modules/uv-textarea/components/uv-textarea/uv-textarea.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_textarea + _easycom_uv_button)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      placeholder: "請輸入"
    }),
    b: common_vendor.p({
      type: "success"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-59819e8b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/comments/reply-comment.js.map
