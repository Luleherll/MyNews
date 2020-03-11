import { Response } from "../utils";
import { NEWS_POST_EXISTS, SEQUELIZE_UNIQUE_CONSTRAINT } from "../lib/constants/errors";
import Queries from "../lib/queries";

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
      .catch(({errors: [error]}) =>
        error.type === SEQUELIZE_UNIQUE_CONSTRAINT
          ? next(NEWS_POST_EXISTS)
          : next({ message: "Error creating news", log: error })
      );
    post = post.filtered();

    return Response.success(res, post, 201);
  };

  getNews = async(req, res, next) => {
    const news = await Queries.findAll(this.model);

    return Response.success(res, news);
  }
}
