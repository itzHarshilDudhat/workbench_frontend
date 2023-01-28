const Host = "http://localhost:8000";
// const Host = "https://workbench.onrender.com";
const Api = {
    User: {
        SignUp: `${Host}/signup`,
        Login: `${Host}/login`,
        ForgotPassword: `${Host}/forgotPassword`,
        ForgotChange: `${Host}/changeForgotPass`,
        ChangePassword: `${Host}/changePassword`,
        VerifyAccount: `${Host}/verifyAccount`,
        AddClient: `${Host}/addClient`,
        UpdateClient: `${Host}/updateClient`,
        AllClient: `${Host}/allClient`,
        ClientById: `${Host}/clientById`,
        DeleteClient: `${Host}/deleteClient`,
        AddGoods: `${Host}/addGoods`,
        AllGoods: `${Host}/allGoods`,
        AllGoodsByClient: `${Host}/allGoodsByClient`,
        DeleteGood: `${Host}/deleteGood`,
        UpdateGood: `${Host}/updateGood`,
    },
};

export { Api };
