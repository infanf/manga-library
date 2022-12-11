import { Injectable } from '@angular/core';
import { Series, Volume } from '@app/types/volume';
import { GoogleBooksVolumes } from '@models/google';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private cache: CacheService) { }

  async lookupISBN(barcode: string): Promise<Volume> {
    const openLibrary = this.lookupOpenLibrary(barcode);
    const google = this.lookupGoogleBooks(barcode);
    const volume = {} as Partial<Volume>;
    const [ol, gb] = await Promise.all([openLibrary, google]);
    if (gb?.items?.length) {
      const item = gb.items[0];
      const info = item.volumeInfo;
      volume.title = info.title;
      volume.authors = info.authors;
      volume.publisher = info.publisher;
      volume.publishedDate = info.publishedDate;
      volume.description = info.description;
      volume.isbn10 = info.industryIdentifiers.find(x => x.type === 'ISBN_10')?.identifier;
      volume.isbn13 = info.industryIdentifiers.find(x => x.type === 'ISBN_13')?.identifier;
      volume.pageCount = info.pageCount;
      volume.printType = info.printType;
      volume.cover = info.imageLinks?.thumbnail;
      volume.language = info.language;
      volume.ids = {
        google: item.id,
        // openLibrary: ol[`ISBN:${barcode}`]?.identifiers?.openlibrary?.[0]
      };
    }
    if (volume.title) {
      volume.series = this.lookupSeries(volume.title);
    }
    return volume as Volume;
  }

  private async lookupGoogleBooks(barcode: string): Promise<GoogleBooksVolumes> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${barcode}`;
    const data = await this.cache.fetch<GoogleBooksVolumes>(url);
    return data;
  }

  private async lookupOpenLibrary(barcode: string) {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${barcode}&jscmd=data&format=json`;
    const data = await this.cache.fetch(url);
    return data;
  }

  private lookupSeries(title: string): Series | false {
    const matches = title.match(/^(.+)\s+(?:Vol(?:\.|ume)?\s*)?(\d+)(?:\([\d\s]+\))?$/);
    console.debug({matches})
    if (!matches) return false;
    const series = {} as Series;
    series.title = matches[1];
    series.volume = parseInt(matches[2], 10);
    return series;
  }
}