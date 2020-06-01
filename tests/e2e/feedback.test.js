const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('Feedback Form', () => {
	let browser;
	let page;

	before(async function () {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 100,
			devtools: false,
		});

		page = await browser.newPage();

		await page.setDefaultTimeout(10000);
		await page.setDefaultNavigationTimeout(20000);
	});

	after(async function () {
		await browser.close();
	});

	it('should display Feedback Form', async function () {
		await page.goto('http://zero.webappsecurity.com/index.html');
		await page.waitForSelector('#feedback');
		await page.click('#feedback');
	});

	it('should submit Feedback Form', async function () {
		await page.waitForSelector('form');
		await page.type('#name', 'Test Name');
		await page.type('#email', 'email@email.com');
		await page.type('#subject', 'Test Subject');
		await page.type('#comment', 'Test Comment');

		await page.click('input[type="submit"]');
	});

	it('should display Results Page', async function () {
		await page.waitForSelector('#feedback-title');
		const url = await page.url();

		expect(url).to.include('/sendFeedback.html');
	});
});
