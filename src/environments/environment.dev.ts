import { IEnvironmentVariables } from './IEnvironment';

export const environment: IEnvironmentVariables = {
  production: false,
  portalID: 2,
  routes: '',
  buildNumber: '001',
  baseUrl: '',
  /* authUrl: 'http://54.211.213.216:6150/api/',
  apiUrl: 'http://54.211.213.216:6300/api/member/',
  dmsUrl: 'http://54.211.213.216:6600/api/Documents/', */
  authUrl: 'http://3.84.169.67:5000/api/',
  apiUrl: 'http://3.84.169.67:6300/api/member/',
  dmsUrl: 'http://3.84.169.67:6750/api/Documents/',
  verifyAddressUrl: 'http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=',
  stage: '',
  version: '1.0',
  themeId: 1,
  logLimit: 5,
  client_id: 'resourceownerclient',
  clientSecret: 'secret',
  grantType: 'password',
  clientRoot: '',
  clientScope: 'memberapi offline_access',
};
