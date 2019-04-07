import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() porcentaje: number = 50;
  @Input() leyenda: string = 'Leyenda';

  @Output() eventChangeValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onChanges(event: number): void {
    if (event >= 100) {
      this.porcentaje = 100;
    } else if (event <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = event;
    }

    this.txtProgress.nativeElement.value = this.porcentaje;
    this.eventChangeValue.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

  public changeValue(value: number): void {
    if (this.porcentaje >= 100 && value > 0) {
      this.porcentaje = 100;
      return;  
    }

    if (this.porcentaje <= 0 && value < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje += value;
    this.eventChangeValue.emit(this.porcentaje);
  }

}
