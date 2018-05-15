# pushtag
Record emails that are tagged (e.g. in a CRM).

From Gmail, you can add a label (tag) to an email thread so that it gets recorded at an external service (such as a CRM, for example).

This script is a Google Apps Script meant to be run from a Google Sheets, which will keep track of emails being recorded.

A time-driven trigger will call the script every 15 minutes or so (whichever time interval is best).

The script will lookup all email threads that have a label (tag), and will call an external API to record new emails.

Currently only CiviCRM is supported, but any service can be easily added as a plugin.

The CiviCRM integration requires the CiviService library:

https://github.com/mhawksey/CiviService-for-Google-Script

 
