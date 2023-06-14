<template>
  <ul
    v-for="(item, i) in SettingsMenuConfig"
    :key="i"
    class="nav nav-tabs nav-pills flex-row border-0 flex-md-column me-5 mb-3 mb-md-0 fs-6 card shadow-sm"
  >
    <li
      v-for="(menuItem, j) in item.pages"
      :key="j"
      class="nav-item me-0"
      style="border-bottom: 1px solid #8080802b"
    >
      <router-link
        v-if="menuItem.route"
        style="width: 100%"
        class="nav-link text-muted btn btn-flex bg-active-primary text-active-white"
        active-class="active"
        :to="menuItem.route"
      >
        <span class="fs-5 fw-bold me-3">
          <i :class="menuItem.fontIcon"></i>
        </span>
        <span class="d-flex flex-column align-items-start">
          <span class="fs-5 fw-bolder">{{ menuItem.heading }}</span>
        </span>
      </router-link>
      <a> </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import SettingsMenuConfig from "@/core/config/SettingsMenuConfig";

export default defineComponent({
  name: "sidebar-menu",
  components: {},
  setup() {
    const route = useRoute();
    const scrollElRef = ref<null | HTMLElement>(null);

    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });

    const hasActiveChildren = (match: string) => {
      return route.path.indexOf(match) !== -1;
    };

    return {
      hasActiveChildren,
      SettingsMenuConfig,
    };
  },
});
</script>
