import { Model } from "sequelize/types";
import { INewsFilter } from "../interfaces";
import { Op } from '../../models';
import { newsFields } from "../validation";

export default class ModelQueries {
  static addData = (model: any, data: Object, permit: string[]) => model.create(data, { fields: permit })

  static findOne = async (model, clause, attributes = null) => {
    const data = attributes
      ? await model.findOne({ where: clause, attributes })
      : await model.findOne({ where: clause });

    return data;
  }

  static findAll = async(model, clause: INewsFilter, offset = 0, limit = 10) => {
    const { columns, term } = clause;
    let query: any = [];
    if (columns) {
      query = Object.entries(columns).map(([column, value]) => ({[column]: {[Op.like]: `%${value}%`}}))
    }
    if (term) {
      query = newsFields.map(field => ({[field]: {[Op.like]: `%${term}%`}}))
    }
    query = query.length ? { [Op.or]: query } : {}

    return await model.findAndCountAll({ where: query, offset, limit});
  } 

  static update = async (model: Model, attributes: object) => model.update(attributes)
}