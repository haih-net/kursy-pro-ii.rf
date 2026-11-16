import { styled } from '@linaria/react'
export const CallsStyled = styled.section`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  padding: 24px 16px 64px;
  min-width: 0;
  nav,
  .actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    margin: 16px 0;
  }
  .panel {
    border: 1px solid #d8ddd7;
    background: #fff;
    padding: 20px;
    border-radius: 16px;
    margin: 20px 0;
    min-width: 0;
  }
  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: minmax(0, 1fr);
  }
  video {
    width: 100%;
    max-height: 440px;
    background: #162d26;
    border-radius: 12px;
    object-fit: contain;
  }
  audio {
    width: 100%;
  }
  select,
  input:not([type='checkbox']) {
    max-width: 100%;
    padding: 10px;
    border: 1px solid #c6cec8;
    border-radius: 8px;
    font: inherit;
  }
  label {
    display: block;
    margin: 12px 0;
  }
  label select {
    display: block;
    width: 100%;
    margin-top: 6px;
  }
  meter {
    width: 100%;
    height: 24px;
  }
  [role='alert'] {
    color: #9e2929;
    overflow-wrap: anywhere;
  }
  .hint {
    color: #58665e;
    font-size: 0.9rem;
  }
  .invitation {
    width: 100%;
    box-sizing: border-box;
  }
  @media (min-width: 800px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    padding: 40px 24px 72px;
  }
`

export const CallRoomListStyled = styled.section`
  h2 {
    margin: 0 0 8px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    padding: 12px 0;
  }
  li + li {
    border-top: 1px solid #d8ddd7;
  }
  li:last-child {
    padding-bottom: 0;
  }
  .room-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 16px;
  }
  .room-info {
    flex: 1 1 160px;
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .room-details,
  .room-actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  .room-details {
    margin-top: 4px;
  }
  .room-details span + span::before {
    content: '·';
    margin-right: 8px;
  }
  .room-settings {
    max-width: 560px;
    margin-top: 16px;
  }
  .room-details {
    color: #58665e;
    font-size: 0.9rem;
  }
  .room-confirmation {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  .room-confirmation p {
    flex-basis: 100%;
    margin: 0;
  }
`
