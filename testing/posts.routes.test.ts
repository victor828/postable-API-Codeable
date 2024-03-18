import { expect, test } from 'vitest';
import { consults_Users } from '../src/Consult/users.consults';

const mockGetUser = async (user_id: string) => {
  if (user_id === '1') {
    return { username: 'admin', password: '123456' };
  } else {
    return null;
  }
};

const originalGetUser = consults_Users.getUser;
consults_Users.getUser = mockGetUser;

test('getUser should return user data if user exists', async () => {
const result = await consults_Users.getUser('1');
  expect(result.ok).toBe(true);
  expect(result.data).toEqual({ username: 'admin', password: '123456' });
});

test('getUser should return an error message if user does not exist', async () => {
  const result = await consults_Users.getUser('1000');
  expect(result.ok).toBe(false);
  expect(result.message).toBe('usuario no existe');
});

consults_Users.getUser = originalGetUser;
