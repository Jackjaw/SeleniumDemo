const assert = require('assert');
const { GetDriver } = require('./util/driver');

describe('case-4', function () {
    this.timeout(10000);
    let driver;
    beforeEach(async () => {
        this.timeout(5000);
        new Promise(resolve => {setTimeout(()=>{console.log("wait for 10s")}, 10000)})
        driver = this.driver = await GetDriver('http://localhost:3000');
    });
    it('event-1', function () {
        assert.ok(false);
    });
});