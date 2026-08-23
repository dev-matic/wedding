# Collecting RSVPs in a Google Sheet

Every RSVP submitted on the site is sent to a Google Sheet you control. One-time
setup (~5 minutes), then replies flow in automatically and you just open the
sheet to see the list.

## 1. Create the sheet

1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it anything (e.g. "Wedding RSVPs").

## 2. Add the script

1. In the sheet, click **Extensions → Apps Script**.
2. Delete anything in the editor and paste this:

   ```js
   function doPost(e) {
     var lock = LockService.getScriptLock();
     lock.tryLock(10000);
     try {
       var ss = SpreadsheetApp.getActiveSpreadsheet();
       var sheet = ss.getSheetByName('RSVPs') || ss.insertSheet('RSVPs');
       if (sheet.getLastRow() === 0) {
         sheet.appendRow(['Received', 'Name', 'Email', 'Attending', 'Guests', 'Message']);
       }
       var d = JSON.parse(e.postData.contents);
       sheet.appendRow([
         d.receivedAt || new Date().toISOString(),
         d.name || '',
         d.email || '',
         d.attending === 'yes' ? 'Yes' : (d.attending === 'no' ? 'No' : ''),
         d.guests || '',
         d.note || ''
       ]);
       return ContentService
         .createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService
         .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     } finally {
       lock.releaseLock();
     }
   }
   ```

3. Click **Deploy → New deployment**.
4. For **Select type**, choose **Web app**.
5. Set **Execute as: Me**, and **Who has access: Anyone**.
6. Click **Deploy**, authorise when prompted, and **copy the Web app URL**
   (it looks like `https://script.google.com/macros/s/AKfy.../exec`).

## 3. Tell the site about it

In Vercel: **Project → Settings → Environment Variables**, add:

- **Name:** `RSVP_SHEET_WEBHOOK_URL`
- **Value:** the Web app URL you copied
- Apply to **Production** (and Preview if you like)

Then **redeploy** the site (Deployments → ⋯ → Redeploy) so the variable takes
effect.

## 4. Done

Submit a test RSVP on the site — a new row should appear in the sheet within a
few seconds (a tab named **RSVPs**, with columns Received / Name / Email /
Attending / Guests / Message). Share the sheet with anyone who needs to see the
list, or use **File → Download → CSV** to export it.

> If nothing appears: re-check the URL ends in `/exec`, that access is set to
> **Anyone**, and that the site was redeployed after adding the variable.
