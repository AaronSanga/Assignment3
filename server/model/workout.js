// MVC --> Model , View , Controller (Routers)
let mongoose = require('mongoose')
// create a model class
let workoutModel = mongoose.Schema({
    Exercise:String,
    Sets:Number,
    Reps:Number,
    PRweight:Number
},
{
    collection:"Workout_Tracker"
}
)
module.exports = mongoose.model('Workout',workoutModel)