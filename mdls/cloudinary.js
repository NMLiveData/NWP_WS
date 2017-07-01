var cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'livedata', 
  api_key: '755463548195512', 
  api_secret: 'ZwDG_2-2Bna3lEzVMbQMNFChZQI' 
});


cloudinary.uploader.upload("./images/food01.jpg", function(result) { 
  console.log(result) 
});