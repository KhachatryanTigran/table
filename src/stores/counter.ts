import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export interface Row {
  id: string;
  [key: string]: string | number;
}
export interface Table {
  name: string;
  id: string;
  tbData: Array<TableHeader>;
  rowsData: Row[];
}

export interface TableHeader {
  name: string;
  type: string;
  nullable: boolean | null;
  id: string;
  required: {
    type: boolean;
    nullable: boolean;
  };
}
export const useTableStore = defineStore("tableStore", {
  state: () => ({
    tables: [] as Table[],
    currentTable: {} as Table,
  }),

  getters: {},
  actions: {
    setTableFromStorage(tables: Table[]) {
      this.tables = tables;
    },
    setTable(id: string) {
      const table = this.tables.find((tb) => tb.id === id);

      if (table) {
        this.currentTable = {
          ...table,
          tbData: [...table.tbData],
        };
      }
    },

    createNewTable({ name, id }: { name: string; id: string }) {
      const newTable: Table = {
        name,
        id,
        tbData: [],
        rowsData: [],
      };
      this.tables.push(newTable);
    },

    addHeader() {
      const newHeader: TableHeader = {
        name: "",
        type: "",
        nullable: null,
        id: uuid(),
        required: {
          type: true,
          nullable: true,
        },
      };

      this.currentTable.tbData.push({ ...newHeader });
    },
    updateRow(table: Table) {
      this.tables = this.tables.map((tb) => (tb.id === table.id ? table : tb));

      this.currentTable = table;
    },
    update() {
      const id = this.currentTable.id;

      const index = this.tables.findIndex((tb) => tb.id === id);
      this.tables.splice(index, 1, {
        ...this.currentTable,
        tbData: [...this.currentTable.tbData],
      });
    },

    addNext(index: number) {
      const newHeader: TableHeader = {
        name: "",
        type: "",
        nullable: null,
        id: uuid(),
        required: {
          type: true,
          nullable: true,
        },
      };
      this.currentTable.tbData.splice(index + 1, 0, { ...newHeader });
    },
    remove(id: string) {
      const index = this.currentTable.tbData.findIndex((tb) => tb.id === id);

      this.currentTable.tbData.splice(index, 1);
    },

    removeTable(id: string) {
      this.tables = this.tables.filter((tb) => tb.id !== id);
      console.log("remove table", this.tables);
    },
    // updateHeader(data: TableHeader, id: string) {
    //   const header = this.currentTable.tbData.find(
    //     (header) => header.id === id
    //   );

    //   if (header) {
    //     header.data = data;
    //   }
    // },
  },
});
