const parseTrackId = async (link) => {
    return link.slice(31, 53);
};

const parsePlaylistId = async (link) => {
    return link.slice(34, 56);
};

const parseAlbumId = async (link) => {
    return link.slice(31, 53);
};

const parseArtistId = async (link) => {
    return link.slice(32, -26);
};

const calculateDuration = (duration) => {
    let hours = Math.floor((((duration/1000)/60)/60));
    let minutes = (Math.floor(((duration/1000)/60))%60);

    if(hours == 0){
        const durationStr = `${minutes} minutes`;
        return durationStr;
    } else if(hours > 1){
        const durationStr = `${hours} hours, ${minutes} minutes`;
        return durationStr;
    } else {
        const durationStr = `${hours} hour, ${minutes} minutes`;
        return durationStr;
    };   
};