import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular';

import { MapServiceProvider } from '../../providers/map-service/map-service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit, OnDestroy {

  lat: number;
  lng: number;

  markers: any;
  subscription: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private mapService: MapServiceProvider) {
  }

  ngOnInit() {
    // this.seedDatabase();
    this.getUserLocation(15);
    this.subscription = this.mapService.hits
      .subscribe(hits => this.markers = hits)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private getUserLocation(distance) {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.mapService.getLocations(distance, [this.lat, this.lng]);
      });
    }
  }

  private seedDatabase() {
    let dummyPoints = [
      [55.457629099999676, 12.602685099999345],
      [55.657629099999455, 12.632685099999876],
      [55.767629099999988, 12.642685099999234],
      [55.337629099999525, 12.662685099999987],
      [55.657629099999044, 12.682685099999674]
    ]
    dummyPoints.forEach((val, idx) => {
      let name = `dummy-location-${idx}`
      console.log(idx)
      this.mapService.setLocation(name, val, "")
    })
  }

}
