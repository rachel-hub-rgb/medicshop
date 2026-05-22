let totalItems = 0;

window.onload = function () {
    loadItems();
};

function addItem() {

    let name =
    document.getElementById("itemName").value;

    let category =
    document.getElementById("itemCategory").value;

    let qty =
    parseInt(
        document.getElementById("itemQty").value
    );

    if(name === "" || category === "" || !qty){

        alert("Please fill all fields");

        return;
    }

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    let existingItem =
    items.find(item => item.name === name);

    if(existingItem){

        existingItem.qty += qty;
    }

    else{

        let item = {
            name: name,
            category: category,
            qty: qty
        };

        items.push(item);
    }

    localStorage.setItem(
        "inventory",
        JSON.stringify(items)
    );

    refreshInventory();

    clearInputs();
}

function displayItem(item){

    let inventory =
    document.getElementById("inventoryList");

    let itemDiv =
    document.createElement("div");

    itemDiv.classList.add("item");

    let stockStatus = "";

    if(item.qty <= 5){

        stockStatus = "Low Stock ⚠️";

        itemDiv.classList.add("low");
    }

    else{

        stockStatus = "In Stock ✅";

        itemDiv.classList.add("high");
    }

    itemDiv.innerHTML = `

        <h3>${item.name}</h3>

        <p><b>Category:</b> ${item.category}</p>

        <p><b>Quantity:</b>
        <span id="qty-${item.name}">
        ${item.qty}
        </span>
        </p>

        <p>${stockStatus}</p>

        <div class="item-buttons">

            <button
            onclick="sellItem('${item.name}')">
                Sell 1
            </button>

            <button
            class="edit-btn"
            onclick="addMore('${item.name}')">
                Add Stock
            </button>

            <button
            class="delete-btn"
            onclick="deleteItem('${item.name}')">
                Delete
            </button>

        </div>
    `;

    inventory.appendChild(itemDiv);

    totalItems++;

    updateTotalItems();
}

function sellItem(itemName){

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    let item =
    items.find(item => item.name === itemName);

    if(item.qty > 0){

        item.qty -= 1;
    }

    localStorage.setItem(
        "inventory",
        JSON.stringify(items)
    );

    refreshInventory();
}

function addMore(itemName){

    let amount =
    parseInt(prompt("Add quantity:"));

    if(!amount){
        return;
    }

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    let item =
    items.find(item => item.name === itemName);

    item.qty += amount;

    localStorage.setItem(
        "inventory",
        JSON.stringify(items)
    );

    refreshInventory();
}

function deleteItem(itemName){

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

    refreshInventory();
}

function loadItems(){

    refreshInventory();
}

function refreshInventory(){

    document.getElementById(
        "inventoryList"
    ).innerHTML = "";

    totalItems = 0;

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    items.forEach(item => {

        displayItem(item);
    });
}

function searchItem(){

    let input =
    document.getElementById("searchInput")
    .value.toLowerCase();

    let items =
    document.querySelectorAll(".item");

    items.forEach(item => {

        let text =
        item.innerText.toLowerCase();

        if(text.includes(input)){

            item.style.display = "block";
        }

        else{

            item.style.display = "none";
        }
    });
}

function updateTotalItems(){

    document.getElementById("totalItems")
    .innerText = totalItems;
}

function clearInputs(){

    document.getElementById("itemName").value = "";

    document.getElementById("itemCategory").value = "";

    document.getElementById("itemQty").value = "";
}
