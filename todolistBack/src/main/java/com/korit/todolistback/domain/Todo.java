package com.korit.todolistback.domain;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Todo {

    private Integer todoId;
    private String content;
    private LocalDate date;
}
