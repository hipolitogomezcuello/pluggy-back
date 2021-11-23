import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import blueUSDService from 'src/services/blueUSDService';
import dbService from 'src/services/dbService';

const average: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  let cache;
  try {
    cache = await dbService.findByKey("average-cache", "quotes-info");
  } catch(err) {
    console.log(err);
  }
  if (!!cache && cache.lastUpdated > (new Date().getTime() - 60000)) {
    return formatJSONResponse(cache.response);
  }
  const allQuotes = await blueUSDService.getAllQuotes();
  const averageQuote = blueUSDService.getAverage(allQuotes);
  await dbService.save("average-cache", "quotes-info", {
    lastUpdated: new Date().getTime(),
    response: averageQuote,
  });
  return formatJSONResponse(averageQuote);

}

export const main = middyfy(average);
