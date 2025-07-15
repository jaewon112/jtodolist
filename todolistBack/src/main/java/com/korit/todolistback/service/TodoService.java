package com.korit.todolistback.service;

import com.korit.todolistback.domain.Todo;
import com.korit.todolistback.domain.TodoMapper;
import com.korit.todolistback.todoDto.PutReqDto;
import com.korit.todolistback.todoDto.TodoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class TodoService {

    private final TodoMapper todoMapper;


    public List<Todo> get() {
        return todoMapper.select();
    }

    public Integer post(TodoDto dto) {
        todoMapper.insert(dto.toEntity());
        return null;
    }

    public Integer put(PutReqDto dto) {
        todoMapper.update(dto.toEntity());
        return null;
    }
}
