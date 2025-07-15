package com.korit.todolistback.domain;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodoMapper {
    List<Todo> select ();
    int insert(Todo todo);
}
