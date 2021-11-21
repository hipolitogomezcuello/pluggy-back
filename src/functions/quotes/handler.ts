import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import blueUSDService from 'src/services/blueUSDService';

const quotes: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const allQuotes = await blueUSDService.getAllQuotes();
  return formatJSONResponse(allQuotes);
}

export const main = middyfy(quotes);
