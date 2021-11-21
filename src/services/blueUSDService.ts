import ambitoRepository from "src/repositories/ambitoRepository";

const getAllQuotes = async () => {
  const ambitoQuote = await ambitoRepository.findBlueUSDValue();
  return [
    ambitoQuote,
  ]
}
export default {
  getAllQuotes,
};