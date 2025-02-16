const express = require("express")


const APP = express()

APP.use(express.json())


const users = [
    {id: 1, user: "hossame hamedani", date: Date.now(), email: "ho@ho.com"},
    {id: 2, user: "haha hamedani", date: Date.now(), email: "ha@ha.com"},
    {id: 3, user: "hihi hamedani", date: Date.now(), email: "hi@hi.com"}
]

APP.get("/", (req, res) => {
    return res.status(200).send({"messaage": "Hossame Says I'm Berkani !"})
})


APP.get("/api/v1/users", (req, res) =>  {
    if(users.length <= 0) {
        return res.status(404).send("<h1 style='color: #F00;'>You Have No Users In Database !</h1>")
    }

    return res.status(200).send(users)
})




APP.get("/api/v1/users/:id", (req, res) => {
    const user = users.find((user) => parseInt(user.id) === parseInt(req.params.id));
    
    if (user) {
        return res.status(200).send(user);
    } else {
        return res.status(404).send(`No User With id ${req.params.id} Exists in DB!`);
    }
});






APP.post("/api/v1/users/:id", (req, res) => {
    const user = users.find((user) => parseInt(user.id) === parseInt(req.params.id));
    
    if (!user) {
        const {id, user, email, date} = req.body
        const newUser = {id: id, user: user, email: email, date: date}
        users.push(newUser)
        return res.status(200).send("User Created Successfully !")
     
    } else {
        return res.status(500).send(`User With id ${req.params.id} Exists in DB!`);
    }
});




const PORT = process.env.PORT_HOSSAME || 3000

const USER_APP = process.env.USER_APP || "Ho"

APP.listen(PORT, () => {
    console.log(`

                ${"#".repeat(20)}
                    - USER: ${USER_APP}

                    - PORT: ${PORT}

                NOTE: Your Application Is Running Succeffully !

                    - URL: http://localhost:${PORT}
                ${"#".repeat(20)}
        
        `)
})
