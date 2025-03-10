"use client"

import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

interface Event {
  id: string
  title: string
  start: Date
  end: Date
  petId: string
  type: "feeding" | "medication" | "other"
}

interface Pet {
  id: string
  name: string
}

export default function FeedingCalendar() {
  const [events, setEvents] = useState<Event[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({})

  useEffect(() => {
    // Load events and pets from localStorage
    const storedEvents = localStorage.getItem("events")
    if (storedEvents) {
      setEvents(
        JSON.parse(storedEvents).map((event: Event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        })),
      )
    }

    const storedPets = localStorage.getItem("pets")
    if (storedPets) {
      setPets(
        JSON.parse(storedPets).map((pet: any, index: number) => ({
          id: index.toString(),
          name: pet.name,
        })),
      )
    }
  }, [])

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ start, end })
    setIsAddEventDialogOpen(true)
  }

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.petId && newEvent.type && newEvent.start && newEvent.end) {
      const updatedEvents = [...events, { ...newEvent, id: Date.now().toString() } as Event]
      setEvents(updatedEvents)
      localStorage.setItem("events", JSON.stringify(updatedEvents))
      setIsAddEventDialogOpen(false)
      setNewEvent({})
    }
  }

  return (
    <div className="h-screen flex flex-col p-4 bg-dogBlue-light">
      <h1 className="text-3xl font-bold mb-4 text-dogBrown-dark">Feeding Calendar</h1>
      <div className="flex-grow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          onSelectSlot={handleSelectSlot}
          selectable
        />
      </div>

      <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>Create a new event for your pet</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newEvent.title || ""}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet" className="text-right">
                Pet
              </Label>
              <Select onValueChange={(value) => setNewEvent({ ...newEvent, petId: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      {pet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewEvent({ ...newEvent, type: value as "feeding" | "medication" | "other" })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feeding">Feeding</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

