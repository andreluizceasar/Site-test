const express = require('express');
const Article = require('./../models/article');
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
router.use(express.static('views'));

router.get('/new',(req, res)=>{
    res.render('new/new');
})

router.get('/rand', async (req, res)=>{
    const article = await Article.aggregate([{$sample: {size: 1}}]);            
    res.redirect(`/article/${article[0]._id}`);    
})

router.get('/edit/:id', async (req, res)=>{
    const article = await Article.findById(req.params.id);
    res.render('edit/edit', {article: article});
})

router.get('/:id', async (req, res)=>{
    const article = await Article.findById(req.params.id);
    res.render('article/article', {article: article});
})

router.post('/', (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        image: req.body.image
    })

    try{
        article.save();
        res.redirect('/article/new');
    }catch (e){
        res.render('new/new');
    }
})

router.put('/:id', async (req, res)=>{
    let article = await Article.findById(req.params.id);
    article.title = req.body.title;
    article.description = req.body.description;
    article.content = req.body.content;
    article.image = req.body.image;

    try{
        article.save();
        res.redirect(`/article/${req.params.id}`);
    }catch (e){
        res.render('edit/edit');
    }
})

router.delete('/:id', async (req, res)=>{
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

module.exports = router;

