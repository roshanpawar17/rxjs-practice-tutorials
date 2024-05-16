import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxjs-practice-tutorials';

  dell: any = [
    {
      brand: 'Dell',
      hardDisk: '2 TB',
      color: 'black'
    }
  ]

  ngOnInit(): void {      
    // 1. use promise
    this.usingPromise();
    // 2. use Async/await
    this.usingAsyncAwait();
    // 3. using fectch api
    // 3.1) use promise for fetch api
    this.usingPromiseFetchApi();
    // 3.2) use Async/await for fetch api
    this.usingAsycAwaitFetchApi()
  }

  promiseFn(): Promise<any>{  
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        if(this.dell.length > 0){
          resolve(this.dell)
        }else{
          reject("Error")
        }
      }, 3000)
    });
  }

  // 1) using promises
  usingPromise(){
    this.promiseFn().then((res)=>{
      console.log("Data ", res);
    }).catch((err)=>{
      console.log(err);
    })
  }
      
  // 2) Async / await
  async usingAsyncAwait(){
    try{
      let res = await this.promiseFn();
      console.log("Data ", res);
    }catch(err){
      console.log(err);
    }
  }

  // 3. using fectch api

  // 3.1) using promise for fectch api
  usingPromiseFetchApi(){
    let api = fetch('https://jsonplaceholder.typicode.com/todos/1');
    api.then(res => res.json())
       .then(data => console.log("Data ", data))
       .catch((err) => console.log("Error", err));  
  }

   // 3.2) using Async / await fectch api
  async usingAsycAwaitFetchApi(){
    try{
      let res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      let data = await res.json();
      console.log("Data ", data);
    }catch(err){
      console.log("error", err);
    }
  }



  






}
