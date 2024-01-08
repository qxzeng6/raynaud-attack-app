import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import {Device, DeviceId, DeviceInfo} from '@capacitor/device';
import {ActivatedRoute, Router} from "@angular/router";
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-report',
  templateUrl: 'setup.page.html',
  styleUrls: ['setup.page.scss']
})
export class SetupPage {
  name = '';
  isLoading = false;
  isAlertOpen = false;
  isToastOpen = false;
  toastMessage = 'Please enter your name';
  alertButtons: string[] = [ "Continue" ];

  onInput(ev: any) {
    this.name = ev.target!.value;
  }

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.data.subscribe(
      ({data}) => {
        console.log("loaded", data)
        this.isLoading = false;
        if (data) {
          this.router.navigate(['/main']);
        }
      });
  }
  async onStart(){
    console.log("start")
    this.isLoading = true;
    if (!this.name) {
      this.showToast("Please enter your name");
      this.isLoading = false;
      return;
    }

    const deviceId: DeviceId = await Device.getId();
    console.log(deviceId)
    if (!deviceId || !deviceId.identifier) {
      this.showToast("Unable to get device UUID");
      this.isLoading = false;
      return;
    }
    const result = await this.apiService.registerParticipant(this.name, deviceId.identifier);
    console.log("Start", this.name, result);

    await Preferences.set({ key: 'name', value: this.name })
    // if (result.data === deviceId.identifier) {
    //   this.showToast("Registration successful");
    //   this.setOpen(true);
    //   return;
    // } else {
    //   this.showToast("Registration failed");
    //   return;
    // }

    this.setOpen(true);
    this.isLoading = false;
    return;
  }

  setOpen(open: boolean) {
    this.isAlertOpen = open;
  }
  setToastOpen(open: boolean) {
    this.isToastOpen = open;
  }
  showToast(message: string) {
    this.toastMessage = message;
    this.setToastOpen(true);
  }

  exitSetup() {
    console.log("exit setup")
    this.router.navigate(['/main']);
    this.setOpen(false);
  }
}
