const mongoose = require("mongoose");

const connectDatbase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo connect : ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectDatbase;
