export interface GetFilesResult {
    name: string,
    fullName: string,
    contents?: DataTable[],
    createdDate?: Date
}

export interface DataTable {
    tableName: string,
    data: Data
}

export interface Data {
    columns: string[],
    rows: FilePreview[] 
}

export interface FilePreview {
    [key: string]: any;
}