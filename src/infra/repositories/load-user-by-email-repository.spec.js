const LoadUserByEmailRepository = require('./load-user-by-email-repository')

const makeSut = () => {
  return new LoadUserByEmailRepository()
}
describe('LoadUserByEmail Repository', () => {
  test('should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
})
