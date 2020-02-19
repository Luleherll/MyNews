import { Model } from "sequelize/types";

export default class ModelQueries {
  static addData = (model: any, data: Object, permit: string[]) => model.create(data, { fields: permit })

  static findData = async (model, clause, attributes = null) => {
    const data = attributes
      ? await model.findOne({ where: clause, attributes })
      : await model.findOne({ where: clause });

    return data;
  }

  static update = async (model: Model, attributes: object) => model.update(attributes)
}