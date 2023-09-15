import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
export const useTableStore = defineStore("tableStore", {
  state: () => ({
    tables: [
      {
        name: "users",
        id: "124",

        rows: [
          {
            name: "name1",
            data: "data1",
            type: "Number",
            nullable: "Yes",
            id: "1236574",
          },
          {
            name: "name2",
            data: "data2",
            type: "Number",
            nullable: "Yes",
            id: "123",
          },
          {
            name: "name3",
            data: "data3",
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
    getData: (state) => state.currentTable,
    getTableByid: (state) => {
      return (id) => state.tables.find((tb) => tb.id === id);
    },

    getOldData: (state) => {
      return (index, id) => {
        const oldData = state.tables.find(
          (tb) => tb.id === state.currentTable.id
        ).rows[index];
        state.currentTable.rows[index] = { ...oldData };

        return state.currentTable.rows[index];
      };
    },
  },
  actions: {
    setTable(id) {
      this.currentTable = { ...this.tables.find((tb) => tb.id == id) };
    },
    checkInStore(currentRow, index) {
      const oldData = this.tables.find((tb) => tb.id === this.currentTable.id)
        .rows[index];
      const isChanged =
        oldData.name === currentRow.name &&
        oldData.data === currentRow.data &&
        oldData.type === currentRow.type;

      return !isChanged;
    },
    createNewTable({ name, id, count }) {
      const newRow = {
        name: "",
        data: "",
        type: "Boolean",
        nullable: "Yes",
        id: id,
      };

      const newTable = {
        name,
        id,
        rows: [newRow],
      };
      this.tables.push(newTable);
    },
    restore(index) {
      const oldData = this.tables.find((tb) => tb.id === this.currentTable.id)
        .rows[index];
      this.currentTable.rows[index] = { ...oldData };
    },
    addRow(id) {
      const newRow = {
        name: "",
        data: "",
        type: "Boolean",
        nullable: "Yes",
        id: uuid(),
      };

      this.tables.find((tb) => tb.id === id)?.rows.push(newRow);
    },
    update(id) {
      const index = this.tables.findIndex((tb) => tb.id === id);
      this.tables.splice(index, 1, { ...this.currentTable });
    },
    addNext(index) {
      const newRow = {
        name: "newAdded",
        data: "additional",
        type: "Number",
        nullable: "Yes",
        id: uuid(),
      };
      this.currentTable.rows.splice(index + 1, 0, newRow);
    },
    remove(id) {
      this.currentTable.rows = this.currentTable.rows.filter(
        (el) => el.id !== id
      );
    },
    save(data) {
      this.currentTable.rows = this.currentTable.rows.map((el) => {
        if (el.id === data.id) {
          return data;
        } else {
          return el;
        }
      });
    },
  },
});
