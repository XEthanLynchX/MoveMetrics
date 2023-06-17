const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/train_exchange`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log(`Connected to train_exchange database!`))
.catch((err)=>console.log(err));