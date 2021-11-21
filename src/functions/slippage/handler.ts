import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import blueUSDService from 'src/services/blueUSDService';

const slippages: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  const slippages = await blueUSDService.getAllSlippages();
  return formatJSONResponse(slippages);
}

export const main = middyfy(slippages);
