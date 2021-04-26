import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoardListService } from './board-list.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.less'],
  providers: [BoardListService]
})
export class BoardListComponent implements OnInit {
  
  constructor(public boardListService: BoardListService, private router: Router) { 
  }

  ngOnInit(): void {
  }

  loadBoard(boardName: string): void {
    this.router.navigateByUrl(`/board/${boardName}`)
  }
}
