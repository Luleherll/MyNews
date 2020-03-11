import newsapi from 'newsapi';

export default class NewsAPI {
  news: any;
  constructor(api_key: string) {
    this.news = new newsapi(api_key);
  }

  sources = async() => await this.news.v2.sources();

  private mapArticles = (data: Array<any>) => data.map(article => ({...article, source: article.source.id}))

  fromAllSources = async() => {
    let {sources} = await this.news.v2.sources();
    const language = 'en';
    sources = sources.reduce((acc, curr) => {
      curr.language === language && acc.push(curr.name);
      return acc;
    }, []).join();
    const response = await this.news.v2.everything({sources, language});
    return {...response, articles: this.mapArticles(response.articles)};
  }
}