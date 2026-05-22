let totalItems = 0;

function addItem() {

    let name = document.getElementById("itemName").value;

    let qty = document.getElementById("itemQty").value;

    if(name === "" || qty === ""){
        alert("Please fill all fields");
        return;
    }

    let inventory = document.getElementById("inventoryList");

    let itemDiv = document.createElement("div");

    itemDiv.classList.add("item");

    let stockStatus = "";

    if(qty <= 5){
        stockStatus = "Low Stock ⚠️";
        itemDiv.classList.add("low");
    }

    else{
        stockStatus = "In Stock ✅";
    }

    itemDiv.innerHTML = `
        <h3>${name}</h3>
        <p>Quantity: ${qty}</p>
        <p>${stockStatus}</p>

        <button onclick="deleteItem(this)">
            Delete
        </button>
    `;

    inventory.appendChild(itemDiv);

    totalItems++;

    document.getElementById("totalItems")
    .innerText = totalItems;

    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
}

function deleteItem(button){

    button.parentElement.remove();

    totalItems--;

    document.getElementById("totalItems")
    .innerText = totalItems;
}
