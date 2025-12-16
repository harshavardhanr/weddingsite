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
 *    (Replace the GOOGLE_SHEETS_URL value)
 *
 * NOTE: If you update this script, you must create a NEW deployment
 * (Deploy > New deployment) to see the changes.
 */

// Handle POST requests from the RSVP form
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Get form data from the request
    const timestamp = e.parameter.timestamp || new Date().toISOString();
    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const attending = e.parameter.attending || '';
    const guests = e.parameter.guests || '1';
    const notes = e.parameter.notes || '';

    // Append the RSVP data to the sheet
    sheet.appendRow([
      timestamp,
      name,
      email,
      attending,
      guests,
      notes
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'RSVP received!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput("Wedding RSVP API is running! Use POST to submit RSVPs.")
    .setMimeType(ContentService.MimeType.TEXT);
}
