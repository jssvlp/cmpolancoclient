function env(env) {
    switch (env) {
        case 'production-api':
            return 'https://api.constructoramejiapolanco.com/api';
        case 'front-admi':
            return 'https://admin.constructoramejiapolanco.com';
        case 'client-app':
            return 'https://constructoramejiapolanco.com';
        case 'chat-app':
            return 'https://dashboard.tawk.to/';
        case 'local-api':
            return 'http://localhost:61756/api';
        case 'file-server':
            return 'https://files.constructoramejiapolanco.com';
    }
}

try{
    module.exports ={
        api: env('production-api'),
        admin: env('front-admi'),
        client: env('client-app'),
        chat: env('chat-app'),
        local: env('local-api'),
        fileserver: env('file-server')
    }
}catch(e){
    console.log(e);
}