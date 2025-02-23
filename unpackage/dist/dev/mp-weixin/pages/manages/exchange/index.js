"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_tabs2 = common_vendor.resolveComponent("uv-tabs");
  const _easycom_uv_tags2 = common_vendor.resolveComponent("uv-tags");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_input2 + _easycom_uv_tabs2 + _easycom_uv_tags2 + _easycom_uv_button2)();
}
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_tabs = () => "../../../uni_modules/uv-tabs/components/uv-tabs/uv-tabs.js";
const _easycom_uv_tags = () => "../../../uni_modules/uv-tags/components/uv-tags/uv-tags.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_tabs + _easycom_uv_tags + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const tabs = common_vendor.ref([
      { name: "全部", key: 1 },
      { name: "未開始", key: 2 },
      { name: "進行中", key: 3 },
      { name: "已下架", key: 4 },
      { name: "已結束", key: 5 }
    ]);
    const handleAdd = () => {
      common_vendor.index.navigateTo({
        url: "/pages/manages/exchange/add-exchange"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["prefix-icon"]: "search",
          placeholder: "請輸入活動名稱",
          border: false
        }),
        b: common_vendor.p({
          list: tabs.value,
          ["line-color"]: "#c74336",
          scrollable: false
        }),
        c: common_vendor.p({
          text: "未開始",
          plain: true,
          size: "mini",
          type: "primary"
        }),
        d: common_vendor.o(handleAdd),
        e: common_vendor.p({
          type: "primary"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e140dfed"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/exchange/index.js.map
