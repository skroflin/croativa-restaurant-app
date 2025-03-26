import api from "./api";

export interface Restaurant {
    id: string;
    name: string;
    address: string;
    rating: number | null;
    user_ratings_total: number | null;
    icon_url: string;
    price_level: number | null;
}

export interface ApiResponse {
    restaurants: Restaurant[];
    currentPage: number;
    totalPages: number;
    totalRestaurants: number;
}

export const fetchRestaurants = async (page: number): Promise<ApiResponse> => {
    try {
        const response = await api.get(`/app/restaurants/sample?page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        throw error;
    }
};