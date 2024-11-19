var express = require('express');
var router = express.Router();
let Workout = require('../model/workout');

router.get('/', async (req, res, next) => {
    try {
        const WorkoutList = await Workout.find();
        res.render('index', {
            title: 'Home',
            WorkoutList: WorkoutList
        });
    } catch (err) {
        console.error(err);
        res.render('index', {
            error: 'Error on Server',
            WorkoutList: []
        });
    }
});

router.get('/home', async (req, res, next) => {
    try {
        const WorkoutList = await Workout.find();
        res.render('index', {
            title: 'Home',
            WorkoutList: WorkoutList
        });
    } catch (err) {
        console.error(err);
        res.render('index', {
            error: 'Error on Server',
            WorkoutList: []
        });
    }
});

router.get('/workoutlist', async (req, res, next) => {
    try {
        const WorkoutList = await Workout.find();
        res.render('Workout/list', {
            title: 'Workouts',
            WorkoutList: WorkoutList
        });
    } catch (err) {
        console.error(err);
        res.render('Workout/list', {
            error: 'Error on Server'
        });
    }
});
/*Create Operation */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Workout/add',{
            title: 'Add Workout'
        })
    }
    catch(err){
        console.error(err)
        res.render('Workout/list',{
            error:'Error on Server'})
    }
});
/*Create Operation */
router.post('/add',async(req,res,next)=>{
    try{
        let newWorkout = Workout({
            "Exercise":req.body.Exercise,
            "Sets":req.body.Sets,
            "Reps":req.body.Reps,
            "PRweight":req.body.PRweight
        })
        Workout.create(newWorkout).then(()=>{
            res.redirect('/workoutlist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Workout/list',{
            error:'Error on Server'})
    }
});
/*Update Operation */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const WorkoutToEdit=await Workout.findById(id);
        res.render('Workout/edit',{
            title: 'Edit Workout',
            Workout:WorkoutToEdit
        })
    }
    catch{
        console.error(err);
        next(err);
    }
});
/*Update Operation */
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id= req.params.id;
        let updatedWorkout = Workout({
            "_id":id,
            "Exercise":req.body.Exercise,
            "Sets":req.body.Sets,
            "Reps":req.body.Reps,
            "PRweight":req.body.PRweight
        })
        Workout.findByIdAndUpdate(id,updatedWorkout).then(()=>{
            res.redirect('/workoutlist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Workout/list',{
            error:'Error on Server'})
    }
});
/*Delete Operation */
router.get('/delete/:id',(req,res,next)=>{
    try{
        let id=req.params.id;
        Workout.deleteOne({_id:id}).then(()=>{
            res.redirect('/workoutlist')
        })
    }
    catch{
        console.error(err)
        res.render('Workout/list',{
            error:'Error on Server'})
    }
});
module.exports = router;