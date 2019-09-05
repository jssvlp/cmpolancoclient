function env(env) {
    switch (env) {
        case 'api-netcore':
            return 'https://api.constructoramejiapolanco.com/api';
        case 'front-admin':
            return 'https://admin.constructoramejiapolanco.com';
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