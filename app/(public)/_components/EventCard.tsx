import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { stripHtml } from '@/lib/RemoveHtml'
import { Event } from '@/lib/types'
import { CalendarDaysIcon, MapPinIcon } from 'lucide-react'

function EventCard({ event }: { event: Event }) {
    return (
        <Card
            key={event.id}
            className="flex flex-col p-6 rounded-xl shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300"
        >
            <CardHeader className="p-0 pb-4">
                <CardTitle className="text-xl line-clamp-2 font-semibold text-gray-900 mb-2">
                    {event.title}
                </CardTitle>
                <CardDescription className="flex item-center justify-between  space-y-1">
                    <span className="flex items-center text-sm text-gray-500">
                        <CalendarDaysIcon className="mr-2 h-4 w-4" />
                        {new Date(event.event_date).toLocaleString()}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="mr-2 h-4 w-4" />
                        {event.location}
                    </span>
                </CardDescription>
                <CardDescription className='line-clamp-3'>
                    <p>{stripHtml(event.description)}</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-auto">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                    Learn more
                </Button>
            </CardContent>
        </Card>
    )
}

export default EventCard