import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore"
import { IBoard } from "./i-board"
import { of } from "rxjs"
import { map } from 'rxjs/operators';

@Injectable()
export class BoardListService {
  private boardCollection: AngularFirestoreCollection<IBoard>;
  private _boards: IBoard[] = [];

  constructor(private _fireStore: AngularFirestore) { 
    this.boardCollection = this._fireStore.collection("Boards");
    this.boardCollection.valueChanges().subscribe((boards) => {
      this._boards = boards;
    });
  }

  public async addBoard(name: string) {
    let board: IBoard = {
      name
    };
    let doc = await this.boardCollection.add(board as IBoard);
    board.id = doc.id;
    this.boardCollection.doc(board.id).set(board, {merge: true});
  }

  

  public getBoardList(searchString: string) {
    return of(this._boards).pipe(map(boards => boards.filter(board => board.name.toLowerCase().indexOf((searchString ?? "").toLowerCase()) != -1)));
  }
}
