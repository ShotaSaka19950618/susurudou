import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext
} from 'next'
import Head from 'next/head'
import getMovie from 'services/movie/get-movie'
import MovieTitle from 'components/movietitle'
import MoviePlayer from 'components/movieplayer'
import Card from 'components/card'
import BackToTop from 'components/scrolltop'
import type { Movie } from 'types'

// API
// リクエスト数で課金されるのが怖いため、5件取得版を使用
import getMovieList from 'services/movie/get-movielist'
import getMovieList5 from 'services/movie/get-movielist5'

export const getStaticPaths: GetStaticPaths = async () => {
  //動画内容取得
  const movieList = await getMovieList()
  const paths = movieList.map((movie: Movie) => `/movie/${movie.id}`)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({
  params
}: GetStaticPropsContext) => {

  if (!params) {
    throw new Error('params is undefined')
  }

  const movieId: string | string[] | undefined = params.id
  const movie = await getMovie(movieId)

  return {
    props: {
      movie
    },
    revalidate: 60 * 60 * 24,
  }
}

type MoviePageProps = InferGetStaticPropsType<typeof getStaticProps>

const MoviePage: NextPage<MoviePageProps> = (props) => {
  const { movie } = props
  const url = `https://www.youtube.com/watch?v=${movie.id}`
  return (
    <BackToTop>
      <>
        <Head>
          <title>SUSURU道</title>
        </Head>
        <MovieTitle
          title={movie.snippet.title}
          date={movie.snippet.publishedAt}
        />
        <MoviePlayer id={movie.id}/>
        <Card
          title="動画URL"
          text={url}
        />
        <Card
          title="動画概要"
          text={movie.snippet.description}
        />
      </>
    </BackToTop>
  )
}

export default MoviePage