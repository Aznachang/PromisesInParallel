const ajaxCall = url => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();

    // MDN - Standard Native JavaScript AJAX Call
    xhttp.open("GET", url);
    xhttp.onload = () => resolve(xhttp.responseText);
    xhttp.onerror = () => reject(xhttp.statusText);
    xhttp.send();
  });
}

// GET - Posts, Albums, Photos
const postsURL = `https://jsonplaceholder.typicode.com/users/1/posts`,
  albumsURL = `https://jsonplaceholder.typicode.com/users/1/albums`,
  photosURL = `https://jsonplaceholder.typicode.com/albums/1/photos`;

// Cache DIV Elements for - Post, Albums, Photos
let postsDIV = document.getElementById('posts'),
  albumsDIV = document.getElementById('albums'),
  photosDIV = document.getElementById('photos');

const getPosts = (post) => {
  let newPostDIV = `
  <div class='post'>
    <span><b>Title: </b>${post.title}</span>
    <span><b>Body: </b>${post.body}</span>    
  </div>
  `;

  postsDIV.innerHTML += newPostDIV; 
}

const getAlbums = (album) => {
  let newAlbumDIV = `
  <div class='album'>
    <span><b>Song Track #</b>${album.id}</span>
    <span><b>Title: </b>${album.title}</span>
  </div>
  `;

  albumsDIV.innerHTML += newAlbumDIV;
}

const getPhotos = (photo) => {
  let newPhotoDIV = `
  <div class='post'>
    <span><b>Photo #: </b>${photo.id}</span>
    <span><b>Title: </b>${photo.title}</span>    
  </div>
  `;

  photosDIV.innerHTML += newPhotoDIV;
}

// Function that returns Promise.all operation
const getJSONPlaceHolder = () =>
  // three promises - posts, albums, photos
  Promise.all([
    ajaxCall(postsURL),
    ajaxCall(albumsURL),
    ajaxCall(photosURL)
  ])
    // results - [ [{posts..}], [{albums..}], [{photos..}]]
    .then(results => {
      /* Destructure Results - ES6
        * posts - results[0], albums - results[1], etc.. */
      let [posts, albums, photos] = results;

      let data = {
        posts: JSON.parse(posts),
        albums: JSON.parse(albums),
        photos: JSON.parse(photos)
      }
      
      // MAP Posts to postsDIV 
      data.posts.map(post => getPosts(post));
      // MAP Albums to albumsDIV
      data.albums.map(album => getAlbums(album));
      // MAP Photos to photosDIV
      data.photos.map(photo => getPhotos(photo));
    })
    // error-handling
    .catch(err => {
      console.log(`error is: ${err}`);
    });

// Invoke Three Promises in Parallel
getJSONPlaceHolder();
