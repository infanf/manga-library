import { Component, OnInit } from "@angular/core";
import { EAN13Reader } from "@zxing/library";
import { BrowserCodeReader } from "@zxing/browser";
import { LookupService } from "@service/lookup.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent implements OnInit {
  barcode = "";
  data: any;
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
    this.barcode = "Scanning..."
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
          this.barcode = String(result) || "";
          this.data = await this.lookup.lookupISBN(this.barcode);
      }
      }
    );
  }
}
