import User from "../models/UserModel.js";


export const registerUser = async(req, res) =>{
    try {
        for (let index = 0; index < req.body.email.length; index++) {
            let user = {
                "email" : req.body.email[index]
            }
            await User.create(user);
        }
        res.status(204).json(null);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: "email has been registered"});
    }
}

export const assignTask = async(req, res) =>{
    try {
        await User.update(req.body,{
            where:{
                email: req.body.email
            }
        });
        res.status(204).json(null);
    } catch (error) {
        console.log(error.message);
    }
}

export const unassignTask = async(req, res) =>{
    try {
        const user = await User.findOne({
            where:{
                email: req.body.email
            }
        });

        var idx=0;
        for(var i=0;i<user.task.length;i++){
            if(user.task[i] == req.body.task){
                idx=i;
                break;
            }
        }
        if(idx == 0)
            res.status(500).json({msg: "Task Not Found in this user"});
        else
            user.task.splice(idx,1);
        

        let newTask = {
            "task" : user.task
        }

        await User.update(newTask,{
            where:{
                email: req.body.email
            }
        });

        res.status(204).json(null);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: error.message});
    }
}

export const commonTask = async(req, res) =>{
    try {
        let user =[];
        let un = [];
        for(var i=0;i<req.body.email.length;i++){
            user[i] = await User.findOne({
                where:{
                    email: req.body.email[i]
                }
            });
            
            un[i] = [...new Set([...user[i].task])]
        }
        un = [].concat(...un)
        
        for (let i = 0; i <= un.length; i++) {
            for (let j = 0; j < i; j++) {
                if (un[i] == un[j]) {
                    un.splice(i,1)
                }
            }
        }
        console.log(un)
        res.status(200).json({tasks : un});
    } catch (error) {
        console.log(error.message);
    }
}
