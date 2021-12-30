import React, { useState } from 'react';
import { Alert, StyleSheet, View, AlertButton } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existingTast = tasks.find(task => task.title === newTaskTitle);
    if (existingTast) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome.');
    }
    setTasks([...tasks, { id: new Date().getTime(), title: newTaskTitle, done: false }]);
  }

  function handleToggleTaskDone(id: number) {
    const oldTasks = tasks.map(task => ({ ...task }));
    const newTask = oldTasks.find(task => task.id === id);
    if (newTask) {
      const updatedTasks = oldTasks.filter(task => task.id !== id);
      newTask.done = !newTask?.done;
      setTasks([...updatedTasks, newTask]);
    }
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const oldTasks = tasks.map(task => ({ ...task }));
    const newTask = oldTasks.find(task => task.id === Number(taskId));
    if (newTask) {
      const updatedTasks = oldTasks.filter(task => task.id !== taskId);
      newTask.title = taskNewTitle;
      setTasks([...updatedTasks, newTask]);
    }
  }


  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não',
      }, {
        style:'destructive',
        text: 'Sim',
        onPress: () => {
          const filteredTasts = tasks.filter(t => t.id !== id);
          setTasks(filteredTasts);
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})