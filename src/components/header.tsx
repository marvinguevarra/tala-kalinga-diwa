import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, User, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/use-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, loading, isAdmin, signOut } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "All Profiles", href: "/profiles" },
    { name: "Categories", href: "/categories" },
    { name: "Profile Demo", href: "/profile-demo" },
    { name: "Contentful Test", href: "/contentful-test" },
    { name: "Timeline", href: "/timeline" },
    { name: "About", href: "/about" }
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div className="hidden sm:block">
              <Link to="/" className="font-bold text-xl text-foreground hover:text-primary transition-colors">
                ProfileHub
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.href.startsWith("/") ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </a>
              )
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden sm:flex"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Auth Actions */}
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hidden sm:flex">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem disabled>
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {isAdmin && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link to="/admin">
                              <Shield className="mr-2 h-4 w-4" />
                              Admin Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem onClick={signOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild variant="outline" size="sm" className="hidden sm:flex">
                    <Link to="/auth">Sign In</Link>
                  </Button>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                item.href.startsWith("/") ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
              
              {/* Mobile auth actions */}
              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="px-3 py-2 text-sm text-muted-foreground border-t">
                        Signed in as {user.email}
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Shield className="inline mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                      >
                        <LogOut className="inline mr-2 h-4 w-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  )}
                </>
              )}
              
              <div className="px-3 py-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full justify-start"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}