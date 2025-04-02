// Quais ações meu carrinho pode fazer.


// Casos de Uso :

// Adicionar item.
async function addItem(userCart, item) {
    const indexFound = userCart.findIndex((p) => p.name === item.name)
    console.log(userCart, item, indexFound)
    if (indexFound > 0) {
        userCart.push(item)
        return
    }

    userCart[indexFound].quantity += item.quantity
}

// Calcular total de valor
async function calcTotal(userCart) {
    console.log("\nShopee cart total is:")
    const result = (userCart.reduce((total, item) => total + item.subtotal(), 0))
    console.log(`R$ ${result.toFixed(2)}`)
}

// Deletar item.
async function deleteItem(userCart, nameItem) {
    const index = userCart.findIndex((item) => item.name === nameItem)
    
    if (index !== -1) {
        userCart.splice(index, 1)
    }
}

// Remover quantidade de items.
async function removeItem(userCart, item) {
    const indexFound = userCart.findIndex((p) => p.name === item.name)

    if (indexFound === -1) {
        console.log("Item nao encontrado.")
        return
    }

    if (userCart[indexFound].quantity > 1) {
        userCart[indexFound].quantity -= 1
    }

    if (userCart[indexFound].quantity === 1) {
        userCart.splice(indexFound, 1)
    }
}

async function displayCart(userCart) {
    console.log("Shopee cart list:")
    userCart.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - R$${item.price} | ${item.quantity} | Sub-total = R$${item.subtotal()}`)
    })
    
}

export {
    addItem,
    calcTotal,
    deleteItem,
    removeItem,
    displayCart
}