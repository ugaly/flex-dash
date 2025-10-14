"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface MenuOption {
  id: string
  digit: string
  destinationType: string
  destination: string
  announcement: string
}

export default function NewIVRPage() {
  const router = useRouter()
  const [languageSelectionIVR, setLanguageSelectionIVR] = useState("no")
  const [directDial, setDirectDial] = useState("enabled")
  const [dialTimeout, setDialTimeout] = useState("yes")
  const [announcementOnInvalid, setAnnouncementOnInvalid] = useState("yes")
  const [returnOnInvalid, setReturnOnInvalid] = useState("no")
  const [returnOnTimeout, setReturnOnTimeout] = useState("no")
  const [returnToIVRMenu, setReturnToIVRMenu] = useState("yes")
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([])

  const handleAddMenuOption = () => {
    const newOption: MenuOption = {
      id: Date.now().toString(),
      digit: "",
      destinationType: "",
      destination: "",
      announcement: "",
    }
    setMenuOptions([...menuOptions, newOption])
  }

  const handleRemoveMenuOption = (id: string) => {
    setMenuOptions(menuOptions.filter((option) => option.id !== id))
  }

  const handleBack = () => {
    router.push("/dashboard/settings/ivr")
  }

  const handleSave = () => {
    // Implement save functionality
    console.log("Save IVR")
    router.push("/dashboard/settings/ivr")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-foreground">Create New IVR</h1>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ivr-name">IVR Name</Label>
                  <Input id="ivr-name" placeholder="Enter IVR name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter description" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-recording">Welcome Recording</Label>
                <Select>
                  <SelectTrigger id="welcome-recording">
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language Selection IVR</Label>
                <RadioGroup value={languageSelectionIVR} onValueChange={setLanguageSelectionIVR}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="lang-yes" />
                      <Label htmlFor="lang-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="lang-no" />
                      <Label htmlFor="lang-no">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Dialing Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Dialing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Direct Dial:</Label>
                  <RadioGroup value={directDial} onValueChange={setDirectDial}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="enabled" id="dd-enabled" />
                        <Label htmlFor="dd-enabled">Enabled</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="disabled" id="dd-disabled" />
                        <Label htmlFor="dd-disabled">Disabled</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Dial Timeout:</Label>
                  <RadioGroup value={dialTimeout} onValueChange={setDialTimeout}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="dt-yes" />
                        <Label htmlFor="dt-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="dt-no" />
                        <Label htmlFor="dt-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no-legacy" id="dt-no-legacy" />
                        <Label htmlFor="dt-no-legacy">No Legacy</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="timeout-seconds">Timeout (seconds)</Label>
                  <Input id="timeout-seconds" type="number" defaultValue="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-info">Alert Info</Label>
                  <Input id="alert-info" placeholder="Enter alert info" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ringtone-override">Ringtone Override</Label>
                  <Select>
                    <SelectTrigger id="ringtone-override">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="default">Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invalid Input Handling */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Invalid Input Handling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="invalid-retry-count">Invalid Input Retry Count</Label>
                  <Input id="invalid-retry-count" type="number" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invalid-retry-recording">Invalid Retry Recording</Label>
                  <Select>
                    <SelectTrigger id="invalid-retry-recording">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="default">Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Announcement on Invalid:</Label>
                  <RadioGroup value={announcementOnInvalid} onValueChange={setAnnouncementOnInvalid}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="aoi-yes" />
                        <Label htmlFor="aoi-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="aoi-no" />
                        <Label htmlFor="aoi-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Return on Invalid:</Label>
                  <RadioGroup value={returnOnInvalid} onValueChange={setReturnOnInvalid}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="roi-yes" />
                        <Label htmlFor="roi-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="roi-no" />
                        <Label htmlFor="roi-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invalid-destination-recording">Invalid Destination Recording</Label>
                <Select>
                  <SelectTrigger id="invalid-destination-recording">
                    <SelectValue placeholder="none" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">none</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Invalid Input Destination */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Invalid Input Destination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invalid-destination-type">Destination Type</Label>
                <Select>
                  <SelectTrigger id="invalid-destination-type">
                    <SelectValue placeholder="[ Select Option ]" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ivr">IVR</SelectItem>
                    <SelectItem value="queue">Queue</SelectItem>
                    <SelectItem value="extension">Extension</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Timeout Handling */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Timeout Handling</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="timeout-retry-count">Timeout Retry Count</Label>
                  <Input id="timeout-retry-count" type="number" defaultValue="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout-retry-recording">Timeout Retry Recording</Label>
                  <Select>
                    <SelectTrigger id="timeout-retry-recording">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="default">Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Return on Timeout:</Label>
                  <RadioGroup value={returnOnTimeout} onValueChange={setReturnOnTimeout}>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="rot-yes" />
                        <Label htmlFor="rot-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="rot-no" />
                        <Label htmlFor="rot-no">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout-recording">Timeout Recording</Label>
                <Select>
                  <SelectTrigger id="timeout-recording">
                    <SelectValue placeholder="Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Timeout Destination */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Timeout Destination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timeout-destination-type">Destination Type</Label>
                <Select>
                  <SelectTrigger id="timeout-destination-type">
                    <SelectValue placeholder="-- Select Type --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ivr">IVR</SelectItem>
                    <SelectItem value="queue">Queue</SelectItem>
                    <SelectItem value="extension">Extension</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* IVR Menu Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">IVR Menu Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Return to IVR Menu:</Label>
                <RadioGroup value={returnToIVRMenu} onValueChange={setReturnToIVRMenu}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="rtim-yes" />
                      <Label htmlFor="rtim-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="rtim-no" />
                      <Label htmlFor="rtim-no">No</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">Menu Destinations</h3>
                  <Button onClick={handleAddMenuOption}>Add Menu option</Button>
                </div>

                {menuOptions.length > 0 && (
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-blue-100">
                          <TableHead className="font-bold text-blue-900">DIGIT</TableHead>
                          <TableHead className="font-bold text-blue-900">DESTINATION TYPE</TableHead>
                          <TableHead className="font-bold text-blue-900">DESTINATION</TableHead>
                          <TableHead className="font-bold text-blue-900">ANNOUNCEMENT</TableHead>
                          <TableHead className="w-20"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {menuOptions.map((option) => (
                          <TableRow key={option.id}>
                            <TableCell>
                              <Input
                                placeholder="Digit"
                                className="w-20"
                                maxLength={1}
                                value={option.digit}
                                onChange={(e) => {
                                  const updated = menuOptions.map((o) =>
                                    o.id === option.id ? { ...o, digit: e.target.value } : o,
                                  )
                                  setMenuOptions(updated)
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                value={option.destinationType}
                                onValueChange={(value) => {
                                  const updated = menuOptions.map((o) =>
                                    o.id === option.id ? { ...o, destinationType: value } : o,
                                  )
                                  setMenuOptions(updated)
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ivr">IVR</SelectItem>
                                  <SelectItem value="queue">Queue</SelectItem>
                                  <SelectItem value="extension">Extension</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Input
                                placeholder="Destination"
                                value={option.destination}
                                onChange={(e) => {
                                  const updated = menuOptions.map((o) =>
                                    o.id === option.id ? { ...o, destination: e.target.value } : o,
                                  )
                                  setMenuOptions(updated)
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                value={option.announcement}
                                onValueChange={(value) => {
                                  const updated = menuOptions.map((o) =>
                                    o.id === option.id ? { ...o, announcement: value } : o,
                                  )
                                  setMenuOptions(updated)
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="No Announcement" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">No Announcement</SelectItem>
                                  <SelectItem value="default">Default</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Button variant="destructive" size="sm" onClick={() => handleRemoveMenuOption(option.id)}>
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleSave}>Save IVR Configurations</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
