<template>
  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
          >{{prev}}</a
        >
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item active" aria-current="page">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#">{{next}}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRolePemissionStore } from "@/stores/role-permission";
import PermissionItem from "@/views/administration/settings/roles/PermissionItem.vue";
import _ from "lodash";
import Swal from "sweetalert2";

const store = useRolePemissionStore();

export interface Permission {
  id: number;
  name: string;
  group_name: string;
}

export default defineComponent({
  props: ["id"],
  components: {
    PermissionItem,
  },
  data() {
    return {
      perPage: 16,
      pageCount: 1,
      prev:'previous',
      next:'next',
    };
  },
  computed: {},

  methods: {
    updatePermissions() {
      console.log("permissions before update", store.rolePermissions);

      this.isButtonLoading = true;
      ApiService.post("roles/" + this.id + "/update-permissions", {
        permissions: store.rolePermissions,
      })
        .then(({ data }) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Permissions updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(data);
          this.getPermissions();
          this.setRolePermissions();
        })
        .catch(({ response }) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Permission failed to be updated",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(response);
        });
    },
    getPermissions() {
      this.isLoading = true;
      return ApiService.get("permissions")
        .then(({ data }) => {
          this.permissions = data.data;
          this.permissionsTitles = this.getAllPermissionsTitles();
          this.permissions = this.listPermissionsByName(this.permissions);
          this.isLoading = false;
        })
        .catch(({ response }) => {
          console.log(response);
          this.isLoading = false;
        });
    },
    async setRolePermissions() {
      await store.getRolePermissions(this.id);
    },

    getAllPermissionsTitles() {
      return this.onlyUnique(
        _.flatMap(this.permissions, function (permission: Permission) {
          return permission.group_name;
        })
      );
    },

    onlyUnique(array) {
      return array.filter(
        (value, index, array) => array.indexOf(value) === index
      );
    },

    listPermissionsByName(permissions) {
      return _.flatMap(permissions, (permission: Permission) => {
        return permission.name;
      });
    },
    filterPermissionsByTitle(title) {
      return _.filter(this.permissions, function (n: any) {
        if (n.includes(title)) {
          return n;
        }
      });
    },
  },

  async created() {
    await this.getPermissions();
    this.setRolePermissions();

    // await this.getRolByName();
  },
});
</script>
