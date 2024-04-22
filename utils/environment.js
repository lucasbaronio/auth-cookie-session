/* eslint-disable no-undef */
const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const TEST = 'test';

export const isProduction = () => process.env.NODE_ENV == PRODUCTION;
export const isDevelopment = () => process.env.NODE_ENV == DEVELOPMENT;
export const isTest = () => process.env.NODE_ENV == TEST;
