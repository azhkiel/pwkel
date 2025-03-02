document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("orderForm");
    const dataList = document.getElementById("orderList");
    const menuList = document.getElementById("menuList");
    const menuSelect = document.getElementById("menuItem");
    const ctx = document.getElementById("menuChart").getContext("2d");
    let orders = [];
    let menuCounts = {};
    let menuChart;
    let editIndex = -1;

    const menuItems = [
        { name: "Mie Ayam Original", price: 15000 },
        { name: "Mie Ayam Bakso", price: 20000 },
        { name: "Mie Ayam Spesial", price: 25000 },
        { name: "Mie Ayam Komplit", price: 30000 },
        { name: "Es Teh", price: 5000 },
        { name: "Es Jeruk", price: 7000 }
    ];

    function displayMenu() {
        menuList.innerHTML = "";
        menuSelect.innerHTML = "<option value='' disabled selected>Pilih menu...</option>";
        menuItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - Rp ${item.price}`;
            menuList.appendChild(li);
            
            const option = document.createElement("option");
            option.value = item.name;
            option.textContent = item.name;
            menuSelect.appendChild(option);
        });
    }

    function initializeChart() {
        menuChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: [],
                datasets: [{
                    label: "Jumlah Terjual",
                    data: [],
                    backgroundColor: "#ffffff",
                }],
            },
        });
    }

    function updateChart() {
        menuChart.data.labels = Object.keys(menuCounts);
        menuChart.data.datasets[0].data = Object.values(menuCounts);
        menuChart.update();
    }

    function renderTable() {
        dataList.innerHTML = "";
        menuCounts = {};
        let totalHarga = 0;

        orders.forEach((order, index) => {
            const subtotal = order.price * order.quantity;
            totalHarga += subtotal;
            menuCounts[order.item] = (menuCounts[order.item] || 0) + order.quantity;
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.item}</td>
                <td>${order.quantity}</td>
                <td>Rp ${subtotal}</td>
                <td>
                    <button onclick="editOrder(${index})">Edit</button>
                    <button onclick="deleteOrder(${index})">Hapus</button>
                </td>
            `;
            dataList.appendChild(row);
        });
        
        const totalRow = document.createElement("tr");
        totalRow.innerHTML = `
            <td colspan="2"><b>Total</b></td>
            <td><b>Rp ${totalHarga}</b></td>
            <td></td>
        `;
        dataList.appendChild(totalRow);
        
        updateChart();
    }

    function addOrder(item, quantity) {
        const menuItem = menuItems.find(menu => menu.name === item);
        if (menuItem && quantity > 0) {
            if (editIndex === -1) {
                orders.push({ item, quantity, price: menuItem.price });
            } else {
                orders[editIndex] = { item, quantity, price: menuItem.price };
                editIndex = -1;
            }
            renderTable();
            form.reset();
        }
    }

    function editOrder(index) {
        const order = orders[index];
        document.getElementById("menuItem").value = order.item;
        document.getElementById("quantity").value = order.quantity;
        editIndex = index;
    }

    function deleteOrder(index) {
        orders.splice(index, 1);
        renderTable();
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const item = document.getElementById("menuItem").value;
        const quantity = parseInt(document.getElementById("quantity").value);
        addOrder(item, quantity);
    });

    window.deleteOrder = deleteOrder;
    window.editOrder = editOrder;
    displayMenu();
    initializeChart();
});
