import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
export const useTableStore = defineStore("tableStore", {
  state: () => ({
    tables: [
      {
        name: "users",
        id: "124",
        tbData: [
          {
            name: "name3",
            data: [],
            type: "Object",
            nullable: "Yes",
            id: "12355",
          },
          {
            name: "name3",
            data: [],
            type: "Object",
            nullable: "Yes",
            id: "12355",
          },
        ],
      },
    ],
    currentTable: {},
  }),

  getters: {
    getTableByid: (state) => {
      return (id) => state.tables.find((tb) => tb.id === id);
    },
  },
  actions: {
    setTable(id) {
      const asd = this.tables.find((tb) => tb.id == id);
      console.log(asd, "asd");
      this.currentTable = {
        ...asd,
        tbData: [...asd.tbData],
      };
    },

    createNewTable({ name, id }) {
      const newTable = {
        name,
        id,
        tbData: [],
      };
      this.tables.push(newTable);
    },

    addHeader() {
      const newHeader = {
        name: "",
        data: [],
        type: null,
        nullable: null,
        id: uuid(),
        required: {
          name: true,
          type: true,
          nullable: true,
        },
      };
      console.log(this.currentTable);
      this.currentTable.tbData.push({ ...newHeader });
    },
    update(id) {
      const index = this.tables.findIndex((tb) => tb.id === id);
      this.tables.splice(index, 1, {
        ...this.currentTable,
        tbData: [...this.currentTable.tbData],
      });
      console.log(this.tables);
    },
    addNext(index) {
      const newHeader = {
        name: "",
        data: [],
        type: "",
        nullable: "",
        id: uuid(),
        required: {
          name: true,
          type: true,
          nullable: true,
        },
      };
      this.currentTable.tbData.splice(index + 1, 0, { ...newHeader });
    },
    remove(id) {
      const index = this.currentTable.tbData.findIndex((tb) => tb.id === id);

      this.currentTable.tbData.splice(index, 1);
    },
  },
});
