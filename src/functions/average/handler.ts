import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import blueUSDService from 'src/services/blueUSDService';

const average: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  const allQuotes = await blueUSDService.getAllQuotes();
  const averageQuote = blueUSDService.getAverage(allQuotes);
  return formatJSONResponse(averageQuote);
}

export const main = middyfy(average);
