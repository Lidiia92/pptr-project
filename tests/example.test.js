const puppeteer = require('puppeteer');

describe('First Test', () => {
	it('should launch the browser', async function () {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 500,
			devtools: false,
		});
		const page = await browser.newPage();

		// await page.goto('http://example.com');
		// await page.waitFor(3000);
		// await page.waitForSelector('h1');

		await page.goto('https://devexpress.github.io/testcafe/example');
		await page.type('#developer-name', 'Mike');
		await page.click('#tried-test-cafe', { clickCount: 1 });
		await page.select('#preferred-interface', 'JavaScript API');
		await page.type('#comments', 'Test message');
		await page.click('#submit-message');
		await page.waitForSelector('.result-content');
		await browser.close();
	});
});
