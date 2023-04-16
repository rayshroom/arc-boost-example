// generate express app template, with one get route to /api, and start the app at 2333
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 2333;

app.use(bodyParser.text({ type: 'text/plain' }));

app.post('/summarize', async (req, res) => {
    console.log("received summary request");
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
      });
      const openai = new OpenAIApi(configuration);
      
      // TODO: figure out a better way to count tokens, and use up to open AI api limit (4000 tokens per call)
      var incoming = req.body.substring(0, 30000);
      //   console.log(incoming);
      
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: incoming + "Tl;dr",
        temperature: 0.7,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 1,
      });
      // prints in console how many tokens are used
      console.log(response.data.usage.prompt_tokens);
      res.send(response.data.choices[0].text);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
