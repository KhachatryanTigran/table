import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { ref } from "vue";

export interface Row {
  id: string;
  [key: string]: string | number;
}
export interface Table {
  name: string;
  id: string;
  tbData: TableHeader[];
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
    name: boolean;
  };
}
export const useTableStore = defineStore("tableStore", () => {
  const tables = ref([] as Table[]);
  const currentTable = ref({} as Table);

  function setTableFromStorage(storageTables: Table[]) {
    tables.value = storageTables;
  }

  function setTable(id: string) {
    const table = tables.value.find((tb) => tb.id === id);

    if (table) {
      currentTable.value = {
        ...table,
        tbData: [...table.tbData],
      };
    }
  }
  function createNewTable({ name, id }: { name: string; id: string }) {
    const newTable: Table = {
      name,
      id,
      tbData: [],
      rowsData: [],
    };
    tables.value.push(newTable);
  }

  function addHeader() {
    const newHeader: TableHeader = {
      name: "",
      type: "",
      nullable: null,
      id: uuid(),
      required: {
        type: true,
        nullable: true,
        name: true,
      },
    };

    currentTable.value.tbData.push({ ...newHeader });
  }
  function updateRow(table: Table) {
    tables.value = tables.value.map((tb) => (tb.id === table.id ? table : tb));

    currentTable.value = table;
  }
  function update() {
    const id = currentTable.value.id;

    const index = tables.value.findIndex((tb) => tb.id === id);
    tables.value.splice(index, 1, {
      ...currentTable.value,
      tbData: [...currentTable.value.tbData],
    });
  }
  function addNext(index: number) {
    const newHeader: TableHeader = {
      name: "",
      type: "",
      nullable: null,
      id: uuid(),
      required: {
        type: true,
        nullable: true,
        name: true,
      },
    };
    currentTable.value.tbData.splice(index + 1, 0, { ...newHeader });
  }
  function remove(id: string) {
    const index = currentTable.value.tbData.findIndex((tb) => tb.id === id);

    currentTable.value.tbData.splice(index, 1);
  }
  function removeTable(id: string) {
    tables.value = tables.value.filter((tb) => tb.id !== id);
  }
  return {
    tables,
    setTableFromStorage,
    currentTable,
    setTable,
    addHeader,
    addNext,
    createNewTable,
    remove,
    removeTable,
    update,
    updateRow,
  };
});
