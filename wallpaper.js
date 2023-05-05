/***********************************
   Wallpaper Module
************************************/
 
xxxxTrim.Wallpaper = ( function( $ ) {
 
 
   // PRIVATE VARS
   //~~~~~~~~~~~~~~~~~~~~~~~~~~~
   var $wallpaperTrigger = {},
       $mainImage = {}
 
   // PRIVATE METHODS
   //~~~~~~~~~~~~~~~~~~~~~~~~~~~
   function _init() {
 
      $wallpaperTrigger = document.getElementById('download-wallpaper');
      $mainImage = document.getElementById('wallpaper-image');
 
      html2canvas($mainImage).then(canvas => {
        const base64 = canvas.toDataURL("image/png");
        _uploadImage(base64);
      });
 
       $wallpaperTrigger.addEventListener('click', (e) => {
          e.preventDefault();
          window.open('/ImageUploads/' + downloadName + '.png');
       })
   }
 
   function _uploadImage (base64) {
       const file = _DataURIToBlob(base64)
       let formData = new FormData();
       formData.append('upload', file, downloadName +'.png');
 
        fetch('https://' + window.location.hostname + '/umbraco/api/imageUpload/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'ApiAccessToken': 'xxxx-xxxx-xxxxx-xxxx'
          }
        });
   }
   
   function _DataURIToBlob (dataURI) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
 
        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)
 
        return new Blob([ia], { type: mimeString })
   }
 
   // PUBLIC METHODS
   //~~~~~~~~~~~~~~~~~~~~~~~~~~~
   return {
 
       init: _init
 
   };
 
})();