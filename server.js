const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/article');

const app = express();

mongoose.connect('mongodb://localhost:27017/blog', 
{useNewUrlParser: true, 
 useUnifiedTopology: true
}).catch(error => console.log(error));

app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: false}));

app.use(express.static('views'));
app.use('/article', articleRouter);
app.use('/ejs', express.static('node_modules/ejs'));



// const article = [
//     {
//         title: 'Pespo tisinho demo it pascoalis rebocitos pala pesfezo',
//         description: 'Pinipastos nenho tilmo triogo poste de lingua efiocelo pala o palna nipas e a nonila opinipastos nenho tilmo triogo poste de lingua',
//         img:'imgs/big-sample.jpg'
//     },
//     {
//         title: 'Pespo tisinho demo it pascoalis rebocitos pala pesfezo',
//         description: 'Pinipastos nenho tilmo triogo poste de lingua efiocelo pala o palna nipas e a nonila opinipastos nenho tilmo triogo poste de lingua',
//         img:'imgs/sample.jpg'
//     },
//     {
//         title: 'Pespo tisinho demo it pascoalis rebocitos pala pesfezo',
//         description: 'Pinipastos nenho tilmo triogo poste de lingua efiocelo pala o palna nipas e a nonila opinipastos nenho tilmo triogo poste de lingua',
//         img:'imgs/sample.jpg'
//     },
//     {
//         title: 'Pespo tisinho demo it pascoalis rebocitos pala pesfezo',
//         description: 'Pinipastos nenho tilmo triogo poste de lingua efiocelo pala o palna nipas e a nonila opinipastos nenho tilmo triogo poste de lingua',
//         img:'imgs/sample.jpg'
//     },
//     {
//         title: 'Pespo tisinho demo it pascoalis rebocitos pala pesfezo',
//         description: 'Pinipastos nenho tilmo triogo poste de lingua efiocelo pala o palna nipas e a nonila opinipastos nenho tilmo triogo poste de lingua',
//         img:'imgs/sample.jpg'
//     },
//     {
//         title: 'Pespo tisinho demo it pascoalis rebocitos pala pesfezo',
//         description: 'Pinipastos nenho tilmo triogo poste de lingua efiocelo pala o palna nipas e a nonila opinipastos nenho tilmo triogo poste de lingua',
//         img:'imgs/sample.jpg'
//     },
//     {
//         title: 'Pespo tisinho demo it pascoalis rebocitos pala pesfezo',
//         description: 'Pinipastos nenho tilmo triogo poste de lingua efiocelo pala o palna nipas e a nonila opinipastos nenho tilmo triogo poste de lingua',
//         img:'imgs/sample.jpg'
//     }
    

// ]

app.get('/:pg', async (req, res)=>{
    const page = parseInt(req.params.pg, 10);
    const articles = await getAll(page);    
    res.render('mini-articles', {articles});
})

async function getAll(page){
    const PAGE_SIZE = 10;
    const skip =(page - 1)*PAGE_SIZE;
    return await Article.find().skip(skip).limit(PAGE_SIZE);
}

app.get('/', async (req, res) => {
    const article = await getAll(1);
    res.render('main/index', {article});
})

app.listen(8080);