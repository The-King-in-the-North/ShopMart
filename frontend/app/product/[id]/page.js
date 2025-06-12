"use client";
import RecommendationCarousel from "@/components/RecommendationCarousel/RecommendationCarousel";
import { ArrowLeftIcon } from "@/public/icons";
import Link from "next/link";
import { useState, useEffect, use as usePromise } from "react";

const API_BASE_URL = 'http://localhost:8000';
const CURRENT_USER_ID = 1; 

export default function ProductPage({ setView, params }) {
    const resolvedParams = usePromise(params); // Unwrap the params Promise

    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch main product details
                const productResponse = await fetch(`${API_BASE_URL}/api/products/${resolvedParams.id}`);
                if (!productResponse.ok) throw new Error(`Product fetch failed: ${productResponse.status}`);
                const productData = await productResponse.json();
                setProduct(productData);

                // Fetch related recommendations
                const recsResponse = await fetch(`${API_BASE_URL}/api/recommendations/product/${resolvedParams.id}?user_id=${CURRENT_USER_ID}`);
                if (!recsResponse.ok) throw new Error(`Recommendations fetch failed: ${recsResponse.status}`);
                const recsData = await recsResponse.json();
                setRecommendations(recsData);

            } catch (e) {
                console.error("Failed to fetch product data:", e);
                setError("Could not load product. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        if (resolvedParams?.id) {
            fetchProductData();
        }
    }, [resolvedParams?.id]);

    if (isLoading) {
        return <div className="text-center py-10">Loading product...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500 bg-red-50 p-4 rounded-md">{error}</div>;
    }

    if (!product) return null;

    return (
        <div className="bg-white">
            <div className="pt-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Link 
                        href='/' 
                        className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600"
                    >
                        <ArrowLeftIcon />
                        Back to all products
                    </Link>
                </div>
                {/* Product info */}
                <div className="max-w-2xl mx-auto px-4 pt-10 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:row-span-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
                        <div className="mt-10">
                            <button
                                type="submit"
                                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add to bag
                            </button>
                        </div>
                    </div>
                    <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <div>
                            <h3 className="sr-only">Description</h3>
                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-3 w-full">
                        <RecommendationCarousel title="Customers Also Bought" products={recommendations.also_bought} setView={setView} />
                    </div>
                </div>
            </div>
        </div>
    );
}