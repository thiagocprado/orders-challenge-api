import { status } from 'http-status';

const notFoundHandler = (req, res) => {
  res.status(status.NOT_FOUND).json({
    message: `Erro ao realizar requisição ${req.method} em ${req.originalUrl}`,
    code: status.NOT_FOUND,
  });
};

export default notFoundHandler;
