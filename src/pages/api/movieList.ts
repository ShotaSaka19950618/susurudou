import axios from "axios";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;
const GOOGLE_MAP_API_KEY = process.env.GOOGLE_MAP_API_KEY;

const movieListEdit = async (movieList: any) => {
  const movieListEdited = await Promise.all(
    movieList.filter((movie: any) => {
      return (movie.snippet.description.indexOf('【本日のお店】') !== -1);
    }).filter((movie : any) => {
      return (movie.snippet.description.indexOf('受賞') === -1);
    }).map( async (movie: any) => {
      //動画ID
      const id = movie.contentDetails.videoId;
      //動画投稿日
      const date = movie.snippet.publishedAt
      //動画タイトル
      const title = movie.snippet.title
      //動画概要欄
      const description = movie.snippet.description;
      //動画サムネイル
      const thumbnails = movie.snippet.thumbnails;
      //検索店舗名
      let findNameStart = movie.snippet.description.indexOf('【本日のお店】');
      let findNameEdit = movie.snippet.description.substring(findNameStart).replace('【本日のお店】', '').replace('\n', '').replace('\r', '');
      let findNameEnd = findNameEdit.indexOf('\n', findNameEdit.indexOf('\n'));
      let findName = findNameEdit.substring(0, findNameEnd);
      if(findName.length === 0) {
        findNameEnd = findNameEdit.indexOf('\n', findNameEdit.indexOf('\n') + 1);
        findName = findNameEdit.substring(0, findNameEnd);
      }
      //Google Place Apiから情報取得
      const info: any = await axios.get(
        "https://maps.googleapis.com/maps/api/place/textsearch/json" +
        "?query=" +
        findName +
        "&language=ja" +
        "&key=" +
        GOOGLE_MAP_API_KEY
      ).then(res => res.data.results[0]);
      //店舗名
      //住所
      let shopName;
      let shopAddress1;
      let shopAddress2;
      if(info) {
         shopName = info.name;
         shopAddress1 = info.formatted_address.replace('日本、', '').substring(0, 8);
         shopAddress2 = info.formatted_address.replace('日本、', '').substring(9);
      } else {
        shopName = findName;
        shopAddress1 = "未取得";
        shopAddress2 = "未取得";
      }
      return ({
        id,
        date,
        title,
        description,
        thumbnails,
        shopName,
        shopAddress1,
        shopAddress2,
      })
    })
  )
  return movieListEdited;
}

const getMovieList = async () => {
  //ListId取得
  const listId = await axios.get(
    "https://www.googleapis.com/youtube/v3/channels?part=" +
    "id,contentDetails" +
    "&id=" +
    CHANNEL_ID +
    "&key=" +
    YOUTUBE_API_KEY
  ).then(res => res.data.items[0].contentDetails.relatedPlaylists.uploads);
  //動画一覧取得　※一度に50件までしか取得不可
  let movieList = [];
  let firstList = await axios.get(
    "https://www.googleapis.com/youtube/v3/playlistItems?part=" +
    "snippet,contentDetails" +
    "&playlistId=" +
    listId +
    "&maxResults=50" +
    "&key=" +
    YOUTUBE_API_KEY
  ).then(res => res.data);
  movieList = [...firstList.items];
  //まだ動画があれば次の一覧取得
  let nextPageToken = firstList.nextPageToken
  let strNextPageToken;
  while(nextPageToken != null) {
    strNextPageToken = nextPageToken;
    const nextMovieList = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems?part=" +
      "snippet,contentDetails" +
      "&playlistId=" +
      listId +
      "&maxResults=50" +
      "&pageToken=" +
      nextPageToken +
      "&key=" +
      YOUTUBE_API_KEY
    ).then(res => res.data);
    movieList = [...movieList,...nextMovieList.items];
    if(strNextPageToken === nextMovieList.nextPageToken) {
      nextPageToken = null;
    } else {
      nextPageToken = nextMovieList.nextPageToken;
    }
  }
  const movieListEdited = await movieListEdit(movieList);
      
  return movieListEdited;
}

export default getMovieList;