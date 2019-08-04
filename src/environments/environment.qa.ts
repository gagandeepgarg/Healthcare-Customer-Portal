import { IEnvironmentVariables } from './IEnvironment';

export const environment: IEnvironmentVariables = {
  production: true,
  portalID: 2,
  routes: '',
  buildNumber: '001',
  baseUrl: '',
  authUrl: 'http://54.174.140.29:6300/api/',
  apiUrl: 'http://54.174.140.29:7150/api/member/',
  dmsUrl: 'http://54.174.140.29:6550/api/Documents/',
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
