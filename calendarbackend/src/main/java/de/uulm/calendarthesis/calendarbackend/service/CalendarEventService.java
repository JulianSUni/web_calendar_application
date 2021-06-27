package de.uulm.calendarthesis.calendarbackend.service;

import de.uulm.calendarthesis.calendarbackend.repository.CalendarEventRepository;
import de.uulm.calendarthesis.calendarbackend.model.CalendarEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarEventService implements ICalendarEventService {

    @Autowired
    private CalendarEventRepository repository;

    @Override
    public boolean delete(Long id) {
        try {
            this.repository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean add(CalendarEvent calendarEvent) {
        try {
            this.repository.addCalendarEventWithQuery(calendarEvent.getStart(), calendarEvent.getEnd(), calendarEvent.getTitle(), true, calendarEvent.getDraggable());//calendarEvent.getAllday(), calendarEvent.getDraggable());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<CalendarEvent> findAll() {
        return (List<CalendarEvent>) repository.findAll();
    }

    @Override
    public boolean updateCalendarEvent(CalendarEvent calendarEvent) {
        try {
            this.repository.updateCalendarEventWithQuery(calendarEvent.getStart(), calendarEvent.getEnd(), calendarEvent.getTitle(), true, calendarEvent.getDraggable(), calendarEvent.getId());//, calendarEvent.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
