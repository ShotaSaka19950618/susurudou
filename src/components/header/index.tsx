import { useRouter } from 'next/router'
import styled from 'styled-components'

// ヘッダーの下地
const HeaderRoot = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;
  @media screen and (max-width: 640px) {
    background-color: orange;
  }
  @media screen and (min-width: 641px) and (max-width: 1007px){
    background-color: blue;
  }
  @media screen and (min-width: 1008px) {
    background-color: red;
  }
`

//
const Nav = styled.div`
  color: white;
  width: 375px;
  height: 80px;
  padding-top: 20px;
  padding-left: 50px;
  text-align: left;
  cursor: pointer;
`

const NavTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
`

const NavText = styled.p`
  font-size: 12px;
`

// ヘッダー
const Header = () => {
  const router = useRouter();
  const clickNav = () => router.push('/')

  return (
    <HeaderRoot>
      <Nav onClick={clickNav}>
        <NavTitle>
          SUSURU道
        </NavTitle>
        <NavText>
          SUSURU TV.で紹介された店舗をまとめたサイトです。
        </NavText>
      </Nav>
    </HeaderRoot>
  )
}

export default Header