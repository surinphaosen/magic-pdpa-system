"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updateUser } from "@/services/userService"

export default function EditUserPage() {
  const router = useRouter()
  const params = useSearchParams()
  const username = params.get("username") || ""
  const email = params.get("email") || ""
  const role = params.get("role") || ""
  const fullNameParam = params.get("fullname") || params.get("fullName") || ""

  const [fullName, setFullName] = useState(fullNameParam)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const result = await updateUser({
      username,
      fullName,
      email,
      role,
      password: "", // ไม่บังคับส่ง password
    })
    setSaving(false)
    if (result.success) {
      setSuccess(true)
      setTimeout(() => router.push("/(dashboard)/admin/users"), 1000)
    } else {
      setError("Update failed")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Username</label>
              <Input value={username} disabled />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <Input value={email} disabled />
            </div>
            <div>
              <label className="block mb-1">Role</label>
              <Input value={role} disabled />
            </div>
            <div>
              <label className="block mb-1">Fullname</label>
              <Input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-600">Update Success</div>}
            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
