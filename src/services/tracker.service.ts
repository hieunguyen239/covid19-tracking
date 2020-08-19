import axios from 'axios';

export default class TrackerService {
  private url = 'https://api.covid19api.com/';

  getSummary() {
    const endPoint = 'summary';
    return axios.get(this.url + endPoint);
  }

  getSummaryByCountry(countrySlug: string, from: string = '', to: string = '') {
    const fromTo = (from && to) ? `?from=${from}&to=${to}` : '';
    const endPoint = `total/country/${countrySlug}${fromTo}`;
    return axios.get(this.url + endPoint);
  }
}