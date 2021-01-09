const express = require("express");
const router = express.Router()
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const { createReadStream, readFile } = require("fs-extra")
const cloudinary = require('cloudinary').v2;
const fs = require("fs-extra")
const financePdfSchema = require("../financePdf/schema")
const objectId = require('mongodb').ObjectID;
const financeSchema = require("../Finance/schema")
const serviceUsers = require ("../service-users/schema")

const finance = []

router.get("/pdf/:serviceUserId", async (req, res) => {
    const financeMonthAndYear = {
        monthAndYear : new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getFullYear()
    }
    const allFinance = await financeSchema.find()
    const finances = allFinance.filter(user => user.serviceUserId === req.params.serviceUserId)
    finances.push(financeMonthAndYear)
    const pdfTitle = "fiannce"
    const pdfURL = path.join(__dirname, 'files', pdfTitle + '.pdf');
    finance.push(finances)
    ejs.renderFile(path.join(__dirname, './views/', "finance-template.ejs"), { finances: finances }, (err, data) => { 
              if (err) {
        console.log(err)
    } else {
      let options = {
			"directory": pdfURL,
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "20mm"
            },
            "footer": {
                "height": "20mm",
            },
                  };
                  pdf.create(data, options).toFile("report.pdf", function (err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send("File created successfully");
            }
        });
// //       pdf.create(data).toBuffer( async function (err, data) {
// //             if (err) {
// //                 console.log(err)
// //             } else {

// // //             const uploadStream =   (fileBuffer, options) => {
// // //               return new Promise((resolve, reject) => {
// // //               try {          
// // //                 cloudinary.uploader.upload_stream(options, (error, result) => {
// // //                   if (result) {
// // //                     resolve(result)
// // //                     console.log(result.url)
// // //                   }
// // //                   else {
// // //                     console.log(error)
// // //                   }
// // //           }).end(fileBuffer);
// // //               } catch (error) {
// // //                 console.log(error)
                
// // //               }
// // //       });
// // // }     
// // //               await uploadStream(data, { public_id: `${pdfTitle}` });
// // // //               try {
              
// // // //                 const files = new financePdfSchema();
// // // //                 files._id = objectId(students[0].id)
// // // //                 files.fileUrl = url[0]
// // // //   const newPdf = await files.save();
// // // //   res.send(newPdf)
// // // //               } catch (error) {
// // // //                 console.log(error)
// // // //               }
// //             } 
// //         });
 
    }
    })
    
    
})

module.exports = router