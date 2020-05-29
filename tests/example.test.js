const puppeteer = require('puppeteer');
const expect = require('chai').expect;

describe('First Test', () => {
	let browser;
	let page;
	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 100,
			devtools: false,
		});
		page = await browser.newPage();

		//Set default timeout
		await page.setDefaultTimeout(10000);
		await page.setDefaultNavigationTimeout(20000);
	});

	after(async function () {
		await browser.close();
	});

	beforeEach(async function () {
		//runs before each test step
	});

	afterEach(async function () {
		//runs after each test step
	});

	it('should launch the browser', async function () {
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

		//Key press simulation
		await page.waitForSelector('#searchTerm');
		await page.type('#searchTerm', 'Hello world');
		await page.keyboard.press('Enter');

		//Wait for xPath
		await page.waitForXPath('//h1');

		//Element not exists
		await page.waitForSelector('#signin_button');
		await page.click('#signin_button');

		//1.
		await page.waitFor(() => !document.querySelector('#signin_button'));
		//2.
		await page.waitForSelector('#signin_button', { hidden: true });
	});
});
