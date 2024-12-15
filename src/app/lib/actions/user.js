// like index.js

import User from "../models/user.model";
import {connectionOfDb} from "../mongodb/mongoose"

export const createOrUpdateUser = async(id,first_name,last_name,image_url,email_addresses) => {

    try {
        await connectionOfDb()
        const user = await User.findByIdAndUpdate(
            {clerkId:id},
            {
                $set:{
                    firstName : first_name,
                    lastName : last_name,
                    ProfilePictures : image_url,
                    email : email_addresses[0].email_address
                },
            },{
                upsert:true,
                new:true
            }
        )
        return user
    } catch (error) {
        console.log('Could Not create or Update user',error)
    }
}

export const deleteUser = async(id) => {
    try {
        await connectionOfDb()
        await User.findOneAndDelete({clerkId:id})

    } catch (error) {
        console.log('Could Not delete user',error)
    }
}
