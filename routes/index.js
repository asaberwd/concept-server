const express = require('express')
const router = express.Router()

const multer = require('multer');
const path = require('path');



const { index } = require('./../app/controllers/home')
const { addProduct, viewProducts, viewSingleProduct, updateProduct } = require('./../app/controllers/productController')
const { addUser, viewUsers, viewSingleUser, updateUser } = require('./../app/controllers/userController')
const { addLead, viewLeads, viewSingleLead, updateLead } = require('./../app/controllers/leadController')
const { addOrder } = require('./../app/controllers/orderController')


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

// type   Get
// desc   view single order by id

router.get('/api/order/:id', (req,res)=>{
    viewSingleOrder(req, res)
})


module.exports = router

