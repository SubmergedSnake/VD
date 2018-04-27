import { Injectable } from '@angular/core';


@Injectable()
export class GeolocationService {

    location : string;

    getLocation(): Promise<String> {
        return Promise.resolve(this.location);
    }
}