const schema = require("../validate/consultation.schema");
const consultationModel = require("../model/consultation.model");
const Helper = require("../utils/helper");

class ConsultationController {
  async create(req, res) {
    try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const consultation = await consultationModel.create(req.body);
    return res.status(201).json(consultation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
  }

  async list(req, res) {
    try {
      const { page, limit, sort } = req.body;
      const skip = (page - 1) * limit;
      const condition = { deleted_time: { $exists: false } };
      const [list, count] = await Promise.all([
        consultationModel
        .find(condition)
        .sort(sort || { created_time: -1 })
        .skip(Number(skip))
        .limit(Number(limit)),
        consultationModel.count()
      ]);
      return res.send({ success: true, list, total: count, totalPage: Math.ceil(count / limit) });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  async check(req, res) {
    await consultationModel.updateOne({ _id: req.body.id }, { checked: true });
    return res.send({ success: true });
  }
}

module.exports = new ConsultationController();

