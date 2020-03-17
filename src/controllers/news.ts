import { Response, getExternalNews } from "../utils";
import { NEWS_POST_EXISTS, SEQUELIZE_UNIQUE_CONSTRAINT } from "../lib/constants/errors";
import Queries from "../lib/queries";
import { NewsAPI } from "../utils";
import { newsFields } from "../lib/validation";
import User from "../models/user";

export default class NewsController {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  createNews = async (req, res, next) => {
    let { body: post, user } = req;
    const url = post.title.replace(/[ ]/gi, "-");
    post = { ...post, url };

    post = await user
      .createNews(post)
      .catch(({ errors: [error] }) =>
        error.type === SEQUELIZE_UNIQUE_CONSTRAINT
          ? next(NEWS_POST_EXISTS)
          : next({ message: "Error creating news", log: error })
      );
    post = post.filtered();

    return Response.success(res, post, 201);
  };

  getNews = async (req, res, next) => {
    let { page, limit, term, domains, ...query } = req.query;
    const columns = Object.entries(query).reduce((acc, curr) => {
      if (newsFields.includes(curr[0])) {
        acc[curr[0]] = curr[1];
      }
      return acc;
    }, {});
    limit = limit || 20;
    let news = await Queries.findAll(this.model, { columns, term }, page, limit);
    news.rows = news.rows.map(result => {
      result = result.filtered();
      const length = 250;
      return {...result, content: result.content.substring(0, length)}
    })
    const pageCount = Math.ceil(news.count / limit);
    if (page > pageCount) {
      news.rows = [];
    } else {
      limit = Math.ceil(limit / 2);
    }

    const externalFilter = { page, limit, domains, q: term, source: query.source, qInTitle: query.title };
    const { totalResults, articles } = await getExternalNews(externalFilter);

    return Response.success(res, { ...news, rows: [...news.rows, ...articles], count: news.count + totalResults });
  };
}
