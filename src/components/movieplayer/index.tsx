import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 1080px;
  height: 600px;
  margin: 0 auto;
`

type MoviePlayerProps = {
  id: string
}

const MoviePlayer = (props: MoviePlayerProps) => {
  const { id } = props;
  const url = `https://www.youtube.com/embed/${id}`

  return (
    <StyledDiv>
      <iframe
        width="100%"
        height="100%"
        src={url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture;
        web-share" allowFullScreen
      >
      </iframe>
    </StyledDiv>
  )
}

export default MoviePlayer