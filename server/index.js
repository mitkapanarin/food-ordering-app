import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from  "mongoose"
import { Product } from "./Routes/ProductRouter.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("api/product", Product)

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
const PORT = process.env.PORT || 6001
app.listen(process.env.PORT, () => console.log(`Server running on port ${PORT}`))