import decode from 'jwt-decode';
const CheckAdminAuth = () => {
    const token = localStorage.getItem('Token');
    if (!token) return false;
    try {
        const { exp } = decode(token, { complete: true });
        if (exp < new Date().getTime()) {
            return true;
        }
    } catch (e) {
        return false;
    }

    return true;
};

export default CheckAdminAuth;
