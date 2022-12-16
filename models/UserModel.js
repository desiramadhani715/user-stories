import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('users',{
    email: DataTypes.STRING,
    task: {type: DataTypes.JSON , allowNull : true}
},{
    freezeTableName:true
});

export default User;

(async()=>{
    await db.sync();
})();