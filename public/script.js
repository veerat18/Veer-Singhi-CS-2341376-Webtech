document.addEventListener("DOMContentLoaded", function () {

/* ================= MOBILE MENU ================= */

/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function (e) {
        e.stopPropagation(); 
        navMenu.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            navMenu.classList.remove("active");
        }
    });

}

/* ================= SAFE FADE-IN (ONLY SECTIONS) ================= */

const sections = document.querySelectorAll(".section");

const appearOptions = {
    threshold: 0.15
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

sections.forEach(section => {
    section.classList.add("fade-in");
    appearOnScroll.observe(section);
});

/* ================= CART SYSTEM ================= */

let cart = JSON.parse(localStorage.getItem("veromaCart")) || [];

const cartIcon = document.getElementById("cart-icon");
const cartPanel = document.getElementById("cart-panel");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

if (cartIcon && cartPanel) {
    cartIcon.addEventListener("click", function () {
        cartPanel.classList.toggle("active");
    });
}

/* ===== SAVE CART ===== */

function saveCart() {
    localStorage.setItem("veromaCart", JSON.stringify(cart));
}

/* ===== ADD TO CART ===== */

window.addToCart = function (name, price) {

    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    saveCart();
    updateCart();
    showPopup("Added to Cart!");
}

/* ===== UPDATE CART ===== */

function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <p><strong>${item.name}</strong></p>
                <p>₹${item.price}</p>

                <div class="qty-controls">
                    <button onclick="decreaseQty(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQty(${index})">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    if (cartTotal) cartTotal.textContent = total;
    if (cartCount) cartCount.textContent = count;

    saveCart();
}

/* ===== INCREASE / DECREASE ===== */

window.increaseQty = function(index){
    cart[index].quantity++;
    updateCart();
}

window.decreaseQty = function(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
    } else {
        cart.splice(index,1);
    }
    updateCart();
}

window.removeItem = function(index){
    cart.splice(index,1);
    updateCart();
}

/* ===== CHECKOUT ===== */

window.checkoutWhatsApp = function () {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello, I would like to order:%0A%0A";

    cart.forEach(item => {
        message += `${item.name} - ₹${item.price} x ${item.quantity}%0A`;
    });

    message += `%0ATotal: ₹${cartTotal.textContent}`;

    window.open(`https://wa.me/918318649904?text=${message}`);
}

/* ===== CLOSE CART WHEN CLICKING OUTSIDE ===== */

document.addEventListener("click", function(e){
    if(cartPanel && cartPanel.classList.contains("active")){
        if(!cartPanel.contains(e.target) && !cartIcon.contains(e.target)){
            cartPanel.classList.remove("active");
        }
    }
});

/* ===== POPUP ANIMATION ===== */

function showPopup(message){

    const popup = document.createElement("div");
    popup.classList.add("cart-popup");
    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("show");
    }, 10);

    setTimeout(() => {
        popup.remove();
    }, 2000);
}

/* ===== LOAD CART ON PAGE LOAD ===== */

updateCart();

/* ================= IMAGE LIGHTBOX WITH ZOOM ================= */

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

let scale = 1;
let isDragging = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

if (modal && modalImg) {

    document.querySelectorAll(".viewable").forEach(img => {
        img.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            resetImage();
        });
    });

    if (closeBtn) {
        closeBtn.onclick = function () {
            modal.style.display = "none";
        };
    }

    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    /* ===== SCROLL ZOOM ===== */

    modalImg.addEventListener("wheel", function (e) {
        e.preventDefault();

        if (e.deltaY < 0) {
            scale += 0.1;
        } else {
            scale -= 0.1;
            if (scale < 1) scale = 1;
        }

        updateTransform();
    });

    /* ===== DRAG ===== */

    modalImg.addEventListener("mousedown", function (e) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        modalImg.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (e) {
        if (!isDragging) return;

        translateX = e.clientX - startX;
        translateY = e.clientY - startY;

        updateTransform();
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
        modalImg.style.cursor = "grab";
    });

    /* ===== DOUBLE CLICK RESET ===== */

    modalImg.addEventListener("dblclick", function () {
        resetImage();
    });

    function updateTransform() {
        modalImg.style.transform =
            `translate(-50%, -50%) scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }

    function resetImage() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        modalImg.style.transform = "translate(-50%, -50%) scale(1)";
    }
}
});
