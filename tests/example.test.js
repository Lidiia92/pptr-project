const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('First Test', () => {
	it('should launch the browser', async function () {
		const browser = await puppeteer.launch({
			headless: false,
			slowMo: 500,
			devtools: false,
		});
		const page = await browser.newPage();

		// await page.goto('http://example.com');

		await page.goto('https://devexpress.github.io/testcafe/example');
		await page.type('#developer-name', 'Mike');
		await page.click('#tried-test-cafe', { clickCount: 1 });
		await page.select('#preferred-interface', 'JavaScript API');
		await page.type('#comments', 'Test message');
		await page.click('#submit-message');
		await page.waitForSelector('.result-content');

		// Getting title, url and element text
		const title = await page.title;
		const url = await page.url();
		const text = await page.$eval('h1', (element) => element.textContent);

		//Get element count
		const count = await page.$$eval('p', (element) => element.length);

		//Assertions
		expect(title).to.be.a('string', 'Example Domain');
		expect(url).to.include('example.com');
		expect(count).to.equal(2);

		await browser.close();
	});
});
