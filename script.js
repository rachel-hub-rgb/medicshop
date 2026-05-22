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
    document.getElementById("itemQty").value;

    if(name === "" || category === "" || qty === ""){

        alert("Please fill all fields");

        return;
    }

    let item = {
        name: name,
        category: category,
        qty: qty
    };

    saveItem(item);

    displayItem(item);

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

        <p><b>Quantity:</b> ${item.qty}</p>

        <p>${stockStatus}</p>

        <div class="item-buttons">

            <button
            class="delete-btn"
            onclick="deleteItem(this, '${item.name}')">
                Delete
            </button>

            <button
            class="edit-btn"
            onclick="editItem('${item.name}')">
                Edit
            </button>

        </div>
    `;

    inventory.appendChild(itemDiv);

    totalItems++;

    updateTotalItems();
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

    button.parentElement.parentElement.remove();

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

    totalItems--;

    updateTotalItems();
}

function editItem(itemName){

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    let item =
    items.find(item => item.name === itemName);

    let newQty =
    prompt(
        `Enter new quantity for ${item.name}:`,
        item.qty
    );

    if(newQty === null || newQty === ""){
        return;
    }

    item.qty = newQty;

    localStorage.setItem(
        "inventory",
        JSON.stringify(items)
    );

    location.reload();
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
