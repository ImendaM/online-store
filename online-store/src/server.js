import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/shopdb');

const itemSchema = new mongoose.Schema({
    id: Number,
    title: String,
    src: String,
    price: Number
});

const Item = mongoose.model("Item", itemSchema);

app.get('/items', async (req, res ) => {
    const items = await Item.find();
    res.json(items);
});

app.listen(5000, () => console.log("Server is running on port 5000"));