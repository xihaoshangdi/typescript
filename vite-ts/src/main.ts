enum Permissions {
    read = 1 << 0,
    write = 1 << 1,
    insert = 1 << 2,
    delete = 1 << 3
}

// 基本用户 读写权限
const userAuth = Permissions.read | Permissions.write
// 管理员 添加删除权限
const manageAuth = Permissions.insert | Permissions.delete
// 超级账户
const admin = manageAuth | userAuth
// 降级超级账户的权限
const root = admin & (~Permissions.insert)
// 检验权限
const checkAuth = (role:number, auth:number) => (role & auth) === auth

console.log(checkAuth(root, Permissions.insert))
export {};
