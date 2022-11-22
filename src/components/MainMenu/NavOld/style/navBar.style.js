import styled from 'styled-components';
import { STRINGS } from '../../../../utils/base';
import { NavLink } from 'react-router-dom';
import arrowNavBar from '../../../../content/svg/menu/newNavBarIcon/arrowNavBar.svg';
import arrowBarClose from '../../../../content/svg/menu/newNavBarIcon/arrowBarClose.svg';

// className: navbarstatus ? "nav" : isMobileView && !navbarstatus ? "nav hideNav"
//     : theme.Direction === "rtl" ? "nav mobileNav"
//         : "nav mobileNav navHover",

export const NavBarStyledContainer = styled.div.attrs(
  ({ navbarstatus, isMobileView, theme }) => ({
    className: navbarstatus
      ? 'nav'
      : isMobileView && !navbarstatus
      ? 'nav hideNav'
      : theme.Direction === 'rtl'
      ? 'nav mobileNav'
      : 'nav mobileNav',
    id: 'leftNav',
    style: {
      right: theme.Direction === 'rtl' && isMobileView ? '0px' : '',
      left: theme.Direction === 'rtl' && isMobileView ? 'unset' : '',
    },
  })
)``;

export const LogoContainer = styled.div.attrs(({ theme }) => ({
  className: 'logo business',
  style: {
    flexDirection: theme.Direction === 'rtl' ? 'row-reverse' : 'row',
    display: 'flex',
  },
  // style: {display: navbarstatus ? "flex" : "none"}
}))`
  margin-bottom: 13px;
  border-bottom: 1px solid #e7eef0;
`;

export const ToggleLabel = styled.div.attrs(({ theme }) => ({
  style: { flexDirection: theme.Direction === 'rtl' && 'row-reverse' },
}))``;

export const AboutUser = styled.div.attrs(({ theme, navbarstatus }) => ({
  style: {
    textAlign: theme.Direction === 'rtl' && 'center',
    display: navbarstatus ? 'block' : 'none',
  },
  className: 'user-about',
}))``;

export const NavBtn = styled.div.attrs(({ navbarstatus }) => ({
  style: { display: navbarstatus ? 'block' : 'none' },
  id: 'closeBtn',
}))``;

export const UserNavToggle = styled.div.attrs(({ navbarstatus, userType }) => ({
  style: {
    display: !navbarstatus ? 'none' : 'flex',
    width:
      userType === STRINGS.TYPES.USERS.ADMIN ||
      userType === STRINGS.TYPES.USERS.SUPER_ADMIN
        ? '77%'
        : '72%',
  },
}))``;

export const DarkModeToggleMenu = styled.div.attrs(({ userType }) => ({
  style: {
    position: 'relative',
    width: 'max-content',
    height: 'max-content',
    left:
      userType === STRINGS.TYPES.USERS.ADMIN ||
      userType === STRINGS.TYPES.USERS.SUPER_ADMIN
        ? '-1px'
        : '18px',
  },
}))``;

export const DarkToggleIcon = styled.img.attrs(({ size }) => ({
  alt: 'themeToggleIcon',
  width: size,
  height: size,
}))``;

export const SideMenuLabel = styled.div.attrs(({ theme, navbarstatus }) => ({
  style: {
    fontSize: navbarstatus ? '16px' : '14px',
    color: '#757D86',
    fontFamily: 'Poppins',
    textAlign: !theme ? 'center' : theme.Direction === 'rtl' ? 'end' : 'start',
    justifyContent: !theme
      ? 'flex-start'
      : theme.Direction === 'rtl'
      ? 'flex-end'
      : 'flex-start',
  },
}))``;

export const NavLinkItem = styled(NavLink).attrs(
  ({ navbarstatus, theme, to, className, pathname }) => ({
    style: {
      flexDirection:
        !navbarstatus && theme.Direction === 'rtl'
          ? 'row'
          : theme.Direction === 'rtl' && 'row-reverse',
      borderRight: theme.Direction === 'rtl' && 'none',
      justifyContent: !theme
        ? 'flex-start'
        : theme.Direction === 'rtl'
        ? 'flex-end'
        : 'flex-start',
      // borderLeft: localDictionary === "ltr" && "3px solid #365899"
    },
    className,
    to,
    isActive: () => pathname.split('/')[1] === to.split('/')[1],
  })
)``;

export const MenuLabel = styled.div.attrs(({ theme }) => ({
  style: {
    flex: theme.Direction === 'rtl' && 'none',
    marginRight: theme.Direction === 'rtl' && '17px',
    position: 'relative',
    justifyContent: !theme
      ? 'flex-start'
      : theme.Direction === 'rtl'
      ? 'flex-end'
      : 'flex-start',
  },
}))``;

export const NavMenuBadge = styled.span.attrs(({ theme, navbarstatus }) => ({
  style: {
    margin:
      theme.Direction === 'rtl' && !navbarstatus
        ? '-6px 0px 0px -20px'
        : theme.Direction === 'ltr'
        ? '0 8px'
        : theme.Direction === 'rtl'
        ? '0px 0px 0px -42px'
        : '',
    position: theme.Direction === 'rtl' && 'absolute',
  },
}))``;

export const NavToggleBtn = styled.img.attrs(({ theme }) => ({
  src: theme.Direction === 'ltr' ? arrowNavBar : arrowBarClose,
  width: 36,
  height: 36,
  alt: 'toggleNavBar',
}))``;

export const NavToggleUser = styled.div.attrs(({ navbarstatus }) => ({
  className: 'nav-toggle user',
  style: {
    margin: !navbarstatus && '0px 4px',
    padding: !navbarstatus && '1px',
    width: !navbarstatus && 'unset',
  },
}))``;
