"use client"

import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowUpRight, Home, FileText, CreditCard, Info } from "lucide-react";
import {AnimeNavBar} from "@/components/ui/anime-navbar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function CardDemo() {
  const navItems = [
        {
            name: "Home",
            url: "/",
            icon: Home,
        },
        {
            name: "About Plotoris",
            url: "/about",
            icon: FileText,
        },
        {
            name: "Login",
            url: "/login",
            icon: CreditCard,
        },
        {
            name: "Register",
            url: "/register",
            icon: Info,
        },
    ];
  return (
    <div className=" bg-[#f3e0f7] flex items-center justify-center h-screen">
    <AnimeNavBar items={navItems} defaultActive="Register" />
    <Card className="w-full max-w-sm pt-20">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your email below to create an account
        </CardDescription>
        <CardAction>
          <Link href="/login"><Button variant="link">Login</Button></Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">ConfirmPassword</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Register
        </Button>
        <Button variant="outline" className="w-full">
          Register with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
