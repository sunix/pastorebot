
function testAll() {
    testGetRaffleDateSunday_shouldReturnFridayOfTheWeekBefore();
    testGetRaffleDateSaturday_shouldReturnFridayOfTheWeekBefore();
    testGetRaffleDateFriday_shouldReturnFridayOfTheWeekBefore();
    testGetRaffleDateThursday_shouldReturnWednesdayOfTheWeekBefore();
    testGetRaffleDateWednesday_shouldReturnWednesdayOfTheWeekBefore();
    testGetRaffleDateTuesday_shouldReturnWednesdayOfTheWeekBefore();
    testRandomlySelect2names();
    testGetMonthJSIndex_shouldReturnCorrectIndexWithJanuaryReturn0();
    testConvertWeekEndDateToDateTime_with_WEEK_END_DU_27_AOUT_shouldReturnCorrectDate();
    testParseDateWithRegExp_shouldReturnTheCorrectDate();
    testParseDateWithRegExp_withnoSpace_shouldReturnCorrectDate();
}

function testGetRaffleDateSunday_shouldReturnFridayOfTheWeekBefore() {
    // sunday 12th of May 2024
    const date = new Date(2024, 4, 12, 21, 0, 0);
    Logger.log(getRaffleDate(date));
    assertSameDate(getRaffleDate(date), new Date(2024, 4, 3, 12, 0, 0), "getRaffleDate should return the date of the week before the match date");
    // sunday 5th of May 2024
    const date2 = new Date(2024, 4, 5, 21, 0, 0);
    Logger.log(getRaffleDate(date2));
    assertSameDate(getRaffleDate(date2), new Date(2024, 3, 26, 12, 0, 0), "getRaffleDate should return the date of the week before the match date");
}

function testGetRaffleDateSaturday_shouldReturnFridayOfTheWeekBefore() {
    // saturday 11th of May 2024
    const date = new Date(2024, 4, 11, 21, 0, 0);
    Logger.log(getRaffleDate(date));
    assertSameDate(getRaffleDate(date), new Date(2024, 4, 3, 12, 0, 0), "getRaffleDate should return the date of the week before the match date");
}

function testGetRaffleDateFriday_shouldReturnFridayOfTheWeekBefore() {
    // friday 10th of May 2024
    const date = new Date(2024, 4, 10, 21, 0, 0);
    Logger.log(getRaffleDate(date));
    assertSameDate(getRaffleDate(date), new Date(2024, 4, 3, 12, 0, 0), "getRaffleDate should return the date of the week before the match date");
}

function testGetRaffleDateThursday_shouldReturnWednesdayOfTheWeekBefore() {
    // thursday 9th of May 2024
    const date = new Date(2024, 4, 9, 21, 0, 0);
    Logger.log(getRaffleDate(date));
    assertSameDate(getRaffleDate(date), new Date(2024, 4, 1, 12, 0, 0), "getRaffleDate should return the date of the week before the match date");
}

function testGetRaffleDateWednesday_shouldReturnWednesdayOfTheWeekBefore() {
    // wednesday 8th of May 2024
    const date = new Date(2024, 4, 8, 21, 0, 0);
    Logger.log(getRaffleDate(date));
    assertSameDate(getRaffleDate(date), new Date(2024, 4, 1, 12, 0, 0), "getRaffleDate should return the date of the week before the match date");
}

function testGetRaffleDateTuesday_shouldReturnWednesdayOfTheWeekBefore() {
    // tuesday 7th of May 2024
    const date = new Date(2024, 4, 7, 21, 0, 0);
    Logger.log(getRaffleDate(date));
    assertSameDate(getRaffleDate(date), new Date(2024, 4, 1, 12, 0, 0), "getRaffleDate should return the date of the week before the match date");
}

function testRandomlySelect2names() {
    const winners = randomlySelect2names(["djamel-eddine", "Dorian", "Ilaria", "Maroun", "Joseph", "Maroun", "Joseph"]);
    Logger.log(winners.join(','));
}

// test NewSeason.ts
function testGetMonthJSIndex_shouldReturnCorrectIndexWithJanuaryReturn0() {
    assertEqual(getMonthJSIndex("JANVIER"), 0, "getMonthJSIndex should return 0 for JANVIER");
    assertEqual(getMonthJSIndex("FEVRIER"), 1, "getMonthJSIndex should return 1 for FEVRIER");
    assertEqual(getMonthJSIndex("MARS"), 2, "getMonthJSIndex should return 2 for MARS");
    assertEqual(getMonthJSIndex("AVRIL"), 3, "getMonthJSIndex should return 3 for AVRIL");
    assertEqual(getMonthJSIndex("MAI"), 4, "getMonthJSIndex should return 4 for MAI");
    assertEqual(getMonthJSIndex("JUIN"), 5, "getMonthJSIndex should return 5 for JUIN");
    assertEqual(getMonthJSIndex("JUILLET"), 6, "getMonthJSIndex should return 6 for JUILLET");
    assertEqual(getMonthJSIndex("AOUT"), 7, "getMonthJSIndex should return 7 for AOUT");
    assertEqual(getMonthJSIndex("SEPTEMBRE"), 8, "getMonthJSIndex should return 8 for SEPTEMBRE");
    assertEqual(getMonthJSIndex("OCTOBRE"), 9, "getMonthJSIndex should return 9 for OCTOBRE");
    assertEqual(getMonthJSIndex("NOVEMBRE"), 10, "getMonthJSIndex should return 10 for NOVEMBRE");
    assertEqual(getMonthJSIndex("DECEMBRE"), 11, "getMonthJSIndex should return 11 for DECEMBRE");
}

function testConvertWeekEndDateToDateTime_with_WEEK_END_DU_27_AOUT_shouldReturnCorrectDate() {
    const year = 2023;
    const date = "WEEK END DU 27 AOUT";
    const newDate = convertWeekEndDateToDateTime(date, year);
    Logger.log(newDate);
    assertSameDate(newDate, new Date(2023, 7, 27, 21, 0, 0).toString(), "convertWeekEndDateToDateTime should return the correct date");
}

function testParseDateWithRegExp_shouldReturnTheCorrectDate() {
    const year = 2023;
    const date = "27 AOUT";
    const newDate = parseDateWithRegExp(date, year);
    Logger.log(newDate);
    assertSameDate(newDate, new Date(2023, 7, 27, 21, 0, 0).toString(), "parseDateWithRegExp should return the correct date");
}

function testParseDateWithRegExp_withnoSpace_shouldReturnCorrectDate() {
    const year = 2023;
    const date = "27AOUT";
    const newDate = parseDateWithRegExp(date, year);
    Logger.log(newDate);
    assertSameDate(newDate, new Date(2023, 7, 27, 21, 0, 0).toString(), "parseDateWithRegExp should return the correct date");
}

function assertEqual(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message + ` ${actual} is not equal to ${expected}`);
    }
}

function assertSameDate(date1, date2, message) {
    if (date1.toString() !== date2.toString()) {
        throw new Error(message + ` ${date1} is not equal to ${date2}`);
    }
}


function searchUserIdWithEmail() {
    const email = "aollagno@redhat.com";
    const people = People.People as any; // Type assertion to ensure 'People' object is defined
    const user = people.searchDirectoryPeople({ query: email, readMask: 'emailAddresses', sources: ['DIRECTORY_SOURCE_TYPE_DOMAIN_PROFILE'] }).people[0];
    const userid=user.resourceName.split('/')[1];
    console.log(userid);
}