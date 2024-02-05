const openSidebar = () => {
  if (typeof document === "undefined") return
  document.body.style.overflow = "hidden"
  document.documentElement.style.setProperty("--SideNavigation-slideIn", "1")
}

export const closeSidebar = () => {
  if (typeof document === "undefined") return
  document.documentElement.style.removeProperty("--SideNavigation-slideIn")
  document.body.style.removeProperty("overflow")
}

export const toggleSidebar = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return
  const slideIn = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--SideNavigation-slideIn")
  if (slideIn) closeSidebar()
  else openSidebar()
}
