// controllers/applications.js

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//INDEX/ROUTES: show all items in the user's pantry
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
        pantry: currentUser.pantry,
        user: currentUser,
      });
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

//NEW:
router.get('/new', (req,res) => {
    res.render('foods/new.ejs');
});

//CREATE: add a new pantry item
router.post('/', async (req, res) => {
  try {
    const currentUser =await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})


//DELETE: Remove a pantry item
router.delete('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.itemId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
} catch (error) {
  console.log(error);
  res.redirect('/')
}
})

//SHOW: display details of a specific pantry item
router.get('/:itemId', async (req, res) => {
  try {
     const currentUser =await User.findById(req.session.user._id);
     const item = currentUser.pantry.id(req.params.itemId)
  res.render('foods/show.ejs', {
    item: item,
    user: currentUser,
  })
  } catch (error) {
     console.log(error)
     res.redirect('/')
  }
})

//EDIT
router.get('/:itemId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const item = currentUser.pantry.id(req.params.itemId);
    res.render('foods/edit.ejs', {
      item: item,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})

//APDATE: update a pantry
router.post('/:itemId', async (req, res) => {
  try {
    const currentUser =await User.findById(req.session.user._id);
    const item = currentUser.pantry.id(req.params.itemId);
    item.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods/${req.params.itemId}`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
})


module.exports = router;
