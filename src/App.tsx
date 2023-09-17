import ReactGA from "react-ga4";
import { Box, useColorModeValue } from "@chakra-ui/react";
import SidebarWithHeader from "./components/SideBarWithHeader";
import TickerWidget from "./components/TickerWidget";
import WeatherWidget from "./components/WeatherWidget";
import NewsWidget from "./components/NewsWidget";
import { useEffect } from "react";
import ChatWidget from "./components/ChatWidget";

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
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarWithHeader />
      <Box
        ml={{ base: 0, md: 60 }}
        p="4"
        display="flex"
        flexWrap="wrap"
        gap="3rem"
      >
        <ChatWidget />
        <NewsWidget />
        <TickerWidget />
        <WeatherWidget />
      </Box>
    </Box>
  );
};

export default App;
