const express = require('express');
const router = express.Router();
const burger = require('../models/burger');

//CRUD routes
//Include 'All Burgers'

router.get('/', (req, res) => {
  res.render("index")
});

router.get('/all', (req, res) => {
  burger.all()
    .then( burgers => {
      res.json(burgers);
    })
    .catch( e => {
      console.log(e);
      res.status(500).end('No Burgers For You');
    });
});

router.get('/burger/:id', (req, res) => {
  if(req.params.id.toLowerCase() === 'all'){
    burger.all()
      .then( burgers => {
        const readyBurgers = burgers.filter( burger => {
          return burger.devoured == false;
        });

        const devouredBurgers = burgers.filter( burger => {
          return burger.devoured == true;
        })

        res.render("hall-of-fame", {
          readyBurgers,
          devouredBurgers
        });
      })
      .catch( e => {
        console.log(e);
        res.status(500).end('No Burgers For You');
      });
    return true;
  }

  const burgerId = parseInt(req.params.id);
  burger.single(burgerId)
    .then( burger => {
      res.json(burger);
    })
    .catch( e => {
      console.log(e);
      res.status(500).end('Unable to fetch burger');
    })
});

router.post('/burger', (req, res) => {
  const burgerName = req.body.name.toString();
  burger.create(burgerName)
    .then( newBurger => {
      res.json(newBurger);
    })
    .catch( e => {
      console.log(e);
      res.status(500).end('There was a problem creating your burger.');
    });
});

router.put('/burger/:id', (req, res) => {
  const burgerId = req.params.id;
  if(!burgerId){
  };

  const trgtBurger = {
    burger_name: req.body.name.toString(),
    devoured: req.body.devoured == true,
    id: burgerId
  }

  burger.update(trgtBurger)
    .then( updatedBurger => {
      res.json(trgtBurger);
    })
    .catch( e => {
      console.log(e);
      res.status(500).json('Failed to update burer');
    });
});

module.exports = router;