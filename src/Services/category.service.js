import { staticCategories } from "../constants/staticData";

async function getCategoryList() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(staticCategories);
        }, 500);
    });
}

export { getCategoryList };
