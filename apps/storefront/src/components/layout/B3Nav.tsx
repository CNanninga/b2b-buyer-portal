import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import {
  useContext,
  useRef,
} from 'react'
import {
  useNavigate,
  useLocation,
} from 'react-router-dom'
import {
  getAllowedRoutes,
} from '@/shared/routes'

import {
  RouteItem,
} from '@/shared/routes/routes'

import {
  useMobile,
} from '@/hooks'

import {
  GlobaledContext,
} from '@/shared/global'

// import {
//   NavMessage,
// } from './styled'

interface B3NavProps {
  closeSidebar?: (x: boolean) => void;
}

export const B3Nav = ({
  closeSidebar,
}: B3NavProps) => {
  const [isMobile] = useMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const nextPath = useRef<null | string>(null)

  const {
    state: globalState,
  } = useContext(GlobaledContext)

  const handleClick = (item: RouteItem) => {
    navigate(item.path)
    if (isMobile && closeSidebar) {
      closeSidebar(false)
    }
  }
  const menuItems = () => {
    const newRoutes = getAllowedRoutes(globalState).filter((route: RouteItem) => route.isMenuItem)

    return newRoutes
  }
  const newRoutes = menuItems()
  const activePath = (path: string) => {
    const activeStyle = {
      color: 'white',
      bgcolor: '#3385d6',
      borderRadius: '4px',
    }
    if (location.pathname === path) {
      nextPath.current = path
      return activeStyle
    }
    if (nextPath.current === path && location.pathname.includes('orderDetail')) {
      return activeStyle
    }

    return {}
  }
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: `${isMobile ? 'white' : '#fef9f5'}`,
        color: '#3385d6',
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {
        newRoutes.map((item: RouteItem) => (
          <ListItem
            sx={{
              '&:hover': {
                color: 'white',
                bgcolor: '#3385d6',
                borderRadius: '4px',
                '& .navMessage': {
                  bgcolor: 'white',
                  color: '#3385d6',
                },
              },
              ...activePath(item.path),
            }}
            onClick={() => handleClick(item)}
            key={item.path}
            disablePadding
          >
            <ListItemButton>
              <ListItemText primary={item.name} />
              {/* <NavMessage className="navMessage">5</NavMessage> */}
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  )
}
