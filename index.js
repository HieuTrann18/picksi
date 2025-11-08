function openSwapDetailsDemo() {
  const existingPopup = document.getElementById("swapDetailsPopup");
  if (existingPopup) existingPopup.remove();
  const popup = document.createElement("div");
  popup.id = "swapDetailsPopup";
  popup.className =
    "position-fixed top-50 start-50 translate-middle bg-white shadow-lg rounded p-4";
  popup.style.width = "450px";
  popup.style.zIndex = 2000;

  popup.innerHTML = `
              <h5 class="mb-3">Yêu cầu swap mới</h5>
              <p class="mb-2"><strong>Ai đó</strong> muốn trao đổi sản phẩm với bạn</p>
              <div class="d-flex gap-2 mb-3">
                <div class="text-center" style="flex:1;">
                  <p class="mb-1">Sản phẩm họ muốn</p>
                  <img src="./assets/images/Men/IMG_3192.JPG" alt="Sản phẩm họ muốn" class="img-fluid rounded">
                  <p>40C$</p>
                </div>
                <div class="text-center" style="flex:1;">
                  <p class="mb-1">Sản phẩm của bạn</p>
                  <img src="./assets/images/Men/IMG_3219.JPG" alt="Sản phẩm của bạn" class="img-fluid rounded">
                  <p>40C$</p>
                </div>
              </div>
              <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-success btn-sm" onclick="acceptSwapDemo()">Chấp nhận</button>
                <button class="btn btn-danger btn-sm" onclick="declineSwapDemo()">Từ chối</button>
              </div>
              <button style="position:absolute; top:5px; right:10px; border:none; background:none; font-size:1.2rem; cursor:pointer;" onclick="closeSwapPopupDemo()">&times;</button>
            `;
  document.body.appendChild(popup);
}

function closeSwapPopupDemo() {
  const popup = document.getElementById("swapDetailsPopup");
  if (popup) popup.remove();
}

function acceptSwapDemo() {
  alert("Bạn đã chấp nhận swap!");
  closeSwapPopupDemo();
}
function declineSwapDemo() {
  alert("Bạn đã từ chối swap!");
  closeSwapPopupDemo();
}

const notificationWrapper = document.getElementById("notificationWrapper");
const notificationPopup = document.getElementById("notificationPopup");
const closeNotification = document.getElementById("closeNotification");
const notificationBadge = document.getElementById("notificationBadge");

notificationWrapper.addEventListener("click", () => {
  if (
    notificationPopup.style.display === "none" ||
    notificationPopup.style.display === ""
  ) {
    notificationPopup.style.display = "block";
    notificationBadge.classList.add("d-none");
    notificationPopup.style.display = "none";
  }
});

closeNotification.addEventListener("click", (e) => {
  e.stopPropagation();
  notificationPopup.style.display = "none";
});

// State Management
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("cart", cart);
let currentPage = "home";

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateUserInterface();
  loadFeaturedProducts();
  updateCartBadge();

  // Top up amount calculation
  document.getElementById("topUpAmount").addEventListener("input", function () {
    const vndAmount = parseInt(this.value) || 0;
    const cAmount = vndAmount * 0.001;
    document.getElementById("convertedAmount").value =
      cAmount.toFixed(1) + " $C";
  });
});

// User Management
function updateUserInterface() {
  const userSection = document.getElementById("userSection");
  const guestSection = document.getElementById("guestSection");

  if (currentUser) {
    document.getElementById("username").textContent = currentUser.username;
    document.getElementById("balance").textContent = currentUser.balance || 0;
    userSection.classList.remove("d-none");
    userSection.classList.add("d-flex");
    guestSection.classList.add("d-none");
  } else {
    userSection.classList.add("d-none");
    userSection.classList.remove("d-flex");
    guestSection.classList.remove("d-none");
  }
}

function showLogin() {
  showPage(
    "login",
    `
                <div class="row justify-content-center">
                    <div class="col-md-12 py-5">
                        <div class="card shadow m-auto">
                            <div class=" text-warning text-center">
                                <h4 class="mb-0 p-4">Đăng Nhập Picksi</h4>
                            </div>
                            <div class="card-body">
                                <form id="loginForm">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="loginUsername" placeholder="Email hoặc số điện thoại" required>
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" class="form-control" id="loginPassword" placeholder="Mật khẩu" required>
                                    </div>
                                    <button type="submit" class="btn btn-warning w-100">Đăng Nhập</button>
                                </form>
                                <div class="text-center mt-3">
                                    <p>Chưa có tài khoản? <a href="#" onclick="showRegister()" class="text-warning">Đăng ký ngay</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
  );

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Mock login - in real app, validate against backend
    currentUser = {
      username: username,
      balance: 100, // Demo balance
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    updateUserInterface();
    showToast("Đăng nhập thành công!");
    showHome();
  });
}

function showRegister() {
  showPage(
    "register",
    `
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-12 py-5">
                        <div class="card shadow m-auto">
                            <div class=" text-warning">
                                <h4 class="mb-0 p-4"> Đăng Ký Picksi</h4>
                            </div>
                            <div class="card-body">
                                <form id="registerForm">
                                    <div class="mb-3">
                                        <label class="form-label">Họ và tên</label>
                                        <input type="text" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Email</label>
                                        <input type="email" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Tên đăng nhập</label>
                                        <input type="text" class="form-control" id="regUsername" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Mật khẩu</label>
                                        <input type="password" class="form-control" required>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Xác nhận mật khẩu</label>
                                        <input type="password" class="form-control" required>
                                    </div>
                                    <button type="submit" class="btn btn-warning w-100">Đăng Ký</button>
                                </form>
                                <div class="text-center mt-3">
                                    <p>Đã có tài khoản? <a href="#" onclick="showLogin()" class="text-warning">Đăng nhập</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
  );

  document
    .getElementById("registerForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("regUsername").value;

      currentUser = {
        username: username,
        balance: 50, // Welcome bonus
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      updateUserInterface();
      showToast("Đăng ký thành công! Chào mừng bạn đến với Picksi!");
      showHome();
    });
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  updateUserInterface();
  showToast("Đã đăng xuất thành công!");
  showHome();
}

// Page Navigation
function showHome() {
  document.getElementById("homePage").classList.remove("d-none");
  document.getElementById("otherPages").classList.add("d-none");
  currentPage = "home";
}

function showPage(page, content) {
  document.getElementById("homePage").classList.add("d-none");
  document.getElementById("otherPages").classList.remove("d-none");
  document.getElementById("pageContent").innerHTML = content;
  currentPage = page;
}

// Product Functions
function loadFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  const featured = [
    ...mockProducts.men.slice(0, 2),
    ...mockProducts.women.slice(0, 2),
  ];

  container.innerHTML = featured
    .map(
      (product) => `
                <div class="col-md-6 col-lg-3">
                    <div class="product-card" onclick="showProductDetail(${product.id})">
                        <div class="product-image">${product.image}</div>
                        <div class="card-body p-3">
                            <h6 class="card-title">${product.name}</h6>
                            <p class="product-price">${product.price} $C</p>
                            <button class="btn btn-add-cart btn-sm" onclick="event.stopPropagation(); addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            `
    )
    .join("");
}

function showMenProducts() {
  showProductList(
    mockProducts.men,
    "Thời Trang Nam",
    "./assets/images/menbanner.png"
  );
}

function showWomenProducts() {
  showProductList(
    mockProducts.women,
    "Thời Trang Nữ",
    "./assets/images/womenbanner.png"
  );
}

function showProductList(products, title, bannerUrl) {
  const content = `
        <div class="text-center mb-4">
            <img src="${bannerUrl}" 
           
           style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;">
        </div>
        <div class="row px-3">
            ${products
              .map(
                (product) => `
                <div class="col-md-3">
                    <div class="product-card" 
                         onclick="showProductDetail(${product.id})">
                        <div class="product-image position-relative" style="width: 351px; height: 360px; overflow: hidden;">
                            <img src="${product.images[0]}" alt="${product.name}" 
                                 style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div class="card-body py-3">
                            <h6 class="card-title fw-semibold mb-1 text-truncate">${product.name}</h6>
                            <p class="product-price fw-bold mb-0"><span>${product.price}</span><span>$C</span></p>
                        </div>
                    </div>
                </div>
              `
              )
              .join("")}
        </div>
    `;
  showPage("products", content);
}

function showProductDetail(productId) {
  const product = [...mockProducts.men, ...mockProducts.women].find(
    (p) => p.id === productId
  );
  if (!product) return;
  const mainImage = product.images[0];
  const thumbnails = product.images
    .map(
      (img, index) => `
      <div>
           <img src="${img}" alt="${product.name}" style="width: 228px; height: 100%; object-fit:cover;">
      </div>`
    )
    .join("");
  const content = `
        <div class="row">
            <div class="col-md-2 py-4 px-4">
                <div class="d-flex flex-column gap-2">
                 ${thumbnails}
                </div>
            </div>
            <div class="col-md-4 py-4 px-4">
                 <div id="mainProductImage" class="main-product-image" 
                    style="width: 474px; height: 600px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 8rem; background: linear-gradient(45deg, #f8f9fa, #e9ecef); border: 1px solid #ddd;">
                    <img src="${mainImage}" alt="${
    product.name
  }" style="height:100%; max-width:100%; object-fit:cover;">
                </div>
            </div>
            <div class="col-md-6 py-4 px-4">
                <h2>${product.name}</h2>
                <h3 class="product-price mb-4"><span>${
                  product.price
                }</span><span>$C</span></h3>
                <div class="mb-4">
                    <label class="form-label fw-bold">Kích thước:</label>
                    <div class="size-options d-flex gap-2 mt-2">
                        ${["S", "M", "L", "XL"]
                          .map(
                            (size) => `
                            <div class="size-option" data-size="${size}" onclick="selectSize(this)" style="width: 40px; height: 40px; border: 2px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: 600; transition: all 0.3s;">${size}</div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
                <div class="mb-4">
                    <label class="form-label fw-bold">Màu sắc:</label>
                    <div class="color-options d-flex gap-2 mt-2">
                        ${[
                          { color: "black", title: "Đen" },
                          { color: "white", title: "Trắng" },
                          { color: "blue", title: "Xanh" },
                          { color: "red", title: "Đỏ" },
                        ]
                          .map(
                            (c) => `
                            <div class="color-option" data-color="${
                              c.color
                            }" onclick="selectColor(this)" style="width: 40px; height: 40px; background: ${
                              c.color === "white" ? "#fff" : c.color
                            }; border: 2px solid #ddd; border-radius: 50%; cursor: pointer; transition: all 0.3s;" title="${
                              c.title
                            }"></div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
                <div class="d-grid gap-2">
                  
                    <button class="btn-buy" onclick="buyNow(${product.id})">
                         Buy now
                    </button>
                    <button class="btn-swap" onclick="showSwapModal(${
                      product.id
                    })">
                         Swap 
                    </button>
                </div>
            </div>
        </div>
    `;
  showPage("detail", content);
}

function addToCart(productId) {
  const product = [...mockProducts.men, ...mockProducts.women].find(
    (p) => p.id === productId
  );
  if (!product) return;
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  showToast(`Đã thêm ${product.name} vào giỏ hàng!`);
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.classList.remove("d-none");
  } else {
    badge.classList.add("d-none");
  }
}

function showCart() {
  if (cart.length === 0) {
    showPage(
      "cart",
      `
                    <div class="text-center py-5">
                        <i class="bi bi-cart-x" style="font-size: 4rem; color: #ccc;"></i>
                        <h3 class="mt-3">Giỏ hàng trống</h3>
                        <p class="text-muted">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                        <button class="btn btn-warning" onclick="showHome()">Tiếp tục mua sắm</button>
                    </div>
                `
    );
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const content = `
  <div class="card p-4 py-5" style="max-width: 600px; margin: 0 auto;">
    
    <h4 class="mb-4 text-center">Giỏ Hàng</h4>

    ${cart
      .map(
        (item) => `
      <div class="d-flex align-items-center mb-3 p-2 border rounded">
        <!-- Ảnh sản phẩm -->
        <div style="width: 80px; height: 80px; flex-shrink: 0; margin-right: 15px;">
          <img src="${item.selectedImage || item.images[0]}" 
               alt="${item.name}" 
               class="img-fluid rounded" 
               style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <!-- Thông tin sản phẩm -->
        <div class="flex-grow-1">
          <h6 class="mb-1">${item.name}</h6>
          <p class="mb-1 small text-muted">
            Size: ${item.selectedSize || "M"} | Màu: ${
          item.selectedColor || "Đen"
        }
          </p>
          <strong>${item.price.toFixed(1)} $C</strong>
        </div>
      </div>
    `
      )
      .join("")}
    <hr>
    <!-- Tổng đơn hàng -->
    <div class="d-flex justify-content-between mb-2">
      <span>Tạm tính:</span>
      <span>${total.toFixed(1)} $C</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Phí vận chuyển:</span>
      <span>Miễn phí</span>
    </div>
    <hr>
    <div class="d-flex justify-content-between mb-4">
      <strong>Tổng cộng:</strong>
      <strong class="text-warning">${total.toFixed(1)} $C</strong>
    </div>
    <!-- Nút hành động -->
    <div class="d-flex gap-2">
      <button class="btn btn-secondary flex-grow-1" onclick="showProductList([...mockProducts.men, ...mockProducts.women], 'Sản phẩm')">
        Tiếp tục mua sắm
      </button>
      <button class="btn btn-warning flex-grow-1" onclick="showCheckout()">
        Thanh toán ngay
      </button>
    </div>
  </div>
`;
  showPage("cart", content);
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge();
      showCart(); // Refresh cart display
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  showCart(); // Refresh cart display
}

function buyNow(productId) {
  addToCart(productId);
  showCheckout();
}

function showCheckout() {
  if (!currentUser) {
    showToast("Vui lòng đăng nhập để thanh toán!");
    showLogin();
    return;
  }
  if (cart.length === 0) {
    showToast("Giỏ hàng trống!");
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const content = `
        <div class="px-5 py-5">
             <h2 class="mb-4">Thanh Toán</h2>
                <div class="row">
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="card-header">
                                <h5>Thông Tin Giao Hàng</h5>
                            </div>
                            <div class="card-body">
                                <form id="checkoutForm">
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label">Họ và tên</label>
                                            <input type="text" class="form-control" value="${
                                              currentUser.username
                                            }" required>
                                        </div>
                                        <div class="col-md-6 mb-3">
                                            <label class="form-label">Số điện thoại</label>
                                            <input type="tel" class="form-control" value="0123456789" required>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Địa chỉ giao hàng</label>
                                        <textarea class="form-control" rows="3" required>123 Đường ABC, Quận 1, TP.HCM</textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h5>Đơn Hàng Của Bạn</h5>
                            </div>
                            <div class="card-body">
                                ${cart
                                  .map(
                                    (item) => `
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span>${item.name} x${
                                      item.quantity
                                    }</span>
                                        <span>${(
                                          item.price * item.quantity
                                        ).toFixed(1)} $C</span>
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </div>                   
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header">
                                <h5>Thanh Toán</h5>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between">
                                        <span>Số dư hiện tại:</span>
                                        <span class="text-success">${
                                          currentUser.balance
                                        } $C</span>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <span>Tổng thanh toán:</span>
                                        <span class="text-warning">${total.toFixed(
                                          1
                                        )} $C</span>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <strong>Còn lại:</strong>
                                        <strong class="${
                                          currentUser.balance >= total
                                            ? "text-success"
                                            : "text-danger"
                                        }">
                                            ${(
                                              currentUser.balance - total
                                            ).toFixed(1)} $C
                                        </strong>
                                    </div>
                                </div>
                                
                                ${
                                  currentUser.balance >= total
                                    ? `<button class="btn btn-success w-100" onclick="processPayment()">
                                        <i class="bi bi-check-circle"></i> Xác Nhận Thanh Toán
                                    </button>`
                                    : `<div class="text-center">
                                        <p class="text-danger">Số dư không đủ!</p>
                                        <button class="btn btn-warning w-100" onclick="showTopUpModal()">
                                            <i class="bi bi-plus-circle"></i> Nạp Thêm Tiền
                                        </button>
                                    </div>`
                                }
                            </div>
                        </div>
                    </div>
                </div></div>
            `;
  showPage("checkout", content);
}
function processPayment() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (currentUser.balance >= total) {
    currentUser.balance -= total;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateUserInterface();
    updateCartBadge();
    showToast("Thanh toán thành công! Đơn hàng đang được xử lý.");
    showHome();
  } else {
    showToast("Số dư không đủ để thanh toán!");
  }
}

function showTopUpModal() {
  if (!currentUser) {
    showToast("Vui lòng đăng nhập để nạp tiền!");
    showLogin();
    return;
  }

  const modal = new bootstrap.Modal(document.getElementById("topUpModal"));
  modal.show();
}

function processTopUp() {
  const vndAmount = parseInt(document.getElementById("topUpAmount").value);

  if (!vndAmount || vndAmount < 10000) {
    showToast("Vui lòng nhập số tiền hợp lệ (tối thiểu 10.000 VNĐ)!");
    return;
  }
  const cAmount = vndAmount * 0.001;
  currentUser.balance = parseFloat(currentUser.balance) + cAmount;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  updateUserInterface();
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("topUpModal")
  );
  modal.hide();
  showToast(
    `Nạp thành công ${vndAmount.toLocaleString()} VNĐ = ${cAmount.toFixed(
      1
    )} $C`
  );
  document.getElementById("topUpAmount").value = "";
  document.getElementById("convertedAmount").value = "";
}
function showMyProducts() {
  if (!currentUser) {
    showToast("Vui lòng đăng nhập để xem sản phẩm của bạn!");
    showLogin();
    return;
  }
  const content = `
  <div class="px-4 py-4">
    <h2 class="mb-4 text-center">Sản Phẩm Của Tôi</h2>
  </div>
  <div class="row">
    ${mockUserProducts
      .map(
        (product) => `
        <div class="col-md-3 text-center py-5">
              <!-- Ảnh sản phẩm -->
              <div class="mb-3" style="width: 370px;height: 350px;">
                <img src="${
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "./assets/images/default.jpg"
                }" 
                     alt="${product.name}" 
                     class="img-fluid rounded" 
                     style="height: 100%; object-fit: cover;">
              </div>

              <h6>${product.name}</h6>
              <p class="text-muted small">${product.condition}</p>
              <p class="text-warning">Giá trị: ${product.price} $C</p>

              <button class="btn btn-outline-primary btn-sm" onclick="selectForSwap(${
                product.id
              })">
                <i class="bi bi-arrow-left-right"></i> Chọn để Swap
              </button>
        </div>
      `
      )
      .join("")}
  </div>
`;
  showPage("myproducts", content);
}

function showSwapModal(targetProductId) {
  if (!currentUser) {
    showToast("Vui lòng đăng nhập để swap sản phẩm!");
    showLogin();
    return;
  }
  showMyProducts();
}

function selectForSwap(myProductId) {
  const targetProduct = mockProducts.men[0];
  const myProduct = mockUserProducts.find((p) => p.id === myProductId);
  const modalHtml = `
        <div class="modal fade" id="swapModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Xác Nhận Trao Đổi</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 text-center">
                                <h6>Sản phẩm bạn muốn</h6>
                                <div class="mb-3" style="height: 200px;">
                                    <img src="${
                                      targetProduct.images &&
                                      targetProduct.images.length > 0
                                        ? targetProduct.images[0]
                                        : "./assets/images/default.jpg"
                                    }"
                                         alt="${targetProduct.name}"
                                         class="img-fluid rounded"
                                         style="height: 100%; object-fit: cover;">
                                </div>
                                <p><strong>${targetProduct.name}</strong></p>
                                <p class="text-warning">${
                                  targetProduct.price
                                } $C</p>
                            </div>
                            <div class="col-md-6 text-center">
                                <h6>Sản phẩm của bạn</h6>
                                <div class="mb-3" style="height: 200px;">
                                    <img src="${
                                      myProduct.images &&
                                      myProduct.images.length > 0
                                        ? myProduct.images[0]
                                        : "./assets/images/default.jpg"
                                    }"
                                         alt="${myProduct.name}"
                                         class="img-fluid rounded"
                                         style="height: 100%; object-fit: cover;">
                                </div>
                                <p><strong>${myProduct.name}</strong></p>
                                <p class="text-warning">${
                                  myProduct.price
                                } $C</p>
                            </div>
                        </div>
                        <hr>
                        <form id="swapForm">
                            <div class="mb-3">
                                <label class="form-label">Lý do muốn trao đổi</label>
                                <textarea class="form-control" rows="3" placeholder="Ví dụ: Tôi muốn đổi size, màu sắc..."></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Thông tin liên hệ</label>
                                <input type="text" class="form-control" placeholder="Số điện thoại hoặc email">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-primary" onclick="submitSwapRequest()">Gửi Yêu Cầu</button>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const modal = new bootstrap.Modal(document.getElementById("swapModal"));
  modal.show();
  document
    .getElementById("swapModal")
    .addEventListener("hidden.bs.modal", function () {
      this.remove();
    });
}

function submitSwapRequest() {
  showToast("Yêu cầu trao đổi đã được gửi! Chúng tôi sẽ liên hệ với bạn sớm.");
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("swapModal")
  );
  modal.hide();
}
function showContact(type) {
  const title =
    type === "picksi" ? "Liên Hệ Với Picksi" : "Liên Hệ Với Người Bán";
  const content = `
            <div class="d-flex justify-content-center align-items-center">
                <div class="card p-5 m-5">
                    <h3 class="text-center">${title}</h3>
                     <form id="contactForm">
                        <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Họ và tên</label>
                            <input type="text" class="form-control" required>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" required>
                        </div>
                        </div>
                        <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>
                        <input type="tel" class="form-control">
                        </div>
                        <div class="mb-3">
                        <label class="form-label">Chủ đề</label>
                        <select class="form-select">
                            <option>Hỗ trợ kỹ thuật</option>
                            <option>Khiếu nại sản phẩm</option>
                            <option>Tư vấn mua hàng</option>
                            <option>Khác</option>
                        </select>
                        </div>
                        <div class="mb-3">
                        <label class="form-label">Nội dung</label>
                        <textarea class="form-control" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-warning w-100">
                        <i class="bi bi-send"></i> Gửi Liên Hệ
                        </button>
                    </form>    
                </div>
            </div>
            `;
  showPage("contact", content);
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong 24h.");
      showHome();
    });
}
function changeMainImage(imageSrc) {
  document.getElementById("mainProductImage").innerHTML = imageSrc;
  document.querySelectorAll(".thumbnail-image").forEach((thumb) => {
    thumb.style.border = "2px solid #ddd";
  });
  event.target.style.border = "2px solid #FFD700";
}

function selectSize(element) {
  document.querySelectorAll(".size-option").forEach((option) => {
    option.style.border = "2px solid #ddd";
    option.style.background = "transparent";
    option.style.color = "#000";
  });
  element.style.border = "2px solid #FFD700";
  element.style.background = "#FFD700";
  element.style.color = "#000";
}

function selectColor(element) {
  document.querySelectorAll(".color-option").forEach((option) => {
    option.style.border = "2px solid #ddd";
    option.style.transform = "scale(1)";
  });
  element.style.border = "3px solid #FFD700";
  element.style.transform = "scale(1.1)";
}
function showToast(message) {
  document.getElementById("toastMessage").textContent = message;
  const toast = new bootstrap.Toast(document.getElementById("successToast"));
  toast.show();
}

const appState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  currentPage: "home",
  selectedProduct: null,
};

function updateState(newState) {
  Object.assign(appState, newState);
  if (newState.cart !== undefined) {
    localStorage.setItem("cart", JSON.stringify(appState.cart));
    updateCartBadge();
  }
  if (newState.currentUser !== undefined) {
    localStorage.setItem("currentUser", JSON.stringify(appState.currentUser));
    updateUserInterface();
  }
}
