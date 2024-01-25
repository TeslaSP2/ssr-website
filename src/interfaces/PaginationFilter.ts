export interface PaginationFilter {
    seeNSFW?: boolean;
    seeCringe?: boolean;
    seeScrapped?: boolean;
    seeMusical?: boolean;
    seeSpecific?: string;
    seeNormal: boolean;
    year?: string;
    tags?: string[];
    collections?: string[];
    search?: string[];
    page?: number;
    pageSize?: number;
    ascending?: boolean;
    postExclude?: string[];
    sortType: string;
    currentLang: string;
}