import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsObservableComponent } from './rxjs-observable/rxjs-observable.component';

const routes: Routes = [
  {
    path: 'rxjs-operators',
    component: RxjsObservableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
