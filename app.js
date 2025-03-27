const express = require('express');
const app = express();
const path = require('path');
const {show_list,show_list_sorted,add_school} = require('./database');

app.use(express.urlencoded({extended:true}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    const schools = await show_list()
    res.render('list_schools.ejs', { schools });
})

app.get('/listSchools', async (req, res) => {
    const { latitude, longitude } = req.query;
    let schools;
    if (latitude && longitude) {
        // if coordinates are provided, sort the list
        schools = await show_list_sorted(latitude, longitude);
    } else {
        // else, simply list schools
        schools = await show_list();
    }
    res.render('list_schools.ejs', { schools });
    // res.json(schools)
});

app.get('/addSchool', async(req,res) => {
    res.render('add_school.ejs')
})

app.post('/addSchool', async(req,res) => {
    try{
        const {name,address,latitude,longitude} = req.body
        const new_school = await add_school(name,address,latitude,longitude)
        // res.json(new_school)
        res.redirect('/listSchools')
        return new_school
    }
    catch(error){
        console.log(error)
    }
})

app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})
