import { Changelog } from "../../../interfaces/Changelog";

export async function fetchChangelogs(paginationFilter?: {pageSize: number, page: number})
{
    let data = ((await (await fetch(`https://files.teslasp2.com/assets/jsons/changelogs.json`)).json()) as Changelog[]);
    if(paginationFilter != undefined)
      return data.filter(c => !c.id.endsWith("-R") && c.date.checkForUnlock())
    .slice(paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page-1) * paginationFilter.pageSize : undefined,
          paginationFilter.page != undefined && paginationFilter.pageSize != undefined ? (paginationFilter.page * paginationFilter.pageSize) : undefined);
    else
      return data.filter(c => !c.id.endsWith("-R") && c.date.checkForUnlock());
}