import AverageQuote from "src/model/AverageQuote";
import Quote from "src/model/Quote";
import Slippage from "src/model/Slippage";
import ambitoRepository from "src/repositories/ambitoRepository";
import cronistaRepository from "src/repositories/cronistaRepository";
import dolarHoyRepository from "src/repositories/dolarHoyRepository";

const getAllQuotes = async (): Promise<Quote[]> => {
  const ambitoQuote = await ambitoRepository.findBlueUSDValue();
  const dolarHoyQuote = await dolarHoyRepository.findBlueUSDValue();
  const cronistaQuote = await cronistaRepository.findBlueUSDValue();

  return [
    ambitoQuote,
    dolarHoyQuote,
    cronistaQuote,
  ]
}

const getAverage = (quotes: Quote[]): AverageQuote => {
  const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
  const allQuotes = quotes;
  const buyPrices = [];
  const sellPrices = [];
  for (const quote of allQuotes) {
    buyPrices.push(quote.buy_price);
    sellPrices.push(quote.sell_price);
  }
  const average_buy_price = parseFloat(average(buyPrices).toFixed(2));
  const average_sell_price = parseFloat(average(sellPrices).toFixed(2));
  return { average_buy_price, average_sell_price }
}

const getAllSlippages = async (): Promise<Slippage[]> => {
  const allQuotes: Quote[] = await getAllQuotes();
  const average: AverageQuote = getAverage(allQuotes);
  const slippages: Slippage[] = [];
  for (const quote of allQuotes) {
    const buy_price_slippage = parseFloat((quote.buy_price/average.average_buy_price-1).toFixed(3));
    const sell_price_slippage = parseFloat((quote.sell_price/average.average_sell_price-1).toFixed(3));
    slippages.push({
      buy_price_slippage,
      sell_price_slippage,
      source: quote.source,
    });
  }
  return slippages;
}

export default {
  getAllQuotes,
  getAverage: async () => getAverage(await getAllQuotes()),
  getAllSlippages,
};