import { styled } from '@linaria/react'

export const LevelBandStyled = styled.div`
  & {
    border-left: 5px solid;
    padding: 8px 0 8px 18px;
    margin: 18px 0;
  }
  &[data-level='beginner'] {
    border-color: #27805b;
  }
  &[data-level='confident'] {
    border-color: #ba790f;
  }
  &[data-level='advanced'] {
    border-color: #7951aa;
  }
  & .level-title {
    display: block;
    font-weight: 700;
  }
  & .level-title + .level-content {
    margin-top: 6px;
  }
  & .level-content > :first-child {
    margin-top: 0;
  }
  & .level-content > :last-child {
    margin-bottom: 0;
  }
  & .level-content {
    line-height: 1.6;
  }
`
