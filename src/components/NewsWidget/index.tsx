import { createUseStyles } from "react-jss";
import NewsItem from "./NewsItem";
import newsService, { NewsItemType } from "../../services/newsService";
import { useEffect, useState } from "react";
import { HStack, Spinner } from "@chakra-ui/react";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    height: "min-content",
    minWidth: "375px",
    maxWidth: "375px",
    width: "375px",
    flexDirection: "column",
    fontFamily: "'Roboto', sans-serif",
    overflow: "hidden",
    position: "relative",
    background: "white",
    borderRadius: "5px",
  },
  content: {
    width: "100%",
    display: "flex",
    overflow: "auto",
    gap: "26px",
    padding: "13px 13px",
  },
  fadeOut: {
    // opacity: "0",
    // width: "0",
    // height: "0",
    transition: "width 2s 2s, height 2s 2s, opacity 2s",
  },
  fadeIn: {
    opacity: "1",
    width: "100px",
    height: "100px",
    transition: "width 2s, height 2s, opacity 2s 2s",
  },
});

const VISIBLE = 0;
const FADE_IN = 1;
const FADE_OUT = 2;

const NewsWidget = () => {
  const classes = useStyles();

  const [newsData, setNewsData] = useState<any>([]);
  const [currentNewsItemIdx, setCurrentNewsItemIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [ticking, setTicking] = useState(true),
    [count, setCount] = useState(0);

  const changeNewsItem = () => {
    setCurrentNewsItemIdx((c) => (c >= newsData.length - 1 ? 0 : c + 1));
    setCount((c) => c + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => ticking && changeNewsItem(), 3000);
    return () => clearTimeout(timer);
  }, [count, ticking]);

  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      const news = await newsService.getNews();
      setNewsData(news);
      setIsLoading(false);
    };
    loadNews();
  }, []);

  return (
    <div className={classes.container}>
      <div className={`${classes.content}`}>
        {isLoading && (
          <HStack>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <span>Loading news...</span>
          </HStack>
        )}
        {!isLoading && newsData.length > 0 && (
          <NewsItem
            {...newsData[currentNewsItemIdx]}
            onMouseEnter={() => setTicking(false)}
            onMouseLeave={() => setTicking(true)}
            className={""}
          />
        )}
      </div>
    </div>
  );
};

export default NewsWidget;
