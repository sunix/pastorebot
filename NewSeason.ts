// create a function that take the current sheet cell value in the format WEEK END DU 13 AOUT and convert it to the date time format with time 21:00:00 by default
function runConvertWeekEndDateToDateTime() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // get the year
    const year = getYear(sheet);


    const selectedRange = sheet.getActiveRange();
    if (selectedRange !== null) {
      const values = selectedRange.getValues();
      const newValues = values.map(row => row.map(cell => convertWeekEndDateToDateTime(cell, year)));
      selectedRange.setValues(newValues);
      selectedRange.setNumberFormat('dddd DD MMMM YYYY - HH:mm');
    }

}

function getYear(sheet) {
    const cell = sheet.getActiveCell();
        // get the year, it should be the closest cell in above rows that contains the year in the format 2021
    // iterate over the rows above the current cell to find the year
    let year;
    // convert the year to a string
    for (let i = cell.getRow(); i >= 1; i--) {
        const yearValue = sheet.getRange(i, cell.getColumn()).getValue().toString();
        // if the year is found, break the loop
        if (/20\d\d/.test(yearValue)) { // beware the 2100 bug :)
            year = parseInt(yearValue);
            break;
        }
    }
    // if the year is not found, throw an error
    if (!year) {
        throw new Error('Year not found');
    }
    return year;
}

function convertWeekEndDateToDateTime(cellValue, year) {
    // check that the cell value is starting with WEEK END DU
    if (!cellValue.startsWith('WEEK END DU')) {
        throw new Error('Cell value should start with WEEK END DU but found ' + cellValue);
    }
    // get the date
    const date = cellValue.split('DU')[1].trim();
    // if the date is not found, throw an error
    if (!date) {
        throw new Error('Date not found');
    }

    const monthInFrench = date.split(' ')[1];
    // if the month is not found, throw an error
    if (!monthInFrench) {
        throw new Error('Month not found');
    }

    // get the month in JS index
    const month = getMonthJSIndex(monthInFrench);
    // get the day
    const day = parseInt(date.split(' ')[0]);
    // create the date
    return new Date(year, month, day, 21, 0, 0);
}

function getMonthJSIndex(month) {
    const months = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];
    return months.indexOf(month);
}

