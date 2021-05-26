import { MatTableDataSource } from "@angular/material/table"
import { FilePreview } from "./get-files-result"

export class Card {
    title?: string
    originalFileName?: string
    newFileName?: string
    createdDate?: Date
    cols?: number
    rows?: number
    editMode: boolean = false
    content: FilePreview[] = []
    objKeys: any[] = []
    displayedColumns: string[] = []
}