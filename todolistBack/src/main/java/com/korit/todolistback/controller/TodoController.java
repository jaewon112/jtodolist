package com.korit.todolistback.controller;

import com.korit.todolistback.domain.TodoMapper;
import com.korit.todolistback.service.TodoService;
import com.korit.todolistback.todoDto.PutReqDto;
import com.korit.todolistback.todoDto.TodoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

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

    @PutMapping("/todos/{todoId}")
    public ResponseEntity<?> put(@RequestBody PutReqDto dto) {
        todoService.put(dto);
        return ResponseEntity.ok("수정 완료");
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        todoService.delete(id);
        return ResponseEntity.ok("삭제완료");
    }
    @DeleteMapping("/todos")
    public ResponseEntity<?> checkedDelete(@RequestBody List<Integer> ids) {
        System.out.println(ids);
        todoService.checkedDelete(ids);
        return ResponseEntity.ok("삭제완료");
    }
}
