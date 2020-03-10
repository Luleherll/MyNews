import JOI from '@hapi/joi';

const newsDTO = {
  title: JOI.string().max(300).required(),
  description: JOI.string().required(),
  content: JOI.string().required(),
  urlToImage: JOI.string(),
  tags: JOI.array(),
};

const newsPost = JOI.object(newsDTO)

export { newsPost }