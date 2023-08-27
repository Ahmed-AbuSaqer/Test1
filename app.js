const express = require('express');
const {reverseMessage} = require('./controllers/reverse');
const app = express();
const port = 3000;

app.use(express.json());

// Logging middleware ==> tracking the requests
app.use((req, res, next) => {
    const now = new Date();
    console.log(`${now.toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware function to validate the input message ==> No empty message and no message longer than 10 characters
function  validateMessage(req, res, next){
    const inputMessage = req.body.message;
    if(!inputMessage){
       return res.status(400).json({error: 'Message field should not be empty'})
    }
    else if(inputMessage.length>=10){
        return  res.status(400).json({error: 'Message length exceeds the limit of 10 characters'})
    }
    next()
}
app.get('/', (req, res) => {
    res.send('Welcome to the message reversal app!');
});
app.post('/reverse', validateMessage,reverseMessage)

app.listen(port, ()=>{
    console.log(`Server is now running on port ${port}`);
});
module.exports=app;