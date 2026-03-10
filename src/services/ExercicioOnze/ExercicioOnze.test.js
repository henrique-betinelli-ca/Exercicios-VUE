import { describe, it, expect, vi, beforeEach } from "vitest";
import * as service from "./Service.js";

describe("service", () => {
    beforeEach(() => {
        service.resetCart()
    })
    describe("getProducts", () => {
        it("should return the products constant", () => {
            expect(service.getProducts()).toEqual([
                { id: "AR90", name: "Arroz - 5kg", photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Arroz-AGULINHA-INTEGRAL-ORGANICO-min.png", price: 24.90, availableQuantity: 15 },
                { id: "FE49", name: "Feijão - 1kg", photo: "https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000", price: 8.49, availableQuantity: 18 },
                { id: "LE99", name: "Leite - 1L", photo: "https://edona.com.br/cdn/shop/files/leite-integral-piracanjuba-1-litro-372339.png?v=1743731557", price: 4.99, availableQuantity: 25 },
                { id: "MA99", name: "Macarrão - 500g", photo: "https://images.ctfassets.net/43ibah8kumsy/4wNqtqKAFTXKspI5yjalOK/57b46f11ec86b1f370b89abe79d5c3a6/Espaguete_8_Massa_com_Ovos_500g_front_pack_pt-br.png?w=1600&h=1600&fm=webp&q=50", price: 3.99, availableQuantity: 20 },
                { id: "CA90", name: "Café - 500g", photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Cafe-Organico-MOIDO-250g.png", price: 14.90, availableQuantity: 12 },
                { id: "AC29", name: "Açúcar - 1kg", photo: "https://tdc0wy.vteximg.com.br/arquivos/ids/157125-1000-1000/ACUCAR-REFINADO-UNIAO-1KG-ORGANICO.png?v=637929867980770000", price: 5.29, availableQuantity: 17 },
                { id: "FR75", name: "Frango - 1kg", photo: "https://d21wiczbqxib04.cloudfront.net/v0iQRJRlPtpYftnep_RgG7qKN7I=/1600x0/smart/https://osuper-ecommerce-supernahora.s3-sa-east-1.amazonaws.com/10527b7b-9418%20-%20Coxa.png", price: 18.75, availableQuantity: 10 },
                { id: "PA50", name: "Pão de Forma - 500g", photo: "https://cdn.awsli.com.br/2500x2500/2437/2437685/produto/234059436/p-o-de-forma-vegano-integral-pacote-450g-bi9zlrgizm.png", price: 7.50, availableQuantity: 22 },
                { id: "BI49", name: "Biscoito - 140g", photo: "https://piraque.com.br/wp-content/uploads/2020/11/7896024761651.png", price: 3.49, availableQuantity: 9 },
                { id: "CH99", name: "Chocolate - 90g", photo: "https://americanas.vtexassets.com/arquivos/ids/36749977-768-auto/TABLETECHARGE90GNESTLE.webp?v=638971858114300000&quality=9", price: 9.99, availableQuantity: 10 }
            ]);
        });
    });
    describe("getEmptyCartMessages", () => {
        it("should return the emptyCartMessages constant", () => {
            expect(service.getEmptyCartMessages()).toEqual({
                title: "Seu carrinho está vazio.",
                text: "Adicione produtos para continuar com a compra."
            });
        });
    });
    describe("getSectionTitles", () => {
        it("should return the sectionTitles constant", () => {
            expect(service.getSectionTitles()).toEqual({
                cart: "Carrinho",
                placeOrder: "Finalizar Compra",
                products: "Produtos",
                summary: "Resumo",
                subtotal: "Subtotal",
                shipping: "Frete",
                discount: "Desconto",
                total: "Total",
                coupon: "Cupom"
            });
        });
    });
    describe("getUtilityTexts", () => {
        it("should return the utilityTexts constant", () => {
            expect(service.getUtilityTexts()).toEqual({
                productStock: "Estoque disponível: ",
                currencySymbol: "R$ ",
                marketName: "Minipreço",
                quantity: "x - ",
                less: "- "
            });
        });
    });
    describe("getButtonLabels", () => {
        it("should return the buttonLabels constant", () => {
            expect(service.getButtonLabels()).toEqual({
                add: "Adicionar",
                proceedToCheckout: "Prosseguir com a compra",
                apply: "Aplicar",
                placeOrder: "Finalizar a compra"
            });
        });
    });
    describe("getCoupons", () => {
        it("should return the coupons constant", () => {
            expect(service.getCoupons()).toEqual({
                vue10: "VUE10",
                freeShipping: "FRETEGRATIS",
                invalid: "invalid",
                success: "success"
            });
        });
    });
    describe("getAlertCoupon", () => {
        it("should return the alertCoupon constant", () => {
            expect(service.getAlertCoupon("invalid")).toEqual({
                type: "error",
                title: "Cupom inválido",
                text: "Por favor insira um cupom válido."
            });
            expect(service.getAlertCoupon("success")).toEqual({
                type: "success",
                title: "Cupom aplicado",
                text: "O desconto foi aplicado com sucesso."
            });
        });
    });
    describe("getProductsSlice", () => {
        it("should return products according to the index", () => {
            expect(service.getProductsSlice(0, 3)).toEqual([
                { id: "AR90", name: "Arroz - 5kg", photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Arroz-AGULINHA-INTEGRAL-ORGANICO-min.png", price: 24.90, availableQuantity: 15 },
                { id: "FE49", name: "Feijão - 1kg", photo: "https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000", price: 8.49, availableQuantity: 18 },
                { id: "LE99", name: "Leite - 1L", photo: "https://edona.com.br/cdn/shop/files/leite-integral-piracanjuba-1-litro-372339.png?v=1743731557", price: 4.99, availableQuantity: 25 },
            ]);
            expect(service.getProductsSlice(3, 2)).toEqual([
                { id: "MA99", name: "Macarrão - 500g", photo: "https://images.ctfassets.net/43ibah8kumsy/4wNqtqKAFTXKspI5yjalOK/57b46f11ec86b1f370b89abe79d5c3a6/Espaguete_8_Massa_com_Ovos_500g_front_pack_pt-br.png?w=1600&h=1600&fm=webp&q=50", price: 3.99, availableQuantity: 20 },
                { id: "CA90", name: "Café - 500g", photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Cafe-Organico-MOIDO-250g.png", price: 14.90, availableQuantity: 12 },
            ]);
        });
    });
    describe("addToCart", () => {
        it("should add product to cart", () => {
            const product = service.state.products[0];
            service.addToCart(product.id, 2);

            expect(service.state.cart.length).toEqual(1);
            expect(service.state.cart[0].id).toEqual(product.id);
            expect(service.state.cart[0].quantity).toEqual(2);
        });
        it("should increase quantity if product already in cart", () => {
            const product = service.state.products[3];
            service.addToCart(product.id, 1);
            service.addToCart(product.id, 2);

            expect(service.state.cart.length).toEqual(1);
            expect(service.state.cart[0].quantity).toEqual(3);
        });
    });
    describe("decrementToCart", () => {
        it("should decrement product quantity in cart", () => {
            const product = service.state.products[2];
            service.addToCart(product.id, 2);
            service.decrementToCart(product.id);

            expect(service.state.cart[0].quantity).toEqual(1);
        });
    });
    describe("removeToCart", () => {
        it("should remove product from cart", () => {
            const product = service.state.products[1];
            service.addToCart(product.id, 1);
            service.removeToCart(product.id);

            expect(service.state.cart.length).toEqual(0);
        });
    });
    describe("resetCart", () => {
        it("should reset cart", () => {
            const product = service.state.products[0];
            service.addToCart(product.id, 1);
            service.resetCart();

            expect(service.state.cart.length).toEqual(0);
        });
    });
    describe("getProductById", () => {
        it("should return the product according to the id", () => {
            expect(service.getProductById("CA90")).toEqual({
                id: "CA90",
                name: "Café - 500g",
                photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Cafe-Organico-MOIDO-250g.png",
                price: 14.90,
                availableQuantity: 12
            });
            expect(service.getProductById("FE49")).toEqual({
                id: "FE49",
                name: "Feijão - 1kg",
                photo: "https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000",
                price: 8.49,
                availableQuantity: 18
            });
        });
    });
    describe("getProductFromCartById", () => {
        it("should return the product in the cart according to the id", () => {
            const product = service.state.products[4];
            service.addToCart(product.id, 3);

            expect(service.getProductFromCartById("CA90")).toEqual({
                id: "CA90",
                name: "Café - 500g",
                photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Cafe-Organico-MOIDO-250g.png",
                price: 14.90,
                quantity: 3
            });
        });
    });
    describe("cartItemCount", () => {
        it("should return the quantity of items in the cart", () => {
            const firstProduct = service.state.products[2];
            const secondProduct = service.state.products[4];
            service.addToCart(firstProduct.id, 1);
            expect(service.cartItemCount()).toEqual(1);

            service.addToCart(secondProduct.id, 1);
            expect(service.cartItemCount()).toEqual(2);
        });
    });
    describe("calculateSalesSum", () => {
        it("should return the sum of the value of all products in the cart", () => {
            const firstProduct = service.state.products[2];
            const secondProduct = service.state.products[4];
            service.addToCart(firstProduct.id, 1);
            expect(service.calculateSalesSum()).toEqual(4.99);

            service.addToCart(secondProduct.id, 2);
            expect(service.calculateSalesSum()).toEqual(34.79);
        });
    });
    describe("calculatePrice", () => {
        it("should calculate the total price according to the passed parameters", () => {
            expect(service.calculatePrice(4.99, 2)).toEqual(9.98);
            expect(service.calculatePrice(7.50, 5)).toEqual(37.5);
        });
    });
    describe("calculateShipping", () => {
        it("should calculate the shipping according to the passed parameters", () => {
            const product = service.state.products[0];
            service.addToCart(product.id, 3);
            expect(service.calculateShipping()).toEqual(20);

            service.addToCart(product.id, 6);
            expect(service.calculateShipping()).toEqual(0);
        });
    });
    describe("calculateCoupon", () => {
        it("should return the discount value when the VUE10 coupon is applied", () => {
            const product = service.state.products[0];
            service.addToCart(product.id, 2);

            expect(service.calculateCoupon("VUE10")).toEqual(4.98);
        });
        it("should return the shipping value as a discount when the FRETEGRATIS coupon is applied", () => {
            const product = service.state.products[0];
            service.addToCart(product.id, 2);

            expect(service.calculateCoupon("FRETEGRATIS")).toEqual(20);
        });
        it("should return invalid when the applied coupon is invalid", () => {
            const product = service.state.products[0];
            service.addToCart(product.id, 2);

            expect(service.calculateCoupon("GRATIS")).toEqual("invalid");
        });
    });
    describe("calculateTotal", () => {
        it("should return the total amount to pay without discount", () => {
            const firstProduct = service.state.products[6];
            const secondProduct = service.state.products[7];
            service.addToCart(firstProduct.id, 2);
            service.addToCart(secondProduct.id, 1);

            expect(service.calculateTotal(null)).toEqual(65);
        });
        it("should return the total amount to pay with a 10% discount", () => {
            const firstProduct = service.state.products[6];
            const secondProduct = service.state.products[7];
            service.addToCart(firstProduct.id, 2);
            service.addToCart(secondProduct.id, 1);

            expect(service.calculateTotal("VUE10")).toEqual(60.5);
        });
    });
}); 
