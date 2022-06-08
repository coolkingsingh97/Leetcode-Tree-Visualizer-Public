const router = require('express').Router();
let arr = require('../models/array.model');


router.route('/').get((req,res) => {
    arr.find()
    .then(arrays => res.json(arrays))
    .catch(err => res.status(400).json('Error: ' + err));
}

);

router.route('/add').post((req,res)=>{
    const array = req.body.arr;
    const newarr = new arr({arr:array});

    newarr.save()
        .then(() => res.json('Array Created!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').get((req, res) => {
    arr.findById(req.params.id)
      .then(arrays => res.json(arrays))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/:id').delete((req, res) => {
    arr.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/update/:id').post((req, res) => {
    arr.findById(req.params.id)
      .then(arrays => {
        arrays.arr = req.body.arr;
  
        arrays.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;