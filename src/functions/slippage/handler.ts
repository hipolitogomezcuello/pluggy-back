import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import blueUSDService from 'src/services/blueUSDService';
import dbService from 'src/services/dbService';

const slippages: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  let cache;
  try {
    cache = await dbService.findByKey("slippage-cache", "quotes-info");
  } catch(err) {
    console.log(err);
  }
  if (!!cache && cache.lastUpdated > (new Date().getTime() - 60000)) {
    return formatJSONResponse(cache.response);
  }
  const slippages = await blueUSDService.getAllSlippages();
  await dbService.save("slippage-cache", "quotes-info", {
    lastUpdated: new Date().getTime(),
    response: slippages,
  });
  return formatJSONResponse(slippages);
}

export const main = middyfy(slippages);
