const Host = "http://localhost:8000";
// const Host = "https://workbench.onrender.com";
const Api = {
    User: {
        SignUp: `${Host}/signup`,
        Login: `${Host}/login`,
        ForgotPassword: `${Host}/forgotPassword`,
        ForgotChange:`${Host}/changeForgotPass`,
        ChangePassword:`${Host}/changePassword`,
        VerifyAccount:`${Host}/verifyAccount`
    },
};

export { Api };
