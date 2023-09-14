import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  newsItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    minWidth: "100%",
    padding: "10px",
    "& img": {
      width: "150px",
      height: "84px",
      objectFit: "cover",
    },
  },
  section: {
    color: "green",
    display: "inline-block",
    marginTop: "7px",
    fontWeight: "bold",
    fontSize: "12px",
    "&::first-letter": {
      textTransform: "capitalize",
    },
  },
  headline: {
    fontSize: "13px",
    whiteSpace: "wrap",
  },
});

type NewsItemProps = {
  thumbImage: string;
  section: string;
  headline: string;
  websiteURL: string;
  className: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const NewsItem = ({
  thumbImage,
  section,
  headline,
  websiteURL,
  className,
  onMouseEnter,
  onMouseLeave,
}: NewsItemProps) => {
  const classes = useStyles();

  const trimLine = (sentence: string): string => {
    if (sentence.length <= 44) return sentence;
    return `${sentence.slice(0, 44)}...`;
  };

  return (
    <div
      className={`${classes.newsItem} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={thumbImage} />
      <span className={classes.section}>{section}</span>
      <a href={websiteURL} target="_blank">
        <span className={classes.headline}>{trimLine(headline)}</span>
      </a>
    </div>
  );
};

export default NewsItem;
