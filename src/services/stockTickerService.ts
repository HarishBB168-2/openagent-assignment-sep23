import http from "./httpService";

const stockSearchUrl =
  "https://run.mocky.io/v3/6a8897d7-78c2-49ff-be6e-3d63b8eb6cb9";

const searchStocksWithName = async (stock: String) => {
  let { data } = await http.get(stockSearchUrl, {
    headers: { "Content-Type": "application/json" },
  });

  data = data.symbols;

  data = data.map((item: any) => ({
    country: item.country,
    exchange: item.exchange,
    stock: item.symbol,
  }));

  data = data.filter((item: any) => item.country);

  return data;
};

export default {
  searchStocksWithName,
};
