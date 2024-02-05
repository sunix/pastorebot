function genMatch(e) {

  const sheet = SpreadsheetApp.getActiveSheet();
  if (sheet.getName() !== "calendrier & attributions") {
    return;
  }

  const cell = SpreadsheetApp.getCurrentCell();
  if (!cell.isChecked()) {
    return;
  }

  const gameName = cell.offset(0, -2).getValue().toString();
  if (!(gameName.startsWith("PSG") || gameName.startsWith("PARIS"))) {
    return;
  }

  const gameDateTime = cell.offset(0, -3).getValue();
  if (!(gameDateTime instanceof Date)) {
    return;
  }

  const price = cell.offset(0, -1).getValue();
  const prestige = cell.offset(0, -4).getValue();


  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const newSheet = spreadsheet.getSheetByName("template").copyTo(spreadsheet);
  newSheet.setName(gameName + ' ' + Utilities.formatDate(gameDateTime, "GMT+1", "dd/MM/yyyy"));
  newSheet.getRange('C4').setValue(gameDateTime);
  newSheet.getRange('G5').setValue(price);
  newSheet.getRange('F2').setValue(gameName);
  if (prestige === "Prestige") {
    newSheet.getRange('C2:I2').setFontColor('#cc6600');
    newSheet.getRange('F3').setValue("Prestige").setFontColor('#cc6600');
  }
  newSheet.showSheet();
  cell.setValue(" ");
  cell.clearFormat();

}

function performRaffle() {
  const sheet = SpreadsheetApp.getActiveSheet();
  // check if the active sheet name starts with PSG or PARIS and if it does not, return
  if (!(sheet.getName().startsWith("PSG") || sheet.getName().startsWith("PARIS"))) {
    return;
  }

  // get the names from E9 to E43 and filter out the empty strings
  const participant_names = sheet.getRange('E9:E43').getValues().flat().filter(name => name);

  // filer the names if it is a prestige game excluding the ones that already won
  let filtered_names = participant_names;
  // if f3 has the value "Prestige"
  if (sheet.getRange('F3').getValue() === "Prestige") {
    // filter out the names from E9 to E43 where column J does not have the value start with "déjà tiré"
    filtered_names = participant_names.filter((name, i) => !sheet.getRange(`J${i + 9}`).getValue().toString().startsWith("déjà tiré"));
  }

  // append with the names of participants coming to the match: from E9 to E43 but only the ones where column I is true
  const names = filtered_names.concat(sheet.getRange('E9:E43').getValues().flat().filter((name, i) => sheet.getRange(`I${i + 9}`).getValue() === true));
  // print the names to be used for the raffle in K3
  sheet.getRange('K3').setValue("Tirage : " + names.join(', '));

  // within the names, randomly select 2 names
  const winners = names.sort(() => Math.random() - 0.5).slice(0, 2);
  // if winners are the same, select again
  while (winners[0] === winners[1]) {
    winners[1] = names.sort(() => Math.random() - 0.5).slice(0, 1);
  }

  // print the winners in K4
  sheet.getRange('K4').setValue("Gagnants : "+ winners.join(', '));
  // set the background color to sky blue for the selected names from C to I
  winners.forEach(name => {
    const row = participant_names.indexOf(name);
    sheet.getRange(`C${row + 9}:I${row + 9}`).setBackground('#87CEEB');

  });
}
