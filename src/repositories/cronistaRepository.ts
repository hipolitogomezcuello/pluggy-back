import axios from "axios";
import cheerio from "cheerio";
import Quote from "src/model/Quote";
const url = "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB";

const findBlueUSDValue = async (): Promise<Quote> => {
  const { data: html } = await axios.get(url);

  const $ = cheerio.load(html);
  const buyText = $(".piece.markets.standard.boxed").find(".buy-value").text();
  const sellText = $(".piece.markets.standard.boxed").find(".sell-value").text();
  const buy_price = parseFloat(buyText.replace("$", "").replace(",", "."));
  const sell_price = parseFloat(sellText.replace("$", "").replace(",", "."));
  return { buy_price, sell_price, source: url };
}

export default {
  findBlueUSDValue
}