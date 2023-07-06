const imageModel = require("../model/image.model");
const uploadController = require("./upload.controller");
const LIMIT = 200
class ImageController {
  static async list(req, res) {
    try {
      const { page, limit, sort, topicId } = req.body;
      const skip = (page - 1) * (limit || LIMIT);
      let condition = {};
      if (topicId) {
        condition = { topic_id: topicId };
      }
      const [response, count] = await Promise.all([
        await imageModel
          .find(condition)
          .sort(sort || { created_time: -1 })
          .skip(Number(skip))
          .limit(Number(LIMIT)),
        imageModel.count()
      ]);
      return res.send({ success: true, list: response, total: count, totalPage: Math.ceil(count / LIMIT) });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const image = await imageModel.findById(id);
      if (!image) {
        return res.status(404).send({ success: false, message: "Image not found" });
      }
      await Promise.all([
        imageModel.deleteOne({ _id: id }),
        uploadController.destroy(image.public_id)
      ]);
      return res.send({ success: true, data: response });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }
}

module.exports = ImageController;
