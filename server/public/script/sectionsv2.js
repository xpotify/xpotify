const genre = document.getElementsByClassName("tomBtns");
const greet = document.getElementsByClassName("greetMsg");
const pInstances = document.getElementsByClassName("playlists");
const w1 = document.getElementsByClassName("window1");
const w2 = document.getElementsByClassName("window2");

const loadPlaylist = async (id) => {
    const playlistCover = document.getElementsByClassName("fpCover");
    const playlistName = document.getElementsByClassName("fpName");
    const playlistOwner = document.getElementsByClassName("fpOwner");
    const playlistExtraInfo = document.getElementsByClassName("fpInfo");

    const playlistTrack = document.querySelectorAll(".fpTrack");
    const playlistTrackContainer = document.querySelector(".fpTracks");

    const requestPlaylistInfo = await fetchPlaylist(id);
    const requestPlaylistTracks = await fetchPlaylistTracks(id);
    const requestPlaylistOwnerDetails = await fetchUser(requestPlaylistInfo.owner.id);

    try{
        playlistCover[0].children[0].src = requestPlaylistInfo.image;
        playlistName[0].innerText = requestPlaylistInfo.name;
        playlistOwner[0].children[0].src = requestPlaylistOwnerDetails.images[0].url;
        playlistOwner[0].children[1].innerText = requestPlaylistOwnerDetails.displayName;
        playlistOwner[0].children[1].setAttribute("data-uid", `${requestPlaylistInfo.owner.id}`);
        playlistExtraInfo[0].children[0].innerText = `${requestPlaylistTracks.length} songs`;

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

        genre[0].classList.add("remHide");
        for(x=0; x < pInstances.length; x++){
            pInstances[x].classList.add("remHide");
        };
        w1[0].classList.add("remhide")
        w2[0].classList.remove("remHide");
    } catch(error){
        console.error(error);
    }
};