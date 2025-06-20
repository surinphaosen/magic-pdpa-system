"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!login(username, password)) {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-sm border border-gray-200">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-6 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-xl">M</span>
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900">MST PDPA System</CardTitle>
          <CardDescription className="text-gray-600">Magic Software (Thailand) Corp., Ltd.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full h-10 bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Test accounts:</p>
            <p>admin1 / password1234 (Admin)</p>
            <p>user1 / password1234 (Department User)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
