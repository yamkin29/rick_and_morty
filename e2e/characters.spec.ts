import { expect, test } from '@playwright/test';

import charactersPage from './fixtures/characters-page-1.json' with { type: 'json' };
import filteredCharactersPage from './fixtures/characters-rick.json' with { type: 'json' };

test.beforeEach(async ({ page }) => {
  await page.route('https://rickandmortyapi.com/api/character**', async (route) => {
    const url = new URL(route.request().url());
    const responseBody = url.searchParams.get('name') === 'Rick' ? filteredCharactersPage : charactersPage;

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      json: responseBody
    });
  });
});

test('shows first characters page', async ({ page }) => {
  await page.goto('/characters');

  await expect(page.getByTestId('character-card')).toHaveCount(charactersPage.results.length);

  for (const character of charactersPage.results) {
    await expect(page.getByText(character.name, { exact: true })).toBeVisible();
  }
});

test('filters characters by name', async ({ page }) => {
  await page.goto('/characters');
  await page.getByPlaceholder('Filter by name...').fill('Rick');

  await expect(page.getByTestId('character-card')).toHaveCount(filteredCharactersPage.results.length);
  await expect(page.getByText('Rick Sanchez', { exact: true })).toBeVisible();
  await expect(page.getByText('Morty Smith', { exact: true })).not.toBeVisible();
});
