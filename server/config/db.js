const mongoose = require('mongoose');
const MONGO_URI =
"mongodb+srv://sandberg-g:jLx6i4RujUt84k4@cluster0.mjmat.mongodb.net/kwizeravtms?retryWrites=true&w=majority";

exports.connect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected successfully to db'))
    .catch((err) => console.log(err));
};
