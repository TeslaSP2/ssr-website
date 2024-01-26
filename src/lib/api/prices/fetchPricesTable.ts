import { PricesTable } from "../../../interfaces/PricesTable";
import { read } from "../../utils/Dependency";

export async function fetchPricesTable(table: string) {
    return await read<PricesTable>(`prices/${table}.json`);
}