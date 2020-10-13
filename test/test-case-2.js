const assert = require('assert');
const { GetDriver } = require('./util/driver');

describe('case-2', function () {
    this.timeout(10000);
    let driver;
    beforeEach(async () => {
        this.timeout(5000);
        driver = this.driver = await GetDriver('http://localhost:3000');
    });
    it('event-1', function () {
        assert.ok(false);
    });
});