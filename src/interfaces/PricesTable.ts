import { LangKeyedString } from "./General"

export interface PricesTable {
    categories?: LangKeyedString[][]
    catalog: {
        rowHeader: LangKeyedString[]
        prices: number[]
    }[]
}