const { default: HttpError } = require('../../exceptions/http-error');
const { signInUserController } = require('../post-user-signin');

describe('sign in controller', () => {
  test('should call return currect token', async () => {
    const resJsonMock = jest.fn();

    const req = {
      body: { username: 'johndoe', password: 'mypassword' },
    };

    const res = {
      json: resJsonMock,
    };

    await signInUserController(req, res, () => undefined);

    expect(res.json.mock.calls[0][0]).toHaveProperty('token');
  });

  test('should return error when credentials are not provided', async () => {
    const resJsonMock = jest.fn();
    const nextMock = jest.fn();

    const req = {
      body: {},
    };

    const res = {
      json: resJsonMock,
    };

    await signInUserController(req, res, nextMock);

    expect(nextMock.mock.calls[0][0]).toStrictEqual(
      new HttpError("Username or Password can't be empty", 400),
    );
  });

  test('should return error when credentials are incorrect', async () => {
    const resJsonMock = jest.fn();
    const nextMock = jest.fn();

    const req = {
      body: { username: 'random-user', password: 'mypassword' },
    };

    const res = {
      json: resJsonMock,
    };

    await signInUserController(req, res, nextMock);

    expect(nextMock.mock.calls[0][0]).toStrictEqual(
      new HttpError('User does not exist', 401),
    );

    req.body.username = 'johndoe';
    req.body.password = 'random-pass';

    await signInUserController(req, res, nextMock);

    expect(nextMock.mock.calls[1][0]).toStrictEqual(
      new HttpError('Invalid credentials!', 401),
    );
  });
});
