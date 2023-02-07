import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectChannel } from '../../store/channelSlice'
import type { Movie } from "../../types/data.d";
import styled from 'styled-components'

const List = styled.div`
  margin: 0 auto;
  width: 100%;
`
const Shop = styled.div`
  border: 1px solid #ccc;
  background: #fff;
  padding: 10px 10px;
  margin: 10px 0;
  min-width: 450px;
  height: 110px;
`
const ImageSpace = styled.div`
  position: relative;
  border: 1px solid #ccc;
  float: left;
  width: 180px;
  height: 110px;
`
const TextTitle = styled.div`
  /* color: #ccc; */
  font-size: 12px;
  font-weight: 400;
  padding-left: 200px;
  padding-bottom: 10px;
  color: #333;
`
const Text = styled.div`
  text-decoration: none;
  font-size: 16px;
  padding-left: 210px;
  padding-bottom: 10px;
  color: #333;

`
const Date = styled.div`
  font-size: 12px;
  text-align: right;
  color: #333;
`

const ShopList = () => {
  const channel = useSelector(selectChannel)
  const movieList = channel.movieList
  const searchValue = channel.searchValue

  return (
    <List>
      {movieList
        .filter((movie: Movie) => {
          const nameMatch = movie.shopName.indexOf(searchValue) !== -1;
          const adressMatch = movie.shopAddress2.indexOf(searchValue) !== -1;
          return nameMatch || adressMatch;
        })
        .map((movie: Movie) => {
          return (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <Shop>
                <ImageSpace>
                <Image
                    src={movie.thumbnails.high.url}
                    alt={movie.shopName}
                    fill
                    priority={true}
                    sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
                  />
                </ImageSpace>
                <TextTitle>店舗名</TextTitle>
                <Text>{movie.shopName}</Text>
                <TextTitle>住所</TextTitle>
                <Text>{movie.shopAddress2}</Text>
                <Date>投稿日: {movie.date.substring(0, 10).replaceAll('-','/')}</Date>
              </Shop>
            </Link>
          )
        }
      )}
    </List>
  )
}

export default ShopList