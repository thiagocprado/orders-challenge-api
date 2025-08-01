import multer from "multer";
import { FILE_TEMP_PATH } from "../enums/index.js";
import { BadRequest } from "../commons/error.js";

const upload = multer({ dest: FILE_TEMP_PATH });

const fileHandlerMiddleware = (req, res, next) => {
  upload.single("orders_data")(req, res, (error) => {
    if (error) {
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        next(new BadRequest("Envie apenas um arquivo por vez!"));
      }

      next(new BadRequest("Verifique o arquivo e tente novamente!"));
    }
    next();
  });
};

export default fileHandlerMiddleware;
