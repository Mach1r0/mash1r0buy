import axios from 'axios';

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

export async function fetchLayoutData() {
    try {
        const response = await axios.get(`${apiUrl}/layout?subdomain=supermercado`, {
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = response.data.data;
        return {
            sections: data?.collection_items || [],
            promo: data?.promo || [],
            banners: data?.banners || []
        };
    } catch (error) {
        console.error('Erro ao buscar layout:', error);
        throw error;
    }
}

export async function fetchSections() {
    const layoutData = await fetchLayoutData();
    return layoutData.sections;
}

export async function fetchPromoProducts() {
    const layoutData = await fetchLayoutData();
    return layoutData.promo;
}

export async function fetchProduto(slug) {
    const response = await axios.get(
        `${apiUrl}/item?subdomain=supermercado&slug=${slug}`,
        {
            headers: {
                'Accept': 'application/json'
            }
        }
    );
    return response; 
}