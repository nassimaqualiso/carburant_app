<template>
  <div class="row justify-content-between">
    <div class="col-12 d-flex">
      <div class="form-check me-2">
        <input
          :checked="isAllTitlePermissionsExist(permissions, title)"
          @change="onChangeAll($event, title)"
          class="form-check-input"
          type="checkbox"
        />
      </div>
      <h3>{{ title }}</h3>
    </div>
  </div>

  <div class="row">
    <div v-for="permission in permissions" :key="permission" class="col-3 p-4">
      <div class="card">
        <div>
          <p>{{ permission }}</p>
        </div>
        <div>
          <div class="form-check form-switch">
            <input
              @change="onChange($event, permission)"
              :checked="isPermissionExist(permission)"
              class="form-check-input"
              type="checkbox"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import _, { forEach } from "lodash";
import { useRolePemissionStore } from "@/stores/role-permission";

const store = useRolePemissionStore();

export default defineComponent({
  props: ["title", "permissions", "role_permissions"],
  data() {
    return {};
  },
  created() {},
  methods: {
    isPermissionExist(permission) {
      return store.rolePermissions.includes(permission);
    },
    isAllTitlePermissionsExist($permissions, title) {
      $permissions = this.filterPermissionsByTitle(title);
      for (let i = 0; i < $permissions.length; i++) {
        if (!this.isPermissionExist($permissions[i])) {
          return false;
        }
      }
      return true;
    },
    onChange(event, permission) {
      if (!event.target.checked) {
        store.rolePermissions = this.removePermission(
          permission,
          store.rolePermissions
        ) as Array<string>;
        return;
      }

      store.rolePermissions = this.pushPermission(
        permission,
        store.rolePermissions
      ) as Array<string>;
    },
    onChangeAll(event, title) {
      const permissionsByTitle = this.filterPermissionsByTitle(title);
      if (!event.target.checked) {
        for (let i = 0; i < permissionsByTitle.length; i++) {
          store.rolePermissions = this.removePermission(
            permissionsByTitle[i],
            store.rolePermissions
          ) as Array<string>;
        }
        return;
      }
      for (let i = 0; i < permissionsByTitle.length; i++) {
        store.rolePermissions = this.pushPermission(
          permissionsByTitle[i],
          store.rolePermissions
        ) as Array<string>;
      }
    },

    pushPermission(permission, permissions) {
      permissions.push(permission);
      return _.uniq(permissions);
    },
    removePermission(permission, permissions) {
      return permissions.filter(function (item) {
        return item !== permission;
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
});
</script>
