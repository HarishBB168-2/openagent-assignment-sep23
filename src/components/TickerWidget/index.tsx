import { Card, Text, CardBody, Image, HStack, VStack } from "@chakra-ui/react";

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
  return (
    <Card maxW="sm">
      <CardBody>
        <HStack>
          <Image src={imageUrl} height="24px" />
          <VStack spacing="0" alignItems="flex-start" objectFit="cover">
            <Text fontSize="14px" fontWeight="700">
              {stockTicker}
            </Text>
            <Text fontSize="12px">{companyName}</Text>
          </VStack>
        </HStack>
        <HStack width="100%">
          <Text fontSize="28px" fontWeight="700" width="40%">
            {price} {currency}
          </Text>
          <Text
            fontSize="18px"
            color={change > 0 ? COLOR_GREEN_TICKER : COLOR_RED_TICKER}
          >
            {change > 0 && UP_ICON}
            {change < 0 && DOWN_ICON}
            {percentChange}% ({change})
          </Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TickerWidget;
