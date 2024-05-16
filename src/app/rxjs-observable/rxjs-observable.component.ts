import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, of, take, timer, toArray } from 'rxjs';
import { RxjsObservableService } from './rxjs-observable.service';

@Component({
  selector: 'app-rxjs-observable',
  templateUrl: './rxjs-observable.component.html',
  styleUrls: ['./rxjs-observable.component.scss']
})
export class RxjsObservableComponent implements OnInit, AfterViewInit{

  count = 0;
  @ViewChild('addBtn') addBtn!: ElementRef

  constructor(
    @Inject(RxjsObservableService) private rxjsObservableService: RxjsObservableService 
  ){}

  ngOnInit(): void {
    console.log("Rxjs")
  }
  
  ngAfterViewInit(): void {
    // 1. fromEvent
    // this.fromEventOperator();
    // 2. Interval
    // this.intervalOperator();
    // 3. timer
    // this.timeOperator();
    // 4. of
    // this.ofOperator();
    // 5. from
    // this.fromOperator();
    // 6 . toArray
    this.toArrayOperator();
  }

  // 1. fromEvent
  fromEventOperator(){
    fromEvent(this.addBtn.nativeElement, 'click').subscribe((res)=>{
      // console.log(res);
      // console.log(this.count++);
      this.count++;
      this.rxjsObservableService.print(this.count, 'video-container1');
    })
  };

  // 2. Interval 
  intervalOperator(){
    let intOp = interval(1000)
    intOp.subscribe((res)=>{
      console.log(res);
    });
  }

  // 3. time
  timeOperator(){
    let timeOp = timer(5000, 1000);
    timeOp.subscribe((res)=>{
      console.log(res);
    });
  }

  // 4. of
  ofOperator(){
    let ofOp = of(1,2,3);
    ofOp.subscribe((res)=>{
      console.log(res)
    })
  }

  // 5. from
  fromOperator(){
    // 5.1) using array
    // let fAOp = from([1,2,3]);
    // fAOp.subscribe((res)=>{
    //   console.log(res)
    // })

    // 5.2) using promise
    let promise = new Promise((resolve)=>{
      setTimeout(()=>{
        resolve("Promise resolved")
      }, 2000);
    })

    let fPOp = from(promise);
    fPOp.subscribe((res)=>{
      console.log(res)
    })

    // 5.3) using string
    let fSOp = from("Roshan");
    fSOp.subscribe((res)=>{
      console.log(res)
    })
  }

  // 6 . toArray
  toArrayOperator(){
    // 6.1 using interval
    let intOp = interval(1000);
    intOp.pipe(
      take(5),
      toArray()
    ).subscribe((res)=>{
      console.log(res);
    }) 

    // 6.2 using from
    let arr = [
      {
        id: 1,
        name: "Roshan"
      },
      {
        id: 2,
        name: "Raj"
      },
    ];
    
    let tfOp = from(arr);

    tfOp.pipe(
      toArray()
    ).subscribe((res)=>{
      console.log(res);
    }) 

    // 6.3 using of
    let ofOp = of("Roshan", "raj")
    ofOp.pipe(
      toArray()
    ).subscribe((res)=>{
      console.log(res);
    }) 

  } 






}
