package com.korit.todolistback.domain;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodoMapper {
    List<Todo> select ();
    int insert(Todo todo);

    int update(Todo todo);

    int delete(Integer todoId);

    int checkedDelete(List<Integer> todoIds);
}
