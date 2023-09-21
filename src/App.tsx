import ReactGA from "react-ga4";
import { useEffect, useState } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import SidebarWithHeader from "./components/SideBarWithHeader";
import TickerWidget from "./components/TickerWidget";
import WeatherWidget from "./components/WeatherWidget";
import NewsWidget from "./components/NewsWidget";
import ChatWidget from "./components/ChatWidget";
import DNDContainer from "./components/common/DNDContainer";

const TRACKING_ID = "G-W7C32RL8LE";

ReactGA.initialize(TRACKING_ID);

const App = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: "Custom Title",
    });
    ReactGA.event({
      category: "sample",
      action: "some action",
      label: "some label",
      value: 123,
    });
  }, []);

  const [widgets, setWidgets] = useState([
    { name: "chatWidget", data: <ChatWidget /> },
    { name: "newsWidget", data: <NewsWidget /> },
    { name: "tickerWidget", data: <TickerWidget /> },
    { name: "weatherWidget", data: <WeatherWidget /> },
  ]);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarWithHeader />
      <Flex ml={{ base: 0, md: 60 }} p="4" flexWrap="wrap" gap="3rem">
        <DNDContainer items={widgets} setItems={setWidgets}></DNDContainer>
      </Flex>
    </Box>
  );
};

export default App;
