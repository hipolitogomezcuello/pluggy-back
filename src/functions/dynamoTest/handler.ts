import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import dynamoRepository from 'src/repositories/dynamoRepository';

const quotes: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const valueRead = await dynamoRepository.get("quote-cache", "quotes-info");
  console.log("value read");
  console.log(valueRead);
  //const test = JSON.parse(response.body);
  //return formatJSONResponse(test);
  const value = {
    lastUpdated: new Date().getTime(),
    response: [
      {
        name: "ámbito",
        buy_price: 197.5,
        sell_price: 201.5,
        source: "https://www.ambito.com/contenidos/dolar.html"
      },
      {
        name: "DolarHoy",
        buy_price: 198.5,
        sell_price: 201.5,
        source: "https://dolarhoy.com/"
      },
      {
        name: "El Cronista",
        buy_price: 198.5,
        sell_price: 201.5,
        source: "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB"
      }
    ]
  }
  const response = await dynamoRepository.write("quote-cache", "quotes-info", JSON.stringify(value));
  return formatJSONResponse(response);
}

export const main = middyfy(quotes);
