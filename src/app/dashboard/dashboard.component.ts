import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FileService } from '../file.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards: any[] = [];
 /*  = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );
 */
  constructor(private fileService: FileService) {

  }

  ngOnInit(): void {
    this.fileService.getResubFiles()
      .subscribe(files => {
        if (files && Object.keys(files)) {
                    
          this.cards = Object.keys(files).map(key => {
            var file = files[key];
            var headers = file.splice(0, 1)[0];

            if (file) {
              return {
                title: key.replace('/data/uploads/', ''),
                originalFileName: key.replace('/data/uploads/', ''),
                newFileName: key.replace('/data/uploads/', ''),
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
        }
      });
  }

  onResubClick(card: any) {
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

  getKeys(obj: any) {
    if (obj) {
      return Object.keys(obj);
    }

    return [];
  }
}
