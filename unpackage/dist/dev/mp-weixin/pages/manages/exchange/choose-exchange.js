"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_checkbox2 = common_vendor.resolveComponent("uv-checkbox");
  const _easycom_uv_checkbox_group2 = common_vendor.resolveComponent("uv-checkbox-group");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_input2 + _easycom_uv_checkbox2 + _easycom_uv_checkbox_group2 + _easycom_uv_button2)();
}
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_checkbox = () => "../../../uni_modules/uv-checkbox/components/uv-checkbox/uv-checkbox.js";
const _easycom_uv_checkbox_group = () => "../../../uni_modules/uv-checkbox/components/uv-checkbox-group/uv-checkbox-group.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_checkbox + _easycom_uv_checkbox_group + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "choose-exchange",
  setup(__props) {
    const handleToEdit = () => {
      common_vendor.index.navigateTo({
        url: "/pages/manages/exchange/edit-exchange-goods"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          placeholder: "請輸入商品名稱",
          prefixIcon: "search",
          fontSize: "28rpx",
          border: false
        }),
        b: common_vendor.p({
          name: "1"
        }),
        c: common_vendor.o(handleToEdit),
        d: common_vendor.p({
          name: "1"
        }),
        e: common_vendor.p({
          name: "1"
        }),
        f: common_vendor.p({
          name: "1"
        }),
        g: common_vendor.p({
          type: "primary"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3d7f7736"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/exchange/choose-exchange.js.map
