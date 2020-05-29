From Gmail, a label can be added to an email thread to sinalize that the user wants to make a copy of this thread to an external service (such as a CRM, for example).

This script is a Google Apps Script meant to be run from a Google Sheets, which will keep track of emails being copied.

A time-driven trigger will call the script every 15 minutes or so (whichever time interval is best):

https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually

The script will lookup all email threads that have a label, and will call an external API to copy new emails.

Currently only CiviCRM is supported, but any service can be easily added as a plugin.

The CiviCRM integration requires the CiviService library:

https://github.com/mhawksey/CiviService-for-Google-Script

 
