import ReactGA from "react-ga4";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SidebarWithHeader from "./components/SideBarWithHeader";
import TickerWidget from "./components/TickerWidget";
import WeatherWidget from "./components/WeatherWidget";
import NewsWidget from "./components/NewsWidget";
import ChatWidget from "./components/ChatWidget";
import DNDContainer from "./components/common/DNDContainer";
import AnalyticsWidget from "./components/AnalyticsWidget";

import { useSelector, useDispatch } from "react-redux";
import { setPage } from "./actions";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

const TRACKING_ID = "G-W7C32RL8LE";

ReactGA.initialize(TRACKING_ID);

const App = () => {
  const pageName = useSelector((state: any) => state.changePage);
  const dispatch = useDispatch();

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
    { name: "weatherWidget", data: <WeatherWidget /> },
    { name: "chatWidget", data: <ChatWidget /> },
    { name: "newsWidget", data: <NewsWidget /> },
    { name: "tickerWidget", data: <TickerWidget /> },
    { name: "analyticsWidget", data: <AnalyticsWidget /> },
  ]);

  return (
    <Flex
      bg={useColorModeValue("gray.100", "gray.900")}
      flexDir="column"
      minH="100%"
    >
      <SidebarWithHeader />
      <Flex ml={{ base: 0, md: 60 }} p="4" flexWrap="wrap" gap="3rem">
        {pageName === "Home" && (
          <DNDContainer items={widgets} setItems={setWidgets}></DNDContainer>
        )}
        {pageName === "Contact" && <ContactUs />}
        {pageName === "About" && <AboutUs />}
      </Flex>
    </Flex>
  );
};

export default App;
