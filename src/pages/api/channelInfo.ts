import axios from 'axios'
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.CHANNEL_ID

const getChannelInfo = async () => {
  const channelInfo = await axios.get(
    "https://www.googleapis.com/youtube/v3/channels?part=" +
    "snippet, brandingSettings, statistics" +
    "&id=" +
    CHANNEL_ID +
    "&key=" +
    YOUTUBE_API_KEY
  ).then(res => res.data.items[0])
  return channelInfo
}

export default getChannelInfo