import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios'


const app = express();
const port = 3000;
const apiKey = "5a079cfd46a84bdd9ebec48c98e7b9b6"

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'))




app.get('/', (req,res)=>{
    res.render('index.ejs')
})
app.post('/searchAgain', (req,res)=>{
    res.render('index.ejs')
})
app.post('/submit', async(req,res)=>{
    let userInput = req.body.searchBox
    let userInputPrice = req.body.maxPrice
    const apifetch = await axios.get(`https://api.spoonacular.com/food/wine/pairing?food=${userInput}&maxPrice=${userInputPrice}&apiKey=${apiKey}`)
    
    try{
        let dataProducts = apifetch.data.productMatches
        let pairingText = apifetch.data.pairingText
        let pairedWines = apifetch.data.pairedWines
        res.render('index.ejs', {wines: dataProducts, bestWines: pairingText, wineRecomandacion: pairedWines})
    } catch(err){
        console.log(err)
        res.status(500)
    }
   
})
app.listen(port, ()=>{
    console.log(`Server is running on port:${port}`)
})