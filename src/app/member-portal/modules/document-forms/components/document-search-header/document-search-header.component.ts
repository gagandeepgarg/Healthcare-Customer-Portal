import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UtilService } from '@app/core/services/util.service';

@Component({
  selector: 'app-document-search-header',
  templateUrl: './document-search-header.component.html',
  styleUrls: ['./document-search-header.component.scss']
})
export class DocumentSearchHeaderComponent implements OnInit {
  showBackButton = false;
  searchtextValue = '';
  constructor(private utilService: UtilService) { }
  @Output() searchClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() backClickEvent: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.utilService.documentAndFormClick.subscribe(status => {
      if (status) {
        this.BackCliked();
        this.searchtextValue = '';
      }
    });
  }
  SerachFile(searchText: string) {
    this.showBackButton = true;
    this.searchClickEvent.emit(searchText);
  }
  BackCliked() {
    this.showBackButton = false;
    this.backClickEvent.emit();
  }
  SearchPressed(event, searchText) {
    if (event.which === 13) {
      this.showBackButton = true;
      this.searchClickEvent.emit(searchText);
    }
  }
  ClearClicked() {
    if (this.showBackButton) {
      this.showBackButton = true;
      this.searchClickEvent.emit('');
    }
  }
}
