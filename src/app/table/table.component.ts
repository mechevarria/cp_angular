import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';
import { EventService } from './event.service';
import { Event } from './event';
import { Point } from 'mapbox-gl';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['table.component.css']
})
export class TableComponent implements OnInit {

  events: Event[] = [];
  count: number = 0;
  limit: number = 10;
  page: number = 1;
  modalRef: BsModalRef;
  detail: Event;

  constructor(private eventService: EventService, private modalService: BsModalService) {
  }

  viewEvent(template: TemplateRef<any>, event: Event) {
    this.detail = event;
    this.detail.GEO_LOCATION = JSON.parse(this.detail.GEO_LOCATION);
    const config: ModalOptions = { class: 'modal-lg'};
    this.modalRef = this.modalService.show(template, config);
  }

  load(): void {
    this.eventService.getEvents(this.page, this.limit).subscribe(res => {
      if (res !== null) {
        this.events = res.results;
        this.count = parseInt(res.count);
      }
    });
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.load();
  }

  limitChanged(): void {
    this.page = 1;
    this.load();
  }

  ngOnInit() {
    this.load();
  }
}
