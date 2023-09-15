import {
  Card,
  Text,
  CardBody,
  Image,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import stockDataService from "../../services/stockTickerService";
import { createUseStyles } from "react-jss";
import { Typeahead } from "react-bootstrap-typeahead";

const useStyles = createUseStyles({
  autocomplete: {
    background: "white",
    color: "black",
    "& .rbt-menu": {
      background: "rgba(255,255,255)",
    },
  },
});

type TickerWidgetProps = {
  stockTicker: string;
  companyName: string;
  price: number;
  change: number;
  percentChange: number;
};

type SearchItem = {
  id: number;
  name: string;
  info: string;
};

const UP_ICON = <>&#9652;</>;
const DOWN_ICON = <>&#9662;</>;
const COLOR_GREEN_TICKER = "rgb(8, 153, 129)";
const COLOR_RED_TICKER = "rgb(242, 54, 69)";

const TickerWidget = () => {
  const classes = useStyles();

  const [isStockSelecting, setIsStockSelecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<TickerWidgetProps | null>(null);

  const [stocksAutoComplete, setStocksAutoComplete] = useState([]);

  const getStockDataForStock = async (
    stock: string
  ): Promise<TickerWidgetProps | null> => {
    const stockData = await stockDataService.getStockData(stock);
    if (stockData === null) {
      console.log("Stock data is null");
      return null;
    }
    return {
      ...stockData,
      stockTicker: stock,
    };
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      const data = await getStockDataForStock("RELIANCE");
      setData(data);
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  const handleStockChange = async (stocks: any) => {
    if (stocks.length > 0) {
      const stock = stocks[0];
      setIsStockSelecting(false);
      setIsLoading(true);
      const data = await stockDataService.getStockData(stock.name);
      if (data === null) {
        console.log("Stock data is null");
        setIsLoading(false);
        return;
      }

      setData((d) => ({ ...d, stockTicker: stock.name, ...data }));
      setIsLoading(false);
    }
  };

  const handleStockInputChange = async (value: string) => {
    if (value) {
      const data = await stockDataService.searchStocksWithName(value);
      setStocksAutoComplete(data);
    }
  };

  return (
    <Card minW="20rem" height="min-content">
      <CardBody>
        <VStack spacing="0" alignItems="flex-start" objectFit="cover">
          {isLoading && (
            <Flex justifyContent="center" width="100%" fontSize="1.5rem">
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            </Flex>
          )}
          {!isLoading && !isStockSelecting && (
            <Text
              fontSize="14px"
              fontWeight="700"
              onClick={() => setIsStockSelecting(true)}
            >
              {data?.stockTicker}
            </Text>
          )}
          {!isLoading && isStockSelecting && (
            <>
              <Typeahead
                id="stock"
                options={stocksAutoComplete}
                labelKey="name"
                placeholder="Search for a stock..."
                onChange={handleStockChange}
                onInputChange={handleStockInputChange}
                className={classes.autocomplete}
              />
            </>
          )}

          <Text fontSize="12px">{data?.companyName}</Text>
        </VStack>
        <HStack width="100%">
          <Text fontSize="28px" fontWeight="700" width="40%">
            {data?.price} ₹
          </Text>
          <Text
            fontSize="18px"
            color={
              data?.change && data?.change > 0
                ? COLOR_GREEN_TICKER
                : COLOR_RED_TICKER
            }
          >
            {data?.change && data?.change > 0 && UP_ICON}
            {data?.change && data?.change < 0 && DOWN_ICON}
            {data?.percentChange?.toFixed(2)}% ({data?.change?.toFixed(2)})
          </Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TickerWidget;
