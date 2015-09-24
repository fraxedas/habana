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
            name: 'Twitter',
            url: '/oauth/twitter/auth'                
        },
        {
            name: 'Facebook',
            url: '/oauth/facebook/auth'                
        },
        {
            name: 'Fake',
            url: '/oauth/fake/auth'                
        }
    ];

})(module.exports);