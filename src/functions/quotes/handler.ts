import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import blueUSDService from 'src/services/blueUSDService';
import dbService from 'src/services/dbService';

const quotes: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  let cache;
  try {
    cache = await dbService.findByKey("quote-cache", "quotes-info");
  } catch(err) {
    console.log(err);
  }
  if (!!cache && cache.lastUpdated > (new Date().getTime() - 60000)) {
    return formatJSONResponse(cache.response);
  }
  const allQuotes = await blueUSDService.getAllQuotes();
  await dbService.save("quote-cache", "quotes-info", {
    lastUpdated: new Date().getTime(),
    response: allQuotes,
  });
  return formatJSONResponse(allQuotes);
}

export const main = middyfy(quotes);
