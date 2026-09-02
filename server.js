require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db")

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on PORT: http://localhost:${PORT}`)
});




