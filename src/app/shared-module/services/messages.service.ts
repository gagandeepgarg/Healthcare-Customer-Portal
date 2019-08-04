import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as constants from '@core/constants/app-constants';

@Injectable()
export class MessagesService {
  private server: string;
  constants = constants;

  constructor(private _http: HttpClient) {
    this.server = environment.apiUrl;
  }

  GetMemberMessages(userId, isArchived, pageNumber, messagesPerPage, sortColumn) {
    const obj = {
      userId: userId,
      pageNumber: pageNumber,
      messagesPerPage: messagesPerPage,
      sortColumn: sortColumn,
      isSortByDesc: true,
      isArchivedMessageRequest: isArchived
    };
    return this._http.post(
      this.server + constants.ApiEndPoints.GetMemberMessagesByPage, obj);
  }
  DeleteMessages(msgIds) {
    return this._http.post(
      this.server + constants.ApiEndPoints.Deletemessage, msgIds);
  }
  ArchiveMessages(msgIds, archive) {
    return this._http.post(
      this.server + constants.ApiEndPoints.Archivemessage + archive, msgIds);
  }
  MarkAsRead(messageId) {
      return this._http.get(
        this.server + constants.ApiEndPoints.Markasread + messageId);
  }
  GetUnreadMessageCount(userId) {
    return this._http.get(
      this.server + constants.ApiEndPoints.GetUnreadMessageCount + userId);
  }
}
