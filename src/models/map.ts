export interface Location {
  id: string;
  country: string;
  city: string;
  street: string;
  post: number;
  gpxData: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface GeoJson {
  type: string;
  geometry: Geometry;
  properties?: any;
  $key?: string;
}

export class GeoJson implements GeoJson {
  type = 'Feature';
  geometry: Geometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    }
  }
}

export class FeatureCollection {
  type: 'FeatureCollection'

  constructor(public features: Array<GeoJson>) {}
}
