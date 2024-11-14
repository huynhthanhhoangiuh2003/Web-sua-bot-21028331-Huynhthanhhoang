$(document).ready(function () {
  $("#seldvvc").change(function () {
    let dv = $("#seldvvc").val();
    let phiship = dv == "Nhanh" ? 90000 : 50000;
    $("#txtDongia").val(phiship);
  });

  $("#btndathang").click(function () {
    let spDaDat = JSON.parse(localStorage.getItem("spDaDat")) || [];
    if (spDaDat.length > 0) {
      localStorage.removeItem("spDaDat");
      alert("Đã đặt hàng thành công");
      window.location.href = "trangChu.html";
    } else {
      alert("Bạn chưa có sản phẩm nào");
    }
  });
});

let dssp = JSON.parse(localStorage.getItem("dssp"));

function capnhatTien(masp) {
  let spDaDat = JSON.parse(localStorage.getItem("spDaDat")) || [];

  // Lấy input số lượng dựa trên mã sản phẩm
  let inputQuantity = $(`#quantityDatHang[data-masp="${masp}"]`);

  // Lấy thông tin sản phẩm từ danh sách spDaDat
  let sp = spDaDat.find((item) => item.masp == masp);

  // Cập nhật số lượng trong danh sách spDaDat
  sp.quantity = inputQuantity.val();

  // Lưu lại danh sách spDaDat vào Local Storage
  localStorage.setItem("spDaDat", JSON.stringify(spDaDat));

  // Tính lại tổng tiền
  let dv = $("#seldvvc").val();
  let phiship = dv == "Nhanh" ? 90000 : 50000;
  let tongTien = spDaDat.reduce(
    (total, sp) => total + sp.dongia * sp.quantity + phiship,
    0
  );
  // Hiển thị tổng tiền
  $("#tongtien").text(tongTien);
}

function capnhatTienTheoShip() {
  let spDaDat = JSON.parse(localStorage.getItem("spDaDat")) || [];

  // Tính lại tổng tiền
  let dv = $("#seldvvc").val();
  let phiship = dv == "Nhanh" ? 90000 : 50000;
  let tongTien = spDaDat.reduce(
    (total, sp) => total + sp.dongia * sp.quantity + phiship,
    0
  );
  // Hiển thị tổng tiền
  $("#tongtien").text(tongTien);
}

$(document).ready(function () {
  // Lấy danh sách sản phẩm đã đặt mua từ Local Storage
  let spDaDat = JSON.parse(localStorage.getItem("spDaDat")) || [];

  // Hiển thị thông tin của từng sản phẩm đã đặt mua
  spDaDat.forEach((sp) => {
    // Tạo một dòng trong bảng
    let row = $("<tr>");

    // Thêm tên sản phẩm vào dòng
    row.append($("<td>").text(sp.tensp));

    // Thêm ô số lượng với input type number mặc định là 1
    row.append(
      $("<td>")
        .html(`<input class="form-control" type="number" onchange="capnhatTien('${sp.masp}')" id="quantityDatHang" name="quantity"
      class="px-2 text-center form-control input-number" value="${sp.quantity}" min="1" max="20" data-masp="${sp.masp}">`)
    );

    // Thêm đơn giá vào dòng
    row.append($("<td>").text(sp.dongia));

    // Thêm dòng vào tbody
    $("#tableBody").append(row);
  });

  // Tính tổng tiền
  let dv = $("#seldvvc").val();
  let phiship = dv == "Nhanh" ? 90000 : 50000;
  let tongTien = spDaDat.reduce(
    (total, sp) => total + sp.dongia * sp.quantity + phiship,
    0
  );

  // Hiển thị tổng tiền
  $("#tongtien").text(tongTien);
});
