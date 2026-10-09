import { styled } from '@linaria/react'

export const BuilderStyled = styled.section`
  & .course-section {
    margin: 24px 0;
  }
  & .course-section > h3 {
    scroll-margin-top: 24px;
    font-size: 1.1rem;
  }
  & .course-section > h3 span {
    white-space: nowrap;
    color: #626262;
  }
  & .topic-lessons {
    margin: 16px 0 24px;
  }
  & .topic-lessons ol {
    padding-left: 22px;
  }
  & select {
    display: block;
    width: 100%;
    max-width: 100%;
    font: inherit;
    padding: 12px;
    margin-top: 8px;
    border: 1px solid #999999;
    border-radius: 8px;
    background: white;
    color: #292929;
  }
  & .builder-controls {
    display: grid;
    gap: 20px;
    margin: 24px 0;
  }
  & .builder-controls label {
    display: block;
    min-width: 0;
    font-weight: 600;
  }
  & .audience-match {
    color: #ad3b20;
    font-size: 0.85rem;
    font-weight: 700;
  }
  & .level-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 10px;
  }
  & .level-badge {
    border-left: 4px solid;
    padding-left: 6px;
    font-size: 0.75rem;
    font-weight: 500;
  }
  & .level-badge[data-level='beginner'] {
    border-color: #27805b;
  }
  & .level-badge[data-level='confident'] {
    border-color: #ba790f;
  }
  & .level-badge[data-level='advanced'] {
    border-color: #7951aa;
  }
  & .topic-outline h4 {
    font-size: 1rem;
    margin: 0 0 12px;
  }
  & .topic-outline h3 {
    font-size: 1.05rem;
    margin: 0 0 12px;
  }
  & .topic-outline p {
    margin-top: 8px;
  }
  & .presets {
    display: grid;
    gap: 12px;
    margin: 24px 0;
  }
  & button {
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  & .preset {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px;
    text-align: left;
    border: 2px solid #d7d7d7;
    border-radius: 12px;
    background: #fff;
  }
  & .preset[aria-pressed='true'] {
    border-color: #ad3b20;
    background: #f4f4f4;
  }
  & .preset-number {
    font-size: 0.8rem;
    color: #626262;
  }
  & .preset-title {
    font-size: 1.15rem;
    font-weight: 700;
  }
  & .preset-description {
    flex: 1;
    font-size: 0.95rem;
  }
  & .selection-summary {
    display: grid;
    gap: 20px;
    border-radius: 12px;
    padding: 24px;
    background: #292929;
    color: #fff;
  }
  & .selection-summary div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  & .selection-summary span {
    font-size: 0.9rem;
  }
  & .total-price {
    font-size: 1.65rem;
  }
  & .price-note {
    font-size: 0.9rem;
    color: #626262;
  }
  & .selection-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  & .selection-actions button {
    padding: 10px 14px;
    background: #fff;
    border: 1px solid #999999;
    border-radius: 8px;
  }
  & .selection-actions button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  & .foundation-note {
    background: #fff7e6;
    border-left: 3px solid #b77e19;
    padding: 16px;
  }
  & .stage-row {
    --topic-colors: #27805b, #27805b;
    --topic-tints: #27805b0d, #27805b0d;
    position: relative;
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr);
    border: 1px solid #d7d7d7;
    border-radius: 8px;
    margin: 6px 0;
    background: #fff;
  }
  & .stage-row[data-levels='confident'] {
    --topic-colors: #ba790f, #ba790f;
    --topic-tints: #ba790f0d, #ba790f0d;
  }
  & .stage-row[data-levels='advanced'] {
    --topic-colors: #7951aa, #7951aa;
    --topic-tints: #7951aa0d, #7951aa0d;
  }
  & .stage-row[data-levels='beginner confident'] {
    --topic-colors: #27805b, #ba790f;
    --topic-tints: #27805b0d, #ba790f0d;
  }
  & .stage-row[data-levels='confident advanced'] {
    --topic-colors: #ba790f, #7951aa;
    --topic-tints: #ba790f0d, #7951aa0d;
  }
  & .stage-row[data-levels='beginner advanced'] {
    --topic-colors: #27805b, #7951aa;
    --topic-tints: #27805b0d, #7951aa0d;
  }
  & .stage-row[data-levels='beginner confident advanced'] {
    --topic-colors: #27805b, #ba790f, #7951aa;
    --topic-tints: #27805b0d, #ba790f0d, #7951aa0d;
  }
  & .stage-row[data-selected='true'] {
    border-color: #a6afb8;
    background: #f7f7f7;
  }
  & .stage-row[data-selected='true']::before {
    content: '';
    position: absolute;
    inset: -1px auto -1px -1px;
    width: 4px;
    border-radius: 8px 0 0 8px;
    background: linear-gradient(to bottom, var(--topic-colors));
    pointer-events: none;
  }
  & .stage-row input {
    accent-color: #334155;
  }
  & .stage-selection {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 14px;
    cursor: pointer;
  }
  & input {
    width: 20px;
    height: 20px;
    margin: 0;
    accent-color: #ad3b20;
    cursor: pointer;
  }
  & details.stage {
    padding: 0;
    border: 0;
    margin: 0;
    min-width: 0;
  }
  & .stage summary {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 6px 12px;
    align-items: center;
    padding: 12px 12px 12px 0;
    list-style: none;
    font-weight: 400;
    border-radius: 8px;
  }
  & .stage summary:focus-visible,
  & button:focus-visible,
  & input:focus-visible {
    outline: 2px solid #ad3b20;
    outline-offset: 3px;
  }
  & .stage .level-badges {
    grid-column: 1;
  }
  & .stage .audience-match {
    grid-column: 1 / -1;
  }
  & .stage summary::-webkit-details-marker {
    display: none;
  }
  & .stage-heading {
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.4;
  }
  & .stage-description {
    display: none;
    grid-column: 1 / -1;
    color: #555555;
    font-size: 0.95rem;
  }
  & .stage-row[data-selected='true'] .stage-description,
  & .stage[open] .stage-description {
    display: block;
  }
  & .stage-meta {
    grid-column: 2;
    grid-row: 1;
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
    align-items: baseline;
    font-size: 0.9rem;
  }
  & .stage-meta > span {
    flex-basis: 100%;
  }
  & .expand-hint {
    grid-column: 2;
    grid-row: 2;
    text-align: right;
    font-size: 0.85rem;
    color: #ad3b20;
    font-weight: 700;
  }
  & .when-open,
  & details[open] .when-closed {
    display: none;
  }
  & details[open] .when-open {
    display: inline;
  }
  & .stage-body {
    border-top: 1px solid #d7d7d7;
    padding: 16px 12px 0 0;
  }
  & .stage-body .lesson {
    padding: 16px;
  }
  & .builder-end {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    position: sticky;
    bottom: 14px;
    z-index: 2;
    padding: 18px;
    margin-top: 28px;
    border: 1px solid #999999;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 4px 18px #00000018;
  }
  @media (min-width: 640px) {
    & .builder-controls,
    & .presets,
    & .selection-summary {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    & .stage-row {
      grid-template-columns: 44px minmax(0, 1fr);
    }
    & .stage summary {
      padding-right: 24px;
    }
    & .stage-body {
      padding-right: 24px;
    }
    & .stage-meta > span {
      flex-basis: auto;
    }
  }
  & .order-action {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 22px;
    align-items: center;
    margin-top: 18px;
  }
  & .order-action > span {
    font-size: 0.8rem;
    color: #626262;
  }
  & .button-primary {
    color: #fff;
    cursor: pointer;
  }
  & .button-primary:disabled {
    opacity: 0.5;
    cursor: default;
  }
  & .builder-end > div {
    display: flex;
    flex-direction: column;
  }
  & .builder-end > div > span {
    font-size: 0.75rem;
    color: #626262;
  }
  & .back-to-program {
    font-size: 0.8rem;
  }
  & .end-note {
    font-size: 0.9rem;
    color: #626262;
  }
  & .preset {
    background: #ffffff;
    border-width: 1px;
    padding: 24px;
    border-radius: 12px;
  }
  & .preset:hover {
    border-color: #ad3b20;
    box-shadow: 0 4px 15px #00000010;
  }
  & .preset[aria-pressed='true'] {
    box-shadow: inset 0 0 0 1px #ad3b20;
    background: #f8ece8;
  }
  & .preset > strong {
    font-size: 1.3rem;
  }
  & .course-section {
    margin: 35px 0;
  }
  & .course-section > h3 {
    padding: 14px 18px;
    background: #eeeeee;
    border-radius: 9px;
  }
  & .stage-row {
    margin: 9px 0;
  }
  & .selection-summary {
    background: #292929;
    padding: 28px;
  }
  @media (min-width: 1024px) {
    & .presets {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media (max-width: 480px) {
    & .builder-end {
      bottom: 8px;
      padding: 12px;
      gap: 10px;
    }
    & .builder-end .button-primary {
      padding: 10px 13px;
      font-size: 0.8rem;
    }
    & .back-to-program {
      display: none;
    }
    & .builder-end strong {
      font-size: 0.9rem;
    }
  }
  & .preset {
    border-radius: 3px;
    box-shadow: none;
  }
  & .preset:hover {
    box-shadow: none;
  }
  & .preset[aria-pressed='true'] {
    background: #f8ece8;
    box-shadow: inset 0 0 0 1px #ad3b20;
  }
  & .selection-summary {
    background: #f3f3f3;
    color: #252525;
    border-radius: 3px;
    border-top: 2px solid #252525;
  }
  & .course-section > h3 {
    background: transparent;
    border-bottom: 1px solid #999;
    border-radius: 0;
    padding: 15px 0;
    font-size: 1.2rem;
  }
  & .stage-row,
  & .stage summary {
    border-radius: 3px;
  }
  & .builder-end {
    border-radius: 3px;
  }
`
