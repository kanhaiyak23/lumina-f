import { staticProducts } from "../constants/staticData";

async function getProductList() {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            resolve(staticProducts);
        }, 500);
    });
}

async function getProductById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = staticProducts.find((p) => p.id === id);
            if (product) {
                resolve(product);
            } else {
                reject("Product not found");
            }
        }, 500);
    });
}

export { getProductList, getProductById };
