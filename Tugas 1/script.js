function increment(inputId, productName, productImageSrc, productPrice) {
    const inputElement = document.getElementById(inputId);
    inputElement.value = parseInt(inputElement.value) + 1;

    // Menghitung total harga
    var totalHargaElement = document.getElementById("total-harga");
    var currentTotal = parseInt(
        totalHargaElement.textContent.replace("Rp ", "")
    );
    var newTotal = currentTotal + productPrice;
    totalHargaElement.textContent = "Rp " + newTotal;

    // Menghitung pajak (11% dari total harga)
    var pajak = 0.11 * newTotal;
    var pajakElement = document.getElementById("pajak");
    pajakElement.textContent = "Rp " + pajak.toFixed(2);

    // Menghitung total bayar (total harga + pajak)
    var totalBayar = newTotal + pajak;
    var totalBayarElement = document.getElementById("total-bayar");
    totalBayarElement.textContent = "Rp " + totalBayar.toFixed(2);

    if (inputElement.value > 0) {
        // Membuat elemen-elemen untuk informasi barang
        var itemName = document.createElement("h4");
        itemName.textContent = productName;

        var itemImage = document.createElement("img");
        itemImage.src = productImageSrc;
        itemImage.alt = productName;

        var itemPrice = document.createElement("h5");
        itemPrice.textContent = "Rp " + productPrice;

        // Membuat elemen utama untuk item dalam keranjang
        var listItem = document.createElement("li");

        // Menambahkan elemen-elemen informasi barang ke dalam elemen utama
        listItem.appendChild(itemName);
        listItem.appendChild(itemImage);
        listItem.appendChild(itemPrice);

        // Menambahkan atribut data-product-name
        listItem.setAttribute("data-product-name", productName);

        // Menambahkan item ke dalam daftar keranjang
        var cartList = document.querySelector(".cart ul");
        cartList.appendChild(listItem);
    }
}


function decrement(inputId, productName, productPrice) {
    const inputElement = document.getElementById(inputId);
    var newQuantity = parseInt(inputElement.value) - 1;

    if (newQuantity < 0) {
        newQuantity = 0;
    }

    inputElement.value = newQuantity;

    // Mengurangi item dari keranjang
    var cartList = document.querySelector(".cart ul");
    var cartItems = cartList.getElementsByTagName("li");
    for (var i = 0; i < cartItems.length; i++) {
        var itemName = cartItems[i].getAttribute("data-product-name");
        if (itemName === productName) {
            var itemPrice = parseInt(cartItems[i].textContent.match(/\d+/)[0]); // Mengambil harga dari teks

            if (newQuantity > 0) {
                // Jika masih ada kuantitas yang tersisa, perbarui teks item di keranjang
                cartItems[i].textContent = productName + " - Rp " + itemPrice + " x " + newQuantity;
            } else {
                // Jika kuantitas mencapai 0, hapus item dari keranjang
                cartList.removeChild(cartItems[i]);
            }

            // Memperbarui total harga hanya jika kuantitas > 0
            var totalPriceElement = document.getElementById("total-harga");
            var currentTotal = parseInt(totalPriceElement.textContent.replace("Rp ", ""));
            if (newQuantity > 0) {
                var newTotal = currentTotal - productPrice;
                totalPriceElement.textContent = "Rp " + newTotal;
            } else {
                totalPriceElement.textContent = "Rp 0"; // Menghindari total harga menjadi minus
            }

            // Memperbarui pajak dan total bayar
            var pajakElement = document.getElementById("pajak");
            var currentPajak = parseFloat(pajakElement.textContent.replace("Rp ", ""));
            var newPajak = 0.11 * newTotal;
            pajakElement.textContent = "Rp " + newPajak.toFixed(2);

            var totalBayarElement = document.getElementById("total-bayar");
            var currentTotalBayar = parseFloat(totalBayarElement.textContent.replace("Rp ", ""));
            var newTotalBayar = newTotal + newPajak;
            totalBayarElement.textContent = "Rp " + newTotalBayar.toFixed(2);

            break; // Keluar dari loop setelah menemukan item yang sesuai
        }
    }

    // Memeriksa apakah keranjang kosong, kemudian mengatur ulang pajak dan total bayar jika perlu
    if (cartList.childElementCount === 0) {
        var pajakElement = document.getElementById("pajak");
        pajakElement.textContent = "Rp 0";

        var totalBayarElement = document.getElementById("total-bayar");
        totalBayarElement.textContent = "Rp 0";
    }
}


  
  
  function checkout() {
    // Mengosongkan keranjang
    var cartList = document.querySelector(".cart ul");
    cartList.innerHTML = "";

    // Mengatur ulang total harga ke "Rp 0"
    var totalPriceElement = document.getElementById("total-harga");
    totalPriceElement.textContent = "Rp 0";

    // Mengatur ulang pajak ke "Rp 0"
    var pajakElement = document.getElementById("pajak");
    pajakElement.textContent = "Rp 0";

    // Mengatur ulang total bayar ke "Rp 0"
    var totalBayarElement = document.getElementById("total-bayar");
    totalBayarElement.textContent = "Rp 0";

    // Mengatur ulang jumlah produk dalam input menjadi 0
    var inputElements = document.querySelectorAll(".jumlahBarang");
    inputElements.forEach(function(inputElement) {
        inputElement.value = 0;
    });
}
