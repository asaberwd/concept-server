const express = require('express')
const router = express.Router()

const multer = require('multer');
const path = require('path');



const { index } = require('./../app/controllers/home')
const { addProduct, viewProducts, viewSingleProduct, updateProduct } = require('./../app/controllers/productController')
const { addUser, viewUsers, viewSingleUser, updateUser } = require('./../app/controllers/userController')
const { addLead, viewLeads, viewSingleLead, updateLead } = require('./../app/controllers/leadController')
const { addOrder, viewOrders, viewSingleOrder, getStatistics } = require('./../app/controllers/orderController')
const { addCompany, viewcompanies, viewSingleCompany, updateCompany } = require('./../app/controllers/shippingCompanyController')
const { addCall, viewAllCalls, viewCallsByUser, viewCallsByLead, viewSingleCall } = require('./../app/controllers/callController')
const { addSchedule, viewActiveSchedules, viewSingleSchdule , viewActiveUserSchedules } = require('./../app/controllers/scheduleController')


const storage = multer.diskStorage({
    destination : './public/uploads',
    filename : (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname );
    }
})

const upload = multer({ storage });


// type   Get
// desc   welcome

router.get('/', (req,res)=>{
    index(req, res) })


// type   Post
// desc   Add new product

router.post('/api/addproduct', upload.single('selectedFile'), (req,res)=>{
    addProduct(req, res)
})

// type   Get
// desc   view all products

router.get('/api/viewproducts', (req,res)=>{
    viewProducts(req, res)
})


// type   Get
// desc   view single product by id

router.get('/api/product/:id', (req,res)=>{
    viewSingleProduct(req, res)
})


// type   post
// desc   update product by id

router.post('/api/product/:id', (req,res)=>{
    updateProduct(req, res)
})


//========== user routes ===========



// type   Post
// desc   Add new USER

router.post('/api/adduser', (req,res)=>{
    addUser(req, res)
})

// type   Get
// desc   view all users

router.get('/api/viewusers', (req,res)=>{
    viewUsers(req, res)
})

// type   Get
// desc   view single user by id

router.get('/api/user/:id', (req,res)=>{
    viewSingleUser(req, res)
})


// type   post
// desc   update user by id

router.post('/api/user/:id', (req,res)=>{
    updateUser(req, res)
})


//====== lead routes =====

// type   Post
// desc   Add new lead

router.post('/api/addlead', (req,res)=>{
    addLead(req, res)
})


// type   Get
// desc   view all Leads

router.get('/api/viewleads', (req,res)=>{
    viewLeads(req, res)
})

// type   Get
// desc   view single user by id

router.get('/api/lead/:id', (req,res)=>{
    viewSingleLead(req, res)
})


//====== order routes =====

// type   Post
// desc   Add new order

router.post('/api/addorder', (req,res)=>{
    addOrder(req, res)
})


// type   Get
// desc   view all orders

router.get('/api/vieworders', (req,res)=>{
    viewOrders(req, res)
})

router.get('/api/order/statics', (req, res)=>{
    getStatistics(req, res)
})

// type   Get
// desc   view single order by id

router.get('/api/order/:id', (req,res)=>{
    viewSingleOrder(req, res)
})

router.put('/api/updateorderstatus/:id',(req,res)=>{
    updateOrderStatus(req,res)
})



//====== shipping company routes =====

// type   Post
// desc   Add new company

router.post('/api/addcompany', (req,res)=>{
    addCompany(req, res)
})


// type   Get
// desc   view all companies

router.get('/api/viewcompanies', (req,res)=>{
    viewcompanies(req, res)
})

// type   Get
// desc   view single company by id

router.get('/api/company/:id', (req,res)=>{
    viewSingleCompany(req, res)
})

// type   put
// desc   update company by id

router.put('/api/company/:id', (req,res)=>{
    updateCompany(req, res)
})

//====== calls routes =====

// type   Post
// desc   Add new call

router.post('/api/call', (req,res)=>{
    addCall(req, res)
})


// type   Get
// desc   view all calls

router.get('/api/call', (req,res)=>{
    viewAllCalls(req, res)
})

// type   get
// desc   update company by id

router.get('/api/call/user/:id', (req,res)=>{
    viewCallsByUser(req, res)
})

// type   get
// desc   update company by id

router.get('/api/call/lead/:id', (req,res)=>{
    viewCallsByLead(req, res)
})

// type   Get
// desc   view single call by id

router.get('/api/call/:id', (req,res)=>{
    viewSingleCall(req, res)
})

//====== schedule routes =====

// type   Post
// desc   Add new schdule

router.post('/api/schedule', (req,res)=>{
    addSchedule(req, res)
})


// type   Get
// desc   view all schedules which status is active

router.get('/api/schdule', (req,res)=>{
    viewActiveSchedules(req, res)
})

// type   Get
// desc   view single schedule by id

router.get('/api/schedule/:id', (req,res)=>{
    viewSingleSchdule(req, res)
})



// type   Get
// desc   view all user schedules which status is active

router.get('/api/schdule/user/:user', (req,res)=>{
    viewActiveUserSchedules(req, res)
})




// type   put
// desc   update schedule

router.put('/api/schedule/:id', (req,res)=>{
    updateSchedule(req, res)
})





module.exports = router

