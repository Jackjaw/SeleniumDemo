const { Options } = require('selenium-webdriver/chrome');
const { Builder } = require('selenium-webdriver');

const GetDriver = async () => {
    let options = new Options();
    options.addArguments(['--disable-extensions', '--window-size=1920x900']).headless();
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get('http://localhost:3000');
    await driver.manage().window().maximize();
    return driver;
};

module.exports = GetDriver;