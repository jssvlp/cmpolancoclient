function env(env) {
    switch (env) {
        case 'api-netcore':
            return 'https://api-constructoramp.azurewebsites.net/api';
        case 'front-admin':
            return 'https://admin-constructoramejiapolanco.azurewebsites.net/';
        case 'local-api':
            return 'http://localhost:61756/api'
    }
}

try{
    module.exports ={
        api: env('api-netcore'),
        admin: env('front-admin'),
        local: env('local-api')
    }
}catch(e){
    console.log(e);
}