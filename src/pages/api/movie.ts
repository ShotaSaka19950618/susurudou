import axios from 'axios'
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

const getMovie = async (
  id: string | string[] | undefined
) => {
  //動画取得
  const movie = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos?part=" +
    "id,snippet,contentDetails,status" +
    "&id=" +
    id +
    "&key=" +
    YOUTUBE_API_KEY
  ).then(res => res.data.items[0])

  return movie
}

export default getMovie