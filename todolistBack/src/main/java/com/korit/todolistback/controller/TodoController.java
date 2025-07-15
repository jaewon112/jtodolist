package com.korit.todolistback.controller;

import com.korit.todolistback.domain.TodoMapper;
import com.korit.todolistback.service.TodoService;
import com.korit.todolistback.todoDto.TodoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TodoController {

    private final TodoMapper todoMapper;
    private final TodoService todoService;

    @GetMapping("/todos")
    public ResponseEntity<?> get() {
        return ResponseEntity.ok(todoService.get());
    }

    @PostMapping("/todos")
    public ResponseEntity<?> post(@RequestBody TodoDto dto) {
        System.out.println(dto);
        todoService.post(dto);
        return ResponseEntity.ok("등록완료");
    }
}
