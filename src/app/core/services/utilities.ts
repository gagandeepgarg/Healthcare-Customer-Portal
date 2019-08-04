import { Injectable } from '@angular/core';

@Injectable()
export class Utilities {

  public static safeStringify(object) {
    let result: string;
    try {
      result = JSON.stringify(object);
      return result;
    } catch (error) {}
    const simpleObject = {};
    for (const prop in object) {
      if (!object.hasOwnProperty(prop)) {
        continue;
      }
      if (typeof object[prop] === 'object') {
        continue;
      }
      if (typeof object[prop] === 'function') {
        continue;
      }
      simpleObject[prop] = object[prop];
    }
    result = '[***Sanitized Object***]: ' + JSON.stringify(simpleObject);
    return result;
  }

  public static JsonTryParse(value: string) {
    try {
      return JSON.parse(value);
    } catch (e) {
      if (value === 'undefined') {
        return void 0;
      }
      return value;
    }
  }
}
