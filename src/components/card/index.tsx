import styled from 'styled-components'
import reactStringReplace from 'react-string-replace'
import Link from 'next/link'

const StyledDiv = styled.div`
  width: 1080px;
  margin: 10px auto;
`
const StyledSpan = styled.span`
  display: block;
  white-space: pre-wrap;
  margin: 12px 0;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`

type CardProps = {
  title: string,
  text: string
}

const Card = (props: CardProps) => {
  const { title, text} = props
  return (
    <StyledDiv>
      <h3>{title}</h3>
      <StyledSpan>
        {reactStringReplace(text, /(https?:\/\/\S+)/g, (url) => (
        <Link href={url}>{url}</Link>
      ))}
      </StyledSpan>
    </StyledDiv>
  )
}

export default Card