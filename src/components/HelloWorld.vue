<script setup>
import { ref, computed } from 'vue'

// 1. 原始任务列表（数据一直都在，筛选只是显示层面过滤）
const todoList = ref([
  { id: 1, text: '学习Vue基础语法', done: true },
  { id: 2, text: '完成待办清单实战', done: false },
  { id: 3, text: '接入Element Plus组件库', done: false }
])

// 2. 输入框内容
const newTask = ref('')
let nextId = 4

// 3. 筛选状态：all=全部，active=未完成，done=已完成
const filterStatus = ref('all')

// 4. 计算属性：根据筛选状态，自动返回要显示的任务列表
const filteredList = computed(() => {
  if (filterStatus.value === 'active') {
    // 只返回未完成的
    return todoList.value.filter(item => !item.done)
  } else if (filterStatus.value === 'done') {
    // 只返回已完成的
    return todoList.value.filter(item => item.done)
  } else {
    // 返回全部
    return todoList.value
  }
})

// 添加任务
function addTodo() {
  const text = newTask.value.trim()
  if (!text) return
  todoList.value.push({
    id: nextId,
    text: text,
    done: false
  })
  newTask.value = ''
  nextId = nextId + 1
}

// 删除任务
function delTodo(index) {
  // 注意：筛选后显示的下标和原数组不一致，按id删除更稳妥
  const task = filteredList.value[index]
  const realIndex = todoList.value.findIndex(item => item.id === task.id)
  todoList.value.splice(realIndex, 1)
}
</script>

<template>
  <el-card class="todo-card">
    <template #header>
      <div class="card-header">
        <span>我的待办清单</span>
        <span class="total">共 {{ todoList.length }} 条</span>
      </div>
    </template>

    <!-- 筛选区：单选按钮组 -->
    <el-radio-group v-model="filterStatus" size="small">
      <el-radio label="all">全部</el-radio>
      <el-radio label="active">未完成</el-radio>
      <el-radio label="done">已完成</el-radio>
    </el-radio-group>

    <el-divider />

    <!-- 新增任务区 -->
    <div class="add-row">
      <el-input
        v-model="newTask"
        placeholder="输入新任务..."
        @keyup.enter="addTodo"
        clearable
      />
      <el-button type="primary" @click="addTodo">
        添加
      </el-button>
    </div>

    <!-- 空状态 -->
    <el-empty
      v-if="filteredList.length === 0"
      description="当前分类下暂无任务～"
    />

    <!-- 任务列表：循环的是筛选后的列表 -->
    <ul v-else class="todo-list">
      <li
        v-for="(item, index) in filteredList"
        :key="item.id"
        class="todo-item"
      >
        <!-- 复选框：双向绑定完成状态，勾选自动切换 -->
        <div class="task-left">
          <el-checkbox v-model="item.done" />
          <span class="task-text" :class="{ done: item.done }">
            {{ item.text }}
          </span>
        </div>

        <div class="task-right">
          <!-- 状态标签：根据完成状态显示不同颜色 -->
          <el-tag :type="item.done ? 'success' : 'info'" size="small">
            {{ item.done ? '已完成' : '未完成' }}
          </el-tag>
          <el-button type="danger" size="small" plain @click="delTodo(index)">
            删除
          </el-button>
        </div>
      </li>
    </ul>
  </el-card>
</template>

<style scoped>
.todo-card {
  max-width: 560px;
  margin: 40px auto;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total {
  color: #909399;
  font-size: 14px;
}
.add-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}
.todo-item:last-child {
  border-bottom: none;
}
.task-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.task-text {
  font-size: 15px;
  color: #303133;
}
.task-text.done {
  text-decoration: line-through;
  color: #c0c4cc;
}
.task-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
