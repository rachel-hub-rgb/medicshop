let totalSales = 0;

window.onload = function(){

    refreshInventory();
    loadSales();
};

function addItem(){

    let name =
    document.getElementById("itemName").value;

    let category =
    document.getElementById("itemCategory").value;

    let qty =
    parseInt(document.getElementById("itemQty").value);

    let price =
    parseFloat(document.getElementById("itemPrice").value);

    if(!name || !category || !qty || !price){

        alert("Fill all fields");

        return;
    }

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    let existing =
    items.find(item => item.name === name);

    if(existing){

        existing.qty += qty;
    }

    else{

        items.push({
            name,
            category,
            qty,
            price
        });
    }

    localStorage.setItem(
        "inventory",
        JSON.stringify(items)
    );

    refreshInventory();

    clearInputs();
}

function refreshInventory(){

    let inventory =
    document.getElementById("inventoryList");

    inventory.innerHTML = "";

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    let totalStock = 0;

    document.getElementById("totalItems")
    .innerText = items.length;

    items.forEach(item => {

        totalStock += item.qty;

        displayItem(item);
    });

    document.getElementById("totalStock")
    .innerText = totalStock;
}

function displayItem(item){

    let inventory =
    document.getElementById("inventoryList");

    let div =
    document.createElement("div");

    div.classList.add("item");

    if(item.qty <= 5){

        div.classList.add("low");
    }

    else{

        div.classList.add("high");
    }

    div.innerHTML = `

        <h3>${item.name}</h3>

        <p><b>Category:</b>
        ${item.category}</p>

        <p><b>Stock:</b>
        ${item.qty}</p>

        <p><b>Price:</b>
        ₹${item.price}</p>

        <div class="item-buttons">

            <button
            onclick="sellItem('${item.name}')">
                Sell
            </button>

            <button
            class="edit-btn"
            onclick="addStock('${item.name}')">
                Add Stock
            </button>

            <button
            class="delete-btn"
            onclick="deleteItem('${item.name}')">
                Delete
            </button>

        </div>
    `;

    inventory.appendChild(div);
}

function sellItem(itemName){

    let qty =
    parseInt(prompt("Quantity sold:"));

    if(!qty || qty <= 0){

        return;
    }

    let items =
    JSON.parse(localStorage.getItem("inventory"))
    || [];

    let item =
    items.find(item => item.name === itemName);

    if(qty > item.qty){

        alert("Not enough stock");

        return;
    }

    item.qty -= qty;

    let bill =
    qty * item.price;

    saveSale({
        item:item.name,
        qty,
        bill
    });

    localStorage.setItem(
        "inventory",
        JSON.stringify(items)
    );

    refreshInventory();

    loadSales();

    alert(
        `Bill Generated

Item: ${item.name}

Quantity: ${qty}

Total: ₹${bill}`
    );
}

function addStock(itemName){

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

    items =
    items.filter(item => item.name !== itemName);

    localStorage.setItem(
        "inventory",
        JSON.stringify(items)
    );

    refreshInventory();
}

function saveSale(sale){

    let sales =
    JSON.parse(localStorage.getItem("sales"))
    || [];

    sales.push(sale);

    localStorage.setItem(
        "sales",
        JSON.stringify(sales)
    );
}

function loadSales(){

    let sales =
    JSON.parse(localStorage.getItem("sales"))
    || [];

    let history =
    document.getElementById("salesHistory");

    history.innerHTML = "";

    totalSales = 0;

    let labels = [];

    let data = [];

    sales.forEach((sale,index) => {

        let div =
        document.createElement("div");

        div.classList.add("sale-card");

        div.innerHTML = `

            <p>
            Sold ${sale.qty}
            x ${sale.item}
            = ₹${sale.bill}
            </p>
        `;

        history.appendChild(div);

        totalSales += sale.bill;

        labels.push(`Sale ${index+1}`);

        data.push(sale.bill);
    });

    document.getElementById("totalSales")
    .innerText = `₹${totalSales}`;

    createChart(labels,data);
}

function createChart(labels,data){

    let ctx =
    document.getElementById("salesChart");

    if(window.salesChartInstance){

        window.salesChartInstance.destroy();
    }

    window.salesChartInstance =
    new Chart(ctx,{

        type:"bar",

        data:{

            labels:labels,

            datasets:[{

                label:"Sales Revenue",

                data:data,

                borderWidth:1
            }]
        },

        options:{

            responsive:true,

            scales:{

                y:{
                    beginAtZero:true
                }
            }
        }
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

function clearInputs(){

    document.getElementById("itemName").value="";

    document.getElementById("itemCategory").value="";

    document.getElementById("itemQty").value="";

    document.getElementById("itemPrice").value="";
}
