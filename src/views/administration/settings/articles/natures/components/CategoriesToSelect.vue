<template>
  <di>
    <h3>Sub nature {{ subnature.id }}</h3>
    <Multiselect
      mode="tags"
      placeholder="choose a franchise"
      v-model="selectedCategoriesIds"
      :close-on-select="false"
      :searchable="true"
      :create-option="true"
      :options="pluckedCategories"
    />
    <table class="table table-hover table-row-dashed table-row-gray">
      <thead>
        <tr class="fw-bolder fs-7 text-gray-600">
          <!-- <th><input class="form-check-input" type="checkbox" /></th> -->
          <th>ID</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th>
            <input
              :checked="isCategorySeleceted(category, subnature)"
              class="form-check-input"
              type="checkbox"
            />
          </th>
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
        </tr>
      </tbody>
    </table>
  </di>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import * as Yup from "yup";
import _ from "lodash";
import Multiselect from "@vueform/multiselect";
import { hlpFn_pluck } from "@/core/helpers/helperFn";

export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
    Multiselect,
  },
  props: ["categories", "subnature"],
  data() {
    return {
      selectedCategoriesIds: [],
    };
  },
  computed: {
    pluckedCategories() {
      return hlpFn_pluck(this.categories, "id", "name");
    },
    this.subnature.categories.map((obj) =>
        _.get(obj, "id")
      );

  },

  methods: {
    isCategorySeleceted(category, sub_nature) {
      const foundUser = _.find(
        sub_nature?.categories,
        (subNatureCategory) => subNatureCategory.id === category.id
      );
      return foundUser?.id === category.id;
    },

    onChange(event, category) {
      if (!event.target.checked) {
      }
    },

    created() {
      this.selectedCategoriesIds =
      console.log("selectedCategoriesIds: " + this.selectedCategoriesIds);
    },
  },
});
</script>
