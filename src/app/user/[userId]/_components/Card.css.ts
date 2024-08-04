import { style, createVar } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { bodyMedium } from '@/styles/font.css';

export const listColor = createVar();

export const container = style({
  maxWidth: '185px',
  width: '100%',
  padding: '2rem 2rem 3rem 2rem',

  borderRadius: '1.5rem',
  backgroundColor: listColor,
  border: `1px solid ${vars.color.gray5}`,

  cursor: 'pointer',
  transition: 'all 200ms ease',

  ':hover': {
    boxShadow: `0px 2px 3px -1px rgba(0,0,0,0.1), 
    0px 1px 0px 0px rgba(25,28,33,0.02), 
    0px 0px 0px 1px rgba(25,28,33,0.08)`,
  },

  '@media': {
    // 화면이 414px 이하일 때,
    'screen and (max-width: 414px)': {
      // iPhone XR, 갤럭시 S20
      maxWidth: '180px',
    },
    'screen and (max-width: 400px)': {
      // 중간 point
      maxWidth: '170px',
    },
    'screen and (max-width: 390px)': {
      // iPhone 12 Pro
      maxWidth: '165px',
    },
    'screen and (max-width: 375px)': {
      // iPhone SE
      maxWidth: '160px',
    },
  },
});

export const optionMenu = style({
  padding: '1.6rem',
  position: 'absolute',
  right: 0,

  display: 'flex',
  flexDirection: 'column',

  borderRadius: '1.2rem',
  background: vars.color.white,
  boxShadow: '0px 0px 4px 0px rgba(180, 180, 180, 0.04), 0px 8px 16px 0px rgba(136, 136, 136, 0.08)',
});

export const title = style({
  padding: '1.2rem 0 2rem 0',

  fontSize: '1.7rem',
  fontWeight: '600',
  color: vars.color.black,
  textAlign: 'center',
  letterSpacing: '-0.51px',
  wordBreak: 'break-all',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',

  fontSize: '1.2rem',
  fontWeight: '400',
  color: vars.color.black,
  lineHeight: '2.5rem',
  letterSpacing: '-0.36px',
});

export const listInfo = style({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
});

export const listInfoPrivate = style([
  listInfo,
  {
    justifyContent: 'space-between',
  },
]);

export const lockIcon = style({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '2px',
});

export const lockText = style({
  fontSize: '1.1rem',
  fontWeight: '400',
  letterSpacing: '-0.33px',
  color: vars.color.gray7,
});

export const optionButton = style({
  width: '3rem',
  textAlign: 'end',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
});

export const rank = style([
  bodyMedium,
  {
    width: '1.2rem',
  },
]);

export const itemTitle = style([
  bodyMedium,
  {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
]);
