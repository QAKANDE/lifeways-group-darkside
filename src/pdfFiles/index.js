const express = require("express");
const router = express.Router()
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const puppeteer = require("puppeteer");
const { createReadStream, readFile } = require("fs-extra")

router.post("/pdf", (req, res) => {

  let students = []
  const receiveDetailsFromFrontend = {
            morning: req.body.morning,
            afternoon: req.body.afternoon,
            night: req.body.night,
            choices: req.body.choices,
            special: req.body.special,
            health: req.body.health,
            changeInSupport: req.body.changeInSupport,
            actionIfYesToChangeInSupport: req.body.actionIfYesToChangeInSupport,
            serviceUsername: req.body.serviceUsername,
            currentDate: new Date().toDateString(),
            staffName : req.body.staffName
  }
  students.push(receiveDetailsFromFrontend)
  const pdfTitle = students[0].serviceUsername + " " +  new Date().toDateString()
     ejs.renderFile(path.join(__dirname, './views/', "report-template.ejs"), {students : students }, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        let options = {
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
        };
        pdf.create(data, options).toFile(`${pdfTitle}.pdf`, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                res.send("File created successfully");
            }
        });
    }
});

})

// router.post("/pdf/", async (req, res) => {
// //   const browser = await puppeteer.launch({  slowMo: 250 });
// //   const page = await browser.newPage();
// //   await page.goto(req.body.url, {
// //     waitUntil: "networkidle0"
// //   });
  
// //   await page.setViewport({ width: 1680, height: 1050 });
// //     const todays_date = new Date().toDateString();
// //   const pdfURL = path.join(__dirname, 'files', todays_date + '.pdf');

// //   await page.pdf({
// //     path: pdfURL,
// //     format: "A4",
// //     printBackground: true,
// //     displayHeaderFooter: true,
// //     headerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;margin-bottom:500px">
// //                         ${new Date().toDateString()}
// //                         <span style="margin-left: 10px; margin-bottom:500px"> ${req.body.name}</span>
// //                     </div>`,
// //     footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;">
// //                        ${req.body.name}
// //                         <span style="display:inline-block;float:right;margin-right:10px;">
// //                             <span class="pageNumber"></span> / <span class="totalPages"></span>
// //                         </span>
// //                     </div>`,
// //     margin: {
// //       top: '100px',
// //       right: '38px',
// //       bottom: '38px',
// //       left: '38px'
// //     }
// //   });
// //     await browser.close();
// //     res.set({
// //  "Content-Type": "application/pdf",
// //  "Content-Length": pdf.length
// // });
// //   res.sendFile(pdfURL);
// //   var file = createReadStream(pdfURL);
// // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
// // file.pipe(res);
//   // var stream = fs.createReadStream(pdfURL);
//   // var filename = "WhateverFilenameYouWant.pdf"; 
//   // // Be careful of special characters

//   // filename = encodeURIComponent(filename);
//   // // Ideally this should strip them

//   // res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
//   // res.setHeader('Content-type', 'application/pdf');

//   // stream.pipe(res);
// });

module.exports = router