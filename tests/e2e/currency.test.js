const puppeteer = require('puppeteer');

describe('Currency Exchange Test', () => {
	let browser;
	let page;

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 100,
			devtools: false,
		});

		page = await browser.newPage();

		await page.setDefaultTimeout(10000);
		await page.setDefaultNavigationTimeout(20000);

		await page.goto('http://zero.webappsecurity.com/login.html');

		await page.waitForSelector('#login_form');
		await page.type('#user_login', 'username');
		await page.type('#user_password', 'password');
		await page.click('#user_remember_me');

		await page.click('input[type="submit"]');
	});

	after(async function () {
		await browser.close();
	});

	it('should display Currency Exchange Form', async function () {
		await page.waitForSelector('.nav-tabs');
		await page.click('#pay_bills_tab');
		await page.waitForSelector('#tabs > ul > li:nth-child(3) > a');

		await page.click('#tabs > ul > li:nth-child(3) > a');
	});

	it('should exchange currency', async function () {
		await page.waitForSelector('.board');
		await page.select('select#pc_currency', 'GBR');
		await page.type('#pc_amount', '800');
		await page.click('#pc_inDollars_true');
		await page.click('#purchase_cash');
		await page.waitForSelector('#alert_content');
	});
});
