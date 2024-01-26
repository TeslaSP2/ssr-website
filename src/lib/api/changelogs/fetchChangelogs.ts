import { Changelog } from "../../../interfaces/Changelog";
import { read } from "../../utils/Dependency";

export async function fetchChangelogs(paginationFilter?: {pageSize: number, page: number})
{
    let data = await read<Changelog[]>(`changelogs.json`);
    if(paginationFilter != undefined)
      return data.filter(c => !c.id.endsWith("-R") && c.date.checkForUnlock())
    .slice(paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page-1) * paginationFilter.pageSize : undefined,
          paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page * paginationFilter.pageSize) : undefined);
    else
      return data.filter(c => !c.id.endsWith("-R") && c.date.checkForUnlock());
}