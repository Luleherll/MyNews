import JwtUtil from './jwt';
import * as errorHandlers from './errorHandlers';
import * as Response  from './responses';
import Mailer from './mailer';
import * as Hash from './hash';
import ExternalNews from './news-api';
import { NEWS_API_KEY } from '../config';

const NewsAPI = new ExternalNews(NEWS_API_KEY)

const getExternalNews = async(externalFilter): Promise<{totalResults: number, articles: Array<any> }> => {
  for (const key in externalFilter) {
    if (externalFilter.hasOwnProperty(key) && !externalFilter[key]) {
      delete externalFilter[key];
    }
  }

  const { totalResults, articles } = externalFilter.q
    ? await NewsAPI.filtered(externalFilter)
    : await NewsAPI.fromAllSources(externalFilter);
  return { totalResults, articles }
}

export { JwtUtil, errorHandlers, Response, Mailer, Hash, NewsAPI, getExternalNews }
