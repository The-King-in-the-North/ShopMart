
"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import RecommendationCarousel from '@/components/RecommendationCarousel/RecommendationCarousel';

const API_BASE_URL = 'http://localhost:8000';
const CURRENT_USER_ID = 1; // Simulating a logged-in user


function HomePage({ setView }) {
    const [recommendations, setRecommendations] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/recommendations/${CURRENT_USER_ID}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRecommendations(data);
            } catch (e) {
                console.error("Failed to fetch recommendations:", e);
                setError("Could not load recommendations. Please check if the backend server is running.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (error) {
        return <div className="text-center py-10 text-red-500 bg-red-50 p-4 rounded-md">{error}</div>;
    }

    return (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-12 text-center">
                 <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Welcome, Alex!</h1>
                 <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">Discover fashion curated just for you.</p>
            </div>
            <RecommendationCarousel title="For You" products={recommendations.for_you} setView={setView} />
            <RecommendationCarousel title="Trending Now" products={recommendations.trending} setView={setView} />
        </main>
    );
}

export default function App() {
    const [view, setView] = useState({ page: 'home' });

    // const renderPage = () => {
    //     switch (view.page) {
    //         case 'product':
    //             return <ProductPage productId={view.productId} setView={setView} />;
    //         case 'home':
    //         default:
    //             return <HomePage setView={setView} />;
    //     }
    // };

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header setView={setView} />
            <HomePage setView={setView} />
            <footer className="bg-white mt-16">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
                    &copy; {new Date().getFullYear()} Shop Mart. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
}
