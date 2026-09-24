import { expect, test } from '@playwright/test'

const chapters = [
  '02-brain-teasers', '03-mathematics', '04-probability',
  '05-stochastic', '06-finance', '07-algorithms',
]

test('every practice prompt is visible while hints and answers start closed', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  let total = 0
  for (const chapter of chapters) {
    await page.goto(`${chapter}/overview.html`)
    const cards = page.locator('.practice-question')
    await expect(cards.first()).toBeVisible()
    total += await cards.count()
    await expect(page.locator('.practice-question details[open]')).toHaveCount(0)
    await expect(page.locator('.practice-reveal')).toHaveCount(0)
    const prompts = await page.locator('.practice-prompt').allTextContents()
    expect(prompts.every((prompt) => prompt.trim().length > 25)).toBe(true)
    expect(await page.locator('#content > h2, #content > h3, .practice-question').evaluateAll((elements) => {
      const boxes = elements.map((element) => element.getBoundingClientRect())
      return boxes.every((box, index) => index === 0 || box.top >= boxes[index - 1].bottom - 1)
    })).toBe(true)
    for (const card of await cards.all()) {
      await card.locator('.practice-hint summary').click()
      await expect(card.locator('.practice-hint .practice-reveal')).toBeVisible()
      await expect(card.locator('.practice-solution .practice-reveal')).toHaveCount(0)
      await card.locator('.practice-solution summary').click()
      await expect(card.locator('.practice-solution .practice-reveal')).toBeVisible()
      expect((await card.locator('.practice-solution .practice-reveal').textContent())?.trim().length).toBeGreaterThan(20)
      await expect(card.locator('.katex-error')).toHaveCount(0)
      await card.getByRole('button', { name: '收起提示和讲解，重新思考' }).click()
      await expect(card.locator('details[open]')).toHaveCount(0)
      await expect(card.locator('.practice-reveal')).toHaveCount(0)
    }
  }
  expect(total).toBe(62)
  expect(errors).toEqual([])
})

test('diagrams appear with solutions and respond to changes', async ({ page }) => {
  await page.goto('02-brain-teasers/overview.html')
  const chess = page.locator('.practice-question').filter({ hasText: '31 块' })
  await chess.locator('.practice-solution summary').click()
  await expect(chess.locator('.chess-missing')).toHaveCount(2)
  expect(await chess.locator('.chessboard').evaluate((board) => {
    const bounds = board.getBoundingClientRect()
    return [...board.children].every((cell) => {
      const rect = cell.getBoundingClientRect()
      return rect.right <= bounds.right + 1 && rect.bottom <= bounds.bottom + 1
    })
  })).toBe(true)
  await chess.getByRole('button', { name: '显示完整棋盘' }).click()
  await expect(chess.locator('.chess-missing')).toHaveCount(0)

  await page.goto('04-probability/overview.html')
  const meeting = page.locator('.practice-question').filter({ hasText: '两位银行家分别' })
  await expect(meeting.locator('.meeting-chart')).toHaveCount(0)
  await meeting.locator('.practice-solution summary').click()
  await expect(meeting.locator('.diagram-count')).toContainText('15.97%')
  await meeting.getByLabel('停留时间').fill('15')
  await expect(meeting.locator('.diagram-count')).toContainText('43.75%')
  await meeting.getByRole('button', { name: '恢复原题：5 分钟' }).click()
  await expect(meeting.locator('.diagram-count')).toContainText('15.97%')
  const monty = page.locator('.practice-question').filter({ hasText: '三扇关闭的门' })
  await monty.locator('.practice-solution summary').click()
  await expect(monty.locator('.mermaid-content svg')).toBeVisible({ timeout: 30_000 })
  expect(await monty.locator('.mermaid-content svg').evaluate((svg) => {
    const bounds = svg.closest('.practice-reveal')!.getBoundingClientRect()
    const diagram = svg.getBoundingClientRect()
    return diagram.left >= bounds.left - 1 && diagram.right <= bounds.right + 1
  })).toBe(true)

  await page.goto('07-algorithms/overview.html')
  const subarray = page.locator('.practice-question').filter({ hasText: '给定一个实数数组' })
  await subarray.locator('.practice-solution summary').click()
  await expect(subarray.locator('.array-best')).toHaveCount(4)
  await subarray.getByLabel('扫描到').fill('1')
  await expect(subarray.locator('.array-best')).toHaveCount(1)
})

test('search finds full prompts without revealing solutions', async ({ page }) => {
  await page.goto('02-brain-teasers/overview.html')
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  const input = page.getByPlaceholder('搜索章节、公式、题目')
  await input.fill('手电')
  const result = page.locator('.slimsearch-record-matches a').filter({ hasText: '过桥与手电' }).first()
  await expect(result).toBeVisible()
  await expect(result).not.toContainText('17 分钟')
  await input.fill('499500')
  await expect(page.getByText('没有找到结果', { exact: true })).toBeVisible()
  await input.fill('手电')
  await result.click()
  await expect(page).toHaveURL(/#.*(?:%|过桥)/)
  await expect(page.locator('.practice-reveal')).toHaveCount(0)
})

test('question, hint and solution work with keyboard on a narrow dark page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('04-probability/overview.html')
  const card = page.locator('.practice-question').filter({ hasText: '两位银行家分别' })
  await card.locator('.practice-hint summary').focus()
  await page.keyboard.press('Enter')
  await expect(card.locator('.practice-hint .practice-reveal')).toBeVisible()
  await card.locator('.practice-solution summary').focus()
  await page.keyboard.press('Enter')
  await expect(card.locator('.meeting-chart')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  const source = card.getByRole('link', { name: '核对原文' })
  await source.click()
  await expect(page).toHaveURL(/source.html\?page=104/)
  await page.goBack()
  await expect(page.locator('.practice-reveal')).toHaveCount(0)
})
