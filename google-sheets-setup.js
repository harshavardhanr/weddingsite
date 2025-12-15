/**
 * Google Apps Script for Wedding RSVP Form
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Create a new Google Sheet
 * 2. Add these column headers in Row 1:
 *    A: Timestamp | B: Name | C: Email | D: Attending | E: Guests | F: Notes
 *
 * 3. Go to Extensions > Apps Script
 *
 * 4. Delete any existing code and paste this entire script
 *
 * 5. Click "Deploy" > "New deployment"
 *
 * 6. Select type: "Web app"
 *    - Description: "Wedding RSVP"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *
 * 7. Click "Deploy" and authorize the app
 *
 * 8. Copy the Web App URL and paste it into index.html
 *    (Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE')
 */

// Handle POST requests from the RSVP form
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Append the RSVP data to the sheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.email,
      data.attending,
      data.guests,
      data.notes
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput("Wedding RSVP API is running!")
    .setMimeType(ContentService.MimeType.TEXT);
}
