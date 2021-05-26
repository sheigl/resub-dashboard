import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FileService } from '../file.service';
import { environment } from '../../environments/environment';
import { Card } from '../models/card';
import { FilePreview, GetFilesResult } from '../models/get-files-result';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {
  cards: Card[] = [];
  constructor(private fileService: FileService, private cd: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
  }

  private createCard(file: GetFilesResult) {
    if (file && file.contents) {
      let sheet = file.contents[0];
      var headers = sheet.data.columns;

      return <Card>{
        title: file.name,
        originalFileName: file.name,
        createdDate: file.createdDate,
        newFileName: file.name,
        cols: headers.length > 3 ? 2 : 1,
        rows: sheet.data.rows.length > 5 ? 2 : 1,
        editMode: false,
        content: sheet.data.rows,
        objKeys: headers.map(header => 
        {
          return {
            header: header,
            objKey: header
          }
        }),
        displayedColumns: headers.filter(header => header != "ID" && header != "IsEventFlg")
      }
    }

    return <Card>{};
  }

  ngOnInit(): void {
    this.fileService
      .getResubFiles()
      .subscribe(files => {
        if (files) {
          this.cards = files.map(this.createCard);
          this.cd.detectChanges();
        }

        /* if (files && Object.keys(files)) {
                    
          this.cards = Object.keys(files).map(key => {
            var file = files[key];
            var headers = file.splice(0, 1)[0];

            if (file) {
              return {
                title: key.replace(environment.resubFolder, ''),
                originalFileName: key.replace(environment.resubFolder, ''),
                newFileName: key.replace(environment.resubFolder, ''),
                cols: file.length > 3 ? 2 : 1,
                rows: Object.keys(headers).length > 5 ? 2 : 1,
                editMode: false,
                content: file,
                objKeys: Object.keys(headers).map(headerKey => 
                  {  
                    return {
                      header: headers[headerKey],
                      objKey: headerKey
                    }
                  }),
                displayedColumns: Object.keys(headers).map(headerKey => headers[headerKey])
              }
            }

            return {};            
          });
        }*/
      }); 
  }

  onResubClick(card: Card) {
    this.fileService
      .submitResub({
        originalFilename: card.originalFileName,
        newFilename: card.newFileName
      })
      .subscribe(() => {        
        let index = -1;

        for (var i = 0; i < this.cards.length; i++) {
          if (this.cards[i].originalFileName === card.originalFileName) {
            index = i;
            break;
          }
        }

        if (index > -1) {
          this.cards.splice(index, 1);
        }
      });
  }

  onDeleteClick(card: Card) {
    this.fileService
      .deleteFile({
        originalFilename: card.originalFileName,
        newFilename: card.newFileName
      })
      .subscribe(() => {        
        let index = -1;

        for (var i = 0; i < this.cards.length; i++) {
          if (this.cards[i].originalFileName === card.originalFileName) {
            index = i;
            break;
          }
        }

        if (index > -1) {
          this.cards.splice(index, 1);
        }
      });
  }

  getKeys(obj: any) {
    if (obj) {
      return Object.keys(obj);
    }

    return [];
  }
}
