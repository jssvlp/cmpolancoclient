function env(env) {
    switch (env) {
        case 'api-netcore':
            return 'http://localhost:61756/api';
        case 'front-admin':
            return 'http://localhost:4500';
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