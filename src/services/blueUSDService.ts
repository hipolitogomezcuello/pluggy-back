import Quote from "src/model/Quote";
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
export default {
  getAllQuotes,
};