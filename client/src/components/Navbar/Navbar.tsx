"use client";
import Link from "next/link"
import { CircleUser, Menu, Package2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { userAtom } from "@/atom/atom"
import { useRecoilState } from "recoil"
import { useEffect, useState } from "react"


export const description =
  "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings."


export default function Navbar() {
  const [text, setText] = useState<string>("");
  const [, setToken] = useRecoilState(userAtom);
  const [user, ] = useState<string>("Account");


  useEffect(() => {
    if(localStorage.getItem("looksmax"))
     {
      setText("Logout")}
      else{
        setText("Login");
      }
  }, [user]);


  const handleLogout = () => {
    localStorage.removeItem("looksmax");
    setToken(null);
    setText("Login");
    location.href="/";
  }

  const handleLogin = () => {
    location.href="/signin"
  }

  const handleClick= () =>{
    if(text == "Login")
    {
      handleLogin();
    }
    else{
      handleLogout();
    }
  }


  return (
    <div className="flex  w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Good Looks</span>
          </Link>
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/#car"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Trust
          </Link>
          <Link
            href="/#feature"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="/#price"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Good Looks</span>
              </Link>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/#car"
                className="text-muted-foreground hover:text-foreground"
              >
                Trust
              </Link>
              <Link
                href="/#feature"
                className="text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="/#price"
                className="text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem><Button onClick={handleClick}>{text}</Button></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
}
