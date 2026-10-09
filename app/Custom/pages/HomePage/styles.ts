import { styled } from '@linaria/react'

export const HomeStyled = styled.div`
  & .eyebrow {
    font-size: 0.88rem;
    color: #666;
    margin: 0 0 20px;
  }
  & h1 {
    font-size: clamp(2.25rem, 4.6vw, 4.25rem);
    line-height: 1.12;
    letter-spacing: -0.045em;
    font-weight: 650;
    margin: 0 0 30px;
    max-width: 17ch;
  }
  & h2 {
    font-size: clamp(1.8rem, 3.2vw, 2.7rem);
    line-height: 1.2;
    letter-spacing: -0.025em;
    font-weight: 600;
    margin: 0 0 20px;
  }
  & h3 {
    font-size: 1.2rem;
    line-height: 1.4;
    font-weight: 650;
    margin: 0 0 8px;
  }
  & p {
    margin: 0 0 20px;
  }
  & .home-intro {
    display: grid;
    gap: 32px;
    min-height: calc(100svh - 135px);
    align-content: center;
    padding-bottom: 25px;
  }
  & .lead {
    font-size: 1.13rem;
    max-width: 53ch;
  }
  & .offer {
    max-width: 52ch;
    color: #555;
  }
  & .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 30px;
    align-items: center;
    margin-top: 30px;
  }
  & .actions > span {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  & .actions small {
    font-size: 0.8rem;
    color: #666;
  }
  & .mentor-card {
    display: grid;
    grid-template-columns: 110px 1fr;
    align-items: center;
    gap: 20px;
    margin: 0;
  }
  & .portrait {
    display: block;
    width: 110px;
    height: 135px;
    object-fit: cover;
  }
  & figcaption strong,
  & figcaption span {
    display: block;
  }
  & figcaption strong {
    font-size: 0.95rem;
    margin-bottom: 8px;
  }
  & figcaption span,
  & figcaption a {
    font-size: 0.85rem;
  }
  & figcaption span {
    color: #555;
    margin-bottom: 12px;
  }
  & .hero-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid #c9c9c9;
    padding-top: 22px;
  }
  & .hero-footer p {
    font-size: 0.85rem;
    color: #555;
    margin: 0;
  }
  & .hero-footer a {
    font-size: 0.85rem;
  }
  & .program-section,
  & .packages-section,
  & .how-section,
  & .faq {
    border-top: 1px solid #242424;
    padding-top: 35px;
    margin-top: 55px;
  }
  & .section-heading {
    display: grid;
    gap: 8px 40px;
    margin-bottom: 28px;
  }
  & .section-heading p:not(.eyebrow) {
    max-width: 67ch;
    color: #4b4b4b;
  }
  & .text-link {
    display: inline-block;
    padding-block: 6px;
    font-weight: 600;
    text-underline-offset: 5px;
  }
  & .program-list {
    border-top: 1px solid #c9c9c9;
  }
  & .program-row {
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr) auto;
    gap: 14px;
    padding: 19px 0;
    text-decoration: none;
    border-bottom: 1px solid #d9d9d9;
    align-items: baseline;
  }
  & .program-row:hover {
    background: #f5f5f5;
  }
  & .section-number {
    font-size: 0.75rem;
    color: #777;
    font-variant-numeric: tabular-nums;
  }
  & .program-row strong {
    display: block;
    font-size: 1.05rem;
    font-weight: 600;
  }
  & .section-description {
    display: block;
    color: #666;
    font-size: 0.85rem;
    margin-top: 6px;
    max-width: 80ch;
  }
  & .section-hours {
    white-space: nowrap;
    font-size: 0.85rem;
  }
  & .section-hours > span {
    color: #ad3b20;
    margin-left: 10px;
  }
  & .packages {
    border-top: 1px solid #c9c9c9;
  }
  & .packages article {
    display: grid;
    gap: 18px;
    padding: 26px 0;
    border-bottom: 1px solid #d9d9d9;
    align-items: center;
  }
  & .packages p {
    font-size: 0.9rem;
    max-width: 48ch;
    color: #555;
    margin: 0;
  }
  & .package-price strong {
    display: block;
    font-weight: 600;
    font-size: 1.35rem;
  }
  & .package-price span {
    font-size: 0.85rem;
    color: #666;
  }
  & .small-note {
    font-size: 0.85rem;
    color: #666;
    margin-top: 20px;
    max-width: 85ch;
  }
  & .faq details {
    padding: 22px 0;
    border-bottom: 1px solid #d9d9d9;
  }
  & .faq summary {
    font-weight: 600;
    cursor: pointer;
  }
  & .faq details p {
    margin: 16px 0 0;
    max-width: 67ch;
    color: #555;
  }
  @media (min-width: 760px) {
    & .home-intro {
      grid-template-columns: minmax(0, 1fr) 260px;
      gap: 40px 55px;
      padding-top: 15px;
    }
    & .mentor-card {
      display: block;
      align-self: center;
    }
    & .portrait {
      width: 260px;
      height: 315px;
    }
    & figcaption {
      margin-top: 18px;
    }
    & .hero-footer {
      grid-column: 1 / -1;
    }
    & .section-heading {
      grid-template-columns: 220px minmax(0, 1fr);
    }
    & .section-heading > .eyebrow {
      padding-top: 9px;
    }
    & .program-row {
      grid-template-columns: 45px minmax(0, 1fr) auto;
      gap: 22px;
      padding: 22px 0;
    }
    & .packages article {
      grid-template-columns: minmax(0, 1fr) 170px 220px;
      gap: 30px;
    }
    & .faq-content {
      margin-left: 260px;
    }
  }
  @media (min-width: 1100px) {
    & .home-intro {
      grid-template-columns: minmax(0, 1fr) 290px;
      gap: 55px 90px;
    }
    & .portrait {
      width: 290px;
      height: 350px;
    }
  }
`
