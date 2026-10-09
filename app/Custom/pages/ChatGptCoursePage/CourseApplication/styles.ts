import { styled } from '@linaria/react'
export const ApplicationStyled = styled.dialog`
  width: min(640px, calc(100% - 24px));
  max-height: calc(100dvh - 40px);
  padding: 28px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background: #ffffff;
  color: #252525;
  box-shadow: 0 25px 100px #00000033;
  overflow-y: auto;
  &::backdrop {
    background: #00000099;
  }
  && h2 {
    margin: 10px 25px 18px 0;
    font-size: 1.8rem;
    line-height: 1.2;
  }
  & p {
    font-size: 0.95rem;
  }
  && .eyebrow {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    margin-right: 25px;
  }
  & .close-dialog {
    position: absolute;
    top: 12px;
    right: 12px;
    border: 0;
    border-radius: 50%;
    background: #eeeeee;
    width: 38px;
    height: 38px;
    font-size: 1.5rem;
    cursor: pointer;
  }
  & .order-summary {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    background: #f3f3f3;
    padding: 20px;
    border-radius: 3px;
  }
  & .order-summary b {
    font-size: 1.65rem;
  }
  & .order-summary small {
    grid-column: 1 / -1;
    color: #555555;
  }
  && details {
    margin: 12px 0 22px;
    font-size: 0.85rem;
  }
  & summary {
    cursor: pointer;
  }
  & form > label {
    font-weight: 650;
  }
  & .field-help,
  & .privacy-note,
  & .direct-contact {
    font-size: 0.8rem;
    color: #626262;
  }
  & .field-help {
    margin: 8px 0 12px;
  }
  & textarea {
    width: 100%;
    display: block;
    resize: vertical;
    min-height: 130px;
    padding: 14px;
    background: #fff;
    color: #252525;
    border: 1px solid #999999;
    border-radius: 3px;
  }
  & textarea::placeholder {
    color: #666666;
  }
  & .honey {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
  }
  & .button-primary {
    width: 100%;
  }
  & button {
    cursor: pointer;
  }
  & button:disabled {
    opacity: 0.6;
    cursor: wait;
  }
  & .error {
    background: #fff0e9;
    color: #8d3425;
    border-radius: 3px;
    padding: 14px;
  }
  & .waiting {
    padding: 22px;
    background: #f3f3f3;
    border-radius: 3px;
  }
  & .direct-contact {
    margin: 20px 0 0;
    text-align: center;
  }
  & .success {
    text-align: center;
    padding: 24px 0;
  }
  & .success h2 {
    margin-right: 0;
  }
  & .success-icon {
    display: inline-grid;
    place-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #eeeeee;
    font-size: 2rem;
  }
  @media (min-width: 640px) {
    padding: 40px;
  }
`
