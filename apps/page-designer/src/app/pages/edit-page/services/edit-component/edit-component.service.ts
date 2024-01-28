import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditComponentService {

  public editedComponentId$ = new BehaviorSubject<null | string>(null);
  constructor() { }
}
