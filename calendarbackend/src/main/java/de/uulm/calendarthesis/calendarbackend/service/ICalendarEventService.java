package de.uulm.calendarthesis.calendarbackend.service;

import de.uulm.calendarthesis.calendarbackend.model.CalendarEvent;
import java.util.List;

public interface ICalendarEventService {

    boolean delete(Long id);
    boolean add(CalendarEvent calendarEvent);
    List<CalendarEvent> findAll();

    boolean updateCalendarEvent(CalendarEvent calendarEvent);
}
