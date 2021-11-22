import axios from "axios";
import cheerio from "cheerio";
import Quote from "src/model/Quote";
const url = "https://dolarhoy.com/";

const findBlueUSDValue = async (): Promise<Quote> => {
  const { data: html } = await axios.get(url);

  const $ = cheerio.load(html);
  const buyText = $(".tile.is-parent.is-5").find(".compra").find(".val").text();
  const sellText = $(".tile.is-parent.is-5").find(".venta").find(".val").text();
  const buy_price = parseFloat(buyText.replace("$", ""));
  const sell_price = parseFloat(sellText.replace("$", ""));
  return { name: "DolarHoy", buy_price, sell_price, source: url };
}

export default {
  findBlueUSDValue
}