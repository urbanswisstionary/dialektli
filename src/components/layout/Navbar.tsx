"use client"

import { useState, type FC } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import CottageRoundedIcon from "@mui/icons-material/CottageRounded"
import MapRoundedIcon from "@mui/icons-material/MapRounded"
import LoginRoundedIcon from "@mui/icons-material/LoginRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import AllInboxIcon from "@mui/icons-material/AllInbox"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import Logo from "@/components/ui/Logo"
import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle"
import SelectLocale from "@/components/ui/SelectLocale"
import SearchExpressionsInput from "@/components/ui/SearchExpressionsInput"
import { Link, usePathname } from "@/i18n/navigation"
import { useMe } from "@/hooks/useUsers"
import { useTranslations } from "next-intl"
import { signOut } from "next-auth/react"
import { companyName } from "@/config/constants"

const DRAWER_WIDTH = 280

const Navbar: FC = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const { me, isAdmin, loading: meLoading } = useMe()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(
    null,
  )
  const userMenuOpen = Boolean(userMenuAnchorEl)

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const navLinks = [
    {
      label: t("layout.sidebar.home"),
      href: "/" as const,
      icon: <CottageRoundedIcon />,
      active: pathname === "/",
    },
    {
      label: t("layout.sidebar.sprachatlas"),
      href: "/sprachatlas" as const,
      icon: <MapRoundedIcon />,
      active: pathname === "/sprachatlas",
    },
  ]

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Toolbar
          sx={{
            gap: { xs: 1, md: 2 },
            px: { xs: 2, md: 3 },
            minHeight: { xs: 56, md: 64 },
          }}
        >
          {/* Logo + Brand */}
          <Stack
            component={Link}
            href="/"
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              textDecoration: "none",
              color: "inherit",
              flexShrink: 0,
            }}
          >
            <Logo size="small" />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                display: { xs: "none", sm: "block" },
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              {companyName}
            </Typography>
          </Stack>

          {/* Desktop Nav Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.5,
              ml: 1,
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontWeight: link.active ? 600 : 500,
                  color: link.active ? "primary.main" : "text.secondary",
                  borderRadius: 0,
                  px: 1.5,
                  py: 1,
                  minHeight: { md: 64 },
                  borderBottom: 3,
                  borderColor: link.active ? "primary.main" : "transparent",
                  transition: "all 0.15s ease-in-out",
                  "&:hover": {
                    bgcolor: "action.hover",
                    borderColor: link.active
                      ? "primary.main"
                      : "action.disabled",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Search — center, dominant */}
          <SearchExpressionsInput
            sx={{
              mx: { xs: 0.5, md: 2 },
              flex: 1,
              maxWidth: { md: 480 },
            }}
          />

          {/* Desktop Utilities */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              display: { xs: "none", md: "flex" },
              flexShrink: 0,
            }}
          >
            <SelectLocale compact />
            <ColorSchemeToggle />

            {!meLoading &&
              (me ? (
                <>
                  <IconButton
                    onClick={handleUserMenuOpen}
                    size="small"
                    aria-label={t("layout.sidebar.profile")}
                    aria-haspopup="true"
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      p: 0.75,
                    }}
                  >
                    <AccountCircleIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={userMenuAnchorEl}
                    open={userMenuOpen}
                    onClose={handleUserMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    slotProps={{
                      paper: {
                        sx: {
                          mt: 0.5,
                          minWidth: 200,
                          borderRadius: 2,
                        },
                      },
                    }}
                  >
                    <MenuItem
                      component={Link}
                      href="/account/profile"
                      onClick={handleUserMenuClose}
                    >
                      <ListItemIcon>
                        <AssignmentIndIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>{t("layout.sidebar.profile")}</ListItemText>
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      href="/account/profile?view=expressions"
                      onClick={handleUserMenuClose}
                    >
                      <ListItemIcon>
                        <AllInboxIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        {t("layout.sidebar.expressions")}
                      </ListItemText>
                    </MenuItem>
                    {isAdmin && (
                      <MenuItem
                        component={Link}
                        href="/account/profile?view=users"
                        onClick={handleUserMenuClose}
                      >
                        <ListItemIcon>
                          <GroupRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>{t("layout.sidebar.users")}</ListItemText>
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose()
                        signOut({ callbackUrl: "/" })
                      }}
                    >
                      <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>{t("layout.sidebar.signOut")}</ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  component={Link}
                  href="/auth/signin"
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    borderRadius: 2,
                    px: 2,
                  }}
                >
                  {t("layout.sidebar.signIn")}
                </Button>
              ))}
          </Stack>

          {/* Mobile hamburger */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            sx={{ display: { xs: "flex", md: "none" }, flexShrink: 0 }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{ sx: { width: DRAWER_WIDTH } }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 2 }}>
          <Link href="/" onClick={handleDrawerClose}>
            <Logo size="small" />
          </Link>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {companyName}
          </Typography>
        </Stack>
        <Divider />

        <List>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                selected={link.active}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          <ListItem>
            <SelectLocale sx={{ width: "100%" }} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ColorSchemeToggle />
            </ListItemIcon>
            <ListItemText primary={t("actions.toggleColorScheme")} />
          </ListItem>
        </List>

        <Divider />

        <List>
          {!meLoading &&
            (me ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href="/account/profile"
                    onClick={handleDrawerClose}
                  >
                    <ListItemIcon>
                      <AssignmentIndIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("layout.sidebar.profile")} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href="/account/profile?view=expressions"
                    onClick={handleDrawerClose}
                  >
                    <ListItemIcon>
                      <AllInboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("layout.sidebar.expressions")} />
                  </ListItemButton>
                </ListItem>
                {isAdmin && (
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      href="/account/profile?view=users"
                      onClick={handleDrawerClose}
                    >
                      <ListItemIcon>
                        <GroupRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary={t("layout.sidebar.users")} />
                    </ListItemButton>
                  </ListItem>
                )}
                <Divider sx={{ my: 1 }} />
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      handleDrawerClose()
                      signOut({ callbackUrl: "/" })
                    }}
                  >
                    <ListItemIcon>
                      <LogoutRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("layout.sidebar.signOut")} />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href="/auth/signin"
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <LoginRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary={t("layout.sidebar.signIn")} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>
    </>
  )
}

export default Navbar
