import { Heart, Mail, Globe, Github, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              100 Influential Filipinos
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Celebrating the remarkable achievements and lasting impact of Filipinos and the Filipino diaspora worldwide. 
              From heroes of the past to innovators of today, discover the stories that shaped our world.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-filipino-red fill-current" />
              <span>for the Filipino community</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "All Profiles",
                "Categories",
                "Historical Figures",
                "Modern Icons",
                "Filipino Diaspora",
                "Submit a Profile"
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a 
                  href="mailto:info@100filipinos.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@100filipinos.com
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <a 
                  href="https://100filipinos.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  100filipinos.com
                </a>
              </div>

              <div className="flex gap-3 pt-2">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Github, href: "#", label: "GitHub" }
                ].map(({ icon: Icon, href, label }) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    <a href={href} aria-label={label}>
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Philippine Map Silhouette and Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-accent rounded-lg flex items-center justify-center opacity-20">
              {/* Simplified Philippine map silhouette */}
              <svg
                viewBox="0 0 100 100"
                className="w-10 h-10 text-foreground"
                fill="currentColor"
              >
                <path d="M30,20 L35,15 L40,20 L45,18 L50,25 L55,20 L60,25 L65,30 L70,35 L75,40 L80,50 L75,60 L70,65 L65,70 L60,75 L55,80 L50,85 L45,80 L40,75 L35,70 L30,65 L25,60 L20,50 L25,40 L30,35 L30,20 Z" />
              </svg>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Proudly Philippine</p>
              <p>Celebrating our heritage worldwide</p>
            </div>
          </div>

          <div className="text-center md:text-right text-sm text-muted-foreground">
            <p>© 2024 100 Influential Filipinos. All rights reserved.</p>
            <p className="mt-1">
              Built with passion for Filipino excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}