let IS_PROD = false;
const server = IS_PROD ?
    "https://example.com" :

    "http://localhost:8000"


export default server;
