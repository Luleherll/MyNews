import JwtUtil from './jwt';
import * as errorHandlers from './errorHandlers';
import * as Response  from './responses';
import Mailer from './mailer';
import * as Hash from './hash';
import ExternalNews from './news-api';
import { NEWS_API_KEY } from '../config';

const NewsAPI = new ExternalNews(NEWS_API_KEY)

export { JwtUtil, errorHandlers, Response, Mailer, Hash, NewsAPI }
