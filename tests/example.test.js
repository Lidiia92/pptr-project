const puppeteer = require('puppeteer');

describe('First Test', () => {
	it('should launch the browser', async function () {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();

		await page.goto('http://example.com');
		await page.waitForSelector('h1');
		await browser.close();
	});
});
