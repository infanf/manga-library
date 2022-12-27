import { Component, OnInit } from "@angular/core";
import { LookupService } from "@service/lookup.service";
import { Volume } from "@models/volume";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent implements OnInit {
  barcode = "";
  alreadyScanned: string[] = [];
  data: Volume[] = [];
  selectedDevice?: MediaDeviceInfo;

  constructor(private lookup: LookupService) {}

  onScanSuccess(barcode: string) {
    this.barcode = barcode;
    if (this.alreadyScanned.includes(barcode)) {
      this.barcode = `${barcode} - Already scanned`;
      return;
    }
    this.alreadyScanned.push(barcode);
    this.lookupISBN(barcode);
  }

  async ngOnInit() {
  }

  async lookupISBN(barcode: string) {
    if (!barcode.match(/^(97[89]\d{10}|\d{9}[\dX])$/)) {
      this.barcode = `${barcode} - Invalid ISBN`;
      return;
    }
    if (this.data.find((x) => x.isbn10 === barcode || x.isbn13 === barcode)) {
      return;
    }
    const volume = await this.lookup.lookupISBN(barcode);
    if (volume.isbn10) {
      this.data.push(volume);
    } else {
      this.barcode = `${barcode} - Not found`;
    }
  }
}
