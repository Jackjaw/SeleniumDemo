const fs = require('fs');
const path = require('path');

const TakeScreenshot = async (driver, filename, filedir) =>{
    const _GetTimeString = date =>{
        const _PadData = num =>num.toString().padStart(2,'0');
        let _year = date.getFullYear();
        let _month = _PadData(date.getMonth()+1);
        let _date = _PadData(date.getDate());
        let _hour = _PadData(date.getHours());
        let _minute = _PadData(date.getMinutes());
        let _second = _PadData(date.getSeconds());
        let _millisecond = _PadData(date.getMilliseconds());
        return `${_year}${_month}${_date}_${_hour}${_minute}${_second}_${_millisecond}`;
    };

    const _GetRandomString =()=>{
        let ran;
        return Array(5).fill(0).map(()=>(ran = Math.random(), String.fromCharCode(Math.floor(ran * 52) + (ran < 0.5? 65:71)))).join('');
    };

    let {name: _name, ext: _ext } = path.parse(filename);
    let _filedir = filedir ? filedir : '/opt/buildagent/temp/agentTmp/work-directory-selenium';
    _filedir = path.resolve(_filedir, `./screenshot/${_name}`);
    fs.mkdirSync(_filedir, { recursive: true});

    let _date = new Date();
    let _timeStr = _GetTimeString(_date);
    let _ranStr = _GetRandomString();
    let filePath = path.resolve(_filedir,`${_name}-${_timeStr}-${_ranStr}.${_ext || 'png'}`);
    let imageData = await driver.takeScreenshot();
    fs.writeFileSync(filePath, imageData, 'base64');
    return driver;
};

module.exports = {
    TakeScreenshot
};