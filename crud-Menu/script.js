let pesanan = [];
let idEdit = null;

function renderPesanan() {
    const pesananList = document.getElementById("pesananList");
    pesananList.innerHTML = "";

    pesanan.forEach((item, index) => {
        pesananList.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nama}</td>
                <td>Rp ${item.harga}</td>
                <td>
                    <button class="edit" onclick="editPesanan(${index})">Edit</button>
                    <button onclick="hapusPesanan(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

function tambahPesanan() {
    const namaMakanan = document.getElementById("namaMakanan").value;
    const hargaMakanan = document.getElementById("hargaMakanan").value;

    if (namaMakanan.trim() === "" || hargaMakanan.trim() === "") {
        alert("Mohon isi semua field!");
        return;
    }

    if (idEdit === null) {
        pesanan.push({ nama: namaMakanan, harga: hargaMakanan });
    } else {
        pesanan[idEdit] = { nama: namaMakanan, harga: hargaMakanan };
        idEdit = null;
    }

    document.getElementById("namaMakanan").value = "";
    document.getElementById("hargaMakanan").value = "";
    
    renderPesanan();
}

function editPesanan(index) {
    document.getElementById("namaMakanan").value = pesanan[index].nama;
    document.getElementById("hargaMakanan").value = pesanan[index].harga;
    idEdit = index;
}

function hapusPesanan(index) {
    pesanan.splice(index, 1);
    renderPesanan();
}

renderPesanan();
