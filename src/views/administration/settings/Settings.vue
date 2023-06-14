<template>
  <div class="row">
    <div class="col-md-3">
      <SettingsTab></SettingsTab>
    </div>
    <div class="col-md-9">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import SettingsTab from "@/layouts/main-layout/tab/SettingsTab.vue";

export default defineComponent({
  name: "Settings",
  components: {
    SettingsTab,
  },
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
