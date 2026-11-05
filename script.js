
const form = document.getElementById("studentForm");
const status = document.getElementById("status");

const scriptURL = "https://script.google.com/macros/s/AKfycbxZrRdGHfoNW8h5SbEcENFjJ3yKwFN1LGQ27CTP57sQaTTKolqHJiyvORMrPnpvSESO/exec";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value;

    if (!name || !email || !/^\d{10}$/.test(phone) || !course) {
        status.innerText = "Please enter valid details.";
        status.style.color = "red";
        return;
    }

    const data = new FormData(form);

    try {
        await fetch(scriptURL, {
            method: "POST",
            body: data,
            mode: "no-cors"
        });

        status.innerText = "Registration submitted!";
        status.style.color = "green";
        form.reset();

    } catch (error) {
        status.innerText = "Submission failed.";
        status.style.color = "red";
    }
});


// //app script
function doPost(e) {
  try {
    // Get the spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Get data sent from the HTML form
    const name = e.parameter.name;
    const email = e.parameter.email;
    const phone = e.parameter.phone;
    const course = e.parameter.course;

    // Add data as a new row
    sheet.appendRow([
      new Date(),
      name,
      email,
      phone,
      course
    ]);

    // Send success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Student data saved successfully"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    // Send error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}