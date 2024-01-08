import { Injectable } from '@angular/core';
import axios, {AxiosInstance} from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpAgent: AxiosInstance = axios.create({})

  constructor() {
    this.httpAgent = axios.create({
      baseURL: 'https://server.zqx.9up.in',
      timeout: 10000,
      // headers: {'X-Custom-Header': 'foobar'}
    })
  }

  registerParticipant(name: string, deviceId: string) {
    return this.httpAgent.post('/participants/register', {
      userName: name,
      uuid: deviceId
    })
  }

  reportAttack(name: string, deviceId: string, position: string) {
    return this.httpAgent.post('/participants/report', {
      userName: name,
      uuid: deviceId,
      position
    })
  }

  fetchAttackStats(name: string) {
    return this.httpAgent.get(`/participants/dailyReport/${name}`)
  }
}
