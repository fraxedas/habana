(function(data){

    data.author = {
        name: 'Oscar Fraxedas', 
        email: 'fraxedas@gmail.com',
        website: 'https://github.com/fraxedas'
    };

    data.providers = [
        {
            name: 'Google',
            url: '/oauth/google/oauth'                
        },
        {
            name: 'Facebook',
            url: '/oauth/facebook/oauth'                
        }
    ];

})(module.exports);