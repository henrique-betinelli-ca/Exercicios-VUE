export const PRODUCTS = [
    {
        id: "AR90",
        name: "Arroz - 5kg",
        photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Arroz-AGULINHA-INTEGRAL-ORGANICO-min.png",
        price: 24.90,
        availableQuantity: 15
    },
    {
        id: "FE49",
        name: "Feijão - 1kg",
        photo: "https://samsclub.vtexassets.com/arquivos/ids/200531/7897122600071_12_9_1200_72_SRGB.png?v=638820613995900000",
        price: 8.49,
        availableQuantity: 18
    },
    {
        id: "LE99",
        name: "Leite - 1L",
        photo: "https://edona.com.br/cdn/shop/files/leite-integral-piracanjuba-1-litro-372339.png?v=1743731557",
        price: 4.99,
        availableQuantity: 25
    },
    {
        id: "MA99",
        name: "Macarrão - 500g",
        photo: "https://images.ctfassets.net/43ibah8kumsy/4wNqtqKAFTXKspI5yjalOK/57b46f11ec86b1f370b89abe79d5c3a6/Espaguete_8_Massa_com_Ovos_500g_front_pack_pt-br.png?w=1600&h=1600&fm=webp&q=50",
        price: 3.99,
        availableQuantity: 20
    },
    {
        id: "CA90",
        name: "Café - 500g",
        photo: "https://www.korinalimentos.com.br/wp-content/uploads/2023/11/Cafe-Organico-MOIDO-250g.png",
        price: 14.90,
        availableQuantity: 12
    },
    {
        id: "AC29",
        name: "Açúcar - 1kg",
        photo: "https://tdc0wy.vteximg.com.br/arquivos/ids/157125-1000-1000/ACUCAR-REFINADO-UNIAO-1KG-ORGANICO.png?v=637929867980770000",
        price: 5.29,
        availableQuantity: 17
    },
    {
        id: "FR75",
        name: "Frango - 1kg",
        photo: "https://d21wiczbqxib04.cloudfront.net/v0iQRJRlPtpYftnep_RgG7qKN7I=/1600x0/smart/https://osuper-ecommerce-supernahora.s3-sa-east-1.amazonaws.com/10527b7b-9418%20-%20Coxa.png",
        price: 18.75,
        availableQuantity: 10
    },
    {
        id: "PA50",
        name: "Pão de Forma - 500g",
        photo: "https://cdn.awsli.com.br/2500x2500/2437/2437685/produto/234059436/p-o-de-forma-vegano-integral-pacote-450g-bi9zlrgizm.png",
        price: 7.50,
        availableQuantity: 22
    },
    {
        id: "BI49",
        name: "Biscoito - 140g",
        photo: "https://piraque.com.br/wp-content/uploads/2020/11/7896024761651.png",
        price: 3.49,
        availableQuantity: 9
    },
    {
        id: "CH99",
        name: "Chocolate - 90g",
        photo: "https://americanas.vtexassets.com/arquivos/ids/36749977-768-auto/TABLETECHARGE90GNESTLE.webp?v=638971858114300000&quality=9",
        price: 9.99,
        availableQuantity: 10
    }
];
export const EMPTY_CART_MESSAGES = {
    title: "Seu carrinho está vazio.",
    text: "Adicione produtos para continuar com a compra."
};
export const SECTION_TITLES = {
    cart: "Carrinho",
    placeOrder: "Finalizar Compra",
    products: "Produtos",
    summary: "Resumo",
    subtotal: "Subtotal",
    shipping: "Frete",
    discount: "Desconto",
    total: "Total",
    coupon: "Cupom"
};
export const UTILITY_TEXTS = {
    productStock: "Estoque disponível: ",
    currencySymbol: "R$ ",
    marketName: "Minipreço",
    quantity: "x - ",
    less: "- "
};
export const BUTTON_LABELS = {
    add: "Adicionar",
    proceedToCheckout: "Prosseguir com a compra",
    apply: "Aplicar",
    placeOrder: "Finalizar a compra"
};
export const COUPONS = {
    vue10: "VUE10",
    freeShipping: "FRETEGRATIS",
    invalid: "invalid",
    success: "success"
};
export const ALERTS_COUPONS = {
    invalid: {
        type: "error",
        title: "Cupom inválido",
        text: "Por favor insira um cupom válido."
    },
    success: {
        type: "success",
        title: "Cupom aplicado",
        text: "O desconto foi aplicado com sucesso."
    }
}