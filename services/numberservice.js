const axios = require('axios');
//to evaluvate 
const BASE_URL = 'http://20.244.56.144/evaluation-service';

const idToEndpoint = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand'
};

async function getNumbersFromAPI(id) {
  const endpoint = idToEndpoint[id];
  const url = `${BASE_URL}/${endpoint}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 500);

    const response = await axios.get(url, {
      signal: controller.signal
    });

    clearTimeout(timeout);

    return response.data;
  } catch (error) {
    return { numbers: [] }; // Ignore timeout or failed responses
  }
}

module.exports = getNumbersFromAPI;
