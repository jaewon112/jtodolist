package com.korit.todolistback.todoDto;

import com.korit.todolistback.domain.Todo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
public class TodoDto {

    private String content;


    public Todo toEntity() {
        System.out.println(new Date());
        return Todo.builder()
                .content(content)
                .date(LocalDate.now())
                .build();
    }
}
