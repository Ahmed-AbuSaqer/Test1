function reverseMessage(req, res)  {
    const inputMessage = req.body.message;
    const reversedMessage = inputMessage.split('').reverse().join('');
    res.status(200).json({
        inputMessage: inputMessage,
        reversedMessage: reversedMessage
    })}
module.exports = {reverseMessage}