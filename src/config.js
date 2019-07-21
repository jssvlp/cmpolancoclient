function env(env) {
    switch (env) {
        case 'api-netcore':
            return 'https://api-constructoramp.azurewebsites.net/api';
        case 'front-admin':
            return 'https://admin-constructoramejiapolanco.azurewebsites.net/';
    }
}

try{
    module.exports ={
        api: env('api-netcore'),
        admin: env('front-admin'),
    }
}catch(e){
    console.log(e);
}