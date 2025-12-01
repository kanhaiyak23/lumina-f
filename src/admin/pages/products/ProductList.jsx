import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Plus, Search } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { deleteAdminProduct, fetchAdminProducts } from "../../../Services/adminProduct.service";

const ProductList = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchAdminProducts();
                setProducts(data);
                setFiltered(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    useEffect(() => {
        if (!search) {
            setFiltered(products);
            return;
        }
        const lower = search.toLowerCase();
        setFiltered(products.filter(product => product.title.toLowerCase().includes(lower)));
    }, [search, products]);

    const handleDelete = async product => {
        if (!window.confirm(`Delete ${product.title}? This action cannot be undone.`)) return;
        const loadingId = toast.loading("Deleting product...");
        try {
            await deleteAdminProduct(product.id);
            const data = await fetchAdminProducts();
            setProducts(data);
            setFiltered(data);
            toast.success("Product deleted");
        } catch (error) {
            toast.error(error.message);
        } finally {
            toast.dismiss(loadingId);
        }
    };

    const summary = useMemo(
        () => ({
            total: products.length,
            outOfStock: products.filter(product => product.stock_quantity <= 0).length,
        }),
        [products],
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">All Products</h2>
                    <p className="text-sm text-gray-500">
                        {summary.total} products • {summary.outOfStock} out of stock
                    </p>
                </div>
                <button
                    onClick={() => navigate("/admin/products/new")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold"
                >
                    <Plus size={16} /> Add Product
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />
                    <input
                        type="search"
                        placeholder="Search products"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center text-gray-400 py-10 text-sm">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onEdit={() => navigate(`/admin/products/${product.id}`)}
                            onDelete={() => handleDelete(product)}
                        />
                    ))}
                </div>
            )}

            {!loading && !filtered.length && (
                <div className="text-center text-gray-400 py-10 text-sm">No products found.</div>
            )}
        </div>
    );
};

export default ProductList;
