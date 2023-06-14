<template>
  <DataTable
    cardTitle="Companies"
    moduleName="companies"
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
