import data from "../data.js"

//The single function
const renderAlbumPage = (id, albumID) => {
    const band = data.find(data => data.id === id);
    const album = band.topAlbums.find(album =>  album.id === albumID);
    return(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Task-5</title>

            <!-- Note that the path is root-relative with respect to our server; it uses the route handler you just wrote! -->
            <link rel="stylesheet" href="/pages/style.css">
        </head>
        <body>
            <h1>${album.name}</h1>
            <p> Artist: ${band.name}</p>
            <p>Released in: ${album.year}</p>
        </body>
        </html>`);
        
}

export default renderAlbumPage;