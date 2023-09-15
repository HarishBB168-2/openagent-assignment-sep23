import news from "./fakeNewsStore";
import http from "./httpService";

export type NewsItemType = {
  thumbImage: string;
  section: string;
  headline: string;
  websiteURL: string;
};

const newsApiUrl = "https://mockapi.harishb167.serv00.net/news";

const getNews = async (): Promise<NewsItemType[] | null> => {
  try {
    let { data } = await http.get(newsApiUrl);
    data = data?.content?.sectionItems;
    if (data) {
      data = data.map((item: any) => ({
        thumbImage: item.thumbImage,
        section: item.section,
        headline: item.mobileHeadline,
        websiteURL: item.websiteURL,
      }));
      return data;
    }
    return [];
  } catch {
    return null;
  }
};

export default {
  getNews,
};
