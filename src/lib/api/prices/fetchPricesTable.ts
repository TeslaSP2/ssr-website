import { PricesTable } from "../../../interfaces/PricesTable";
import { readAsObject } from "../../utils/Dependency";

export async function fetchPricesTable(table: string) {
    return await readAsObject<PricesTable>(`prices/${table}.json`);
}