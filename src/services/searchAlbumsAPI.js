// O arquivo searchAlbumsAPI.js contém uma função que faz uma requisição à uma API e retorna os álbuns de uma banda ou artista. Para essa função funcionar, ela recebe como parâmetro uma string, que deve ser o nome da banda ou artista. O retorno dessa função, quando encontra as informações, é um array com cada álbum dentro de um objeto. Atenção: caso não encontre nenhuma informação da banda ou artista, a API retornará um array vazio.

const searchAlbumsAPI = async (artist) => {
  const artistNameURL = encodeURI(artist).replaceAll('%20', '+');

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);

  const { results } = await APIResponse.json();

  const response = results.map(
    ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }) => ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }),
  );
  return response;
};

export default searchAlbumsAPI;
