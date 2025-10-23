import { test, expect, request } from '@playwright/test';

test('GET /api/intro.json responds', async () => {
  const ctx = await request.newContext({ baseURL: 'https://playwright.dev' });
  const res = await ctx.get('/api/intro.json');
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body).toBeTruthy();
});
