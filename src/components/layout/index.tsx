import { ReactNode } from 'react'
import Header from '../header'
import styled from 'styled-components'

const Main = styled.main`
  margin: 0 auto;
  padding: 150px 100px;
  min-height: 100vh;
  color: #000;
`

const Layout = ({ children }: {
  children?: ReactNode
}) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  )
}

export default Layout