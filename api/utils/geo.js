/*
 * geographical utils in this file
 */

const axios = require('axios').default;
const env = require('../env/env');

const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${env.mapApiKey}`;

/**
 * Geo-code an address to a coordinate with Google map API. 
 * Resolve the coded coordinate, or reject with any error.
 * 
 * Return value format:
 * 
 *    { lat: 65.4117967302915, lng: -95.6546153197085 }
 */
async function geoCodeAddress(address) {
  let url = encodeURI(`${geocodingUrl}&address=${address}`);

  return axios.get(url)
    .then((resp) => {
      let payload = resp.data;

      if (payload.status !== 'OK') {
        throw new Error('Can\'t geocode the given address. Status: ', payload.status);
      }
      return payload.results[0].geometry.location;
    });
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
