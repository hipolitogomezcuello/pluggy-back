import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import blueUSDService from 'src/services/blueUSDService';

const average: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  const averageQuote = await blueUSDService.getAverage();
  return formatJSONResponse(averageQuote);
}

export const main = middyfy(average);
