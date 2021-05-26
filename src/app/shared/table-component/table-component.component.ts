import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FilePreview } from 'src/app/models/get-files-result';

@Component({
  selector: '[table-component]',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit {
  
  private _options: {
    dataSource?: FilePreview[],
    displayedColumns?: string[],
    objKeys?: { header: string, objKey: string }[]
  } = {};

  public get options() : {
    dataSource?: FilePreview[],
    displayedColumns?: string[],
    objKeys?: { header: string, objKey: string }[]
  } {
    return this._options;
  }

  
  @Input() public set options(v : {
    dataSource?: FilePreview[],
    displayedColumns?: string[],
    objKeys?: { header: string, objKey: string }[]
  }) {
    this._options = v;
    this.dataSource = new MatTableDataSource<FilePreview>(this._options.dataSource);
    this.dataSource.paginator = this.paginator;
  }

  
  private _paginator!: MatPaginator;
  public get paginator() : MatPaginator {
    return this._paginator;
  }

  @ViewChild(MatPaginator) public set paginator(v : MatPaginator) {
    this._paginator = v;
    this.dataSource.paginator = this.paginator;
  }

  private _sort!: MatSort;
  public get sort() : MatSort {
    return this._sort;
  }

  @ViewChild(MatSort) public set sort(v : MatSort) {
    this._sort = v;
    this.dataSource.sort = this.sort;
  }
  
  dataSource!: MatTableDataSource<FilePreview>;

  constructor() { }

  ngOnInit(): void {
  }
}
