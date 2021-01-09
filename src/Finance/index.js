const express = require("express");
const router = express.Router();
const financeModel = require("../Finance/schema");
const serviceUsersModel = require("../service-users/schema")

router.get("/allfinance/:serviceUserId", async (req, res) => {
    try {
        const allFinance = await financeModel.find()
        const financePerServiceUser = allFinance.filter(user => user.serviceUserId === req.params.serviceUserId)
        if (financePerServiceUser.length === 0) {
            res.send("No Finance Record Found For This Service User")
        }
        else {
            res.send(financePerServiceUser)
        }

    } catch (error) {
        console.log(error)
        res.send(error)
        
    }
    
})

router.post("/newfinance/:serviceUserId", async (req, res) => {
    try {
        const allFinance = await financeModel.find()
        const serviceUsers = await serviceUsersModel.findById(req.params.serviceUserId)
        serviceUserFullName = serviceUsers.firstName + " " + serviceUsers.lastName
        if (allFinance.length === 0) {
            req.body = {
                ...req.body, date: new Date().toDateString(), serviceUserId: req.params.serviceUserId,
                serviceUsername: serviceUserFullName
            }
            const newFinance = new financeModel(req.body);
            const financeSentToApi = await newFinance.save();
            res.send(financeSentToApi)
        }
        else {
            const financePerServiceUser = allFinance.filter(user => user.serviceUserId === req.params.serviceUserId)
            if (financePerServiceUser.length === 0) {
            req.body = { ...req.body, date : new Date().toDateString() , serviceUserId: req.params.serviceUserId , serviceUsername: serviceUserFullName }
            const newFinance = new financeModel(req.body);
            const financeSentToApi = await newFinance.save();
            res.send(financeSentToApi)
            }
            else {
                const oldBalance = financePerServiceUser[financePerServiceUser.length - 1]
                const newBalance = oldBalance.balance - req.body.expenditure
                if (req.body.expenditure > oldBalance.balance) {
                    res.send("Expenditure Cannot Be Greater Than Balance")
                }
                else {
                    req.body = {
                        ...req.body,
                        date: new Date().toDateString(),
                        serviceUserId: req.params.serviceUserId,
                        balance: newBalance, 
                        serviceUsername: serviceUserFullName
                    }
                    const updateFinance = new financeModel(req.body);
                    const financeUpdated = await updateFinance.save();
                    res.send(financeUpdated)
    
                }
            }
        }
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
   
   
})

router.post("/addMoney/:serviceUserId", async (req, res) => {
    const allFinance = await financeModel.find()
    const serviceUsers = await serviceUsersModel.findById(req.params.serviceUserId)
    serviceUserFullName = serviceUsers.firstName + " " + serviceUsers.lastName
     if (allFinance.length === 0) {
            req.body = {
                ...req.body, date: new Date().toDateString(), serviceUserId: req.params.serviceUserId,
                serviceUsername: serviceUserFullName
            }
            const newFinance = new financeModel(req.body);
            const financeSentToApi = await newFinance.save();
            res.send(financeSentToApi)
    }
     else {
         const financePerServiceUser = allFinance.filter(user => user.serviceUserId === req.params.serviceUserId)
           if (financePerServiceUser.length === 0) {
            req.body = { ...req.body, date : new Date().toDateString() , serviceUserId: req.params.serviceUserId , serviceUsername: serviceUserFullName }
            const newFinance = new financeModel(req.body);
            const financeSentToApi = await newFinance.save();
            res.send(financeSentToApi)
         }
           else {
            const oldBalance = financePerServiceUser[financePerServiceUser.length - 1]
               const newBalance = oldBalance.balance + req.body.balance
               req.body = {
                        ...req.body,
                        date: new Date().toDateString(),
                        serviceUserId: req.params.serviceUserId,
                        balance: newBalance, 
                        serviceUsername: serviceUserFullName
                    }
                    const updateFinance = new financeModel(req.body);
                    const financeUpdated = await updateFinance.save();
                    res.send(financeUpdated)
               
         }
         
    }
   
    
})

module.exports = router