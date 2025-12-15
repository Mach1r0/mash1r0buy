import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchBanners() {
    try {
        const response = await axios.get(`${apiUrl}/layout?subdomain=supermercado`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        return response.data.data.banners;
    } catch (error) {
        console.error('Erro ao buscar banners:', error);
        throw error;
    }
}
