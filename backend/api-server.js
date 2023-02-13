const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const database = require("./database");

app.use(bodyParser.json());

// 메모 데이터 Front로 전송
app.get('/api/memos', async (req, res) => {
  const result = await database.run("SELECT * FROM memos ORDER BY content ASC");
  res.send(result)
});

// 메모 데이터 DB에 추가하고 Front로 전송(POST)
app.post("/api/memos", async (req, res) => {
    await database.run(`INSERT INTO memos(content) VALUES(?)`, [req.body.content]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
});


// 작성된 메모 데이터 수정(PUT)
app.put("/api/memos/:id", async(req, res) => {
    await database.run(`UPDATE memos SET content = ? WHERE id = ?`, [req.body.content, req.params.id]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
})

// 작성된 메모 데이터 삭제(DELETE)
app.delete("/api/memos/:id", async(req, res) => {
    await database.run(`DELETE FROM memos WHERE id = ?`, [req.params.id]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})