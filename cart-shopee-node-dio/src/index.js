import createItem from "./services/item.js"
import express from "express";

import * as cartService from "./services/cart.js"

import cors from "cors";

const app = express();
app.use(cors()); // Adicione esta linha
app.use(express.json());

const cart = []

app.get("/cart", (req, res) => {
    res.json(cart);
  });

app.post("/cart/add", (req, res) => {
    const { name, price, quantity } = req.body;
    const item = { name, price, quantity, subtotal: () => price * quantity };
    cartService.addItem(cart, item);
    res.status(201).send("Item adicionado!");
});

app.post("/cart/delete", (req, res) => {
    const { name } = req.body
    cartService.deleteItem(cart, name);
    res.status(200).send("Item deletado!");
})

app.post("/cart/remove", (req, res) => {
    const { name } = req.body
    const item = cart.find((item) => item.name === name);
    if (item) {
        cartService.removeItem(cart, item);
        res.status(200).send("Item removido!");
    } else {
        res.status(404).send("Item não encontrado!");
    }
}
)
app.listen(4000, () => console.log("API rodando em http://localhost:4000"));