/* =====================================================
   VERQORA HOUSE STORE
   STEP 2 JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const navLinks =
    document.getElementById("navLinks");


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("mobile-open");

        }
    );

}



/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const allProducts =
    document.querySelectorAll(
        "#allProducts .product-card"
    );


function searchProducts() {

    const searchValue =
        searchInput.value
            .toLowerCase()
            .trim();


    let foundProducts = 0;


    allProducts.forEach(product => {

        const productName =
            product.dataset.name
                .toLowerCase();


        const productText =
            product.textContent
                .toLowerCase();


        if (
            productName.includes(searchValue) ||
            productText.includes(searchValue)
        ) {

            product.style.display = "";

            foundProducts++;

        } else {

            product.style.display = "none";

        }

    });


    const noProducts =
        document.getElementById("noProducts");


    if (foundProducts === 0) {

        noProducts.style.display = "block";

    } else {

        noProducts.style.display = "none";

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );

}


if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchProducts
    );

}



/* =====================================================
   CATEGORY FILTER
===================================================== */

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        () => {

            const selected =
                categoryFilter.value;


            let found = 0;


            allProducts.forEach(product => {

                const category =
                    product.dataset.category;


                if (
                    selected === "all" ||
                    category === selected
                ) {

                    product.style.display = "";

                    found++;

                } else {

                    product.style.display = "none";

                }

            });


            const noProducts =
                document.getElementById(
                    "noProducts"
                );


            if (found === 0) {

                noProducts.style.display =
                    "block";

            } else {

                noProducts.style.display =
                    "none";

            }

        }
    );

}



/* =====================================================
   CATEGORY BOXES
===================================================== */

const categoryBoxes =
    document.querySelectorAll(
        ".category-box"
    );


categoryBoxes.forEach(box => {

    box.addEventListener(
        "click",
        () => {

            const category =
                box.dataset.category;


            categoryFilter.value =
                category;


            categoryFilter.dispatchEvent(
                new Event("change")
            );


            document
                .getElementById("shop")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});



/* =====================================================
   HEART BUTTON
===================================================== */

const heartButtons =
    document.querySelectorAll(
        ".heart-button"
    );


heartButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (
                button.textContent === "♡"
            ) {

                button.textContent = "♥";

                button.style.color =
                    "#f43f8f";

            } else {

                button.textContent = "♡";

                button.style.color =
                    "";

            }

        }
    );

});



/* =====================================================
   ALL CATEGORIES BUTTON
===================================================== */

const allCategoriesButton =
    document.getElementById(
        "allCategoriesButton"
    );


if (allCategoriesButton) {

    allCategoriesButton.addEventListener(
        "click",
        () => {

            document
                .getElementById("shop")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

}// TEST SUPABASE CONNECTION
async function testSupabaseConnection() {
    const { data, error } = await supabaseClient
        .from("categories")
        .select("*");

    if (error) {
        console.error("❌ Supabase connection failed:", error);
        return;
    }

    console.log("✅ Supabase connected successfully!");
    console.log("Categories:", data);
}

testSupabaseConnection();