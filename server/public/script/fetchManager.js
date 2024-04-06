const getArtist = async (artistName) => {
    var artist = await fetchArtist(artistName);
    let artistId = artist[0].id;
    var artistTopTracks = await fetchArtistTopTracks(artistId);

    console.log(artist[0], artistTopTracks);
    return artist[0], artistTopTracks;
};