import { reactive } from "vue"
import { PRODUCTS, EMPTY_CART_MESSAGES, SECTION_TITLES, UTILITY_TEXTS, BUTTON_LABELS, COUPONS, ALERTS_COUPONS } from "./Constants.js"

export function getProducts() {
    return PRODUCTS;
}
export function getEmptyCartMessages() {
    return EMPTY_CART_MESSAGES;
}
export function getSectionTitles(){
    return SECTION_TITLES;
}
export function getUtilityTexts() {
    return UTILITY_TEXTS;
}
export function getButtonLabels() {
    return BUTTON_LABELS;
}
export function getCoupons() {
    return COUPONS;
}
export function getAlertCoupon(type) {
    return ALERTS_COUPONS[type];
}

export let state = reactive({
    products: [...getProducts()],
    cart: []
});
export function getProductsSlice(start, limit) {
    return state.products.slice(start, start + limit);
}
export function addToCart(productId, productQuantity) {
    const product = getProductById(productId);
    if(!product || product.availableQuantity < productQuantity) return;
    product.availableQuantity -= productQuantity;

    const itemInCart = getProductFromCartById(productId);
    if(itemInCart) {
        itemInCart.quantity += productQuantity;
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            photo: product.photo,
            price: product.price,
            quantity: productQuantity
        });
    }
}
export function decrementToCart(productId) {
    const itemInCart = getProductFromCartById(productId);
    if(!itemInCart) return;
    const product = getProductById(productId);
    product.availableQuantity++;
    itemInCart.quantity--;
    getProductById(productId).productQuantity++;
}
export function removeToCart(productId) {
    const itemInCart = getProductFromCartById(productId);
    if(!itemInCart) return;
    const product = getProductById(productId);
    product.availableQuantity++;
    state.cart = state.cart.filter(product => product.id !== productId);
}
export function resetCart() {
    state.cart = [];
}
export function getProductById(id) {
    return state.products.find(product => product.id === id);
}
export function getProductFromCartById(id) {
    return state.cart.find(product => product.id === id);
}
export function cartItemCount() {
    return state.cart.length;
}
export function calculateSalesSum() {
    return state.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
}
export function calculatePrice(price, quantity) {
    return (price * quantity);
}
export function calculateShipping() {
    return calculateSalesSum() >= 200 ? 0 : 20;
}
export function calculateCoupon(coupon) {
    if(coupon == getCoupons().vue10) return (calculateSalesSum() * 0.10);
    if(coupon == getCoupons().freeShipping) return calculateShipping();
    return getCoupons().invalid;
}
export function calculateTotal(coupon) {
    const couponDiscount = calculateCoupon(coupon);
    if(couponDiscount == getCoupons().invalid) {
        return (calculateSalesSum() + calculateShipping());
    }
    return (calculateSalesSum() + calculateShipping() - couponDiscount);
}
