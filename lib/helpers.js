module.exports = {
	click: async function (page, selector) {
		try {
			await page.waitForSelector(selector);
			await page.click(selector);
		} catch (err) {
			throw new Error(`Could not click on selector: ${selector}`);
		}
	},

	getText: async function (page, selector) {
		try {
			await page.waitForSelector(selector);
			return await page.$eval(selector, (element) => element.innerHTML);
		} catch (err) {
			throw new Error(`Could not get text from selector: ${selector}`);
		}
	},

	getCount: async function (page, selector) {
		try {
			await page.waitForSelector(selector);
			return await page.$$eval(selector, (element) => element.length);
		} catch (err) {
			throw new Error(`Could not get count of selector: ${selector}`);
		}
	},

	typeText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector);
			await page.type(selector, text);
		} catch (err) {
			throw new Error(`Could not type into selector: ${selector}`);
		}
	},

	waitForText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector);
			await page.waitForFunction((selector, text) => {
				document.querySelector(selector).innerText.includes(text),
					{},
					selector,
					text;
			});
		} catch (err) {
			throw new Error(
				`Text: ${text} was not found for selector: ${selector}`
			);
		}
	},

	shouldNotExist: async function (page, selector) {
		try {
			// await page.waitFor(() => {
			// 	!document.querySelector(selector);
			// });
			await page.waitForFunction(selector, { hidden: true });
		} catch {
			throw new Error(`Selector is still visible: ${selector}`);
		}
	},
};
