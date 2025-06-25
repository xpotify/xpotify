const genre = document.getElementsByClassName("tomBtns");
const greet = document.getElementsByClassName("greetMsg");
const pInstances = document.getElementsByClassName("playlists");
const w1 = document.getElementsByClassName("window1");
const w2 = document.getElementsByClassName("window2");
const w3 = document.getElementsByClassName("window3");
const w4 = document.getElementsByClassName("window4");
const w5 = document.getElementsByClassName("window5");
const fetchedTrack = document.getElementsByClassName("fetchedTrack");
const fetchedPlaylistDiv = document.getElementsByClassName("fetchedPlaylist");

const loadPlaylist = async (id) => {
    w1[0].classList.add("remhide");
    w3[0].classList.add("remHide");
    w4[0].classList.add("remHide");
    w5[0].classList.add("remHide");
    genre[0].classList.add("remHide");
    for(x=0; x < pInstances.length; x++){
        pInstances[x].classList.add("remHide");
    };

    const playlistCover = document.getElementsByClassName("fpCover");
    const playlistName = document.getElementsByClassName("fpName");
    const playlistOwner = document.getElementsByClassName("fpOwner");
    const playlistExtraInfo = document.getElementsByClassName("fpInfo");
    const playlistActions = document.getElementsByClassName("fpActions");

    const playlistTrack = document.querySelectorAll(".fpTrack");
    const playlistTrackContainer = document.querySelector(".fpTracks");

    const requestPlaylistInfo = await fetchPlaylist(id);
    const requestPlaylistTracks = await fetchPlaylistTracks(id);
    const requestPlaylistOwnerDetails = await fetchUser(requestPlaylistInfo.owner.id);

    const hexOfPlaylistCover = await fetchHexOfImage(requestPlaylistInfo.image);
    const whoop2 = document.getElementById("whoop2");

    const fetchedTrack = document.getElementsByClassName("fetchedTrack");

    fetchedTrack[0].style.display = "none";
    fetchedPlaylistDiv[0].style.display = "flex";

    try{
        playlistCover[0].children[0].src = requestPlaylistInfo.image;
        playlistCover[0].children[0].style.filter = `drop-shadow(0px 0px 250px ${hexOfPlaylistCover})`;
        playlistName[0].innerText = requestPlaylistInfo.name;
        playlistOwner[0].children[0].src = requestPlaylistOwnerDetails.images[0].url;
        playlistOwner[0].children[1].innerText = requestPlaylistOwnerDetails.displayName;
        playlistOwner[0].children[1].setAttribute("data-uid", `${requestPlaylistInfo.owner.id}`);
        playlistOwner[0].children[1].addEventListener("click", () => {
            loadUser(playlistOwner[0].children[1].dataset.uid);
        });
        playlistExtraInfo[0].children[0].style.display = "block";
        playlistExtraInfo[0].children[1].style.display = "block";
        playlistExtraInfo[0].children[0].innerText = `${requestPlaylistTracks.length} songs`;
        playlistExtraInfo[0].style.flexDirection = "column";

        whoop2.style.display = "none";

        playlistExtraInfo[0].children[1].style.display = "block";

        let tDr = 0;

        for(x=0; x < requestPlaylistTracks.length; x++){
            tDr = tDr + requestPlaylistTracks[x].track.duration;
        };

        playlistExtraInfo[0].children[1].innerText = `${calculateDuration(tDr)}`;

        playlistActions[0].children[0].setAttribute("data-pId", requestPlaylistInfo.id);
        playlistActions[0].children[2].setAttribute("datapId", requestPlaylistInfo.id);

        if(playlistTrack.length == 0){
            // Do nothing
        } else {
            playlistTrack.forEach(el => {
                el.remove();                
            });
        };

        if(playlistTrack.length > 1){
            for(i=0; i < requestPlaylistTracks.length; i++){
                let fpTrack = document.createElement("div");
                fpTrack.className = 'fpTrack';
                let fpTDiscNumber = document.createElement("div");
                fpTDiscNumber.className = "fpTDiscNumber";
                fpTDiscNumber.innerText = `${requestPlaylistTracks[i].discNumber}`;
                let fpTCover = document.createElement("div");
                fpTCover.className = "fpTCover";
                let img = document.createElement("img");
                img.src = `${requestPlaylistTracks[i].track.album.images[2].url}`
                let fpTna = document.createElement("fpTna");
                fpTna.className = "fpTna";
                let span1 = document.createElement("span");
                span1.innerText = `${requestPlaylistTracks[i].track.name}`;
                span1.setAttribute("data-id", `${requestPlaylistTracks[i].track.id}`);
                let span2 = document.createElement("span");
                span2.innerText = `${requestPlaylistTracks[i].track.artists[0].name}`;
                span2.setAttribute("data-aid", `${requestPlaylistTracks[i].track.artists[0].id}`);
                let fpTDuration = document.createElement("fpTDuration");
                fpTDuration.className = "fpTDuration";
                fpTDuration.innerText = `${calculateTime((requestPlaylistTracks[i].track.duration/1000))}`;

                span1.addEventListener("click", () => {
                    loadTrack(span1.dataset.id);
                });

                span2.addEventListener("click", () => {
                    loadArtist(span2.dataset.aid);
                });

                fpTrack.appendChild(fpTDiscNumber);
                fpTrack.appendChild(fpTCover);
                fpTCover.appendChild(img);
                fpTrack.appendChild(fpTna);
                fpTna.appendChild(span1);
                fpTna.appendChild(span2);
                fpTrack.appendChild(fpTDuration);

                // const 

                playlistTrackContainer.appendChild(fpTrack);
            };
        } else {
            console.log("There are no Tracks inside of the Loaded Playlist");
        };

        rightSection.classList.remove("remHide");
        w2[0].classList.remove("remHide");
        navBtnHm.style.backgroundColor = "transparent";
        homeState = false;
    } catch(error){
        console.error(error);
    }
};


const loadTrack = async (id) => {
    genre[0].classList.add("remHide");
    for(x=0; x < pInstances.length; x++){
        pInstances[x].classList.add("remHide");
    };

    w1[0].classList.add("remhide");
    w2[0].classList.add("remHide");
    w3[0].classList.add("remHide");
    w4[0].classList.add("remHide");
    w5[0].classList.add("remHide");

    const playlistCover = document.getElementsByClassName("trackfpCover");
    const playlistName = document.getElementsByClassName("trackfpName");
    const playlistOwner = document.getElementsByClassName("trackfpOwner");
    const playlistExtraInfo = document.getElementsByClassName("trackfpInfo");

    const playlistTrack = document.querySelectorAll(".fpTrack");
    const playlistTrackContainer = document.querySelector(".fpTracks");

    const requestTrackInfo = await fetchTrack(id);
    const requestArtistInfo = await fetchArtist(requestTrackInfo.artists[0].id);

    const hexOfPlaylistCover = await fetchHexOfImage(requestTrackInfo.album.images[0].url);

    const whoop2 = document.getElementById("whoop2");
    const pDuration = document.getElementById("pDuration");

    const explicitSvg = document.getElementsByClassName("explicitSvg");

    fetchedPlaylistDiv[0].style.display = "none";
    fetchedTrack[0].style.display = "flex";

    try{
        playlistCover[0].children[0].src = requestTrackInfo.album.images[0].url;
        playlistCover[0].children[0].style.filter = `drop-shadow(0px 0px 250px ${hexOfPlaylistCover})`;
        playlistName[0].innerText = requestTrackInfo.name;
        playlistOwner[0].children[0].src = requestArtistInfo.images[0].url;
        playlistOwner[0].children[1].innerText = requestArtistInfo.name;
        playlistOwner[0].children[1].setAttribute("data-uid", `${requestTrackInfo.artists[0].id}`);

        playlistOwner[0].children[1].addEventListener("click", () => {
            loadArtist(playlistOwner[0].children[1].dataset.uid);
        });

        playlistExtraInfo[0].children[0].innerText = `${(requestTrackInfo.album.releaseDate).slice(0,4)}`;
        playlistExtraInfo[0].children[1].style.display = "none";
        playlistExtraInfo[0].style.flexDirection = "row";
        playlistExtraInfo[0].children[1].style.display = "flex";

        whoop2.style.display = "block";
        pDuration.style.display = "none";

        if(requestTrackInfo.explicit == true){
            explicitSvg[0].style.display = "block";
            whoop2.style.display = "block";
        } else {
            explicitSvg[0].style.display = "none";
            whoop2.style.display = "none";
        }

        if(playlistTrack.length == 0){
            // Do nothing
        } else {
            playlistTrack.forEach(el => {
                el.remove();                
            });
        };

        let fpTrack = document.createElement("div");
        fpTrack.className = 'fpTrack';
        let fpTDiscNumber = document.createElement("div");
        fpTDiscNumber.className = "fpTDiscNumber";
        fpTDiscNumber.innerText = `1`;
        let fpTCover = document.createElement("div");
        fpTCover.className = "fpTCover";
        let img = document.createElement("img");
        img.src = `${requestTrackInfo.album.images[2].url}`
        let fpTna = document.createElement("fpTna");
        fpTna.className = "fpTna";
        let span1 = document.createElement("span");
        span1.innerText = `${requestTrackInfo.name}`;
        span1.setAttribute("data-id", `${requestTrackInfo.album.id}`);
        let span2 = document.createElement("span");
        span2.innerText = `${requestTrackInfo.artists[0].name}`;
        span2.setAttribute("data-aid", `${requestTrackInfo.artists[0].id}`);
        let fpTDuration = document.createElement("fpTDuration");
        fpTDuration.className = "fpTDuration";
        fpTDuration.innerText = `${calculateTime((requestTrackInfo.duration/1000))}`;

        span2.addEventListener("click", () => {
            loadArtist(span2.dataset.aid);
        });

        fpTrack.appendChild(fpTDiscNumber);
        fpTrack.appendChild(fpTCover);
        fpTCover.appendChild(img);
        fpTrack.appendChild(fpTna);
        fpTna.appendChild(span1);
        fpTna.appendChild(span2);
        fpTrack.appendChild(fpTDuration);

        playlistTrackContainer.appendChild(fpTrack);

        w2[0].classList.remove("remHide");
        rightSection.classList.remove("remHide");
        navBtnHm.style.backgroundColor = "transparent";
        homeState = false;
    } catch(error){
        console.error(error);
    }
};


const loadArtist = async (id) => {
    genre[0].classList.add("remHide");
    for(x=0; x < pInstances.length; x++){
        pInstances[x].classList.add("remHide");
    };
    w1[0].classList.add("remhide");
    w2[0].classList.add("remHide");
    w5[0].classList.add("remHide");

    const artistData = await fetchArtist(id);
    const artistTopTracks = await fetchArtistTopTracks(id);
    const artistAlbums = await fetchArtistsAlbums(id);
    // console.log(artistData, artistTopTracks, artistAlbums);
    // const relatedArtists = await fetchRelatedArtists(id); Deprecated by official Spotify API
    
    const artistName = document.getElementsByClassName("infName");
    const artistListeners = document.getElementsByClassName("infListeners");
    const artistsTopTracks = document.getElementsByClassName("ATtoptracks");
    const TTracks = document.querySelectorAll(".TTrack");
    const artistsAlbums = document.getElementsByClassName("artistAlbums");
    const artistsRelatedArtists = document.getElementsByClassName("artistRelatedArtists");

    const existingAlbums = document.querySelectorAll(".artistsAlbums .Playlist");
    const artistsAlbumContainer = document.getElementsByClassName("artistsAlbums");

    const artistBackground = document.getElementsByClassName("artistInformation");
    artistBackground[0].style.backgroundImage = "url(/background/black.png)";

    if(artistData && artistTopTracks){
        try{
            TTracks.forEach(el => el.remove());

            artistName[0].children[0].innerText = artistData.name;
            artistListeners[0].innerText = `${(artistData.totalFollowers).toLocaleString()} followers`;

            for(i=0; i < 5; i++){
                const TTrack = document.createElement("div");
                TTrack.className = "TTrack";
                
                const TTcover = document.createElement("div");
                TTcover.className = "TTcover";
                const TTcoverIMG = document.createElement("img");

                const TTinf = document.createElement("div");
                TTinf.className = "TTinf";
                const TTinfName = document.createElement("div");
                TTinfName.className = "TTinfName";
                TTinfName.setAttribute("data-trackid", artistTopTracks[i].songId);
                TTinfName.addEventListener("click", () => {
                    loadTrack(TTinfName.dataset.trackid);
                });

                const TTinfArtists = document.createElement("div");
                TTinfArtists.className = "TTinfArtists";
                const TTduration = document.createElement("div");
                TTduration.className = "TTduration";
                const TTalbum = document.createElement("div");
                TTalbum.className = "TTalbum";
                TTalbum.setAttribute("data-albumid", artistTopTracks[i].album.id);

                const span = document.createElement("span");

                TTcoverIMG.src = artistTopTracks[i].album.img[2].url;
                TTinfName.innerText = artistTopTracks[i].name;
                TTinfName.setAttribute("data-trackid", `${artistTopTracks[i].songId}`);
                
                if(artistTopTracks[i].artists.length > 1){
                    for(x=0; x < artistTopTracks[i].artists.length; x++){
                        const span = document.createElement("span");

                        if(x == (artistTopTracks[i].artists.length - 1)){
                            span.innerText = artistTopTracks[i].artists[x].name;
                        } else {
                            span.innerText = `${artistTopTracks[i].artists[x].name}, `;
                        }

                        span.setAttribute("data-artistid", `${artistTopTracks[i].artists[x].id}`);
    
                        TTinfArtists.appendChild(span);
                    };
                } else {
                    const span = document.createElement("span");
                    span.innerText = artistTopTracks[i].artists[0].name;
                    span.setAttribute("data-artistid", `${artistTopTracks[i].artists[0].id}`);
    
                    TTinfArtists.appendChild(span);
                };

                TTduration.innerText = calculateTime((artistTopTracks[i].duration)/1000);
                span.innerText = artistTopTracks[i].album.name;
                span.setAttribute("data-albumid", artistTopTracks[i].album.id);

                TTrack.appendChild(TTcover);
                TTcover.appendChild(TTcoverIMG);
                TTrack.append(TTinf);
                TTinf.appendChild(TTinfName);
                TTinf.appendChild(TTinfArtists);
                TTrack.appendChild(TTduration);
                TTrack.appendChild(TTalbum);
                TTalbum.appendChild(span);

                artistsTopTracks[0].appendChild(TTrack);
            };
        } 
        catch(err){
            console.error(err);
        }
    } else {
        console.log("Error: Couldn't fetch target Artist" + "(" + id + ")");
    }

    if(artistsAlbums){
        try{
            existingAlbums.forEach(el => el.remove());

            for(i=0; i < artistAlbums.length; i++){
                const li = document.createElement('li');
                li.className = "Playlist";

                const playlistCover = document.createElement("div");
                playlistCover.className = "playlistCover";

                const playlistCoverImage = document.createElement("img");
                playlistCoverImage.className = "playlistCoverImage";
                
                const playlistPlayBtn = document.createElement("img");
                playlistPlayBtn.className = "playlistPlayBtn";


                const playlistInfo = document.createElement("div");
                playlistInfo.className = "PlaylistInfo";

                const playlistName = document.createElement("div");
                playlistName.className = "PlaylistName";

                const span = document.createElement("span");
                span.setAttribute("data-albumid", artistAlbums[i].id);
                span.addEventListener("click" , () => {
                    loadAlbum(span.dataset.albumid);
                });
                
                const playlistExInf = document.createElement("div");
                playlistExInf.className = "PlaylistExtInf";

                const PlaylistType = document.createElement("div");
                PlaylistType.className = "PlaylistType";


                playlistCoverImage.src = artistAlbums[i].images[1].url;
                playlistPlayBtn.src = "/icons/playyy.svg";

                span.innerText = artistAlbums[i].name;

                if(artistAlbums[i].albumType == "single"){
                    PlaylistType.innerText = `Single • ${artistAlbums[i].releaseDate.slice(0, 4)}`;
                } else {
                    PlaylistType.innerText = `Album • ${artistAlbums[i].releaseDate.slice(0, 4)}`;
                }

                playlistCover.addEventListener("mouseenter", () => {
                    playlistPlayBtn.classList.add("playBtn");
                    playlistCoverImage.classList.add("opac65");
                });

                playlistCover.addEventListener("mouseleave", () => {
                    playlistPlayBtn.classList.remove("playBtn");
                    playlistCoverImage.classList.remove("opac65");
                });


                li.appendChild(playlistCover);
                playlistCover.appendChild(playlistCoverImage);
                playlistCover.appendChild(playlistPlayBtn);
                
                li.appendChild(playlistInfo);
                playlistInfo.appendChild(playlistName);
                playlistName.appendChild(span);
                playlistInfo.appendChild(playlistExInf);
                playlistExInf.appendChild(PlaylistType);

                artistsAlbumContainer[0].appendChild(li);
            };

            const playlistInsideOfArtistPage = document.getElementsByClassName("artistAlbumsP");

            w3[0].classList.remove("remHide");
            rightSection.classList.add("remHide");
            navBtnHm.style.backgroundColor = "transparent";
            playlistInsideOfArtistPage[0].classList.remove("remHide");
            homeState = false;
        } catch(err){   
            console.log(err);
        }
    }

    const artistBackgroundImage = await fetchArtistBackground(id);
    // const hex = await fetchHexOfImage(artistBackgroundImage);
    artistBackground[0].style.backgroundImage = `url(${artistBackgroundImage})`;
    // artistBackground[0].style.boxShadown = `${hex} 0 0 100px`;
};


const loadAlbum = async (id) => {
    genre[0].classList.add("remHide");
    for(x=0; x < pInstances.length; x++){
        pInstances[x].classList.add("remHide");
    };
    
    w1[0].classList.add("remhide")
    w3[0].classList.add("remHide");
    w5[0].classList.add("remHide");
    rightSection.classList.remove("remHide");

    const playlistCover = document.getElementsByClassName("fpCover");
    const playlistName = document.getElementsByClassName("fpName");
    const playlistOwner = document.getElementsByClassName("fpOwner");
    const playlistExtraInfo = document.getElementsByClassName("fpInfo");

    const playlistTrack = document.querySelectorAll(".fpTrack");
    const playlistTrackContainer = document.querySelector(".fpTracks");

    const requestAlbumInfo = await fetchAlbum(id);
    const requestAlbumOwnerDetails = await fetchArtist(requestAlbumInfo.metadata[0].artist[0].id);

    const hexOfPlaylistCover = await fetchHexOfImage(requestAlbumInfo.metadata[0].images[1].url);
    const whoop2 = document.getElementById("whoop2");
 
    const fetchedTrack = document.getElementsByClassName("fetchedTrack");

    fetchedTrack[0].style.display = "none";
    fetchedPlaylistDiv[0].style.display = "flex";

    try{
        playlistCover[0].children[0].src = requestAlbumInfo.metadata[0].images[1].url;
        playlistCover[0].children[0].style.filter = `drop-shadow(0px 0px 250px ${hexOfPlaylistCover})`;
        playlistName[0].innerText = requestAlbumInfo.metadata[0].albumName;
        playlistOwner[0].children[0].src = requestAlbumOwnerDetails.images[0].url;
        playlistOwner[0].children[1].innerText = requestAlbumOwnerDetails.name;
        playlistOwner[0].children[1].setAttribute("data-uid", `${requestAlbumOwnerDetails.id}`);

        playlistOwner[0].children[1].addEventListener("click", () => {
            loadArtist(playlistOwner[0].children[1].dataset.uid);
        });

        playlistExtraInfo[0].children[0].style.display = "block";
        playlistExtraInfo[0].children[1].style.display = "block";

        if(requestAlbumInfo.metadata[0].totalTracks > 1){
            playlistExtraInfo[0].children[0].innerText = `${requestAlbumInfo.metadata[0].totalTracks} songs`;
        } else {
            playlistExtraInfo[0].children[0].innerText = `${requestAlbumInfo.metadata[0].totalTracks} song`;
        }

        playlistExtraInfo[0].style.flexDirection = "column";

        whoop2.style.display = "none";

        playlistExtraInfo[0].children[1].style.display = "block";

        let tDr = 0;

        for(x=0; x < requestAlbumInfo.tracks.length; x++){
            tDr = tDr + requestAlbumInfo.tracks[x].trackDuration;
        };

        console.log(tDr);

        playlistExtraInfo[0].children[1].innerText = `${calculateDuration(tDr)}`;

        if(playlistTrack.length == 0){
            // Do nothing
        } else {
            playlistTrack.forEach(el => {
                el.remove();                
            });
        };

        for(i=0; i < requestAlbumInfo.tracks.length; i++){
            let fpTrack = document.createElement("div");
            fpTrack.className = 'fpTrack';
            let fpTDiscNumber = document.createElement("div");
            fpTDiscNumber.className = "fpTDiscNumber";
            fpTDiscNumber.innerText = `${requestAlbumInfo.tracks[i].trackId}`;
            let fpTCover = document.createElement("div");
            fpTCover.className = "fpTCover";
            let img = document.createElement("img");
            img.src = `${requestAlbumInfo.metadata[0].images[2].url}`
            let fpTna = document.createElement("fpTna");
            fpTna.className = "fpTna";
            let span1 = document.createElement("span");
            span1.innerText = `${requestAlbumInfo.tracks[i].trackName}`;
            span1.setAttribute("data-id", `${requestAlbumInfo.tracks[i].id}`);
            let span2 = document.createElement("span");
            span2.innerText = `${requestAlbumInfo.metadata[0].artist[0].name}`;
            span2.setAttribute("data-aid", `${requestAlbumInfo.metadata[0].artist[0].id}`);
            let fpTDuration = document.createElement("fpTDuration");
            fpTDuration.className = "fpTDuration";
            fpTDuration.innerText = `${calculateTime((requestAlbumInfo.tracks[i].trackDuration/1000))}`;

            span1.addEventListener("click", () => {
                loadTrack(span1.dataset.id);
            });

            span2.addEventListener("click", () => {
                loadArtist(span2.dataset.aid);
            });

            fpTrack.appendChild(fpTDiscNumber);
            fpTrack.appendChild(fpTCover);
            fpTCover.appendChild(img);
            fpTrack.appendChild(fpTna);
            fpTna.appendChild(span1);
            fpTna.appendChild(span2);
            fpTrack.appendChild(fpTDuration);

            playlistTrackContainer.appendChild(fpTrack);
        };

        w2[0].classList.remove("remHide");
        navBtnHm.style.backgroundColor = "transparent";
        homeState = false;
    } catch(error){
        console.error(error);
    }
};

const loadUser = async (id) => {
    genre[0].classList.add("remHide");
    for(x=0; x < pInstances.length; x++){
        pInstances[x].classList.add("remHide");
    };
    
    w1[0].classList.add("remhide")
    w3[0].classList.add("remHide");
    w2[0].classList.add("remHide");
    w5[0].classList.add("remHide");
    rightSection.classList.add("remHide");

    const userData = await fetchUser(id);
    const usersPlaylist = await fetchUsersPlaylist(id);
    
    const userInfoContainer = document.getElementsByClassName("userInformation");
    const userPfp = document.getElementsByClassName("userPfp");
    const userPlaylistContainer = document.getElementsByClassName("userPlaylists");
    const userplaylists = document.getElementsByClassName("userPlaylists");
    const defaultPlaylists = document.querySelectorAll(".userPlaylists .Playlist");
    const userPlaylists = document.getElementsByClassName("userplaylists");

    const userPfpHex = await fetchHexOfImage(userData.images[0].url);
    
    if(userData){
        try{
            userInfoContainer[0].children[0].children[1].children[0].innerText = userData.displayName;
            userInfoContainer[0].children[0].children[2].innerText = `${usersPlaylist.length} public playlists`;
            userInfoContainer[0].children[1].children[0].src = userData.images[0].url;
        } catch(err) { 
            console.log(err);
        };
    } else {
        console.log(`User with ID:${id} was not found`); 
    }

    if(usersPlaylist){
        try{
            defaultPlaylists.forEach(el => el.remove());
            for(i=0; i < usersPlaylist.length; i++){
                const li = document.createElement('li');
                li.className = "Playlist";

                const playlistCover = document.createElement("div");
                playlistCover.className = "playlistCover";

                const playlistCoverImage = document.createElement("img");
                playlistCoverImage.className = "playlistCoverImage";
                
                const playlistPlayBtn = document.createElement("img");
                playlistPlayBtn.className = "playlistPlayBtn";


                const playlistInfo = document.createElement("div");
                playlistInfo.className = "PlaylistInfo";

                const playlistName = document.createElement("div");
                playlistName.className = "PlaylistName";

                const span = document.createElement("span");
                span.setAttribute("data-albumid", usersPlaylist[i].id);
                span.addEventListener("click" , () => {
                    loadPlaylist(span.dataset.albumid);
                });
                
                const playlistExInf = document.createElement("div");
                playlistExInf.className = "PlaylistExtInf";

                const PlaylistType = document.createElement("div");
                PlaylistType.className = "PlaylistType";

                playlistCoverImage.src = usersPlaylist[i].images[0].url;
                playlistPlayBtn.src = "/icons/playyy.svg";

                span.innerText = usersPlaylist[i].name;


                playlistCover.addEventListener("mouseenter", () => {
                    playlistPlayBtn.classList.add("playBtn");
                    playlistCoverImage.classList.add("opac65");
                });

                playlistCover.addEventListener("mouseleave", () => {
                    playlistPlayBtn.classList.remove("playBtn");
                    playlistCoverImage.classList.remove("opac65");
                });


                li.appendChild(playlistCover);
                playlistCover.appendChild(playlistCoverImage);
                playlistCover.appendChild(playlistPlayBtn);
                
                li.appendChild(playlistInfo);
                playlistInfo.appendChild(playlistName);
                playlistName.appendChild(span);
                playlistInfo.appendChild(playlistExInf);
                playlistExInf.appendChild(PlaylistType);

                userPlaylistContainer[0].appendChild(li);
            };

            w4[0].classList.remove("remHide");
            userPlaylists[0].classList.remove("remHide");
        } catch(err){
            console.log(err);
        };
    } else {
        console.log("User's playlist was not found!");
    };
};
