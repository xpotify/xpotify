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