(function(data){

    data.author = {
        name: 'Oscar Fraxedas', 
        email: 'fraxedas@gmail.com',
        website: 'https://github.com/fraxedas'
    };

    data.providers = [
        {
            name: 'Google',
            url: '/oauth/google/auth'                
        },
        {
            name: 'Facebook',
            url: '/oauth/facebook/auth'                
        }
    ];

})(module.exports);