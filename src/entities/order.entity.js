import { FILE_FIELD_LENGTHS, FILE_MIME_TYPE, FILE_ROW_LENGTH } from '../enums/index.js';
import { formatDateWithoutHour } from '../utils/formatter.js';

const handleRowContent = (row) => {
  let currentIndex = 0;
  const userId = row.substr(currentIndex, FILE_FIELD_LENGTHS.userId).trim();
  currentIndex += FILE_FIELD_LENGTHS.userId;

  const userName = row.substr(currentIndex, FILE_FIELD_LENGTHS.name).trim();
  currentIndex += FILE_FIELD_LENGTHS.name;

  const orderId = row.substr(currentIndex, FILE_FIELD_LENGTHS.orderId).trim();
  currentIndex += FILE_FIELD_LENGTHS.orderId;

  const productId = row.substr(currentIndex, FILE_FIELD_LENGTHS.productId).trim();
  currentIndex += FILE_FIELD_LENGTHS.productId;

  const productValue = row.substr(currentIndex, FILE_FIELD_LENGTHS.productValue).trim();
  currentIndex += FILE_FIELD_LENGTHS.productValue;

  const orderDate = row.substr(currentIndex, FILE_FIELD_LENGTHS.orderDate).trim();

  const data = {
    userId: Number(userId),
    userName,
    productId: Number(productId),
    productValue,
    orderId: Number(orderId),
    orderDate: formatDateWithoutHour(orderDate),
  };

  return data;
};

const validateFile = (file) => {
  if (!file) {
    return { isFileValid: false, fileError: 'Arquivo não encontrado!' };
  }

  if (!file.mimetype || !file.mimetype.includes(FILE_MIME_TYPE)) {
    return {
      isFileValid: false,
      fileError: 'Formato de arquivo inválido! Use TXT.',
    };
  }

  if (!file.size === 0) {
    return {
      isFileValid: false,
      fileError: 'O conteúdo do arquivo é inválido!',
    };
  }

  return { isFileValid: true, fileError: null };
};

const validateFileRow = (row) => {
  if (row.length !== FILE_ROW_LENGTH) {
    return false;
  }

  return true;
};

export { handleRowContent, validateFile, validateFileRow };
