<script setup>
import { ref, computed, unref } from "vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import UvImage from "../../../uni_modules/uv-image/components/uv-image/uv-image.vue";
import { useFileUpload } from "../../../utils/uploadFile";
import { getGoodsCategory, UploadUrl } from "../../../api/public";
import PickerSelect from "../../../components/PickerSelect.vue";
import { pick } from "lodash";
import {
  getGoodsInfo,
  getGoodsTypes,
  saveGoods,
  getFoodConditionConfig,
} from "../../../api/goods";
import { Toast } from "../../../utils";

const { uploadFile, isUploading } = useFileUpload({ showUploadLoading: true });
const types = ref([]);
const categories = ref([]);
// 試吃商品條件配置
const conditionConfig = ref({
  food_condition_price: 0,
  food_condition_stock: 0,
  food_condition_discount: 0,
});
const formData = ref({
  id: "",
  goods_image: "",
  show_goods_image: "",
  goods_name: "",
  goods_desc: "",
  goods_type_id: "",
  goods_type_name: "",
  goods_spec_type: 1,
  goods_stock: "",
  original_price: "",
  sale_price: "",
  goods_spec: [],
  discount: "",
  top_status: 2,
  publish_status: 2,
  weigh: "",
});

const single = computed(() => {
  return formData.value.goods_spec_type === 1;
});

onLoad((query) => {
  if (query?.id) {
    getInfo(query.id);
    uni.setNavigationBarTitle({
      title: "編輯試吃商品",
    });
  }
});

const getInfo = (id) => {
  getGoodsInfo({ id }).then((res) => {
    formData.value = { ...formData.value, ...(res.data || {}) };
    console.log(formData.value);
    if (formData.value.goods_spec_type === 2) {
      formData.value.goods_spec_name = formData.value.goods_spec
        .map((item) => item.goods_spec_name)
        .join("、");
    }

    formData.value.show_goods_image =
      formData.value.base_url + formData.value.goods_image;
  });
};

const getTypes = () => {
  getGoodsTypes().then((res) => {
    types.value = res.data || [];
  });
};

const getCategories = () => {
  getGoodsCategory().then((res) => {
    categories.value = res.data || [];
  });
};

function getLowestDiscount(specList) {
  const discounts = [];

  (specList || []).forEach((spec) => {
    (spec.goods_spec_attr || []).forEach((attr) => {
      const original = parseFloat(attr?.original_price) || 0;
      const sale = parseFloat(attr?.sale_price) || 0;

      // 过滤掉无效或为 0 的价格
      if (original > 0 && sale > 0) {
        const discount = (sale / original) * 10;
        if (!isNaN(discount) && discount > 0) {
          discounts.push(discount);
        }
      }
    });
  });

  // 没有有效折扣，默认返回 10（无折扣）
  if (discounts.length === 0) return 10;

  return Math.min(...discounts).toFixed(2);
}

const handleToSetSpecification = () => {
  let n = "";
  if (formData.value.goods_spec?.length) {
    uni.setStorageSync("goods_spec", formData.value.goods_spec);
    n = "1";
  }
  uni.navigateTo({
    url:
      "/pages/manages/goods/specification?type=" +
      n +
      "&goods_name=" +
      formData.value.goods_name,
    success: () => {
      uni.$once("updateSpecification", (data) => {
        formData.value.goods_spec = unref(data);
        formData.value.goods_spec_name = unref(data)
          .map((item) => item.goods_spec_name)
          .join("、");
        formData.value.discount = getLowestDiscount(unref(data));
      });
    },
  });
};

const handleChooseImage = () => {
  if (!isUploading.value)
    uploadFile({
      count: 1,
      url: UploadUrl,
      name: "image",
      fileType: ["image"],
    })
      .then((res) => {
        console.log(res);
        const [result] = res || [];
        formData.value.goods_image = result?.path;
        formData.value.show_goods_image = result?.url;
      })
      .catch((err) => {
        console.log(err);
      });
};

const handleChangeType = (val) => {
  formData.value.goods_type_name = val.goods_type_name;
  formData.value.goods_type_id = val.id;
};

const handleChangeCategory = (val) => {
  formData.value.goods_category_id = val.id;
  formData.value.goods_category_name = val.category_name;
};

onShow(() => {
  getTypes();
  getCategories();
  getConditionConfig();
});

// 獲取試吃商品條件配置
const getConditionConfig = () => {
  getFoodConditionConfig().then((res) => {
    if (res.data) {
      conditionConfig.value = res.data;
    }
  });
};

// 輸入框失焦驗證
const validateStock = () => {
  const config = conditionConfig.value;
  const stock = Number(formData.value.goods_stock) || 0;
  if (config.food_condition_stock > 0 && stock > config.food_condition_stock) {
    Toast.info(`商品庫存不能超過 ${config.food_condition_stock}`);
    formData.value.goods_stock = config.food_condition_stock;
  }
};

const validatePrice = () => {
  const config = conditionConfig.value;
  const salePrice = Number(formData.value.sale_price) || 0;
  if (
    config.food_condition_price > 0 &&
    salePrice > config.food_condition_price
  ) {
    Toast.info(`商品售價不能超過 ${config.food_condition_price}`);
    formData.value.sale_price = config.food_condition_price;
  }
};

const validateDiscount = () => {
  const config = conditionConfig.value;
  const discountVal = Number(formData.value.discount) || 0;
  if (
    config.food_condition_discount > 0 &&
    discountVal > config.food_condition_discount
  ) {
    Toast.info(`商品折扣不能超過 ${config.food_condition_discount}`);
    formData.value.discount = config.food_condition_discount;
  }
};

// 折扣
const discount = computed(() => {
  const original = Number(formData.value.original_price) || 0;
  const sale = Number(formData.value.sale_price) || 0;

  // 无效或为 0 的情况，直接返回 0
  if (original <= 0 || sale <= 0) {
    formData.value.discount = 0;
    return 0;
  }

  const value = +((sale / original) * 10).toFixed(2);
  formData.value.discount = value;
  return value;
});

const handleSave = () => {
  // 驗證條件配置限制
  const config = conditionConfig.value;

  if (formData.value.goods_spec_type === 1) {
    // 單規格驗證
    const stock = Number(formData.value.goods_stock) || 0;
    const salePrice = Number(formData.value.sale_price) || 0;
    const discountVal = Number(formData.value.discount) || 0;

    if (
      config.food_condition_stock > 0 &&
      stock > config.food_condition_stock
    ) {
      return Toast.info(`商品庫存不能超過 ${config.food_condition_stock}`);
    }
    if (
      config.food_condition_price > 0 &&
      salePrice > config.food_condition_price
    ) {
      return Toast.info(`商品售價不能超過 ${config.food_condition_price}`);
    }
    if (
      config.food_condition_discount > 0 &&
      discountVal > config.food_condition_discount
    ) {
      return Toast.info(`商品折扣不能超過 ${config.food_condition_discount}`);
    }
  } else {
    // 多規格驗證
    const discountVal = Number(formData.value.discount) || 0;
    if (
      config.food_condition_discount > 0 &&
      discountVal > config.food_condition_discount
    ) {
      return Toast.info(`商品折扣不能超過 ${config.food_condition_discount}`);
    }
    // 驗證每個規格項的庫存和價格
    const specs = formData.value.goods_spec || [];
    for (const spec of specs) {
      for (const attr of spec.goods_spec_attr || []) {
        const attrStock = Number(attr.goods_stock) || 0;
        const attrPrice = Number(attr.sale_price) || 0;
        if (
          config.food_condition_stock > 0 &&
          attrStock > config.food_condition_stock
        ) {
          return Toast.info(
            `規格「${attr.goods_spec_name || ""}」庫存不能超過 ${config.food_condition_stock}`,
          );
        }
        if (
          config.food_condition_price > 0 &&
          attrPrice > config.food_condition_price
        ) {
          return Toast.info(
            `規格「${attr.goods_spec_name || ""}」售價不能超過 ${config.food_condition_price}`,
          );
        }
      }
    }
  }

  const baseFields = [
    "goods_image",
    "id",
    "goods_name",
    "goods_desc",
    "goods_type_id",
    "goods_category_id",
    "goods_spec_type",
    "goods_stock",
    "original_price",
    "sale_price",
    "discount",
    "top_status",
    "publish_status",
    "weigh",
    "goods_spec",
  ];
  const singleFields =
    formData.value.goods_spec_type === 1
      ? baseFields.filter((key) => !["goods_spec"].includes(key))
      : baseFields.filter(
          (key) =>
            !["goods_stock", "original_price", "sale_price"].includes(key),
        );
  formData.value.discount = Number(formData.value.discount || 0).toFixed(2);
  const saveParams = pick(formData.value, singleFields);

  // 试吃商品类型标识
  saveParams.goods_type_flag = 4;

  console.log("=== 试吃商品保存参数 ===");
  console.log("formData原始数据:", JSON.stringify(formData.value, null, 2));
  console.log("saveParams提交参数:", JSON.stringify(saveParams, null, 2));

  saveGoods(saveParams).then((res) => {
    Toast.success("保存成功");
    setTimeout(() => {
      uni.navigateBack({});
    }, 1000);
  });
};
</script>

<template>
  <view class="container">
    <view class="content">
      <view class="card">
        <view class="card-title">商品基礎信息</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品圖片</text>
            </view>
            <view class="form-value flex-right">
              <view
                class="add-file-box"
                v-if="!formData.goods_image"
                @click="handleChooseImage"
              >
                <view
                  class="iconfont icon-jiajianzujianjiahao"
                  v-if="!isUploading"
                ></view>
                <view
                  v-else
                  class="iconfont icon-loading rotate-loading"
                  style="display: inline-block"
                ></view>
              </view>
              <view
                class="add-file-box show-picture"
                v-else
                @click="handleChooseImage"
              >
                <uv-image
                  :src="formData.show_goods_image"
                  mode="aspectFit"
                  width="100%"
                  height="100%"
                  radius="5"
                />
              </view>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品名稱</text>
            </view>
            <view class="form-value">
              <uv-input
                v-model="formData.goods_name"
                inputAlign="right"
                class="form-input"
                :border="false"
                placeholder="請輸入商品名稱"
                fontSize="26rpx"
              />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品描述</text>
            </view>
            <view class="form-value">
              <uv-input
                v-model="formData.goods_desc"
                inputAlign="right"
                fontSize="26rpx"
                :border="false"
                placeholder="請輸入商品描述"
              />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>平臺商品分類</text>
            </view>
            <PickerSelect
              :options="categories"
              key-name="category_name"
              @change="handleChangeCategory"
            >
              <view class="form-value">
                <text class="placeholder">
                  {{ formData.goods_category_name || "請選擇分類" }}
                  <text class="iconfont icon-arrow-right-copy"></text>
                </text>
              </view>
            </PickerSelect>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商家商品分類</text>
            </view>
            <PickerSelect
              :options="types"
              key-name="goods_type_name"
              @change="handleChangeType"
            >
              <view class="form-value">
                <text class="placeholder">
                  {{ formData.goods_type_name || "請選擇分類" }}
                  <text class="iconfont icon-arrow-right-copy"></text>
                </text>
              </view>
            </PickerSelect>
          </view>
        </view>
      </view>
      <view class="card">
        <view class="card-title">商品規格及庫存</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品庫存</text>
            </view>
            <view class="form-value">
              <uv-input
                v-model="formData.goods_stock"
                placeholder="請輸入商品庫存"
                :border="false"
                input-align="right"
                fontSize="26rpx"
                @blur="validateStock"
              />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品原價</text>
            </view>
            <view class="form-value">
              <uv-input
                v-model="formData.original_price"
                placeholder="請輸入商品原價"
                type="digit"
                :border="false"
                input-align="right"
                fontSize="26rpx"
              />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>商品售價</text>
            </view>
            <view class="form-value">
              <uv-input
                v-model="formData.sale_price"
                placeholder="請輸入商品售價"
                type="digit"
                :border="false"
                input-align="right"
                fontSize="26rpx"
                @blur="validatePrice"
              />
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>商品折扣</text>
              <text class="form-label-tip"
                >(超過50%折扣自動參加首頁試食活動)</text
              >
            </view>
            <view class="form-value">
              <text>{{ discount }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-title">更多設置</view>
        <view class="card-form">
          <view class="form-item">
            <view class="form-label">
              <text class="red-text">*</text>
              <text>是否上架</text>
            </view>
            <view class="form-value flex-right">
              <uv-switch
                v-model="formData.publish_status"
                :active-value="1"
                :inactive-value="2"
              ></uv-switch>
            </view>
          </view>
          <view class="form-item">
            <view class="form-label">
              <!--                <text class="red-text">*</text>-->
              <text>商品順序</text>
            </view>
            <view class="form-value">
              <uv-input
                v-model="formData.weigh"
                placeholder="請輸入商品順序"
                type="number"
                :border="false"
                input-align="right"
                fontSize="26rpx"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="submit-button safe-pb">
      <uv-button class="operation-item" @click="handleSave">保存</uv-button>
    </view>
  </view>
</template>

<style scoped lang="scss">
:global(page) {
  height: 100%;
}

.submit-button {
  padding-top: 20rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  background-color: #fff;
}

.container {
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 20rpx;
  overflow-y: auto;
  flex: 1;
}

.form-label-tip {
  font-size: 20rpx;
  color: rgba(0, 0, 0, 0.6);
}

.placeholder {
  color: #888888;
  font-size: 26rpx;
  padding: 12rpx 22rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .iconfont {
    display: inline-block;
    font-size: 24rpx;
    transform: rotate(90deg);
  }
}

.card {
  padding: 20rpx;
  border-radius: 10rpx;
  background-color: #fff;
  margin-bottom: 20rpx;

  .card-title {
    font-size: 30rpx;
    color: #333;
    line-height: 60rpx;
    font-weight: bold;
  }

  .form-item {
    padding: 20rpx 0;
    font-size: 28rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 20rpx;
  }

  .form-label {
    flex: none;
  }

  .form-value {
    font-size: 26rpx;
    flex: 1;
    text-align: right;
  }
}

.add-file-box {
  width: 100rpx;
  height: 100rpx;
  border-radius: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1rpx dashed #888888;
  color: #888;

  &.show-picture {
    border: none;
  }
}

.flex-right {
  display: flex;
  justify-content: flex-end;
}

.setting-mode {
  color: #3c9cff;
}

.operation-item {
  :global(.uv-button) {
    background-color: #000 !important;
    color: #fff !important;
  }
}
</style>
