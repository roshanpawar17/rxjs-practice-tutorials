import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RxjsObservableService {

  constructor() { }

  print(val: any, containerId: any){
    let vl=document.createElement('li');
    vl.innerText = 'Video '+val;
    document.getElementById(containerId)?.appendChild(vl);
  }
}
