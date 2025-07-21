import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Map of routes to human-readable names
const routeLabels: Record<string, string> = {
  "/": "Home",
  "/auth": "Authentication",
  "/admin": "Admin Dashboard",
  "/admin/import-profiles": "Import Profiles",
  "/admin/import": "Wikipedia Import",
  "/profile-demo": "Profile Demo",
  "/contentful-test": "Contentful Test",
  "/profiles": "All Profiles",
  "/categories": "Categories",
  "/timeline": "Timeline",
  "/about": "About",
};

export function BreadcrumbNav() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on the home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="bg-muted/30 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Home link */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1 hover:text-primary">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {pathnames.map((pathname, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;
              const label = routeLabels[routeTo] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

              return (
                <React.Fragment key={routeTo}>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={routeTo} className="hover:text-primary">
                          {label}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}