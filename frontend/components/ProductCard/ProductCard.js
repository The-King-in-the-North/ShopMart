import Link from "next/link";
export default function ProductCard({ product, setView }) {
    if (!product) return null;
    return (
        <Link href={`/product/${product.id}`}>
        <div 
            className="group relative cursor-pointer" 
            onClick={() => setView({ page: 'product', productId: product.id })}
        >
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x600/cccccc/ffffff?text=Image+Error'; }}
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
            </div>
        </div>
        </Link>
    );
}