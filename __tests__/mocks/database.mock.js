const mockSequelize = {
  authenticate: jest.fn().mockResolvedValue(),
  close: jest.fn().mockResolvedValue(),
  sync: jest.fn().mockResolvedValue(),
  define: jest.fn().mockResolvedValue(),
  transaction: jest.fn(),
  hasMany: jest.fn(),
  belongsTo: jest.fn(),
};

const mockDatabase = {
  connectDB: jest.fn().mockResolvedValue(),
  closeDB: jest.fn().mockResolvedValue(),
  ping: jest.fn().mockImplementation(),
  sequelize: mockSequelize,
};

export default mockDatabase;
