import http from "./httpService";

const stockDataUrl = "https://mockapi.harishb167.serv00.net/quote/";
const stockSearchUrl = "https://mockapi.harishb167.serv00.net/search/";

const searchStocksWithName = async (stock: String) => {
  let { data } = await http.get(stockSearchUrl + stock);

  data = data.symbols;

  data = data.map((item: any, idx: number) => ({
    id: idx + 1,
    name: item.symbol,
    info: item.symbol_info,
  }));

  return data;
};

const getStockData = async (stock: string) => {
  try {
    let { data } = await http.get(stockDataUrl + stock);
    const companyName = data.info.companyName;
    const price = data.priceInfo.lastPrice;
    const change = data.priceInfo.change;
    const percentChange = data.priceInfo.pChange;
    console.log("getStockData - data >> ", data);

    return { price, change, percentChange, companyName };
  } catch {
    return null;
  }
};

export default {
  searchStocksWithName,
  getStockData,
};
