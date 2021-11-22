import axios from "axios";
import Quote from "src/model/Quote";
const ambitoApiUrl = "https://mercados.ambito.com//home/general";

const findBlueUSDValue = async () : Promise<Quote> => {
  const apiResponse = await axios.get(ambitoApiUrl);
  const quotes = apiResponse.data;
  const dolarBlue = quotes.find(quote => quote.nombre === "Dólar Informal");
  const buy_price = parseFloat(dolarBlue.compra.replace(",", "."));
  const sell_price = parseFloat(dolarBlue.venta.replace(",", "."));
  const source = "https://www.ambito.com/contenidos/dolar.html";
  return {
    name: "ámbito",
    buy_price,
    sell_price,
    source
  }
}

export default {
  findBlueUSDValue
}