
const { addUser, viewUsers, viewSingleUser, updateUser } = require('./../app/controllers/userController')


// type   Get
// desc   view all products

router.get('/api/viewusers', (req,res)=>{
    viewUsers(req, res)
})


// type   Get
// desc   view single product by id

router.get('/api/user/:id', (req,res)=>{
    viewSingleUser(req, res)
})


// type   post
// desc   update product by id

router.post('/api/user/:id', (req,res)=>{
    updateUser(req, res)
})