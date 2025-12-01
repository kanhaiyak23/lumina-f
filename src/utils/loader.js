import { __hideLoader, __showLoader } from "../Redux Store/Slices/loader";
import store from "../Redux Store/store";

export function showLoader(title) {
    store.dispatch(__showLoader(title));
}

export function hideLoader(title) {
    store.dispatch(__hideLoader(title));
}
