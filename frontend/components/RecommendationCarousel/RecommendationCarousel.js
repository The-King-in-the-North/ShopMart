import ProductCard from "../ProductCard/ProductCard";


export default function RecommendationCarousel({ title, products, setView }) {
    if (!products || products.length === 0) {
        return (
            <div className="animate-pulse">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">{title}</h2>
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                    {[...Array(4)].map((_, i) => (
                         <div key={i} className="group relative">
                            <div className="w-full h-80 bg-gray-300 rounded-md"></div>
                            <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <section className="mb-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">{title}</h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} setView={setView} />
                ))}
            </div>
        </section>
    );
}