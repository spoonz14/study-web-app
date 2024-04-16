package Gamerz.Controllers;

import Gamerz.Entity.Schedule;
import Gamerz.Entity.User;
import Gamerz.Service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/schedule/all")
    public ResponseEntity<List<Schedule>> getAllScheduling() {
        List<Schedule> schedules = scheduleService.getAllScheduling();
        return ResponseEntity.ok(schedules);
    }

    @PostMapping("/schedule")
    public ResponseEntity<String> addScheduling(@RequestBody Schedule schedule) {
        if (scheduleService.addScheduling(schedule)) {
            return ResponseEntity.ok("Scheduling added.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or email already exists.");
        }
    }
}