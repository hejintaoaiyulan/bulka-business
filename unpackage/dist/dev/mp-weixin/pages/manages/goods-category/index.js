"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_popup2 = common_vendor.resolveComponent("uv-popup");
  (_easycom_uv_input2 + _easycom_uv_button2 + _easycom_uv_popup2)();
}
const _easycom_uv_input = () => "../../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_button = () => "../../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_popup = () => "../../../uni_modules/uv-popup/components/uv-popup/uv-popup.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_button + _easycom_uv_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popRef = common_vendor.ref();
    const tags = common_vendor.ref([
      { name: "當季限定", key: 1 }
    ]);
    const handleAddTag = () => {
      var _a;
      (_a = popRef.value) == null ? void 0 : _a.open();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tags.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.key
          };
        }),
        b: common_vendor.o(handleAddTag),
        c: common_vendor.p({
          placeholder: "輸入分類名稱"
        }),
        d: common_vendor.p({
          placeholder: "輸入排序（數字越大排序越靠前）"
        }),
        e: common_vendor.p({
          type: "primary"
        }),
        f: common_vendor.sr(popRef, "9421c97a-0", {
          "k": "popRef"
        }),
        g: common_vendor.p({
          ["custom-style"]: "height: 480rpx",
          mode: "bottom"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9421c97a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/manages/goods-category/index.js.map
