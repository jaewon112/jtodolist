package com.korit.todolistback.todoDto;

import com.korit.todolistback.domain.Todo;
import lombok.Data;

@Data
public class PutReqDto {
    private Integer todoId;
    private String content;

    public Todo toEntity() {
        return Todo.builder()
                .todoId(todoId)
                .content(content)
                .build();
    }
}
