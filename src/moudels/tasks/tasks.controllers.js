import { Task } from "../../../db/models/task.model.js";
import { Category } from "../../../db/models/categories.model.js";
import { ListItem } from "../../../db/models/task.model.js";
import ErrorClass from "../../utils/error-class.js";


export const createTask = async (req, res, next) => {
    const userId = req.user.id 
    const categoryId = req.params
    const {title , type , textBody , visibility} = req.body

    // if task type is text
    if (req.body.type === 'text') {
        // perpare task object
       const task = new Task({
        title,
        type,
        textBody,
        visibility,
        creator: userId,
        category: categoryId.id
       })
       // save task
       await task.save();
       // find category and push task
       const category = await Category.findById(categoryId.id);
       category.tasks.push(task);
       await category.save();
   
     
       return res.json({message:'Text task created:', task});       

    }
    // if task type is list
    if (req.body.type === 'list') {
        // perpare task object
        const task = new Task({
            title,
            type,
            visibility,
            creator: userId,
            category: categoryId.id
           })
           // save task
           await task.save();
           // loop to create list items and push to task
           for (let i = 0; i < textBody.length; i++) {
            const listItem = new ListItem({
              textBody: textBody[i],
              task: task._id,
            });
            await listItem.save();
             task.listItems.push(listItem);      
             }
             // save task
             await task.save();
          
            // find category and push task
           const category = await Category.findById(categoryId.id);
           category.tasks.push(task);
           await category.save();
        
          return res.json({message:'List task created:', task});
    }
    return next(new ErrorClass('failed to create task', 404));
}


export const getPrivateTasks = async (req, res,next) => {
    const userId = req.user.id
    const tasks = await Task.find({creator: userId, visibility: 'private'},{__v:0})
    .populate('category', 'name -_id')
    .populate('listItems', 'textBody -_id')
    .populate('creator', 'name -_id')
    if (!tasks) return next(new ErrorClass('Tasks not found', 404))
    res.status(200).json({
        tasks
    })
}

export const deleteTask = async (req, res,next) => {
    const { id } = req.params
    const task = await Task.findByIdAndDelete(id)
    if (!task) return next(new ErrorClass('Task not found', 404))
    res.status(200).json({
        message : "Task deleted successfully"
    })
}


export const updateTask = async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true })
    if (!task) return next(new ErrorClass('Task not found', 404))
    res.status(200).json({
        message : "Task updated successfully",
        task
    })
}

// filter and sort
export const filterTasks = async (req, res, next) => {
    const {name,visibility,sortBy}= req.body
    const userId = req.user.id
    const match = {};
    const sort = {};

    // Filter by shared option (Public/Private)
    if (visibility) { 
        match.visibility = visibility;
    }

    // Filter by category name
    if (name) {
        const category = await Category.findOne({ name});
        if (category) {
            match.category = category._id;
            console.log(match);
        } else {
            return res.status(404).send({ error: 'Category not found' });
        }
    
    }

    // Sort by date
    if (sortBy) {
        const [key, order] = sortBy.split(':');
        sort[key] = order === 'desc' ? -1 : 1;    
    } 
   
    // find tasks
     const tasks = await Task.find({ ...match, creator: userId })
            .populate('category', 'name -_id')
            .populate('listItems', 'textBody -_id')
            .populate('creator', 'name -_id')
            .sort(sort);
     if (!tasks) return next(new ErrorClass('Tasks not found', 404))
        
       return res.json(tasks);

}