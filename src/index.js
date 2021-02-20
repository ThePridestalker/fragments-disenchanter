const axios = require('axios').default;
const { baseUrl, token } = require('./dataRetrieval');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const endpointLOOT = '/lol-loot/v1/player-loot';
const endpointDISENCHANT = `/lol-loot/v1/recipes/CHAMPION_RENTAL_disenchant/craft?repeat=`;
const urlGET = baseUrl + endpointLOOT;
const urlPOST = baseUrl + endpointDISENCHANT;

const get = async (url) => {
  const options = {
    method: 'GET',
    url: url,
    headers: { Authorization: `Basic ${token}` },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    // console.log('ERROR', error);
  }
};

const post = async (url, champShard) => {
  const finalShard = '["' + champShard + '"]';

  const options = {
    method: 'POST',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`,
    },
    data: finalShard,
  };

  try {
    const response = await axios.request(options);
    // console.log('DATA', response.data);
    return response.data;
  } catch (error) {
    // console.log(error.message);
  }
};

(async () => {
  const loot = await get(urlGET);

  for (let index = 0; index < loot.length; index++) {
    const shard = loot[index];
    if (
      shard.disenchantLootName == 'CURRENCY_champion' &&
      shard.itemStatus == 'OWNED'
    ) {
      const finalResponse = await post(urlPOST + shard.count, shard.lootName);
      // console.log(finalResponse);
    }
  }
})();
