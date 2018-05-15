function civiCrm(email, firstName, lastName, subject, body, date) {
  var config = PropertiesService.getScriptProperties().getProperties();
  CRM.init(config);
  
  var contactId = 0;
  
  // Get Contact
  CRM.api3('Contact', 'get', {"sequential":1,"email":email})
    .done(function(getContact) {
      if (parseInt(getContact.count) == 0) { 
        // Create New Contact
        CRM.api3('Contact', 'create', {"sequential":1,"contact_type":"Individual","first_name":firstName,"last_name":lastName,"email":email })
          .done(function(createContact) {
            contactId = parseInt(createContact.id);
          });
      } else if (parseInt(getContact.count) == 1) {
        contactId = parseInt(getContact.id);
      }
    });
  
  if (contactId != 0) {
    // Create Email Activity
    CRM.api3('Activity', 'create', {"sequential":1,"activity_type_id":"Email","subject":subject,"details":body,"target_id":contactId, "activity_date_time":date}); 
  }
}
