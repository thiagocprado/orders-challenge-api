export const FILE_TEMP_PATH = "temp/";
export const FILE_MIME_TYPE = "text/plain";
export const FILE_FIELD_LENGTHS = {
  userId: 10,
  name: 45,
  orderId: 10,
  productId: 10,
  productValue: 12,
  orderDate: 8,
};
export const FILE_ROW_LENGTH = Object.values(FILE_FIELD_LENGTHS).reduce(
  (a, b) => a + b,
  0
);
