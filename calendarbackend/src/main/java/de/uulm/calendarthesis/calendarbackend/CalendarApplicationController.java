package de.uulm.calendarthesis.calendarbackend;

import de.uulm.calendarthesis.calendarbackend.model.CalendarEvent;
import de.uulm.calendarthesis.calendarbackend.repository.CalendarEventRepository;
import de.uulm.calendarthesis.calendarbackend.service.ICalendarEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin("*")
@SpringBootApplication
@RestController
/**
 * REST-Endpoint-Controller for CalendarEvents
 */
public class CalendarApplicationController {

    @Autowired
    CalendarEventRepository calendarEventRepository;
    @Autowired
    private ICalendarEventService calendarEventService;

    public static void main(String[] args) {
        SpringApplication.run(CalendarApplicationController.class, args);
    }

    /**
     * REST-Endpoint to get all CalendarEvents
     *
     * @return calendarEvents
     */
    @GetMapping("/showCalendarEvents")
    public ArrayList<CalendarEvent> getCalendarEvents(Model model) {

        var calendarEvents = (ArrayList<CalendarEvent>) calendarEventService.findAll();
        model.addAttribute("calendarevents", calendarEvents);

        return calendarEvents;
    }

    /**
     * REST-Endpoint for storing a new CalendarEvent
     *
     * @param calendarEvent object with data to store
     * @return Response Entity with HttpStatus OK or Response Entity BAD REQUEST in case of a bad request
     */
    @PostMapping(value = "/addCalendarEvent")
    public ResponseEntity saveCalendarEvent(@RequestBody CalendarEvent calendarEvent) {
        var isSaved = calendarEventService.add(calendarEvent);

        if (!isSaved) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(calendarEvent, HttpStatus.OK);
        }
    }

    /**
     * REST-Endpoint for updating a CalendarEvent
     *
     * @param calendarEventId id of the message to be updated
     * @param calendarEvent CalenderEvent with data to update
     * @return Response Entity with HttpStatus OK or Response Entity LOCKED in case something went wrong or
	 * Response Entity BAD REQUEST in case of a bad request
     */
    @PutMapping(value = "/updateEvent/{calendarEventId}")
    public ResponseEntity updateCalendarEvent(@PathVariable Long calendarEventId, @RequestBody CalendarEvent calendarEvent) {

        var calendarEventOld = calendarEventRepository.findById(calendarEventId);
        var CalendarEventUpdated = calendarEventService.updateCalendarEvent(calendarEvent);
        if (calendarEventOld != null) {
            if (CalendarEventUpdated == true) {
                return new ResponseEntity<>(calendarEvent, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(calendarEvent, HttpStatus.LOCKED);
            }
        } else {
            return new ResponseEntity(calendarEvent, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * REST-Endpoint to delete a CalendarEvent
     *
     * @param id Id of the calendarEvent to be deleted
     */
    @DeleteMapping(value = "/deleteEvent/{id}")
    public ResponseEntity deleteCalendarEvent(@PathVariable Long id) throws Exception {

        var isRemoved = calendarEventService.delete(id);

        if (!isRemoved) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(id, HttpStatus.OK);
        }
    }
}
