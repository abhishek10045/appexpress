const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const getCodeArray = letter => {
	let i;
	const codes = [];
	for (i = 1; i <= 20; ++i) {
		code = letter + '00' + (i / 10 < 1 ? '0' : '') + i;
		codes.push(code);
	}
	return codes;
};

const getCodes = letters => {
	const codes = [];
	letters.forEach(letter => {
		codes.push({
			letter,
			codes: getCodeArray(letter)
		});
 	});
 	return codes;
};

app.get('/', (req, res) => {
	
	const letters = ['P', 'B', 'C', 'U'];
	const codes = getCodes(letters);

	res.render('index', { codes });
});

app.get('/:code/', (req, res) => {

    const code = req.params.code;
    MongoClient.connect(url, function (err, { db }) {

        if (err) throw err;
       	db = db('ObdCodes');

        db.collection('ObdCodes').find({ Code: code }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
    res.render('result', { result });    
        });
    });
    /*
    Delete this
    const result = code;
    res.render('result', { result });
    */
});




app.listen(3000);