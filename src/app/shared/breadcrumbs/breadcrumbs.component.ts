import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  public title: string;

  constructor(private _router: Router, private _title: Title, private _meta: Meta) {
    this.getDataRoute()
      .subscribe(data => {
        this.title = data.title
        this._title.setTitle(this.title);

        const metaTag: MetaDefinition = {
          name: 'Description',
          content: this.title
        };

        this._meta.updateTag(metaTag);
      });
  }

  ngOnInit() {
  }

  private getDataRoute(): Observable<any> {
    return this._router.events.pipe(
      filter(e => e instanceof ActivationEnd),
      filter((e: ActivationEnd) => e.snapshot.firstChild === null),
      map((e: ActivationEnd) => e.snapshot.data)
    );
  }

}
