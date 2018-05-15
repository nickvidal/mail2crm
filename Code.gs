function pushTag() {
 // Set your label and plugin
 var tag = "YOURLABEL";
 var plugin = "CiviCRM";
  
 var plugins = {
   CiviCRM: function(email, firstName, lastName, subject, body, date){
     civiCrm(email, firstName, lastName, subject, body, date);
   }
 };
  
 var sheet = SpreadsheetApp.getActiveSheet();
 var range = sheet.getRange(2, 1, sheet.getLastRow());
 var values = range.getValues();
 var index = values.join().split(',');

 var label = GmailApp.getUserLabelByName(tag);
 var threads = label.getThreads(0, 10);
  
 for (var i = 0; i < threads.length; i++) {
   var messages = threads[i].getMessages();
   var subject = threads[i].getFirstMessageSubject();

   var firstRecord = 0;
   for (var j = 0; j < messages.length; j++) {
     var id = messages[j].getId();
     var date = messages[j].getDate();
     var from = messages[j].getFrom();
     var to = messages[j].getTo();
     var cc = messages[j].getCc();
     var header = "From: " + from.replace("<","(").replace(">",")") + "\r" +
                  "To: " + to.replace(/</g,"(").replace(/>/g,")") + "\r" +
                  "Cc: " + cc.replace(/</g,"(").replace(/>/g,")") + "\r\r";
     
     var body = header + messages[j].getPlainBody();

     var contacts = [from];
     
     // Trick to avoid splitting "Smith, John" <john@smith.com>
     to = to.replace(/(".*,)( )(.*")/g, '$1_$3');
     var toList = to.split(", ");
     toList.forEach(function(el, ind, array){
       array[ind] = el.replace(",_", ", ");
     });
     contacts = contacts.concat(toList);
     
     cc = cc.replace(/(".*,)( )(.*")/g, '$1_$3');
     var ccList = cc.split(", ");
     ccList.forEach(function(el, ind, array){
       array[ind] = el.replace(",_", ", ");
     });     
     contacts = contacts.concat(ccList);

     for (var k = 0; k < contacts.length; k++) {
       var firstName = "";
       var lastName = "";
       var email = "";
       
       var matches = contacts[k].match(/\s*"?([^"]*)"?\s+<(.+)>/);
       if (matches) {
         var fullName = matches[1].split(" ");
         firstName = fullName[0];
         lastName = fullName.length > 1 ? fullName[fullName.length - 1] : "";
         email = matches[2];
       }
       else {
         email = contacts[k];         
       }

       if ((index.indexOf(id) < 0) && (email != "") && !(messages[j].isDraft())) {
         if (!firstRecord) {
           // Record only first email
           firstRecord = 1;
           sheet.appendRow([id, date, email, firstName, lastName]);
         }
         
         // Call plugin
         plugins[plugin](email, firstName, lastName, subject, body, date);    

       }
     }
   }
 }
}
