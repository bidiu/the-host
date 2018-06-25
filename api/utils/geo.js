/*
 * geographical utils in this file
 */

const axios = require('axios').default;
const env = require('../env/env');

/**
 * Geo-code an address to a coordinate with Google map API. 
 * Resolve the coded coordinate, or reject with any error.
 */
async function geoCodeAddress(address) {
  // TODO
}

/**
 * Return an image url which can be put in the `src` attribute
 * of an image.
 * 
 * @param {*} address address or coordinate (also known as marker)
 * @param {*} key     google api key
 */
function genStaticMapUrl(address, { size = '500x500' } = {}) {
  if (address === undefined) {
    return undefined;
  }

  let protocol = env.env === 'dev' ? 'http' : 'https';
  let host = 'maps.googleapis.com';
  let endpoint = '/maps/api/staticmap';
  let key = env.mapApiKey;

  let url = `${protocol}://${host}${endpoint}?key=${key}&markers=${address}&size=${size}`;
  return encodeURI(url);
}

exports.geoCodeAddress = geoCodeAddress;
exports.genStaticMapUrl = genStaticMapUrl;
