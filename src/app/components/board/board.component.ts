import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { InkBucket, InkBoard, InkBoardMeta } from '../../models';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'inkapp-board',
  templateUrl: './board.component.html',
  styles: []
})
export class BoardComponent implements OnInit {
  bucket: Observable<InkBucket>;
  board: InkBoardMeta;
  constructor(private store: Store) {
    this.store
      .select(s => s.board)
      .pipe(filter(s => s.length > 0), map(x => x[0]))
      .subscribe(r => {
        console.log('CColl', r);
        this.board = r;
      });
  }

  ngOnInit() {
    this.bucket = this.store.select(s => s.bucket).pipe(map(x => x.filter(y => y.boardId === this.board.id)));
  }
}
