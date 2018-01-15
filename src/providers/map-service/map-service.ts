import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { GOOGLE_MAPS_API_KEY, GMAPS_API_URL_GEO } from '../../configs';

import * as GeoFire from "geofire";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { LoginServiceProvider } from '../login-service/login-service';

@Injectable()
export class MapServiceProvider {

  dbRef: AngularFireList<any>;
  branchesRef: AngularFireList<any>;
  geoFire: any;
  hits = new BehaviorSubject([])

  constructor(
    private afDB: AngularFireDatabase,
    public http: HttpClient,
    public loginService: LoginServiceProvider
  ) {
    /// Reference database location for GeoFire
    this.dbRef = this.afDB.list('/locations');
    this.branchesRef = this.afDB.list(`/companies/${loginService.getUser().uid}/locations`);
    this.geoFire = new GeoFire(this.dbRef.query.ref);
  }

  /// Adds GeoFire data to database
  public setLocation(key: string, coords: Array<number>, company) {
    this.geoFire.set(key, coords)
      .then(_ => {
        console.log('location updated');
        this.dbRef.update(key, { 'company': company});
        this.branchesRef.push(key);
      })
      .catch(err => console.log(err))
  }

  /// Queries database for nearby locations
  /// Maps results to the hits BehaviorSubject
  public getLocations(radius: number, coords: Array<number>) {

    this.geoFire.query({
      center: coords,
      radius: radius
    })
      .on('key_entered', (key, location, distance) => {
      let hit = {
        location: location,
        distance: distance
      }
      let currentHits = this.hits.value
      currentHits.push(hit)
      this.hits.next(currentHits)
    })
  }

  getCoordinates(address, company) {
    return this.http.get(`${GMAPS_API_URL_GEO}?address=${address}&key=${GOOGLE_MAPS_API_KEY}`)
      .map(res => {
        console.log(res);
        const locationObj = res.results[0].geometry.location;
        const locationArr:number[] = [];
        locationArr.push(locationObj.lat);
        locationArr.push(locationObj.lng);
        const placaId = res.results[0].place_id;
        this.setLocation(placaId, locationArr, company)
        return locationArr;
      },
      err => {
        console.warn('Error locating address', err);
      });
  }

}
