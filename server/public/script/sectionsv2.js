const genre = document.getElementsByClassName("tomBtns");
const greet = document.getElementsByClassName("greetMsg");
const pInstances = document.getElementsByClassName("playlists");
const w1 = document.getElementsByClassName("window1");
const w2 = document.getElementsByClassName("window2");

const calculateDuration = (duration) => {
    let hours = Math.floor((((duration/1000)/60)/60));
    let minutes = (Math.floor(((duration/1000)/60))%60);

    if(hours == 0){
        const durationStr = `${minutes}mintutes`;
        return durationStr;
    } else if(hours > 1){
        const durationStr = `${hours} hours, ${minutes} minutes`;
        return durationStr;
    } else {
        const durationStr = `${hours} hour, ${minutes} minutes`;
        return durationStr;
    };   
};

const loadPlaylist = async (id) => {
    genre[0].classList.add("remHide");
    for(x=0; x < pInstances.length; x++){
        pInstances[x].classList.add("remHide");
    };
    w1[0].classList.add("remhide")

    const playlistCover = document.getElementsByClassName("fpCover");
    const playlistName = document.getElementsByClassName("fpName");
    const playlistOwner = document.getElementsByClassName("fpOwner");
    const playlistExtraInfo = document.getElementsByClassName("fpInfo");

    const playlistTrack = document.querySelectorAll(".fpTrack");
    const playlistTrackContainer = document.querySelector(".fpTracks");

    const requestPlaylistInfo = await fetchPlaylist(id);
    const requestPlaylistTracks = await fetchPlaylistTracks(id);
    const requestPlaylistOwnerDetails = await fetchUser(requestPlaylistInfo.owner.id);

    const hexOfPlaylistCover = await fetchHexOfImage(requestPlaylistInfo.image);

    try{
        playlistCover[0].children[0].src = requestPlaylistInfo.image;
        playlistCover[0].children[0].style.filter = `drop-shadow(0px 0px 250px ${hexOfPlaylistCover})`;
        playlistName[0].innerText = requestPlaylistInfo.name;
        playlistOwner[0].children[0].src = requestPlaylistOwnerDetails.images[0].url;
        playlistOwner[0].children[1].innerText = requestPlaylistOwnerDetails.displayName;
        playlistOwner[0].children[1].setAttribute("data-uid", `${requestPlaylistInfo.owner.id}`);
        playlistExtraInfo[0].children[0].style.display = "block";
        playlistExtraInfo[0].children[1].style.display = "block";
        playlistExtraInfo[0].children[0].innerText = `${requestPlaylistTracks.length} songs`;

        let tDr = 0;

        for(x=0; x < requestPlaylistTracks.length; x++){
            tDr = tDr + requestPlaylistTracks[x].track.duration;
        };

        playlistExtraInfo[0].children[1].innerText = `${calculateDuration(tDr)}`;

        if(playlistTrack.length == 0){
            // Do nothing
        } else {
            playlistTrack.forEach(el => {
                el.remove();                
            });
        };

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
            span1.setAttribute("data-id", `${requestPlaylistTracks[i].track.album.id}`);
            let span2 = document.createElement("span");
            span2.innerText = `${requestPlaylistTracks[i].track.artists[0].name}`;
            span2.setAttribute("data-aid", `${requestPlaylistTracks[i].track.artists[0].id}`);
            let fpTDuration = document.createElement("fpTDuration");
            fpTDuration.className = "fpTDuration";
            fpTDuration.innerText = `${calculateTime((requestPlaylistTracks[i].track.duration/1000))}`;

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


const loadTrack = async (id) => {
    genre[0].classList.add("remHide");
    for(x=0; x < pInstances.length; x++){
        pInstances[x].classList.add("remHide");
    };
    w1[0].classList.add("remhide");

    const playlistCover = document.getElementsByClassName("fpCover");
    const playlistName = document.getElementsByClassName("fpName");
    const playlistOwner = document.getElementsByClassName("fpOwner");
    const playlistExtraInfo = document.getElementsByClassName("fpInfo");

    const playlistTrack = document.querySelectorAll(".fpTrack");
    const playlistTrackContainer = document.querySelector(".fpTracks");

    const requestTrackInfo = await fetchTrack(id);
    const requestArtistInfo = await fetchArtist(requestTrackInfo.artists[0].id);

    const hexOfPlaylistCover = await fetchHexOfImage(requestTrackInfo.album.images[0].url);

    try{
        playlistCover[0].children[0].src = requestTrackInfo.album.images[0].url;
        playlistCover[0].children[0].style.filter = `drop-shadow(0px 0px 250px ${hexOfPlaylistCover})`;
        playlistName[0].innerText = requestTrackInfo.name;
        playlistOwner[0].children[0].src = requestArtistInfo.images[0].url;
        playlistOwner[0].children[1].innerText = requestArtistInfo.name;
        playlistOwner[0].children[1].setAttribute("data-uid", `${requestTrackInfo.artists[0].id}`);
        playlistExtraInfo[0].children[0].innerText = `${(requestTrackInfo.album.releaseDate).slice(0,4)}`;
        playlistExtraInfo[0].children[1].style.display = "none";

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

        fpTrack.appendChild(fpTDiscNumber);
        fpTrack.appendChild(fpTCover);
        fpTCover.appendChild(img);
        fpTrack.appendChild(fpTna);
        fpTna.appendChild(span1);
        fpTna.appendChild(span2);
        fpTrack.appendChild(fpTDuration);

        playlistTrackContainer.appendChild(fpTrack);

        w2[0].classList.remove("remHide");
        navBtnHm.style.backgroundColor = "transparent";
        homeState = false;
    } catch(error){
        console.error(error);
    }
};