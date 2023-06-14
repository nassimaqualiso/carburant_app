<template>
  <!--begin::filter-->
  <el-popover trigger="click" placement="bottom" :width="160">
    <!-- filter like -->
    <input v-if="column?.filter_type === 'like'" type="text" class="form-control form-control-sm"
      :class="column?.name + '_filter_inputs'" :placeholder="column?.label"
      :data-filter="column?.name"
      @input="debounce( () => $emit('applyFilters', { [column?.name]: $event.target?.value }))"
    />
    <!-- filter select -->
    <select v-if="column?.filter_type === 'select'"
      :data-filter="column?.name"
      @input="$emit('applyFilters', { [column?.name]: $event.target.value })" class="form-select form-select-solid"
      :class="column?.name + '_filter_inputs'">
      <option value="">Select...</option>
      <option v-for="option, key in column?.options" :key="key" :value="key">
        {{ option }}
      </option>
    </select>
    <!-- filter daterange -->
    <div v-if="column?.filter_type === 'daterange'">
      <input type="date" class="form-control form-control-sm" :data-filter="column?.name" :class="column?.name + '_filter_inputs'"
        @input="$emit('applyFilters', { [column?.name + '[start]']: $event.target.value })" />
      <label class="col-1 my-1 px-0 text-center">à</label>
      <input type="date" class="form-control form-control-sm" :class="column?.name + '_filter_inputs'"
        @input="$emit('applyFilters', { [column?.name + '[end]']: $event.target.value })" />
    </div>
    <!-- filter timerange -->
    <div v-if="column?.filter_type === 'timerange'">
      <input type="time" class="form-control form-control-sm" :data-filter="column?.name" :class="column?.name + '_filter_inputs'"
        @input="$emit('applyFilters', { [column?.name + '[start]']: $event.target.value })" />
      <label class="col-1 my-1 px-0 text-center">à</label>
      <input type="time" class="form-control form-control-sm" :class="column?.name + '_filter_inputs'"
        @input="$emit('applyFilters', { [column?.name + '[end]']: $event.target.value })" />
    </div>
    <!-- filter datetimerange -->
    <div v-if="column?.filter_type === 'datetimerange'">
      <input type="datetime-local" class="form-control form-control-sm" :data-filter="column?.name" :class="column?.name + '_filter_inputs'"
        @input="$emit('applyFilters', { [column?.name + '[start]']: $event.target.value })" />
      <label class="col-1 my-1 px-0 text-center">à</label>
      <input type="datetime-local" class="form-control form-control-sm" :class="column?.name + '_filter_inputs'"
        @input="$emit('applyFilters', { [column?.name + '[end]']: $event.target?.value })" />
    </div>
    <!-- Reset Filter -->
    <div class="text-end m-0 pt-1">
      <!-- <el-button size="small" text @click="visible = false">cancel</el-button> -->
      <a @click="resetFilter" type="button" class="nav-link text-primary d-inline">reset</a>
    </div>
    <template #reference>
      <el-button class="btn btn-default m-0 p-0 mx-3"><i style="font-size: 17px" class="bi bi-funnel"></i></el-button>
    </template>
  </el-popover>
  <!--end::filter-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "filter-table",
  props: {
    column: Object,
  },
  components: {},
  methods: {
    resetFilter() {
      const inputs = document.querySelectorAll('.' + this.column?.name + '_filter_inputs');
      const inputEvent = new Event('input')
      inputs.forEach(input => {
        input.value = '';
        input.dispatchEvent(inputEvent)
        // this.$emit('applyFilters', { [input.getAttribute('data-filter')]: '' });
      })

    },
    debounce(fnc, delayMs) {
      let timeout = null;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fnc();
      }, delayMs || 500);
    }
  },
});
</script>
