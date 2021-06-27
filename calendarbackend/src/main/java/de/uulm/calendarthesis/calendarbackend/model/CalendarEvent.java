package de.uulm.calendarthesis.calendarbackend.model;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.NonNull;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity //JPA Entity
@Table(name = "calendarevents", schema = "public")
public class CalendarEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @DateTimeFormat
    @NonNull
    @Column(name = "start")
    private Date start;
    @DateTimeFormat
    @Column(name = "end")
    private Date end;
    @NonNull
    @Column(name = "title")
    private String title;
    @Column(name = "allday")
    private Boolean allday;
    @Column(name = "draggable")
    private Boolean draggable;

    public CalendarEvent() {
    }

    public CalendarEvent(Long id, Date start, Date end, String title, Boolean allday, Boolean draggable) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.title = title;
        this.allday = allday;
        this.draggable = draggable;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getAllday() {
        return allday;
    }

    public void setAllday(Boolean allday) {
        this.allday = allday;
    }

    public Boolean getDraggable() {
        return draggable;
    }

    public void setDraggable(Boolean draggable) {
        this.draggable = draggable;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CalendarEvent)) return false;
        CalendarEvent that = (CalendarEvent) o;
        return id.equals(that.id) &&
                start.equals(that.start) &&
                end.equals(that.end) &&
                title.equals(that.title) &&
                allday.equals(that.allday) &&
                draggable.equals(that.draggable);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, start, end, title, allday, draggable);
    }

    @Override
    public String toString() {
        return "{" + "id=" + id +
                ", start=" + start +
                ", end=" + end +
                ", title='" + title + '\'' +
                ", allday=" + allday +
                ", draggable=" + draggable +
                '}';
    }
}
