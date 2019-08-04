import { filter, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { UtilService } from './util.service';

export type MessageCallback = (payload: any) => void;

@Injectable({
  providedIn: 'root'
})
export class BroadcastAppService {
  private _appSubject: BehaviorSubject<any>;
  private appItem$: Observable<any>;

  constructor(private utilService: UtilService) {
    this._appSubject = new BehaviorSubject<any>(1);
    this.appItem$ = this._appSubject.asObservable();
  }

  /**
   * broadcast item
   // @param type
   // @param payload
   */
  broadcast(type: string, payload: any) {
    this._appSubject.next({ type, payload });
  }

  /**
   * get Behavior subject
   */
  getAppSubject() {
    return this._appSubject;
  }

  /**
   * get Item
   */
  getAppItem() {
    return this.appItem$;
  }

  /**
   * Set or subsrcibe the item
   // @param type
   // @param callback
   */
  subscribe(type: string, callback: MessageCallback): Subscription {
    return this.appItem$
      .pipe(
        filter(message => message.type === type),
        map(message => message.payload)
      )
      .subscribe(callback);
  }
}
