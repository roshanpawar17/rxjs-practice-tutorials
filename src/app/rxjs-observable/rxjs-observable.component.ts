import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable, debounceTime, delay, distinctUntilChanged, filter, from, fromEvent, interval, map, of, pluck, retry, retryWhen, scan, take, takeLast, takeUntil, tap, timer, toArray } from 'rxjs';
import { RxjsObservableService } from './rxjs-observable.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rxjs-observable',
  templateUrl: './rxjs-observable.component.html',
  styleUrls: ['./rxjs-observable.component.scss']
})
export class RxjsObservableComponent implements OnInit, AfterViewInit{

  count = 0;
  @ViewChild('addBtn') addBtn!: ElementRef

  constructor(
    @Inject(RxjsObservableService) private rxjsObservableService: RxjsObservableService,
    @Inject(HttpClient) private http: HttpClient
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
    // this.toArrayOperator();
    // 7 . custom observable
    // this.customObservable()
    // 8. map operator
    // this.mapOperator()
    // 9. pluck operator
    // this.pluckOperator()
      // 10. filter operator
    // this.filterOperator()
      // 11. tap operator
    // this.tapOperator()
      // 11. take operator
    // this.takeOperator()
      //12 Retry - on button click
      //13. DebounceTime
    this.debounceTimeOperator()
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

  // 7 . custom observable
  customObservable(){
    let customObs = new Observable((observal)=>{
      setTimeout(()=>{
        observal.next("Hello 1");
      }, 1000);
      setTimeout(()=>{
        observal.next("Hello 2");
        // observal.error(new Error("Error occured"))
      }, 2000);
      setTimeout(()=>{
        observal.next("Hello 3");
        observal.complete();
      }, 3000);

    })

    customObs.subscribe({
      next: (res)=>{
        console.log(res)
      },
      error: (err)=>{
        console.log(err);
      },
      complete: ()=>{
        console.log("completed");
      }
    })
  }

  // 8. map operator
  mapOperator(){
    let mapObs = of(1,2,3);
    mapObs.pipe(
      map(data=>data*2)
    ).subscribe((res)=>{
      console.log(res);
    })
  }

  users = [
    {
      name: "Roshan",
      age: 21,
      job: {
        title: "Angular Developer"
      }
    },
    {
      name: "Harsh",
      age: 21,
      job: {
        title: "Javascript Developer"
      }
    },
    {
      name: "Omakar",
      age: 20,
      job: {
        title: "Data Analist"
      }
    },
    {
      name: "Raj",
      age: 20,
      job: {
        title: "Tester"
      }
    },
  ]

  // 9. pluck operator - deprecated in v8
  pluckOperator(){
    let pluckObs = from(this.users).pipe(
      // map(data=>data.name),
      map(data=>data.job.title),
      // pluck('name'),
      // pluck('job','title'),
      toArray()
    ).subscribe((res)=>{
      console.log(res)
    })
  }

  // 10. filter operator
  filterOperator(){
    let filterObs = from(this.users).pipe(
      filter(data=>data.name.length>5),
      toArray()
    ).subscribe((res)=>{
      console.log(res)
    });
  }

  // 11. tap operator
  tapOperator(){
    const int$ = interval(1000);
    const arr = ['Roshan', 'Raj', 'omkar', 'harsh']
    let tapObs = int$.pipe(
      tap(data=>console.log("tap before "+data)),
      tap((data)=> {
        if(data === 4 ){
          tapObs.unsubscribe();
        }
      }),
      map(data=>arr[data]),
      tap(data=>console.log("tap after"+data)),
    ).subscribe((res)=>{
      console.log("response ", res);
    })
  }


  // 11. take operator
  takeOperator(){
    // 11.1 take
    // const int1$ = interval(1000);
    // int$.pipe(
    //   // map(data=>data+1),
    //   take(5),
    // ).subscribe((res)=>{
    //   console.log(res);
    // })

    // 11.2 takeLast 
    // const num = of(1,2,3,4,5,6,7,8);
    // num.pipe(
    //   takeLast(5)
    // ).subscribe((res)=>{
    //   console.log(res);
    // })

    // 11.3 takeUntil
    const int2$ = interval(1000);
    const cond1 = timer(5000);
    int2$.pipe(
      takeUntil(cond1)
    ).subscribe((res)=>{
      console.log(res);
    })


  }

  //12 Retry
  retryOperator(){
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
      // retry(3),
      retryWhen((err)=>err.pipe(
        delay(1000),
        scan((retryCount)=>{
          if(retryCount > 2){
            throw new Error("retry limit exceeded");
          }else{
            console.log("retryCount "+ retryCount)
            return retryCount+1;
          }
        },0)
      ))
    ).
    subscribe((res)=>{
      console.log(res);
    })
  }

  @ViewChild('search') search!: ElementRef;

  //13. DebounceTime
  debounceTimeOperator(){
    const s = fromEvent(this.search.nativeElement, 'keyup')
    .pipe(
      map((event: any)=>event.target.value),
      debounceTime(1000),
      distinctUntilChanged()
    )
    
    s.subscribe((res)=>{
      console.log(res)
    })
  }


}
