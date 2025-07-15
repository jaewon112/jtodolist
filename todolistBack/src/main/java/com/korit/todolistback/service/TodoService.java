package com.korit.todolistback.service;

import com.korit.todolistback.domain.Todo;
import com.korit.todolistback.domain.TodoMapper;
import com.korit.todolistback.todoDto.TodoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoMapper todoMapper;

    public List<Todo> get() {

        return todoMapper.select();
    }

    public Integer post(TodoDto dto) {
        todoMapper.insert(dto.toEntity());
        return null;
    }
}
