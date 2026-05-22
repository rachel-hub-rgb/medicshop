let totalItems = 0;

window.onload = function () {
    loadItems();
};

function addItem() {

    let name = document.getElementById("itemName").value;

    let qty = document.getElementById("itemQty").value;

    if(name === "" || qty === ""){
        alert("Please fill all fields");
        return;
    }

    let item = {
        name: name,
        qty: qty
    };

    saveItem(item);

    displayItem(item);

    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
}

function displayItem(item){

    let inventory = document.getElementById("inventoryList");

    let itemDiv = document.createElement("div");

    itemDiv.classList.add("item");

    let stockStatus = "";

    if(item.qty <= 5){
        stockStatus = "Low Stock ⚠️";
        itemDiv.classList.add("low");
    }

    else{
        stockStatus = "In Stock ✅";
    }

    itemDiv.innerHTML = `
        <h3>${item.name}</h3>

        <p>Quantity: ${item.qty}</p>

        <p>${stockStatus}</p>

        <button onclick="deleteItem(this, '${item.name}')">
            Delete
        </button>
    `;

    inventory.appendChild(itemDiv);

    totalItems++;

    document.getElementById("totalItems")
    .innerText = totalItems;
}

function saveItem(item){

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    items.push(item);

    localStorage.setItem(
        "inventory",
        JSON.stringify(items)
    );
}

function loadItems(){

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    items.forEach(item => {
        displayItem(item);
    });
}

function deleteItem(button, itemName){

    button.parentElement.remove();

    totalItems--;

    document.getElementById("totalItems")
    .innerText = totalItems;

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    items = items.filter(
        item => item.name !== itemName
    );

    localStorage.setItem(
        "inventory",
        JSON.stringify(items)
    );
}
