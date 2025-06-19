export interface EventItem {
    id: string,
    startYear: number,
    endYear?: number,
    region: string,
    description: string,
    tags: string[],
}