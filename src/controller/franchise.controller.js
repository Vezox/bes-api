const franchiseModel = require('../model/franchise.model');

class FranchiseController {
  static async create(req, res) {
    try {
      const data = req.body;
      const result = await franchiseModel.create(data);
      return res.send({ success: true, data: result });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async get(req, res) {
    try {
    const { page, limit, sort } = req.body;
    const skip = (page - 1) * limit;
    const condition = { deleted_time: { $exists: false } };
    const [list, count] = await Promise.all([
      franchiseModel
        .find(condition)
        .sort(sort || { created_time: -1 })
        .skip(Number(skip))
        .limit(Number(limit)),
      franchiseModel.count()
    ]);
    return res.send({ success: true, list, total: count, totalPage: Math.ceil(count / limit) });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  async check(req, res) {
    await franchiseModel.updateOne({ _id: req.body.id }, { checked: true });
    return res.send({ success: true });
  }
}

module.exports = FranchiseController;