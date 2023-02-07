import { setSearchValue } from 'store/channelSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectChannel } from '../../store/channelSlice'
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: right;
`

const StyledInput = styled.input`
  font-size: 25px;
`

const ShopSearch = () => {
  const channel = useSelector(selectChannel)
  const searchValue = channel.searchValue
  const dispatch = useDispatch();

  return (
    <StyledDiv>
      <StyledInput
        type="text"
        value={searchValue}
        placeholder="店舗検索"
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
      />
    </StyledDiv>
  );
}

export default ShopSearch;