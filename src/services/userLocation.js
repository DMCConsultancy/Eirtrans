import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import {GEOCODING_API} from '../../config.json';
import {PrettyPrintJSON, isJSObj} from '../utils/helperFunctions';

export default class UserLocation {
  constructor() {
    console.log({GEOCODING_API});
    Geocoder.init(GEOCODING_API, {language: 'en'});
  }

  getLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Eirtrans location permission',
          message:
            'Eirtrans needs to access your current location ' +
            'to get the shipping from address.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
  };

  getLocationCoordinates = async () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          console.log({position});
          resolve(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          reject(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  };

  getUsersCurrentLocation = async () => {
    const hasLocationPermission = await this.getLocationPermission();

    console.log({hasLocationPermission});

    if (hasLocationPermission) {
      const position = await this.getLocationCoordinates().catch(error => {
        console.log({error});
      });

      const {latitude, longitude} = position.coords;

      console.log({latitude, longitude});

      const addressJson = await Geocoder.from(latitude, longitude).catch(
        error => console.warn(error),
      );

      const addressComponent = addressJson.results[0].address_components[0];
      PrettyPrintJSON({
        addressComponent,
        addressJson: addressJson.results[0].formatted_address,
      });

      if (addressJson && isJSObj(addressJson)) {
        if (Array.isArray(addressJson.results)) {
          return addressJson.results[0]?.formatted_address;
        }
      }

      return '';
    }
  };
}
