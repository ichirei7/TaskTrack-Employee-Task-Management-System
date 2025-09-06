package com.etms.EmployeeTaskManagementSystem.service;

import com.etms.EmployeeTaskManagementSystem.model.Task;
import com.etms.EmployeeTaskManagementSystem.model.TimeLog;
import com.etms.EmployeeTaskManagementSystem.model.User;
import com.etms.EmployeeTaskManagementSystem.repository.TimeLogRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TimeLogService {

    private final TimeLogRepository timeLogRepository;
    
    public TimeLogService(TimeLogRepository timeLogRepository) {
        this.timeLogRepository = timeLogRepository;
    }

    public TimeLog createTimeLog(TimeLog timeLog) {
        return timeLogRepository.save(timeLog);
    }

    public List<TimeLog> getAllTimeLogs() {
        return timeLogRepository.findAll();
    }

    public Optional<TimeLog> getTimeLogById(Long id) {
        return timeLogRepository.findById(id);
    }

    public List<TimeLog> getTimeLogsByUser(Long userId) {
        return timeLogRepository.findByUserId(userId);
    }

    public List<TimeLog> getTimeLogsByTask(Long taskId) {
        return timeLogRepository.findByTaskId(taskId);
    }

    public void deleteTimeLog(Long id) {
        timeLogRepository.deleteById(id);
    }
    
    public TimeLog startTimer(Long taskId, Long userId) {
        TimeLog log = new TimeLog();
        log.setTask(new Task(taskId)); // or fetch from DB if needed
        log.setUser(new User(userId));
        log.setStartTime(LocalDateTime.now());
        return timeLogRepository.save(log);
    }

    public TimeLog stopTimer(Long logId) {
        Optional<TimeLog> opt = timeLogRepository.findById(logId);
        if (opt.isEmpty()) throw new RuntimeException("Log not found");

        TimeLog log = opt.get();
        log.setEndTime(LocalDateTime.now());
        long minutes = Duration.between(log.getStartTime(), log.getEndTime()).toMinutes();
        log.setDuration((int) minutes);
        return timeLogRepository.save(log);
    }
    public Integer getTotalDurationByTask(Long taskId) {
        return timeLogRepository.getTotalDurationByTask(taskId);
    }

}
