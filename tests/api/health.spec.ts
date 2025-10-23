import { test, expect, request } from '@playwright/test';

test('GET /todos/1 responds with id=1', async () => {
  const ctx = await request.newContext({ baseURL: 'https://jsonplaceholder.typicode.com' });
  const res = await ctx.get('/todos/1');
  expect(res.ok()).toBeTruthy();

  const body = await res.json();
  expect(body).toBeTruthy();
  expect(body.id).toBe(1);
});
