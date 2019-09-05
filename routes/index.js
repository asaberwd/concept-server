const express = require('express')
const router = express.Router()




const { index } = require('./../app/controllers/home')
const { addProduct, viewProducts, viewSingleProduct } = require('./../app/controllers/productController')


// type   Get
// desc   welcome

router.get('/', (req,res)=>{
    index(req, res) })


// type   POst
// desc   Add new product

router.post('/api/addproduct', (req,res)=>{
    addProduct(req, res)
})

// type   Get
// desc   view all products

router.get('/api/viewproducts', (req,res)=>{
    viewProducts(req, res)
})


// type   Get
// desc   view single product

router.get('/api/viewproduct:id', (req,res)=>{
    viewSingleProduct(req, res)
})


// type   Get
// desc   view all leads

router.post('/api/addclinicrequest', (req,res)=>{
    viewLeads(req, res)
})


// type   POST
// desc   employee add new clinic request

router.post('/api/addclinicrequest', (req,res)=>{
    addClinicRequest(req, res)

})


// type   GET 
// desc   employee check the state of clinic request

router.get('/api/emp/requeststate', (req,res)=>{
    checkRequestState(req, res)
})



// type   GET 
// desc   manager view the state of clinic request

router.get('/api/manager/viewRequests', (req,res)=>{
    viewClinicRequests(req, res)
})


// type   POST 
// desc   manager update the state of clinic request

router.post('/api/manager/updaterequeststate', (req,res)=>{
    updateClinicRequest(req, res)
})


// type   GET 
// desc   clinic view the clinic request

router.get('/api/clinic/viewRequests', (req,res)=>{
    viewRequests(req, res)
})

// type   POST 
// desc   clinic update the state of clinic request

router.post('/api/clinic/updaterequeststate', (req,res)=>{
    updateRequestState(req, res)
})

module.exports = router

