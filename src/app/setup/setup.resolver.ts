import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {Device, DeviceId, DeviceInfo} from '@capacitor/device';
import {ApiService} from "../api.service";
import {Preferences} from "@capacitor/preferences";

export const setupResolver: ResolveFn<boolean> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, apiService: ApiService = inject(ApiService)) => {
    return Promise.all([
      Device.getId(),
      Preferences.get({ key: 'name' })
    ])
      .then(([deviceId, name]) => {
        if (!deviceId.identifier) {
          throw new Error("Unable to get device UUID");
        }
        if (!name.value) {
          throw new Error("Unable to get name");
        }

        return apiService.registerParticipant(name.value, deviceId.identifier)
      })
      .then((result) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
