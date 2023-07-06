const schema = require("../validate/recruitment.schema");
const recruitmentModel = require("../model/recruitment.model");
const Helper = require("../utils/helper");
const fs = require("fs");

class recruitmentController {
  async create(req, res) {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      const recruitment = await recruitmentModel.create(req.body);
      return res.status(201).json(recruitment);
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
        recruitmentModel
          .find(condition)
          .sort(sort || { created_time: -1 })
          .skip(Number(skip))
          .limit(Number(limit)),
        recruitmentModel.count()
      ]);
      return res.send({ success: true, list, total: count, totalPage: Math.ceil(count / limit) });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  async uploadCV(req, res) {
    try {
      if (!req.files) {
        return res.status(404).send({ success: false, message: "File not found" });
      }
      const type = req.files.file.mimetype.split("/")[1];
      if (type !== "pdf") {
        await fs.unlinkSync(req.files.file.tempFilePath);
        return res.status(404).send({ success: false, message: "Chỉ nhận file dạng pdf" });
      }
      const size = req.files.file.size;
      if (size > 1024 * 1024 * 5) {
        await fs.unlinkSync(req.files.file.tempFilePath);
        return res.status(404).send({ success: false, message: "Kích thước tối đa 5MB" });
      }
      let file_name = req.body.name.split(".pdf")[0] + Math.floor(Math.random() * 10000) + ".pdf";
      file_name = Helper.removeAccents(file_name).replace(/ /g, "_")
      fs.rename(req.files.file.tempFilePath, "src/tmp/" + file_name, function (err) {
        if (err) throw err;
      });
      return res.send({ success: true, url: file_name });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  async getCV(req, res) {
    const { id } = req.params;
    if (!fs.existsSync(`src/tmp/${id}`)) {
      return res.status(404).send({ success: false, message: "File not found" });
    }
    res.download(`src/tmp/${id}`);
  }

}

module.exports = new recruitmentController();

