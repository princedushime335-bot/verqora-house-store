import { supabase } from "./supabase.js";

console.log("================================");
console.log("VERQORA ADMIN JS LOADED");
console.log("Supabase connected:", !!supabase);
console.log("================================");

// ==========================================
// ELEMENTS
// ==========================================

const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const logoutBtn = document.getElementById("logoutBtn");

const productForm = document.getElementById("productForm");
const productMessage = document.getElementById("productMessage");

const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");
const productImage = document.getElementById("productImage");

const imagePreview = document.getElementById("imagePreview");

const adminProducts = document.getElementById("adminProducts");
const totalProducts = document.getElementById("totalProducts");
const availableProducts = document.getElementById("availableProducts");

// ==========================================
// ELEMENT CHECK
// ==========================================

console.log("Login form:", !!loginForm);
console.log("Login page:", !!loginPage);
console.log("Dashboard page:", !!dashboardPage);
console.log("Logout button:", !!logoutBtn);
console.log("Product form:", !!productForm);
console.log("Admin products:", !!adminProducts);

// ==========================================
// MESSAGE FUNCTIONS
// ==========================================

function showLoginMessage(message, type = "error") {
    if (!loginMessage) return;

    loginMessage.textContent = message;

    loginMessage.className = "login-message";

    if (type === "success") {
        loginMessage.classList.add("success");
    }

    if (type === "error") {
        loginMessage.classList.add("error");
    }
}

function showProductMessage(message, type = "success") {
    if (!productMessage) return;

    productMessage.textContent = message;

    productMessage.className = "product-message";

    if (type === "success") {
        productMessage.classList.add("success");
    }

    if (type === "error") {
        productMessage.classList.add("error");
    }
}

// ==========================================
// SHOW LOGIN
// ==========================================

function showLoginPage() {

    console.log("SHOWING LOGIN PAGE");

    if (dashboardPage) {

        dashboardPage.classList.add("hidden");

        dashboardPage.style.display = "none";
        dashboardPage.style.visibility = "hidden";
        dashboardPage.style.opacity = "0";
    }

    if (loginPage) {

        loginPage.classList.remove("hidden");

        loginPage.style.display = "block";
        loginPage.style.visibility = "visible";
        loginPage.style.opacity = "1";
    }
}

// ==========================================
// SHOW DASHBOARD
// ==========================================

function showDashboard() {

    console.log("================================");
    console.log("SHOWING DASHBOARD");
    console.log("================================");

    if (!dashboardPage) {

        console.error(
            "CRITICAL ERROR: dashboardPage was not found!"
        );

        return false;
    }

    // Hide login

    if (loginPage) {

        loginPage.classList.add("hidden");

        loginPage.style.display = "none";
        loginPage.style.visibility = "hidden";
        loginPage.style.opacity = "0";
    }

    // Show dashboard

    dashboardPage.classList.remove("hidden");

    dashboardPage.style.display = "block";
    dashboardPage.style.visibility = "visible";
    dashboardPage.style.opacity = "1";

    console.log(
        "Dashboard class:",
        dashboardPage.className
    );

    console.log(
        "Dashboard display:",
        dashboardPage.style.display
    );

    console.log(
        "Dashboard visibility:",
        dashboardPage.style.visibility
    );

    console.log(
        "Dashboard opacity:",
        dashboardPage.style.opacity
    );

    console.log("DASHBOARD IS NOW VISIBLE");

    return true;
}

// ==========================================
// CHECK ADMIN
// ==========================================

async function checkAdmin(userId) {

    console.log("================================");
    console.log("CHECKING ADMIN");
    console.log("USER ID:", userId);
    console.log("================================");

    try {

        const {
            data,
            error
        } = await supabase
            .from("admins")
            .select("user_id")
            .eq("user_id", userId)
            .limit(1);

        if (error) {

            console.error(
                "ADMIN CHECK ERROR:",
                error
            );

            return false;
        }

        console.log(
            "ADMIN DATABASE RESULT:",
            data
        );

        if (data && data.length > 0) {

            console.log(
                "ADMIN VERIFIED: TRUE"
            );

            return true;
        }

        console.log(
            "ADMIN VERIFIED: FALSE"
        );

        return false;

    } catch (error) {

        console.error(
            "ADMIN CHECK EXCEPTION:",
            error
        );

        return false;
    }
}

// ==========================================
// OPEN ADMIN DASHBOARD
// ==========================================

async function openDashboard(user) {

    console.log("================================");
    console.log("OPEN DASHBOARD");
    console.log("EMAIL:", user.email);
    console.log("USER ID:", user.id);
    console.log("================================");

    const isAdmin = await checkAdmin(user.id);

    console.log(
        "FINAL ADMIN RESULT:",
        isAdmin
    );

    if (!isAdmin) {

        console.error(
            "USER IS NOT AUTHORIZED AS ADMIN"
        );

        showLoginMessage(
            "You are not authorized as an admin.",
            "error"
        );

        await supabase.auth.signOut();

        showLoginPage();

        return;
    }

    console.log(
        "ADMIN VERIFIED - SHOWING DASHBOARD"
    );

    const dashboardOpened = showDashboard();

    if (!dashboardOpened) {
        return;
    }

    // Load products after dashboard opens

    await loadProducts();
}

// ==========================================
// LOGIN
// ==========================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            console.log("================================");
            console.log("LOGIN BUTTON CLICKED");
            console.log("================================");

            const emailInput =
                document.getElementById("email");

            const passwordInput =
                document.getElementById("password");

            if (!emailInput || !passwordInput) {

                console.error(
                    "EMAIL OR PASSWORD INPUT NOT FOUND"
                );

                showLoginMessage(
                    "Email or password field is missing.",
                    "error"
                );

                return;
            }

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            console.log(
                "EMAIL:",
                email
            );

            console.log(
                "PASSWORD ENTERED:",
                password.length > 0
            );

            if (!email || !password) {

                showLoginMessage(
                    "Please enter your email and password.",
                    "error"
                );

                return;
            }

            showLoginMessage(
                "Logging in...",
                "success"
            );

            console.log(
                "Sending login request to Supabase..."
            );

            try {

                const {
                    data,
                    error
                } =
                    await supabase.auth.signInWithPassword({
                        email: email,
                        password: password
                    });

                if (error) {

                    console.error(
                        "SUPABASE LOGIN ERROR:",
                        error
                    );

                    showLoginMessage(
                        error.message,
                        "error"
                    );

                    return;
                }

                console.log(
                    "LOGIN SUCCESS"
                );

                console.log(
                    "AUTH USER:",
                    data.user
                );

                console.log(
                    "AUTH USER ID:",
                    data.user.id
                );

                console.log(
                    "AUTH EMAIL:",
                    data.user.email
                );

                await openDashboard(
                    data.user
                );
            }

            catch (error) {

                console.error(
                    "LOGIN EXCEPTION:",
                    error
                );

                showLoginMessage(
                    "Something went wrong while logging in.",
                    "error"
                );
            }
        }
    );

} else {

    console.error(
        "LOGIN FORM NOT FOUND"
    );
}

// ==========================================
// LOGOUT
// ==========================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async function () {

            console.log(
                "LOGOUT BUTTON CLICKED"
            );

            try {

                const {
                    error
                } =
                    await supabase.auth.signOut();

                if (error) {

                    console.error(
                        "LOGOUT ERROR:",
                        error
                    );

                    return;
                }

                console.log(
                    "LOGOUT SUCCESS"
                );

                showLoginPage();
            }

            catch (error) {

                console.error(
                    "LOGOUT EXCEPTION:",
                    error
                );
            }
        }
    );
}

// ==========================================
// CHECK EXISTING SESSION
// ==========================================

async function checkSession() {

    console.log("================================");
    console.log("CHECKING EXISTING SESSION");
    console.log("================================");

    try {

        const {
            data,
            error
        } =
            await supabase.auth.getSession();

        if (error) {

            console.error(
                "SESSION ERROR:",
                error
            );

            showLoginPage();

            return;
        }

        const session = data.session;

        if (session) {

            console.log(
                "EXISTING SESSION FOUND"
            );

            console.log(
                "SESSION USER:",
                session.user.email
            );

            console.log(
                "SESSION USER ID:",
                session.user.id
            );

            await openDashboard(
                session.user
            );

        } else {

            console.log(
                "NO ACTIVE SESSION"
            );

            showLoginPage();
        }

    }

    catch (error) {

        console.error(
            "SESSION EXCEPTION:",
            error
        );

        showLoginPage();
    }
}

// ==========================================
// AUTH STATE
// ==========================================

supabase.auth.onAuthStateChange(
    (event, session) => {

        console.log(
            "AUTH EVENT:",
            event
        );

        if (session) {

            console.log(
                "AUTH SESSION USER:",
                session.user.email
            );
        }
    }
);

// ==========================================
// IMAGE PREVIEW
// ==========================================

if (productImage) {

    productImage.addEventListener(
        "change",
        function () {

            const file =
                productImage.files[0];

            if (!file) {

                if (imagePreview) {

                    imagePreview.src = "";

                    imagePreview.classList.add(
                        "hidden"
                    );
                }

                return;
            }

            const imageURL =
                URL.createObjectURL(file);

            if (imagePreview) {

                imagePreview.src =
                    imageURL;

                imagePreview.classList.remove(
                    "hidden"
                );

                imagePreview.style.display =
                    "block";
            }
        }
    );
}

// ==========================================
// LOAD PRODUCTS
// ==========================================

async function loadProducts() {

    console.log("================================");
    console.log("LOADING PRODUCTS");
    console.log("================================");

    try {

        const {
            data: products,
            error
        } =
            await supabase
                .from("products")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );

        if (error) {

            console.error(
                "LOAD PRODUCTS ERROR:",
                error
            );

            return;
        }

        console.log(
            "PRODUCTS:",
            products
        );

        if (totalProducts) {

            totalProducts.textContent =
                products.length;
        }

        const available =
            products.filter(
                product =>
                    Number(
                        product.stock || 0
                    ) > 0
            );

        if (availableProducts) {

            availableProducts.textContent =
                available.length;
        }

        renderProducts(
            products
        );

    }

    catch (error) {

        console.error(
            "LOAD PRODUCTS EXCEPTION:",
            error
        );
    }
}

// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts(products) {

    if (!adminProducts) {

        console.error(
            "adminProducts element not found"
        );

        return;
    }

    adminProducts.innerHTML = "";

    if (
        !products ||
        products.length === 0
    ) {

        adminProducts.innerHTML = `
            <p>No products found.</p>
        `;

        return;
    }

    products.forEach(
        product => {

            const productCard =
                document.createElement("div");

            productCard.className =
                "admin-product-card";

            productCard.innerHTML = `

                ${
                    product.image_url
                    ? `
                        <img
                            src="${product.image_url}"
                            alt="${product.name}"
                        >
                    `
                    : ""
                }

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Category:
                        ${product.category || "No category"}
                    </p>

                    <p>
                        Price:
                        ${product.price} RWF
                    </p>

                    <p>
                        Stock:
                        ${product.stock || 0}
                    </p>

                </div>
            `;

            adminProducts.appendChild(
                productCard
            );
        }
    );
}

// ==========================================
// ADD PRODUCT
// ==========================================

if (productForm) {

    productForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            console.log("================================");
            console.log("ADD PRODUCT STARTED");
            console.log("================================");

            const name =
                productName?.value.trim();

            const category =
                productCategory?.value.trim();

            const price =
                Number(
                    productPrice?.value
                );

            const description =
                productDescription?.value.trim();

            const imageFile =
                productImage?.files[0];

            if (!name || !price) {

                showProductMessage(
                    "Please enter product name and price.",
                    "error"
                );

                return;
            }

            try {

                let imageUrl = null;

                // ==================================
                // UPLOAD IMAGE
                // ==================================

                if (imageFile) {

                    console.log(
                        "UPLOADING IMAGE..."
                    );

                    const fileExtension =
                        imageFile.name
                            .split(".")
                            .pop();

                    const fileName =
                        `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

                    const filePath =
                        `products/${fileName}`;

                    const {
                        error: uploadError
                    } =
                        await supabase.storage
                            .from("products")
                            .upload(
                                filePath,
                                imageFile
                            );

                    if (uploadError) {

                        console.error(
                            "IMAGE UPLOAD ERROR:",
                            uploadError
                        );

                        showProductMessage(
                            uploadError.message,
                            "error"
                        );

                        return;
                    }

                    const {
                        data: publicURL
                    } =
                        supabase.storage
                            .from("products")
                            .getPublicUrl(
                                filePath
                            );

                    imageUrl =
                        publicURL.publicUrl;

                    console.log(
                        "IMAGE URL:",
                        imageUrl
                    );
                }

                // ==================================
                // INSERT PRODUCT
                // ==================================

                console.log(
                    "ADDING PRODUCT TO DATABASE..."
                );

                const {
                    data,
                    error
                } =
                    await supabase
                        .from("products")
                        .insert([
                            {
                                name: name,
                                category:
                                    category || null,
                                price: price,
                                description:
                                    description || null,
                                image_url:
                                    imageUrl,
                                stock: 1
                            }
                        ])
                        .select();

                if (error) {

                    console.error(
                        "ADD PRODUCT DATABASE ERROR:",
                        error
                    );

                    showProductMessage(
                        error.message,
                        "error"
                    );

                    return;
                }

                console.log(
                    "PRODUCT ADDED:",
                    data
                );

                showProductMessage(
                    "Product added successfully!",
                    "success"
                );

                productForm.reset();

                if (imagePreview) {

                    imagePreview.src = "";

                    imagePreview.classList.add(
                        "hidden"
                    );

                    imagePreview.style.display =
                        "none";
                }

                await loadProducts();
            }

            catch (error) {

                console.error(
                    "ADD PRODUCT EXCEPTION:",
                    error
                );

                showProductMessage(
                    "Something went wrong.",
                    "error"
                );
            }
        }
    );
}

// ==========================================
// START APPLICATION
// ==========================================

console.log("================================");
console.log("STARTING VERQORA ADMIN");
console.log("================================");

checkSession();