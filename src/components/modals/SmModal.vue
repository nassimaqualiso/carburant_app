<template>
  <button
    data-bs-toggle="modal"
    :data-bs-target="`#${modalId}`"
    class="btn btn-primary btn-sm"
    :class="classBtn"
  >
    <slot name="button_content">
      Show Modal
    </slot>
  </button>
  <div class="modal fade" tabindex="-1" :id="`${modalId}`">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>

          <!--begin::Close-->
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span class="svg-icon svg-icon-2x">X</span>
          </div>
          <!--end::Close-->
        </div>
        <slot name="modal_body"> </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "modal",
  props: [
    "titleBtn",
    "classBtn",
    "modalId",
    "modalTitle",
  ],
});
</script>
