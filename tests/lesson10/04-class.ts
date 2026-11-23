class LoginPage5 {
    usernameLoc: string;
    passwordLoc: string;

    constructor(param1: string, param2: string) {
        this.usernameLoc = param1;
        this.passwordLoc = param2;
    }

    fillUsername(username: string) {
        console.log(` Nhập thông tin username: ${username}`);
    }

    fillPassword(password: string) {
        console.log(` Nhập thông tin username: ${password}`);
    }

    clickRememberMe() {
        console.log(`Click Remember Me`);
    }

    clickBtnLogin() {
        console.log(`Click btn Login`);
    }

}

// kế thừa thông qua từ khóa extend
class DashBoardPage5 extends LoginPage5 {
    headingLoc: string;

    constructor(headingLoc: string, param1: string, param2: string) {
        super(param1, param2);
        this.headingLoc = headingLoc;
    }

    clickMenu(menuName: string) {
        console.log(`In ra menuName ${menuName}`);
    }
}

const dashBoardPageObj = new DashBoardPage5("A", "B", "C");
dashBoardPageObj.clickMenu("Hiệu Sách")
dashBoardPageObj.fillUsername("Hien");
dashBoardPageObj.fillPassword("123631111");








