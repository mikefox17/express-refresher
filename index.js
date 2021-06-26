const express = require('express');
const path = require('path');
const app = express();
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');

//init middleware
/* app.use(logger);
 */

//handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//home page route
app.get('/', (req, res) =>
    res.render('index', {
        title: 'Member App',
        members,
    })
);

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on ${PORT} 🔥`));
