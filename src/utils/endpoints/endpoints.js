import {environment} from '../constant/Constant';

class Endpoints {
  baseUrl = environment.baseUrl;
  GET_DAY = this.baseUrl + 'get-sheetday';
  GET_EXPENSETYPE = this.baseUrl + 'exptype-get';
  SAVETIMESHEET = this.baseUrl + 'timeseet-save';
  SUBMIT_SHEET = this.baseUrl + 'submit_sheet/'
}

export const API = new Endpoints();
