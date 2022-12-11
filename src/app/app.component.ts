import { Component, OnInit } from "@angular/core";
import { EAN13Reader } from "@zxing/library";
import { BrowserCodeReader } from "@zxing/browser";
import { LookupService } from "@service/lookup.service";
import { Volume } from "@models/volume";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent implements OnInit {
  barcode = "";
  data: Volume[] = [];
  selectedDevice?: MediaDeviceInfo;

  constructor(private lookup: LookupService) {}

  async ngOnInit() {
    console.log("ngOnInit");
    const videoInputDevices =
      await BrowserCodeReader.listVideoInputDevices().catch((e) => {
        console.log(e);
        return [];
      });
    if (videoInputDevices.length === 0) {
      console.log("No video input devices found.");
      return;
    }

    this.selectedDevice = videoInputDevices[1];

    //read barcode from camera

    this.scan();
  }

  async scan() {
    this.barcode = "Scanning...";
    if (!this.selectedDevice) {
      console.log("No video input device selected.");
      return;
    }
    const reader = new EAN13Reader();
    const codeReader = new BrowserCodeReader(reader);
    codeReader.decodeFromVideoDevice(
      this.selectedDevice.deviceId,
      "video",
      async (result, error, controls) => {
        if (result) {
          const barcode = String(result) || "";
          this.barcode = barcode;
          if (
            this.data.find((x) => x.isbn10 === barcode || x.isbn13 === barcode)
          ) {
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
    );
  }
}
