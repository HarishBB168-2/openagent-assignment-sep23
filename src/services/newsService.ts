import news from "./fakeNewsStore";

export type NewsItemType = {
  thumbImage: string;
  section: string;
  headline: string;
  websiteURL: string;
};

const getNews = async (): Promise<NewsItemType[]> => {
  const data = news.map((item) => ({
    thumbImage: item.thumbImage,
    section: item.section,
    headline: item.mobileHeadline,
    websiteURL: item.websiteURL,
  }));
  return Promise.resolve(data);
};

export default {
  getNews,
};
