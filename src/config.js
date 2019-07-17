function env(env) {
    switch (env) {
        case 'api-netcore':
            return 'https://api-brick.azurewebsites.net/api';
        case 'front-admin':
            return 'https://admin-brick.azurewebsites.net/';
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