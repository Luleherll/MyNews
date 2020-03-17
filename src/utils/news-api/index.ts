import newsapi from 'newsapi';
import { LANGUAGE } from '../../lib/constants';

export default class NewsAPI {
  news: any;
  constructor(api_key: string) {
    this.news = new newsapi(api_key);
  }

  sources = async() => await this.news.v2.sources();

  private mapArticles = (data: Array<any>) => data.map(article => ({...article, source: article.source.id}))

  fromAllSources = async(filter) => {
    let {sources} = await this.news.v2.sources();
    sources = sources.reduce((acc, curr) => {
      curr.language === LANGUAGE && acc.push(curr.name);
      return acc;
    }, []).join();

    const response = await this.news.v2.everything({...filter, sources, language: LANGUAGE, sortBy: 'popularity', pageSize: filter.limit || 10});
    
    return {...response, articles: this.mapArticles(response.articles)};
  }

  filtered = async(filter) => {
    const response = await this.news.v2.everything({...filter, sortBy: 'relevancy', language: LANGUAGE, pageSize: filter.limit || 10});
    return {...response, articles: this.mapArticles(response.articles)};
  }
}