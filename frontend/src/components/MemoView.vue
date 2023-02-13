<template>
    <div class="memo">
        <div class="act">
            <button class="btn btn-primary" @click="add()">+ 추가</button>
        </div>
        <ul>
            <li v-for="list in state.data" :key="list.id">
                <span>
                    {{ list.content }}
                    <div class="act">
                        <button class="btn btn-warning" @click="edit(list.id)">수정</button>
                        <button class="btn btn-danger" @click="remove(list.id)">삭제</button>
                    </div>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from "axios";

export default {    
    setup() {
        // 반응형 메모 데이터
        const state = reactive({
            data: []
        })

        // 메모 데이터 추가
        const add = () => {
            const content = prompt("내용을 입력하세요.");

            // 입력 메모 값이 없으면 경고창
            if(!content) {
                alert('내용을 입력하세요!');
                return add();
            }

            // state.data.push("추가!!")
            axios.post("/api/memos", { content }).then((res) => {
                state.data = res.data;
            })
        };

        // 메모 데이터 수정
        const edit = (id) => {
            const content = prompt("수정할 내용을 입력하세요.", state.data.find(list => list.id === id).content);
            // console.log(content);
            axios.put("/api/memos/" + id, { content }).then((res) => {
                state.data = res.data;
            }) 
        }

        // 메모 데이터 삭제
        const remove = (id) => {
            if (confirm('정말로 삭제하시겠습니까?')) {
                axios.delete("/api/memos/" + id).then((res) => {
                    state.data = res.data;
                })
            }
        }

        // 메모 데이터 전달 받아(GET) 화면에 출력
                    // http://localhost:3000/memos
        axios.get("/api/memos").then((res) => {
            state.data = res.data;
        })

        return {
            state,
            add,
            edit,
            remove
        };
    },
}
</script>

<style lang="scss" scoped>
.memo {
  .act {
    padding: 10px 10px 5px 5px;
    text-align: right;
  }
  ul {
    list-style: none;
    padding: 15px;
    margin: 0;
    li {
      padding: 15px;
      margin: 10px 0;
      border: 1px solid #eee;
    }
  }
}
span {
    display: flex;
    right: 100%;
}
</style>