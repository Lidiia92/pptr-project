const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors')['devicesMap'];

const { click, getText, getCount } = require('../lib/helpers');

describe('Device Emulation', () => {
	let browser;
	let page;

	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 100,
			devtools: false,
		});

		const context = await browser.createIncognitoBrowserContext();
		page = await context.newPage();

		await page.setDefaultTimeout(10000);
		await page.setDefaultNavigationTimeout(20000);
	});

	after(async function () {
		await browser.close();
	});

	it('Desktop Device Test', async function () {
		await page.setViewport({ width: 1650, height: 1050 });
		await page.goto('https://www.example.com');
		await page.waitFor(5000);
	});

	it('Tablet Device Test', async function () {
		//const tablet = puppeteer.devices('iPad landscape');
		await page.emulate(devices['iPad landscape']);
		await page.goto('https://www.example.com');
		await page.waitFor(5000);
	});

	it('Mobile Device Test', async function () {
		//const mobile = puppeteer.devices('iPhone X');
		await page.emulate(devices['iPhone X']);
		await page.goto('https://www.example.com');
		await page.waitFor(5000);

		await getText(page, 'h1');
	});
});
