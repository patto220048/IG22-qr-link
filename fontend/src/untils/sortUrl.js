export const sortUrl=(urlString) =>{
        try {
            const url = new URL(urlString);
            const host = url.hostname
            const queryParams = url.searchParams
            return {host, queryParams}
        } catch (error) {
            console.error('Invalid URL:', error.message);
        }
}

