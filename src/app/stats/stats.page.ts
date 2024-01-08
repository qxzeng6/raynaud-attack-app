import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {Preferences} from "@capacitor/preferences";
import {ActivatedRoute, Router} from "@angular/router";
import Chart from 'chart.js/auto';
import * as _ from 'lodash'

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage {
  isLoading = false;
  statsData: any[] = []
  name: string = '';
  chart: any = null;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    Preferences.get({ key: 'name' }).then((name) => {
      if (name.value) {
        this.name = name.value;
      }

      this.route.data.subscribe(
        ({data}) => {
          console.log("loaded", data)
          this.isLoading = false;
          if (data === false) {
            this.router.navigate(['/']);
            return;
          }
          this.statsData = data;
          this.generateGraph();
        });
    })
  }

  generateGraph() {
    const data = _.groupBy(this.statsData, 'attackDate');
    console.log(data)
    if (this.chart)
      this.chart.destroy();
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: '# of Attacks',
            data: Object.keys(data).map((key) => data[key].length),
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
