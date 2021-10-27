import express from "express";
import mongoose from "mongoose";
import settings from "./utils/Api.js";
import cors from 'cors';
import userRoutes from "./routes/UserRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import productOrderRoutes from "./routes/PurchaseOrderRoutes.js";

const app = express();
const port =  settings.port;
const url = settings.Url;

app.use(express.json());
app.use(cors({ origin: true }));
app.use(userRoutes);
app.use(productRoutes);
app.use(productOrderRoutes)
app.listen(port, async () => {
    try {
        await mongoose.connect(url), {
            useNEwUrlParser: true,
            useUnifiedTopology:true
        }
    }catch(e){
        console.log("Failure connection with the data base, please retry later")
    }
    console.log(`App listening at http://localhost:${port}`)
})