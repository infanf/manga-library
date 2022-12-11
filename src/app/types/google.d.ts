export namespace GoogleBooks {
  export type Volume = {
    kind: "books#volume";
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: SearchInfo;
  };

  type VolumeInfo = {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: {
      type: "ISBN_10" | "ISBN_13";
      identifier: string;
    }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    comicsContent: boolean;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  type SaleInfo = {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  type AccessInfo = {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };

  type SearchInfo = {
    textSnippet: string;
  };

  export type Result<T> = {
    kind: string;
    totalItems: 1;
    items: T[];
  };
}

export type GoogleBooksVolumes = GoogleBooks.Result<GoogleBooks.Volume>;
