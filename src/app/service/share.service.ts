import { ProductDto } from './../model/ProductDto';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  constructor() {}
  private emitChangeSource = new BehaviorSubject<string[]>([]);
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: string[]) {
    return this.emitChangeSource.next(change);
  }
}
