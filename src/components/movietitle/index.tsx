import styled from 'styled-components'

const StyledDiv = styled.div`
  width: 1080px;
  margin: 0 auto;
`
const StyledH1 = styled.h1`
  font-size: 22px;
`
const StyledP = styled.p`
  text-align: right;
`
type MovieTitleProps = {
  title: string,
  date: string
}

const MovieTitle = (props: MovieTitleProps) => {
  const { title, date } = props
  return (
    <StyledDiv>
      <StyledH1>{title}</StyledH1>
      <StyledP>投稿日: {date.substring(0, 10).replaceAll('-','/')}</StyledP>
    </StyledDiv>
  )
}

export default MovieTitle