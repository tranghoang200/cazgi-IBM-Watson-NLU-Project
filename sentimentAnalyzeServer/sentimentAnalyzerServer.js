const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: '{apikey}',
        }),
        serviceUrl: '{url}',
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const newInstance = getNLUInstance();
    const analyzeParams = {
    "url": req.query.url,
    "features": {
      "emotion": {}
    }
  }

  newInstance.analyze(analyzeParams).then(analysisResults => {
    let emotions = analysisResults.result.emotion.document.emotion;
    return res.send(emotions);
  }).catch(err => {
    return res.send('error:' + err);
  });
});

app.get("/url/sentiment", (req,res) => {
    const newInstance = getNLUInstance();
    const analyzeParams = {
    "url": req.query.url,
    "features": {
      "sentiment": {},
    }
  }
  
  newInstance.analyze(analyzeParams).then(analysisResults => {
    let sentiment = JSON.stringify(analysisResults.result.sentiment.document.label, null, 2);
    return res.send(sentiment);
  }).catch(err => {
    return res.send('error:' + err);
  });
});

app.get("/text/emotion", (req,res) => {
    const newInstance = getNLUInstance();
    const analyzeParams = {
    "text": req.query.text,
    "features": {
      "emotion": {}
    }
  }

  newInstance.analyze(analyzeParams).then(analysisResults => {
    let emotions = analysisResults.result.emotion.document.emotion;
    return res.send(emotions);
  }).catch(err => {
    return res.send('error:' + err);
  });

});

app.get("/text/sentiment", (req,res) => {
    const newInstance = getNLUInstance();
    const analyzeParams = {
    "text": req.query.text,
    "features": {
      "sentiment": {},
    }
  }
  
  newInstance.analyze(analyzeParams).then(analysisResults => {
    let sentiment = JSON.stringify(analysisResults.result.sentiment.document.label, null, 2);
    return res.send(sentiment);
  }).catch(err => {
    return res.send('error:' + err);
  });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

