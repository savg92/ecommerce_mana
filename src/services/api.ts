import axios from 'axios';
import { Product } from '@/types';
import { AxiosError } from 'axios';

const API_URL = 'https://fakestoreapi.com';

// Create axios instance with base configuration
const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

const handleApiError = (error: AxiosError) => {
	console.error('API Error:', error);
	if (error.response) {
		console.error('Response data:', error.response.data);
		console.error('Response status:', error.response.status);
	} else if (error.request) {
		console.error('Request error:', error.request);
	} else {
		console.error('Error message:', error.message);
	}
	throw error;
};

// Get all products
const getProducts = async (): Promise<Product[]> => {
	try {
		const response = await api.get<Product[]>('/products');
		return response.data;
	} catch (error) {
		return handleApiError(error as AxiosError);
	}
};

// Get a single product by ID
const getProductById = async (id: number | string): Promise<Product> => {
	try {
		const response = await api.get<Product>(`/products/${id}`);
		return response.data;
	} catch (error) {
		return handleApiError(error as AxiosError);
	}
};

// Get products by category
const getProductsByCategory = async (
	category: string
): Promise<Product[]> => {
	try {
		const response = await api.get<Product[]>(`/products/category/${category}`);
		return response.data;
	} catch (error) {
		return handleApiError(error as AxiosError);
	}
};

// Get all categories
const getCategories = async (): Promise<string[]> => {
	try {
		const response = await api.get<string[]>('/products/categories');
		return response.data;
	} catch (error) {
		return handleApiError(error as AxiosError);
	}
};

export { getProducts, getProductById, getProductsByCategory, getCategories };