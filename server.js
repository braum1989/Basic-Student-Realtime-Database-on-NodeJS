import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import express  from 'express';
import bodyParser  from "body-parser";

var app2 = express();
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({extended: true}));
var server = app2.listen(8080, console.log('server is running on port 8080'));

const firebaseConfig = {
    //lagay database
    databaseURL: "https://studentrecords-dc0db-default-rtdb.firebaseio.com"
}
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//create
app2.post('/api/create', (req,res) => {
    var studentID = req.body.studentID;

    try {
        console.log('>>>> studentID', studentID)
        console.log('path', 'students/' + studentID)
        set(ref(db, 'students/' + studentID), {
            lastName: "Morales",
            firstName: "Briant",
            section: "CS-402"
        })
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'Successful'
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})


//get
app2.get('/api/get', (req, res) => {
    try {
        get(ref(db, 'students'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if( snapshot.exists() ) {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'Successful',
                    Result: snapshot.val()
                })
            }
            else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'Successful',
                    Result: 'Data Not Found'
                })
            }
        })
        .catch((err2) => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//get by studentID
app2.post('/api/studentID', (req, res) => {
    var studentID = req.body.studentID

    try {
        get(ref(db, 'students/' + studentID))
        .then((snapshot) => {
            console.log(snapshot.val())
            if( snapshot.exists() ) {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'Successful',
                    Result: snapshot.val()
                })
            }
            else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'Successful',
                    Result: 'Data Not Found'
                })
            }
        })
        .catch((err2) => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//update
app2.put('/api/update', (req, res) => {
    var studentID = req.body.studentID
    var lastName = req.body.lastName
    var firstName = req.body.firstName
    var section = req.body.section

    try {
        var updates = {};
        updates[`students/${studentID}/lastName`] = lastName;;
        updates[`students/${studentID}/firstName`] = firstName;
        updates[`students/${studentID}/section`] = section;

        update(ref(db), updates)
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'Successful'
            })
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'Not Successful' + err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//delete
app2.delete('/api/delete', (req, res) => {
    var studentID = req.body.studentID

    try {
        remove(ref(db, "students/"+studentID))
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'Successful'
            })
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'Not Successful' + err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})