import axios from 'axios';

// Use dev proxy during development, full URL in production
const apiUrl = process.env.NODE_ENV === 'production' 
  ? import.meta.env.VITE_API_URL 
  : '/api';

export async function fetchBanners() {
    try {
        const response = await axios.get(`${apiUrl}/layout?subdomain=supermercado`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        const banners = response.data.data.banners;
        return banners.filter((banner: any) => banner.is_desktop === true);
    } catch (error) {
        console.error('Erro ao buscar banners:', error);
        throw error;
    }
}

export async function fetchMiniBanners() {
    try {
        const response = await axios.get(`${apiUrl}/layout?subdomain=supermercado`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        const banners =  response.data.data.banners;
        return banners.filter((banner: any) => banner.is_mini === true);
    }
    catch (error) {
        console.error('Erro ao buscar mini bannersr:', error);
        throw error;
    }       
};  

export async function fetchProdutos(slug: string) {
    try {
        const response = await axios.get(
            `${apiUrl}/layout`, 
            {
                headers: {
                    'subdomain': 'supermercado',
                    'Accept': 'application/json',
                    'slug': slug
                }
            }
        );

        return response.data.data.items;

    } catch (error) {
        console.er
        ror('Erro ao buscar produtos:', error);
        throw error;    
    }
}