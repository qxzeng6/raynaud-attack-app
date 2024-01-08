import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {Device, DeviceId, DeviceInfo} from '@capacitor/device';
import {ApiService} from "../api.service";
import {Preferences} from "@capacitor/preferences";

export const statsResolver: ResolveFn<boolean> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot, apiService: ApiService = inject(ApiService)) => {

    return Preferences.get({ key: 'name' })
      .then((name) => {
        if (!name.value) {
          return false;
        }

        return apiService.fetchAttackStats(name.value)
          .then((result) => {
            if (result.status === 200) {
              return result.data
            } else {
              return []
            }
          })
          .catch((err) => {
            console.log(err);
            return [];
          });
      })
  };
