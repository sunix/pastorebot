// create a function that take the current sheet cell value in the format WEEK END DU 13 AOUT and convert it to the date time format with time 21:00:00 by default
function runConvertWeekEndDateToDateTime() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // store the year
    let year = 2020;

    const matchDateRange = sheet.getRange('B:B');
    const matchTitleRange = sheet.getRange('C:C');
    const matchIsPrestigeRange = sheet.getRange('A:A');
    const matchGenMatchRange = sheet.getRange('D:D');

    // get the last row
    const lastRow = 50;
    // iterate through the cells
    for (let i = 1; i <= lastRow; i++) {
        const cell = matchDateRange.getCell(i, 1);
        // if cell is string and contains the year
        if (/20\d\d/.test(cell.getValue().toString())) {
            year = parseInt(cell.getValue().toString());
        }
        // if cell is string and start with WEEK END DU
        if (typeof cell.getValue() === 'string' && cell.getValue().startsWith('WEEK END DU')) {
            cell.setValue(convertWeekEndDateToDateTime(cell.getValue(), year));
        }
        // if cell is string and format DIMANCHE 6 AVRIL
        if (typeof cell.getValue() === 'string' && cell.getValue().match(/(LUNDI|MARDI|MERCREDI|JEUDI|VENDREDI|SAMEDI|DIMANCHE) \d+ (JANVIER|FEVRIER|MARS|AVRIL|MAI|JUIN|JUILLET|AOUT|SEPTEMBRE|OCTOBRE|NOVEMBRE|DECEMBRE)/)) {
            const date = cell.getValue().split(' ');
            const month = getMonthJSIndex(date[2]);
            const day = parseInt(date[1]);
            cell.setValue(new Date(year, month, day, 21, 0, 0));
        }

        if (cell.getValue() instanceof Date) {
            cell.setNumberFormat('dddd DD MMMM YYYY - HH:mm');
        }

        // if match title is color #cc6600, set the value Prestige to the matchIsPrestigeRange cell
        const matchTitleCell = matchTitleRange.getCell(i, 1);
        if (matchTitleCell.getFontColorObject().getColorType() === SpreadsheetApp.ColorType.RGB && matchTitleCell.getFontColorObject().asRgbColor().asHexString() === '#cc6600') {
            matchIsPrestigeRange.getCell(i, 1).setValue('Prestige').setFontColorObject(matchTitleCell.getFontColorObject());
        }
        else {
            matchIsPrestigeRange.getCell(i, 1).setValue('');
        }
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

    // create the date
    return parseDateWithRegExp(date, year);
}

function parseDateWithRegExp(date, year) {
    const day = parseInt(date.match(/\d+/)[0]);
    const monthInFrench = date.match(/[A-Z]+/)[0];
    const month = getMonthJSIndex(monthInFrench);
    return new Date(year, month, day, 21, 0, 0);
}

function getMonthJSIndex(month) {
    const months = ['JANVIER', 'FEVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN', 'JUILLET', 'AOUT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DECEMBRE'];
    return months.indexOf(month);
}


