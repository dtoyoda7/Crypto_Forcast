import React from 'react';
import { NavLink } from 'react-router-dom';

// mui imports
import {
  ListItemIcon,
  List,
  styled,
  ListItemText,
  Chip,
  useTheme,
  Typography,
  ListItemButton,
} from '@mui/material';
import { useSelector } from 'src/store/Store';
import { useTranslation } from 'react-i18next';
import { AppState } from 'src/store/Store';

type NavGroup = {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: NavGroup[];
  chip?: string;
  chipColor?: any;
  variant?: string | any;
  external?: boolean;
  level?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
};

interface ItemType {
  item: NavGroup;
  hideMenu?: any;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  level?: number | any;
  pathDirect: string;
}

const NavItem = ({ item, level, pathDirect, hideMenu, onClick }: ItemType) => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const itemIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '10px',
    padding: '8px 10px',
    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    transition: 'all 0.2s ease',
    color: customizer.activeMode === 'dark' ? '#808080' : '#A8A8A8',
    paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    '&:hover': {
      background: 
        customizer.activeMode === 'dark' 
            ? 'linear-gradient(to right, rgba(48, 48, 48, 1), rgba(33, 33, 33, 0))'
            : 'linear-gradient(to right, rgba(238, 238, 238), rgba(255, 255, 255, 0))',
      color: '#24B47E',
    },
    '&.Mui-selected': {
      color: '#24B47E',
      background: 
        customizer.activeMode === 'dark' 
          ? 'linear-gradient(to right, rgba(48, 48, 48, 1), rgba(33, 33, 33, 0))'
          : 'linear-gradient(to right, rgba(238, 238, 238), rgba(255, 255, 255, 0))',
      '&:hover': {
        background: 
          customizer.activeMode === 'dark' 
            ? 'linear-gradient(to right, rgba(48, 48, 48, 1), rgba(33, 33, 33, 0))'
            : 'linear-gradient(to right, rgba(238, 238, 238), rgba(255, 255, 255, 0))',
        color: '#24B47E',
      },
    },
  }));

  const listItemProps: {
    component: any;
    href?: string;
    target?: any;
    to?: any;
  } = {
    component: item?.external ? 'a' : NavLink,
    to: item?.href,
    href: item?.external ? item?.href : '',
    target: item?.external ? '_blank' : '',
  };

  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <ListItemStyled
        {...listItemProps}
        disabled={item?.disabled}
        selected={pathDirect === item?.href}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color:
              level > 1 && pathDirect === item?.href
                ? `${theme.palette.primary.main}!important`
                : 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>
          {hideMenu ? '' : <>{t(`${item?.title}`)}</>}
          <br />
          {item?.subtitle ? (
            <Typography variant="caption">{hideMenu ? '' : item?.subtitle}</Typography>
          ) : (
            ''
          )}
        </ListItemText>

        {!item?.chip || hideMenu ? null : (
          <Chip
            color={item?.chipColor}
            variant={item?.variant ? item?.variant : 'filled'}
            size="small"
            label={item?.chip}
          />
        )}
      </ListItemStyled>
    </List>
  );
};

export default NavItem;
