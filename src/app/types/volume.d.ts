export type Volume = {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  isbn10: string;
  isbn13: string;
  pageCount: number;
  printType: string;
  price: {
    amount: number;
    currencyCode: string;
  };
  cover: string;
  language: string;
  ids: {
    google?: string;
    openLibrary?: string;
  };
  series: false | Series;
};

export type Series = {
  title: string;
  volume: number;
  ids: {
    google: string;
    amazon: string;
    mal: number;
  };
};
