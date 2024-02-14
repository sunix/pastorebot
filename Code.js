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

  // get the raffle date
  const raffleDate = getRaffleDate(gameDateTime);
  // create a time trigger for the raffle
  createTimeTrigger(newSheet.getName(), raffleDate);
}

function performRaffle() {
  const sheet = SpreadsheetApp.getActiveSheet();
  Logger.log("Active sheet from performRaffle: " + SpreadsheetApp.getActiveSheet().getName());
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
  sheet.getRange('K4').setValue("Gagnants : " + winners.join(', '));
  // set the background color to sky blue for the selected names from C to I
  winners.forEach(name => {
    const row = participant_names.indexOf(name);
    sheet.getRange(`C${row + 9}:I${row + 9}`).setBackground('#87CEEB');

  });


  const owner_userid = PropertiesService.getScriptProperties().getProperty('owner_userid');
  const winnersMessage = `Tirage pour le match ${sheet.getName()} \n🎉🎉🎉 Gagnants : ${winners.join(', ')}\n` +
    "Bravo " + winners.join(', ') + ",\n" +
    "Comme d'habitude :\n" +
    "1. Veuillez effectuer un virement de [prix] euros (IBAN indiqué dans le document)\n" +
    `2. Merci de m'envoyer (DM sur <users/${owner_userid}>)\n` +
    "  - les noms et prénoms des personnes assistant au match,\n" +
    "  - un screenshot du virement.\n" +
    "MERCI !!! Et n'oubliez pas de faire quelques photos pendant le match !";

  sendMessageToGChat(winnersMessage, sheet.getName());

}

function performRaffle2() {
  const sheet = SpreadsheetApp.getActiveSheet();
  Logger.log("Active sheet from performRaffle2: " + SpreadsheetApp.getActiveSheet().getName());
  if (!(sheet.getName().startsWith("PSG") || sheet.getName().startsWith("PARIS"))) {
    return;
  }

  const participant_names = sheet.getRange('E9:E43').getValues().flat().filter(name => name);

  let filtered_names = participant_names;
  if (sheet.getRange('F3').getValue() === "Prestige") {
    filtered_names = participant_names.filter((name, i) => !sheet.getRange(`J${i + 9}`).getValue().toString().startsWith("déjà tiré"));
  }

  const names = filtered_names.concat(sheet.getRange('E9:E43').getValues().flat().filter((name, i) => sheet.getRange(`I${i + 9}`).getValue() === true));
  sheet.getRange('K5').setValue("Tirage 2 : " + names.join(', '));
  Logger.log("Tirage 2 : " + names.join(', '));
  let winner = names.sort(() => Math.random() - 0.5).slice(0, 1);
  Logger.log("winners tirage 1: " + sheet.getRange('K4').getValue().toString().split(' : ')[1].split(', ')[0] + ", " + sheet.getRange('K4').getValue().toString().split(' : ')[1].split(', ')[1]);
  // if winner is the same as any of the values in K4 (removing prefix Gagnants : ), select again
  while (sheet.getRange('K4').getValue().toString().split(' : ')[1].split(', ').includes(winner[0])) {
    winner = names.sort(() => Math.random() - 0.5).slice(0, 1);
  }

  sheet.getRange('K6').setValue("Gagnant tirage 2 : " + winner);
  Logger.log("Gagnant tirage 2 : " + winner);
  const row = participant_names.indexOf(winner[0]);
  sheet.getRange(`C${row + 9}:I${row + 9}`).setBackground('#87CEEB');

  // get gchat webhook url from property gchat_webhook
  const webhook = PropertiesService.getScriptProperties().getProperty('gchat_webhook');
  // if webhook is not set, return
  if (!webhook) {
    return;
  }

  sendMessageToGChat(`Tirage 2 pour le match ${sheet.getName()} \n🎉🎉🎉 Gagnant : ${winner}`, sheet.getName());
}


function sendMessageToGChat(text, threadKey) {
  const webhookURL = PropertiesService.getScriptProperties().getProperty('gchat_webhook');
  // if webhook is not set, return
  if (!webhookURL) {
    return;
  }
  const message = {
    "text": text,
    "thread": { "threadKey": threadKey }
  };
  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(message)
  };
  // send the message and log it
  const response = UrlFetchApp.fetch(webhookURL, options);
  Logger.log(response);
}

function createTimeTrigger(sheetName, date) {
  // create a time based trigger at a specific date
  const trigger =
    ScriptApp.newTrigger('triggerRaffle')
      .timeBased()
      .at(date)
      .create();
  Logger.log('Trigger ID: ' + trigger.getUniqueId());
  // set the sheet name as a property of the trigger
  PropertiesService.getScriptProperties().setProperty(trigger.getUniqueId(), sheetName);
  // send a message to the gchat webhook to tell that the raffle will be performed at a specific date (format the date to french locale string)
  sendMessageToGChat(`Le tirage pour le match ${sheetName} sera effectué le ${frenchDate(date)}`, sheetName);
}

function triggerRaffle(event) {
  Logger.log("Active sheet: " + SpreadsheetApp.getActiveSheet().getName());
  const sheetName = PropertiesService.getScriptProperties().getProperty(event.triggerUid);
  Logger.log("Sheet name from property: " + sheetName);
  if (sheetName) {
    SpreadsheetApp.setActiveSheet(SpreadsheetApp.getActive().getSheetByName(sheetName));
    performRaffle();
  }

  // delete the trigger
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getUniqueId() === event.triggerUid) {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  // delete the property
  PropertiesService.getScriptProperties().deleteProperty(event.triggerUid);
  Logger.log("Trigger deleted");

}

function frenchDate(date) {
  var month = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  var day = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  var m = month[date.getMonth()];
  var d = day[date.getDay()];
  var dateStringFr = d + ' ' + date.getDate() + ' ' + m + ' ' + date.getFullYear() + ' à ' + date.getHours() + 'h' + `${date.getMinutes() < 10 ? '0' : ''}` + date.getMinutes();
  return dateStringFr
}


function getRaffleDate(matchDate) {
  // should be the week before either on wednesday if the match is from monday to thursday or on friday if the match is from friday to sunday
  const day = matchDate.getDay();
  const date = matchDate.getDate();
  const month = matchDate.getMonth();
  const year = matchDate.getFullYear();
  let raffleDate;
  // should be the week before either on wednesday if the match is from monday to thursday at noon
  if (day >= 1 && day <= 4) {
    raffleDate = new Date(year, month, date - 7 + (3 - day), 12, 0, 0);
    // wednesday of the current week

  } else {
    // or on friday if the match is from friday to sunday at noon
    raffleDate = new Date(year, month, date - 7 - (day - 5), 12, 0, 0);
  }
  return raffleDate;
}
