const user = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'email@email.com',
  document: '12345678',
  password: 'secret',
  role: 'user',
}

export const mockUserModel = {
  create: jest.fn().mockResolvedValue(user),
  findAll: jest.fn().mockResolvedValue([user, user]),
  findOne: jest.fn().mockResolvedValue(user),
  update: jest.fn().mockResolvedValue([1]),
  destroy: jest.fn().mockResolvedValue(1),
}
