import type {
  NextPage,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setChannel, setMovieList } from 'store/channelSlice'
import Head from 'next/head'
import ShopSearch from 'components/shopsearch'
import ShopList from 'components/shoplist'
import BackToTop from 'components/scrolltop'

// API
import getChannel from 'services/channel/get-channel'
// リクエスト数で課金されるのが怖いため、5件取得版を使用
import getMovieList from 'services/movie/get-movielist'
import getMovieList5 from 'services/movie/get-movielist5'

export const getStaticProps: GetStaticProps = async () => {
  // チャンネル情報取得
  const channelInfo = await getChannel();
  // 動画内容取得
  const movieList = await getMovieList();
  return {
    props: {
      channelInfo,
      movieList,
    },
    revalidate: 60 * 60 * 24,
  }
}

type IndexProps = InferGetStaticPropsType<typeof getStaticProps>

const Index: NextPage<IndexProps> = (props) => {
  const { channelInfo, movieList} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChannel(channelInfo));
    dispatch(setMovieList(movieList));
  }, [dispatch, channelInfo, movieList])

  return (
    <BackToTop>
      <>
        <Head>
          <title>SUSURU道</title>
        </Head>
        <ShopSearch />
        <ShopList />
      </>
    </BackToTop>
  )
}

export default Index