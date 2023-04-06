const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
res.render('index'); // aca estoy renderizando el archivo index.hbs de la carpeta views 
});

router.get('/about', (req, res)=>{
    res.render('about'); //aca estoy renderizando el archivos about.hbs de la carpeta views
})

module.exports = router;