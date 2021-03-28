const form = document.querySelector('.search-form');
const cardWrapper = document.querySelector('.cards-wrapper');

const updateUI = data =>{
    cardWrapper.innerHTML = ''
    data.artists.slice(0,7).forEach(item =>{
        const title = item.name;
        const imgURL = item.images[2].url;
        const genres = item.genres.slice(0,3).toString().replace(/,/g,", ");
        const popularity = item.popularity;
        const followerCount = Number(item.followers.total).toLocaleString();
        const artistLink = item.external_urls.spotify;

    cardWrapper.innerHTML += `
    <a href="${artistLink}">
    <div class="element-card">
            <div class="img-wrapper">
                <img src="${imgURL}" alt="artist picture">
            </div>
            <div class="info-wrapper">
                <h3 class="artist-title">${title}</h3>
                <p class="genres"><b>Genres: </b>${genres}</p>
                <p class="popularity"><b>Popularity: </b>${popularity}</p>
                <p class="followers"><b>Followers: </b>${followerCount}</p>
            </div>
        </div>
        </a>
    `
    });

    if(cardWrapper.classList.contains('hidden')){
        cardWrapper.classList.remove('hidden');
    }
};


const getArtistInfo = async(artistName) => {

    const artistId = await getArtistId(artistName);
    const relatedArtists = await getRecomended(artistId);

    return relatedArtists;
}


//User input requests artist
form.addEventListener('submit', e =>{
    e.preventDefault()
    const userArtist = form.textboxArtist.value.replace(/ /g,"+");
    localStorage.setItem('artist',userArtist);

    cardWrapper.innerHTML = '' //clears all previous cards

    getArtistInfo(userArtist)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    form.reset();

});

if(localStorage.getItem('artist')){

    const userArtist = localStorage.getItem('artist');

    form.textboxArtist.value = userArtist.replace(/\+/g," ");

    getArtistInfo(userArtist)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

}

