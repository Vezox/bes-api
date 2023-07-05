const cloudinary = require("cloudinary").v2;
const imageModel = require("../model/image.model");
const fs = require("fs").promises;
const path = require("path");

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

class Upload {
  static async uploadFile(req, res) {
    try {
      const descriptions = req.body.descriptions;
      let files = req?.files?.file;
      if (!Array.isArray(files)) {
        files = [files];
      }
      const rs = [];
      await Promise.all(
        files.map(async (file) => {
          const type = Upload.checkTypeFile(file);
          if (!type) {
            return Upload.removeTmp(file.tempFilePath);
          }
          const data = await Upload.uploadToCloudinary(file, type, descriptions);
          rs.push(data);
        })
      );
      return res.send({ success: true, imageURL: rs[0]?.src, list: rs });
    } catch (error) {
      let files = req?.files?.file;
      if (!Array.isArray(files)) {
        files = [files];
      }
      files.map(file => Upload.removeTmp(file.tempFilePath))
      console.error(error);
      return res.status(500).send({ success: false, message: error.message });
    }
  }

  static async uploadToCloudinary(file, type, descriptions) {
    try {
      const params = {
        folder: "URI",
        resource_type: type,
      };
      const result = await cloudinary.uploader.upload(file.tempFilePath, params);
      const data = {
        public_id: result.public_id,
        url: result.secure_url,
        descriptions: descriptions,
        type: type,
      };
      const [img] = await Promise.all([
        imageModel.create(data),
        Upload.removeTmp(file.tempFilePath)
      ]);
      data.img = img;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static checkTypeFile(file) {
    if (/image\/.*/i.test(file.mimetype)) {
      return "image";
    }
    if (/video\/mp4/i.test(file.mimetype)) {
      return "video";
    }
    return "";
  }

  static async destroy(public_id) {
    try {
      const result = await cloudinary.uploader.destroy(public_id, async (error) => {
        if (error) throw error;
      });
      if (result.result != "ok") return false;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async removeTmp(path) {
    try {
      await fs.unlink(path);
    } catch (error) {
      return false;
    }
  }

  static checkFile(file) {
    if (file.size > 5 * 1024 * 1024) {
      return false;
    }
    if (/image\/.*/i.test(file.mimetype)) {
      return "image";
    }
    if (/video\/mp4/i.test(file.mimetype)) {
      return "video";
    }
    if (/application\/.*/i.test(file.mimetype) && file.mimetype != "application/x-msdownload") {
      return "file";
    }
    if (/audio\/mp3|audio\/mpe/i.test(type)) {
      return "audio";
    }
    return false;
  }
}

module.exports = Upload;
