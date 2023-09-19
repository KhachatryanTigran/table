import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

interface Table {
  name: string;
  id: string;
  tbData: Array<TableHeader>;
  rowsData: any[];
}

interface TableHeader {
  name: string;
  type: string | null;
  nullable: boolean | null;
  id: string;
  required: {
    name: boolean;
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
        type: null,
        nullable: null,
        id: uuid(),
        required: {
          name: true,
          type: true,
          nullable: true,
        },
      };

      this.currentTable.tbData.push({ ...newHeader });
    },
    updateRow(table: Table) {
      this.tables = this.tables.map((tb) => (tb.id === table.id ? table : tb));

      console.log(this.tables, "asd");
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
          name: true,
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
    updateHeader(data: any, id: string) {
      const header = this.currentTable.tbData.find(
        (header) => header.id === id
      );

      if (header) {
        header.data = data;
      }
    },
  },
});
