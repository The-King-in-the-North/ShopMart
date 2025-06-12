# main.py
# Main entry point for the FastAPI application.
# To run this:
# 1. pip install fastapi uvicorn python-multipart
# 2. uvicorn main:app --reload

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import random

from pydantic import BaseModel
from typing import List

class Product(BaseModel):
    id: int
    name: str
    category: str
    price: float
    imageUrl: str
    description: str

class User(BaseModel):
    id: int
    name: str
    email: str



app = FastAPI(
    title="Shop Mart API",
    description="API for the Shop Mart personalized e-commerce experience.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


# --- Recommendation Logic (Simulated) ---
def get_simulated_recommendations(user_id: int, rec_type: str, count: int) -> List[Product]:
    """
    Simulates a recommendation engine.
    - 'for_you': Randomly selects products, simulating personalized picks.
    - 'trending': Returns the first few products, simulating popular items.
    - 'also_bought': Returns random products, simulating collaborative filtering.
    """
    if user_id not in MOCK_USERS:
        # For prototype purposes, handle unknown users gracefully
        user_id = 1 

    all_products = list(MOCK_PRODUCTS.values())
    
    # Ensure we don't try to sample more products than exist
    if count > len(all_products):
        count = len(all_products)

    if rec_type == 'trending':
        # Simple simulation: trending items are just the first 'count' products
        return all_products[:count]
    else:
        # 'for_you' and 'also_bought' get random items for this simulation
        return random.sample(all_products, count)


# --- API Endpoints ---

@app.get("/", tags=["Status"])
def read_root():
    """Root endpoint to check if the API is running."""
    return {"status": "Shop Mart API is running!"}


@app.get("/api/products", response_model=List[Product], tags=["Products"])
def get_all_products():
    """Retrieves a list of all products in the catalog."""
    return list(MOCK_PRODUCTS.values())


@app.get("/api/products/{product_id}", response_model=Product, tags=["Products"])
def get_product_by_id(product_id: int):
    """Retrieves a single product by its ID."""
    product = MOCK_PRODUCTS.get(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.get("/api/users/{user_id}", response_model=User, tags=["Users"])
def get_user_details(user_id: int):
    """Retrieves details for a single user."""
    user = MOCK_USERS.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.get("/api/recommendations/{user_id}", response_model=Dict[str, List[Product]], tags=["Recommendations"])
def get_recommendations_for_user(user_id: int):
    """
    Gets various types of recommendations for a given user.
    This is the core endpoint for personalization.
    """
    if user_id not in MOCK_USERS:
        raise HTTPException(status_code=404, detail="User not found")

    
    recommendations = {
        "for_you": get_simulated_recommendations(user_id, 'for_you', 8),
        "trending": get_simulated_recommendations(user_id, 'trending', 8),
    }
    return recommendations

@app.get("/api/recommendations/product/{product_id}", response_model=Dict[str, List[Product]], tags=["Recommendations"])
def get_recommendations_for_product(product_id: int, user_id: int = 1):
    """
    Gets recommendations related to a specific product (e.g., "customers also bought").
    """
    if product_id not in MOCK_PRODUCTS:
        raise HTTPException(status_code=404, detail="Product not found")

    recommendations = {
        "also_bought": get_simulated_recommendations(user_id, 'also_bought', 4)
    }
    
    recommendations["also_bought"] = [p for p in recommendations["also_bought"] if p['id'] != product_id]
    return recommendations



MOCK_USERS = {
    1: {"id": 1, "name": "Alex Johnson", "email": "alex@example.com"},
    2: {"id": 2, "name": "Maria Garcia", "email": "maria@example.com"},
}

MOCK_PRODUCTS = {
    1: {
        "id": 1,
        "name": "Classic Denim Jacket",
        "category": "Outerwear",
        "price": 79.99,
        "imageUrl": "https://placehold.co/400x600/3B82F6/FFFFFF?text=Denim+Jacket",
        "description": "A timeless denim jacket made with premium, non-stretch denim. Perfect for layering over any outfit."
    },
    2: {
        "id": 2,
        "name": "Organic Cotton Tee",
        "category": "Tops",
        "price": 24.99,
        "imageUrl": "https://placehold.co/400x600/10B981/FFFFFF?text=Cotton+Tee",
        "description": "An ultra-soft t-shirt made from 100% organic cotton. A versatile wardrobe staple."
    },
    3: {
        "id": 3,
        "name": "Slim-Fit Chinos",
        "category": "Pants",
        "price": 59.99,
        "imageUrl": "https://placehold.co/400x600/F59E0B/FFFFFF?text=Chinos",
        "description": "Comfortable and stylish slim-fit chinos crafted with a bit of stretch for all-day wear."
    },
    4: {
        "id": 4,
        "name": "Leather Ankle Boots",
        "category": "Shoes",
        "price": 129.99,
        "imageUrl": "https://placehold.co/400x600/6366F1/FFFFFF?text=Boots",
        "description": "Sleek and durable ankle boots made from genuine leather, featuring a comfortable block heel."
    },
    5: {
        "id": 5,
        "name": "Wool Scarf",
        "category": "Accessories",
        "price": 39.99,
        "imageUrl": "https://placehold.co/400x600/EF4444/FFFFFF?text=Scarf",
        "description": "A cozy and warm scarf woven from 100% merino wool. Available in multiple colors."
    },
    6: {
        "id": 6,
        "name": "Linen Button-Down",
        "category": "Tops",
        "price": 65.00,
        "imageUrl": "https://placehold.co/400x600/8B5CF6/FFFFFF?text=Linen+Shirt",
        "description": "A breathable and lightweight shirt made from a premium linen blend, perfect for warm weather."
    },
    7: {
        "id": 7,
        "name": "Athletic Joggers",
        "category": "Pants",
        "price": 49.99,
        "imageUrl": "https://placehold.co/400x600/4B5563/FFFFFF?text=Joggers",
        "description": "Performance joggers with moisture-wicking fabric and a tapered fit for the gym or the street."
    },
    8: {
        "id": 8,
        "name": "Minimalist Watch",
        "category": "Accessories",
        "price": 199.99,
        "imageUrl": "https://placehold.co/400x600/D97706/FFFFFF?text=Watch",
        "description": "A sophisticated watch with a minimalist face and a genuine leather strap. Japanese quartz movement."
    }
}
