const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to Mongodb...'))
    .catch(err => console.log("Could not connect to Mongodb", err));

const courseSchema = new mongoose.Schema({
    // _id: String,
    name: String,
    author: String,
    tags: [ String ],
    date: { type:Date, default:Date.now },
    isPublished: Boolean,
    price: Number

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

async function updateCourse(id){
    // Approach: Query First
    // findById()
    // Modify it's properties
    // save()

    // const course = await Course.findById(id);
    // if (!course) return;
    // course.isPublished = true;
    // course.author = 'Another Author';
    // const result = await course.save();
    // console.log(result);

    // Approach: Update First
    // Update directly
    // Optionally: get the updated document

    const course = await Course.findByIdAndUpdate( id, {
        $set:{
            author:"Samira",
            isPublished:false
        }
    },
    { new:true }
    );
    console.log(course);

}


async function removeCourse(id){

    // const result = await Course.deleteOne({ _id:id })
    const course = await Course.findByIdAndRemove(id)
    console.log(course);

}

// getCourses();
// createCourse();
// updateCourse('5e32c6eb3a48ac582d4cfbf7');
removeCourse("5e32c69aa2c34b572cca19da")