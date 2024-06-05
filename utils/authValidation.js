import bcrypt from 'bcrypt'

export const hashPassword = async(password) =>
{
    try
    {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch(error)
    {
        console.log(`hashed password error = ${error}`);
    }
};

export const comparedPassword = async(password, hashedPassword) =>
{
    return await bcrypt.compare(password, hashedPassword);
};

export const checkCapital = (name) =>
{
    const nameStr = name.charAt(0).toUpperCase() + name.slice(1);
    return nameStr;
}

export const checkEmail = (email) =>
{
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return emailFormat;
}

export const checkPassword = (password) =>
{
    const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
    return passwordFormat;
}