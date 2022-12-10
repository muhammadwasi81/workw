import styled from 'styled-components';

export const NavMenuBadge = styled.span.attrs(({ theme, navbarstatus }) => ({
  style: {
    margin:
      theme.Direction === 'rtl' && !navbarstatus
        ? '-6px 0px 0px -20px'
        : theme.Direction === 'ltr'
        ? '0 20px'
        : theme.Direction === 'rtl'
        ? '10px 0px 1px -22px'
        : '',
    position: theme.Direction === 'rtl' && 'absolute',
  },
}))``;

export const MainTopMenuHolder = styled.div.attrs(({ theme }) => ({
  className: 'mainTopContainer',
  style: { flexDirection: theme.Direction === 'rtl' && 'row-reverse' },
}))``;
