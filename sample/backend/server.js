const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const path = require("path");




//express app
const app = express();


const dbString = 'mongodb://127.0.0.1/ntv';
mongoose.connect(dbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to mongodb");
}).catch((err) => {
  console.log("Something went wrong:  =>" + err);
});


//bodyParser middleware:
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

//mongoose models
const content_rec_model = require('./model.js');
const contentModel = require('./content.js');

const content_rec = mongoose.model('users');
const contents = mongoose.model('contents');


app.all('*', (req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use('/', express.static(__dirname + 'frontend'));



//APIs
app.get("/", (req, res) => {
  res.send("Welcome To Backend");
});

app.get('/get', (req, res) => {
  const newContent = new contents();
  newContent.contentId = 4164212115654350513
  newContent.title = "Happy birthday, Schatz!: Blake Lively veralbert Ryan Reynolds"
  newContent.body = "Was sich liebt, das neckt sich. Und so haben es sich Blake Lively und Ryan Reynolds angewöhnt, sich gegenseitig an ihren Geburtstagen mit unvorteilhaften Bildern auf den Arm zu nehmen. Nun bekommt wieder mal Reynolds sein Fett weg. Und das nicht nur von seiner Frau."
  newContent.imgsrc = "https://bilder4.n-tv.de/img/incoming/crop21351059/3348675873-cImg_4_3-w250/reynolds.jpg"
  newContent.save(() => {
    console.log("some dummy stored");
  })
  content_rec.find({}, (error, docs) => {
    const docsJson = JSON.parse(docs);
    console.log(JSON.stringify(docsJson));
    docs.contentId.map((eachContent) => {

      if (eachContent === 4164212115654350513) {

        contents.find({}, (err, values) => {

          res.status(200)
          res.json({
            news: values
          })
        })



      }
    })
  })
})

/*{
  "news": [{
    "title": "Happy birthday, Schatz!: Blake Lively veralbert Ryan Reynolds",
    "desc": "Was sich liebt, das neckt sich. Und so haben es sich Blake Lively und Ryan Reynolds angewöhnt, sich gegenseitig an ihren Geburtstagen mit unvorteilhaften Bildern auf den Arm zu nehmen. Nun bekommt wieder mal Reynolds sein Fett weg. Und das nicht nur von seiner Frau.",
    "link": "https://www.n-tv.de/leute/Blake-Lively-veralbert-Ryan-Reynolds-article21351077.html",
    "imgsrc": "https://bilder4.n-tv.de/img/incoming/crop21351059/3348675873-cImg_4_3-w250/reynolds.jpg"
  },
  {
    "title": "Nach Disqualifikation in Suzuka: Renault verzichtet auf Einspruch und mault",
    "desc": "Der Renault-Rennstall um den deutschen Piloten Nico Hülkenberg sieht nach der nachträglichen Disqualifikation beider Boliden beim Großen Preis von Japan von einem Einspruch ab. Allerdings versteht Renault nicht, warum ein unter technologischen Gesichtspunkten legales Bremssystems sanktioniert wird.",
    "link": "https://www.n-tv.de/sport/formel1/Renault-verzichtet-auf-Einspruch-und-mault-article21351335.html",
    "imgsrc": "https://bilder1.n-tv.de/img/incoming/crop21351324/1718675448-cImg_4_3-w250/imago43382643h.jpg"
  },

  {
    "title": "In der Wanne mit Öko-Test: Erkältungsbäder helfen meist nicht weiter",
    "desc": "In der nasskalten Jahreszeit haben Erkältungsviren Hochkonjunktur. Bei den ersten Symptomen einer Erkrankung schwören viele auf ein heißes Bad mit ätherischen Ölen als Gegenmittel. Doch mal abgesehen vom Wohlfühleffekt hält Öko-Test nicht allzu viel von den Badezusätzen.",
    "link": "https://www.n-tv.de/ratgeber/Erkaeltungsbaeder-helfen-meist-nicht-weiter-article21350437.html",
    "imgsrc": "https://bilder2.n-tv.de/img/incoming/crop21350637/8668678408-cImg_4_3-w250/imago94227760h.jpg"
  }
]
}*/



const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
