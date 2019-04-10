import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.backObservable().subscribe(
      c => console.log('Subs', c),
      err => console.error('Error en el obs', err),
      () => console.log('El observable termino!')
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  backObservable(): Observable<any> {
    return new Observable(observer => {
      let c = 0;

      const intervalo = setInterval(() => {
        c++;

        const output: Object = {
          value: c
        };

        observer.next(output);

        // if (c === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
      }, 1000);
    }).pipe(
      map((resp: any) => resp.value),
      filter((value, index) => {
        if (value % 2 !== 0) return true
        else return false
      })
    )
  }

}
