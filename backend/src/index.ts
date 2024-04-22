import app from "./app"
import "./db/mongoose"

const PORT = parseInt(process.env.PORT!) || 5000

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
})