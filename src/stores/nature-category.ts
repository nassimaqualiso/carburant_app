import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import _ from "lodash";
export const natureCategoryStore = defineStore("nature-category", () => {
  const errors = ref({});
  const categories = ref<Array<{}>>([]);
  const selectedCategories = ref<Array<number>>([]);

  function setCategories(values: Array<{}>) {
    categories.value = values;

    // console.log("store: set permission result", permissions);
    // console.log("store: role permissions value",rolePermissions.value)
  }
  function setSelectedCategories(values: Array<number>) {
    selectedCategories.value = values;

    // console.log("store: set permission result", permissions);
    // console.log("store: role permissions value",rolePermissions.value)
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function getCategories() {
    return ApiService.get("product-categories/")
      .then(({ data }) => {
        setCategories(data.data);
        // setCategories(_.map(data.data, "name"));
        // console.log("store: Role permissions", _.map(data.permissions, "name"));
      })
      .catch(({ response }) => {
        setError(response.data.message);
      });
  }

  return {
    categories,
    selectedCategories,
    errors,
    getCategories,
    setCategories,
    setSelectedCategories,
  };
});
