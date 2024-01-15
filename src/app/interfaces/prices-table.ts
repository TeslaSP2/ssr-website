import { LangKeyedString } from "./general";

export interface PricesTable {
    categories?: LangKeyedString[][]
    catalog: {
        rowHeader: LangKeyedString[]
        prices: number[]
    }[]
}
