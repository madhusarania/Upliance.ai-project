import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Home,
  User,
  LogOut,
  Settings,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

const AppNavbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { hasUnsavedChanges } = useAppContext();
  const { currentUser, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Navbar>
      <div className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md ">
        {location.pathname === "/dashboard" && (
          <button
            onClick={() => navigate("/")}
            className="mr-2 text-gray-700  block md:hidden"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <NavbarBrand>
          <User className="mr-2" size={24} />
          <p className="font-bold text-inherit">Upliance.ai</p>
        </NavbarBrand>

        <button
          className="sm:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {currentUser && (
            <>
              <NavbarItem isActive={isActive("/")}>
                <Link
                  as={RouterLink}
                  to="/"
                  color={isActive("/") ? "primary" : "foreground"}
                  className="flex items-center gap-1"
                >
                  <Home size={18} />
                  Home
                </Link>
              </NavbarItem>

              <NavbarItem isActive={isActive("/dashboard")}>
                <Link
                  as={RouterLink}
                  to="/dashboard"
                  color={isActive("/dashboard") ? "primary" : "foreground"}
                  className="flex items-center gap-1"
                >
                  <BarChart3 size={18} />
                  Dashboard
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        <NavbarContent justify="end" className="hidden sm:flex">
          {hasUnsavedChanges && (
            <NavbarItem>
              <Button color="warning" size="sm" variant="flat">
                Unsaved Changes
              </Button>
            </NavbarItem>
          )}

          {currentUser ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name={currentUser.displayName || "User"}
                  size="sm"
                  src={currentUser.photoURL || undefined}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">{currentUser.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<Settings size={16} />}
                >
                  Settings
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<LogOut size={16} />}
                  onPress={handleLogout}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem>
              <Button
                as={RouterLink}
                to="/login"
                color="primary"
                variant="flat"
              >
                Sign In
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </div>

      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center bg-white shadow-md py-4 space-y-4">
          {currentUser && (
            <>
              <Link
                as={RouterLink}
                to="/"
                className="text-gray-700 hover:text-blue-500"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                as={RouterLink}
                to="/dashboard"
                className="text-gray-700 hover:text-blue-500"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            </>
          )}

          {currentUser ? (
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Log Out
            </button>
          ) : (
            <Link
              as={RouterLink}
              to="/login"
              className="text-gray-700 hover:text-blue-500"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </Navbar>
  );
};

export default AppNavbar;
