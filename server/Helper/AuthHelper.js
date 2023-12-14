import bcrypt from 'bcrypt';


export const passwordHash = async (plainPassword) => {
    const saltRounds = 10;
    try {
        return bcrypt.hash(plainPassword, saltRounds);
    }
    catch (error) {
        console.log(error);
    }
}

export const comparePasswordAndHashPassword = (plainPassword, hasPassword) => {
    return bcrypt.compare(plainPassword, hasPassword);
}