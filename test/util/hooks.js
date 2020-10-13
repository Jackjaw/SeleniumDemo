const http = require('http');
const { TakeScreenshot } = require('./screenshot');
const { CloseDriver } = require('./driver');

exports.mochaHooks = {
    afterEach: async function () {
        this.timeout(5000);
        let driver = this.currentTest.parent.driver;
        let suiteId = this.currentTest.parent.title;
        let testState = this.currentTest.state;

        try {
            if (testState === 'failed') {
                let screenshotRegexp =/^(?:--)?SCREENSHOT(?:=(?!FALSE)(.*))?$/;
                let screenshotDir= (screenshotRegexp.exec(process.argv.slice(2).find(arg => screenshotRegexp.test(arg.toUpperCase())))|| [])[1];
                screenshotDir = screenshotDir === true ? null : screenshotDir ? JSON.parse(screenshotDir):screenshotDir;
                await TakeScreenshot(driver, suiteId, screenshotDir);
            }
        } catch (ex) {
            console.error(ex);
        }
        await CloseDriver(driver);
    } 
};