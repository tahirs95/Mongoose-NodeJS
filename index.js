const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to Mongodb...'))
    .catch(err => console.log("Could not connect to Mongodb", err));

const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags: [ String ],
    date: { type:Date, default:Date.now },
    isPublished: Boolean

});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name:"Angular Course",
        author:"Mosh",
        tags:['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses(){
    const pageNumber = 1;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10
    const courses = await Course
    // .find()
    // .and([{name:"Node JS Course"}, {isPublished:true}])
    // .find({author:"Mosh"})
    // .find({name: /angular/i})
    .find({'name': /.*JS.*/})
    .skip((pageNumber-1) * pageSize)
    // .find({price: { $gt: 10, $lte: 20 }})
    // .find({price: { $in: [10,15,20] }})
    .limit(pageSize)
    .sort({ name: 1}) // 1 for ascending, -1 for descending
    // .count()
    .select({name:1, date:1});
    console.log(courses);
}

getCourses();
// createCourse();


