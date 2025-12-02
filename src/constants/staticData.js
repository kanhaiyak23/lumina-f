export const staticProducts = [
    {
        id: "1",
        title: "Classic White T-Shirt",
        description: "A premium quality cotton t-shirt, perfect for everyday wear. Breathable and soft fabric.",
        price: 499,
        salePrice: 499,
        originalPrice: 600,
        stock_quantity: 50,
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        summary: "Essential white tee.",
        sku: "TS-WHT-001",
        tags: ["t-shirt", "cotton", "casual", "white"],
        categories: [{ id: "c1", name: "T-Shirts" }]
    },
    {
        id: "2",
        title: "Slim Fit Denim Jeans",
        description: "Stylish slim fit jeans made from durable denim. Features a modern cut and comfortable stretch.",
        price: 1000,
        salePrice:999,
        originalPrice: 1500,
        stock_quantity: 30,
        images: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        summary: "Modern slim fit jeans.",
        sku: "JN-BLU-002",
        tags: ["jeans", "denim", "pants", "casual"],
        categories: [{ id: "c2", name: "Pants" }]
    },
    {
        id: "3",
        title: "Leather Jacket",
        description: "Genuine leather jacket with a classic biker design. Warm, durable, and effortlessly cool.",
        price: 2299,
        salePrice: 2299,
        originalPrice: 3299,
        stock_quantity: 10,
        images: [
            "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        summary: "Classic biker leather jacket.",
        sku: "JK-BLK-003",
        tags: ["jacket", "leather", "outerwear", "black"],
        categories: [{ id: "c3", name: "Outerwear" }]
    },
    {
        id: "4",
        title: "Summer Floral Dress",
        description: "Lightweight and airy floral dress, perfect for summer outings. Features a flattering A-line silhouette.",
        price: 455,
        salePrice: 499,
        originalPrice: 599,
        stock_quantity: 25,
        images: [
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        summary: "Beautiful floral summer dress.",
        sku: "DR-FLR-004",
        tags: ["dress", "floral", "summer", "women"],
        categories: [{ id: "c4", name: "Dresses" }]
    },
    {
        id: "5",
        title: "Running Sneakers",
        description: "High-performance running sneakers with cushioned soles and breathable mesh upper.",
        price: 899,
        salePrice: 899,
        originalPrice: 1999,
        stock_quantity: 40,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        summary: "Comfortable running shoes.",
        sku: "SH-RUN-005",
        tags: ["shoes", "sneakers", "running", "sport"],
        categories: [{ id: "c5", name: "Footwear" }]
    },
    {
        id: "6",
        title: "Cozy Knit Sweater",
        description: "Warm and cozy knit sweater, ideal for chilly days. Made from a soft wool blend.",
        price: 550,
        salePrice: 599,
        originalPrice: 999,
        stock_quantity: 20,
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        summary: "Warm wool blend sweater.",
        sku: "SW-GRY-006",
        tags: ["sweater", "knit", "winter", "casual"],
        categories: [{ id: "c6", name: "Tops" }]
    }
];

export const staticUser = {
    id: "user_123",
    name: "Test User",
    email: "test@lumina.com",
    mobile_number: "1234567890",
    password: "123456" // For validation only, not stored like this in real app
};

export const staticCategories = [
    { id: "c1", title: "T-Shirts" },
    { id: "c2", title: "Pants" },
    { id: "c3", title: "Outerwear" },
    { id: "c4", title: "Dresses" },
    { id: "c5", title: "Footwear" },
    { id: "c6", title: "Tops" }
];
