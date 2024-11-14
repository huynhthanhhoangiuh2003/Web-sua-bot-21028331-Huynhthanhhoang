$(document).ready(function () {
  // Lấy danh sách sản phẩm từ localStorage
  let dssp = JSON.parse(localStorage.getItem("dssp"));

  // Lấy mã sản phẩm được chọn từ localStorage
  let masp = localStorage.getItem("masp");

  // Tìm sản phẩm trong danh sách dựa trên mã sản phẩm
  let temp = dssp.find((sp) => sp.masp == masp);

  // Hiển thị thông tin sản phẩm trên giao diện
  $("#tensp").html(temp.tensp);
  $("#dongia").html(temp.dongia);
  $("#mota").html(temp.mota);

  // Hàm này để hiển thị hình ảnh sản phẩm, nhưng có vẻ có lỗi
  function napSP(sp) {
    let temp = "<img src='" + sp.hinhanh + "' alt=''>";
    $("#ha").html(temp);
  }

  // Duyệt qua danh sách sản phẩm và gọi hàm napSP, nhưng có vẻ có lỗi
  $(document).ready(function () {
    dssp.forEach((sp) => {
      // Lưu ý: Hàm napSP được gọi với biến temp, không phải với sp
      napSP(temp);
    });
  });
});

function datHang() {
  // Lấy masp từ Local Storage
  let masp = localStorage.getItem("masp");
  
  // Lấy danh sách sản phẩm đã đặt mua từ Local Storage
  let spDaDat = localStorage.getItem("spDaDat") || "[]";
  let spDaDatTemp = JSON.parse(spDaDat);
  
  // Lấy thông tin sản phẩm từ danh sách dssp
  let temp = dssp.find((sp) => sp.masp == masp);
  
  // Tìm kiếm sản phẩm có masp trong danh sách spDaDatTemp
  let dataTemp = spDaDatTemp.find((sp) => sp.masp == masp);
  
  // Nếu không tìm thấy, thêm sản phẩm mới vào danh sách
  if (dataTemp === undefined) {
    spDaDatTemp.push({ ...temp, quantity: 1 });
  } else {
    // Nếu tìm thấy, tăng quantity lên 1
    for (let i = 0; i < spDaDatTemp.length; i++) {
      if (spDaDatTemp[i].masp == masp) {
        spDaDatTemp[i].quantity += 1;
        break; // Dừng vòng lặp khi đã tăng quantity
      }
    }
  }
  
  // Lưu lại danh sách spDaDatTemp vào Local Storage
  localStorage.setItem("spDaDat", JSON.stringify(spDaDatTemp));

  // Chuyển hướng đến trang đặt hàng
  window.location.href = "dathang.html";
}
