<template>
  <DataTable
    cardTitle="products"
    moduleName="products"
    :actions="{ edit: true, delete: true }"
    :showCheckbox="true"
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
