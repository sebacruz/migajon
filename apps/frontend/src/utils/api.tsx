import {
  adapterForAxios,
  FilterOperand,
  JsonApiJs,
  JsonSdkPromise,
} from 'json-api-nestjs-sdk';
import { EntityType, JsonConfig } from 'json-api-nestjs-sdk/mjs/src/lib/types';
import axios from 'axios';

const axiosAdapter = adapterForAxios(axios);

const jsonConfig: JsonConfig = {
  adapter: axiosAdapter,
  apiHost: 'http://localhost:3000',
  apiPrefix: 'api',
  dateFields: ['createdAt', 'updatedAt'],
  operationUrl: 'operation',
}

const jsonSdk = JsonApiJs(
  jsonConfig,
  true
);

class User {}

export const getAllResources = async (resource) => {
  return await jsonSdk.jonApiSdkService.getAll(resource)
}

export const getResource = async (resource, id: string | number) => {
  return await jsonSdk.jonApiSdkService.getOne(resource, id)
}

export const createResource = async (resource) => {
  return await jsonSdk.jonApiSdkService.postOne(resource)
}
