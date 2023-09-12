import { Card, Text, CardBody, Image, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import stockDataService from "../../services/stockTickerService";
import AutoComplete from "../AutoComplete";

type TickerWidgetProps = {
  stockTicker: string;
  companyName: string;
  price: number;
  currency: string;
  change: number;
  percentChange: number;
  imageUrl: string;
};

const UP_ICON = <>&#9652;</>;
const DOWN_ICON = <>&#9662;</>;
const COLOR_GREEN_TICKER = "rgb(8, 153, 129)";
const COLOR_RED_TICKER = "rgb(242, 54, 69)";

const TickerWidget = ({
  stockTicker,
  companyName,
  price,
  currency,
  change,
  percentChange,
  imageUrl,
}: TickerWidgetProps) => {
  const [isStockSelecting, setIsStockSelecting] = useState(false);

  const [data, setData] = useState<TickerWidgetProps>({
    stockTicker,
    companyName,
    price,
    currency,
    change,
    percentChange,
    imageUrl,
  });

  const getStockList = async () => {
    const data = await stockDataService.searchStocksWithName("GAIL");
    console.log("data :>> ", data);
    return data;
  };

  const handleStockSelect = (stock: string) => {
    console.log("stock :>> ", stock);
    setIsStockSelecting(false);
  };

  useEffect(() => {
    getStockList();
  });

  return (
    <Card maxW="sm">
      <CardBody>
        <HStack>
          <Image src={data.imageUrl} height="24px" />
          <VStack spacing="0" alignItems="flex-start" objectFit="cover">
            {!isStockSelecting && (
              <Text
                fontSize="14px"
                fontWeight="700"
                onClick={() => setIsStockSelecting(true)}
              >
                {data.stockTicker}
              </Text>
            )}
            {isStockSelecting && (
              <AutoComplete
                onSelect={handleStockSelect}
                options={getStockList()}
              />
            )}

            <Text fontSize="12px">{data.companyName}</Text>
          </VStack>
        </HStack>
        <HStack width="100%">
          <Text fontSize="28px" fontWeight="700" width="40%">
            {data.price} {data.currency}
          </Text>
          <Text
            fontSize="18px"
            color={data.change > 0 ? COLOR_GREEN_TICKER : COLOR_RED_TICKER}
          >
            {data.change > 0 && UP_ICON}
            {data.change < 0 && DOWN_ICON}
            {data.percentChange}% ({data.change})
          </Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TickerWidget;
