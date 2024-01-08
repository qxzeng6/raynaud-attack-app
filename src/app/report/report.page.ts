import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Preferences} from "@capacitor/preferences";
import {RadioGroupCustomEvent} from "@ionic/angular";
import {Device, DeviceId} from "@capacitor/device";
import {Router} from "@angular/router";

@Component({
  selector: 'app-report',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss']
})
export class ReportPage {
  isLoading = false;
  name: string = '';
  attackPosition: string = 'inside';
  isToastOpen = false;
  toastMessage = '';
  toastClass = 'normal-toast';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    Preferences.get({ key: 'name' }).then((name) => {
      this.isLoading = false;
      if (name.value) {
        this.name = name.value;
      }
    });
  }

  onPositionChange(event: RadioGroupCustomEvent) {
    this.attackPosition = event.detail.value;
  }

  async onClickReport(){
    console.log("report", this.attackPosition)
    this.isLoading = true;
    const deviceId: DeviceId = await Device.getId();
    const username = await Preferences.get({ key: 'name' });
    if (!username.value) {
      this.router.navigate(['/']);
      return;
    }
    this.apiService.reportAttack(username.value, deviceId.identifier, this.attackPosition).then((result) => {
      console.log("report", result);
      if (result.data === 'Attack Reported') {
        this.showToast("Attack Reported", 'success');
      } else {
        this.showToast("Failed to Report the Attack", 'error');
      }
      this.isLoading = false;
    });
  }

  setToastOpen(open: boolean) {
    this.isToastOpen = open;
  }
  showToast(message: string, type: string = 'normal') {
    this.toastMessage = message;
    this.toastClass = type + '-toast';
    this.setToastOpen(true);
  }
}
