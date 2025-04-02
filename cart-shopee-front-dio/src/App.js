import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]); // Estado para armazenar o carrinho
  const [total, setTotal] = useState(0.00);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:4000/cart");
      const cart = response.data;

      // Calcula o total diretamente após buscar o carrinho
      const result = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      setTotal(result.toFixed(2));

      setCart(cart); // Atualiza o estado do carrinho
    } catch (error) {
      console.error("Erro ao carregar o carrinho:", error);
    }
  };

  const handleAddItem = async (item) => {
    try {
      await axios.post("http://localhost:4000/cart/add", item);
      await fetchCart(); // Recarrega o carrinho após adicionar o item
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  const handleRemoveItem = async (itemName) => {
    try {
      await axios.post("http://localhost:4000/cart/remove", { name: itemName });
      await fetchCart(); // Recarrega o carrinho após remover o item
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  // Carrega o carrinho ao montar o componente
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="flex w-1/2 h-1/2 justify-center items-center flex-col gap-4">
          <h1 className="font-bold text-xl">🎁 Items</h1>
          <div className="flex justify-center items-center gap-10">
            <div className="p-2 border-2 border-gray-300 rounded-lg"> 
              <h2>Banana</h2>
              <p>Price: R$9.99</p>
              <button onClick={() => handleAddItem({
                name: "Banana",
                price: 9.99,
                quantity: 1,
              })}>Add to Cart</button>
            </div>
            <div className="p-2 border-2 border-gray-300 rounded-lg">
              <h2>Abacaxi</h2>
              <p>Price: R$29.99</p>
              <button onClick={() => handleAddItem({
                name: "Abacaxi",
                price: 29.99,
                quantity: 1,
              })}>Add to Cart</button>
            </div>
          </div>
      </div>
          <div className="flex w-1/2 h-1/2 justify-center items-center flex-col gap-4">
          <h1 className="font-bold text-xl">🛒 Shopee Cart</h1>
          <ul className="flex flex-col gap-2 items-center justify-center">
            {cart.map((item, index) => (
              <li className="flex items-center justify-center gap-4"key={index}>
                {item.name} - R${item.price} x {item.quantity} = R${(item.price * item.quantity).toFixed(2)}
                <button className="p-2 border-2 border-gray-300"onClick={() => handleRemoveItem(item.name)}>Remover</button>
              </li>
            ))}
          </ul>
          <h1>Total: R${total}</h1>
      </div>
    </div>
  );
}

export default App;
