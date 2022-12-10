import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor() { }

  async lookupISBN(barcode: string) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${barcode}`;
    const response = await fetch(url);
    const data = await response.json();
    return JSON.stringify(data, undefined, 2);
  }

}
