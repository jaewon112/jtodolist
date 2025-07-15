import React, { use, useEffect, useRef, useState } from 'react';
import {todoDelete, todoCheckDelete as todoPost, todoPut, todoCheckDelete} from './axios/api'
import { todoGetQuery } from './axios/todoQuery';

function Todo(props) {

    const [ todos, setTodos ] = useState([]);
    const [ value, setValue ] = useState("");
    const [ checkedAll, setCheckedAll ] = useState(false);
    const [ selectedModifyId, setSelectedModifyId ] = useState(0);
    const [ modifyInputValue, setModifyInputValue] = useState(0);



    // useState 를 사용해서 ID 값 증가
    // const [ id1, setId1 ] = useState(0);
    // const saveTodo = () => {
    //     const todo = {
    //         id: id1,
    //         content: value,
    //     }
    //     setTodos(prev => [...prev, todo])
    //     setId1(prev => prev + 1)
    // }

    //useRef로 ID 값 증가
    // const id2 = useRef(0)
    // const saveTodo = () => {
    //     const todo = {
    //         id: id2.current,
    //         content: value,
    //     }
    //     setTodos(prev => [...prev, todo])
    //     id2.current++;
    //     // id2.current += 1;
    // }

    
    const id2 = useRef(0)

    const getQuery = todoGetQuery();

    const todoList = getQuery.isFetched ? getQuery.data.data : [];
    
    useEffect(() => {
        setTodos([])
        if (todoList.length < 1) {
            return
        }
        todoList.map((todo) => {
            const temp = {
                id: todo.todoId,
                content: todo.content,
                date: todo.date,
                checked: false
            }
            setTodos(prev => [...prev,temp])
        })
    }, [todoList])

    const saveTodo = async () => {
        await todoPost({content: value})
        await getQuery.refetch();
    }
    
    useEffect(() => {
        if (todos.length > 0) {
            if (todos.reduce((prev, current) => prev && current.checked, true)) {
                setCheckedAll(true);
            } else {
                setCheckedAll(false);
            }
        }
    }, [todos])
    
    const handleCheckAllOnChange = e => {
        setTodos(prev => prev.map(todo => ({
            ...todo,
            checked: e.target.checked,
        })))
    }
    
    const handleCheckOnChange = (e, todoId) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    checked: !todo.checked,
                }
            }
            return todo;
        }))
    }
    
    const handleSelectedRowsDeleteOnClick = () => {
        setTodos(prev => prev.filter(todo => !todo.checked ))
        todoCheckDelete({data: todos.filter(todo=> todo.checked).map(checkedTodo => checkedTodo.id)})
    }
    
    const resetSelectedModifyId = () => {
        setSelectedModifyId(0);
    }
    
    const handleModifyOnClick = (e, todoId) => {
        setSelectedModifyId(todoId),
        setModifyInputValue(todos.find(todo => todo.id === todoId).content)
    }
    
    const handleModifyInputOnChange = e => {
        setModifyInputValue(e.target.value)
    }
    
    const handleModifyOkOnClick = async () => {
        const putObject = {
            todoId: selectedModifyId,
            content: modifyInputValue    
        }
        todoPut(putObject);
        
        resetSelectedModifyId();
        await getQuery.refetch();
    }
    
    const handleModifyCancleOnClick = () => {
        resetSelectedModifyId();
    }
    
    
    return (
        <div>
            <header>
                <input type="text" value={value} autoFocus 
                onChange={e => setValue(e.target.value)} onKeyDown={e => {if (e.keyCode === 13) saveTodo(); }} />
                <h2>{value}</h2>
                <button onClick={saveTodo}>확인</button>
                <button onClick={ handleSelectedRowsDeleteOnClick }>선택삭제</button>
            </header>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={checkedAll} onChange={handleCheckAllOnChange} /></th>
                        <th>번호</th>
                        <th>내용</th>
                        <th>날짜</th>
                        <th>수정</th>
                        {
                            selectedModifyId !== 0 ?
                            <></>
                            :
                            <th>삭제</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((todo) =>(
                            <tr key={todo.id}>
                                <td><input type="checkbox" checked={todo.checked} onChange={(e) => handleCheckOnChange(e, todo.id)} /></td>
                                <td>{todo.id}</td>
                                <td>{selectedModifyId !== todo.id ? todo.content : <input autoFocus value={modifyInputValue} onChange={handleModifyInputOnChange} onKeyDown={e => {if (e.keyCode === 13 )handleModifyOkOnClick()}}/> }</td>
                                <td>{todo.date}</td>
                                <td>
                                    {
                                        selectedModifyId !== todo.id ?
                                        <button onClick={e => handleModifyOnClick(e, todo.id)}>수정</button>
                                        :
                                        <>
                                            <button onClick={handleModifyOkOnClick}>확인</button>
                                            <button onClick={handleModifyCancleOnClick}>취소</button>
                                        </>
                                    }
                                </td>
                                    {
                                        selectedModifyId !== 0 ? (
                                            <></>
                                        )
                                        :
                                        (
                                            <td>
                                                <button onClick={
                                                    async () => 
                                                        {
                                                            await todoDelete(todo.id)
                                                            await getQuery.refetch()
                                                        }}
                                                    >삭제</button>
                                            </td>
                                        )
                                    }
                                    
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Todo;