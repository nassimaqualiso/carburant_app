<template>
  <DataTable
    cardTitle="Customer"
    moduleName="customers"
    :actions="{ edit: true, delete: true }"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import DataTable from "@/components/dataTable/DataTable.vue";

export default defineComponent({
  components: {
    DataTable,
  },
});
</script>

<style>
.sticky-actions {
  text-shadow: -5px 0 17px #e9e9e9 !important;
  position: sticky !important;
  right: -0.1rem !important;
  background-color: #f5f8fa !important;
}

[data-bs-theme="dark"] .sticky-actions {
  text-shadow: -5px 0 17px #30303a85 !important;
  position: sticky !important;
  right: -0.1rem !important;
  background-color: #1c1c20 !important;
}
</style>
