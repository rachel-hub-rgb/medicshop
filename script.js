function addItem() {

    let name = document.getElementById("itemName").value;

    let qty = document.getElementById("itemQty").value;

    let inventory = document.getElementById("inventoryList");

    let itemDiv = document.createElement("div");

    itemDiv.classList.add("item");

    if(qty <= 5){
        itemDiv.innerHTML =
        `<b>${name}</b> - ${qty} LEFT ⚠️`;
    }

    else{
        itemDiv.innerHTML =
        `<b>${name}</b> - ${qty} in stock`;
    }

    inventory.appendChild(itemDiv);
}
