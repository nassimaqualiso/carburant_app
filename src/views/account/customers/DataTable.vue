<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.id">
            {{ column.label }}
            <br />
            <input
              v-if="column.type === 'string'"
              v-model="filterValue[column.field]"
              type="text"
              @input="applyFilters"
            />
            <select
              v-if="column.type === 'select'"
              v-model="filterValue[column.field]"
              @change="applyFilters"
            >
              <option value="">All</option>
              <option
                v-for="option in column.options"
                :key="option.id"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <input
              v-if="column.type === 'date'"
              v-model="filterValue[column.field]"
              type="date"
              @input="applyFilters"
            />
            <input
              v-if="column.type === 'datetime'"
              v-model="filterValue[column.field]"
              type="datetime-local"
              @input="applyFilters"
            />
            <input
              v-if="column.type === 'daterange'"
              v-model="filterValue[column.field + '_from']"
              type="date"
              placeholder="From"
              @input="applyFilters"
            />
            <input
              v-if="column.type === 'daterange'"
              v-model="filterValue[column.field + '_to']"
              type="date"
              placeholder="To"
              @input="applyFilters"
            />
            <input
              v-if="column.type === 'timerange'"
              v-model="filterValue[column.field]"
              type="time"
              placeholder="From"
              @input="applyFilters"
            />
            <input
              v-if="column.type === 'timerange'"
              v-model="filterValue[column.field + '_to']"
              type="time"
              placeholder="To"
              @input="applyFilters"
            />
            <span v-if="column.sortable" class="sort-arrows">
              <i class="fa fa-caret-up" @click="setSort(column.field, 'asc')">
              </i>
              <i
                class="fa fa-caret-down"
                @click="setSort(column.field, 'desc')"
              >
              </i>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="column in columns" :key="column.id">
            {{ item[column.field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      filterValue: {},
      sortValue: {},
      columns: [
        { id: 1, label: "ID", field: "id", type: "string", sortable: true },
        { id: 2, label: "Name", field: "name", type: "string", sortable: true },
        { id: 3, label: "Date", field: "date", type: "date", sortable: true },
        {
          id: 4,
          label: "Status",
          field: "status",
          type: "select",
          options: ["Active", "Inactive"],
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      axios
        .get("/api/items", {
          params: {
            filters: this.filterValue,
            sort: this.sortValue,
          },
        })
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    applyFilters() {
      // Fetch the items again with the updated filter values
      this.fetchItems();
    },
    setSort(field, direction) {
      // Update the sort value
      this.sortValue = {
        field,
        direction,
      };
      // Fetch the items again with the updated sort value
      this.fetchItems();
    },
  },
};
</script>

<style>
.sort-arrows {
  display: inline-block;
  margin-left: 5px;
}

.sort-arrows i {
  cursor: pointer;
  margin-left: 3px;
  margin-right: 3px;
}
</style>
