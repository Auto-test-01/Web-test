export class LoginPage {

    baseURL = "https://dp.isurvey.mobi/TESTSITE";
    locatorUserName = "#username-textfield-inputEl";
    locatorPassword = "#password-textfield-inputEl";
    locatorLoginButton = "#login-button";
    locatorErrorPopup = "#error-popup";
    lastResponseBody = null;

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto(this.baseURL);
    }
    async fillUserNameAndPassword(username, password) {
        await this.page.locator(this.locatorUserName).fill(username);
        await this.page.locator(this.locatorPassword).fill(password);    
    }

    async waitForLoginResponse() {
        this.lastResponseBody = null;
        await this.page.waitForResponse(async response => {
            const body = await response.json().catch(() => null);
            if (body && Object.prototype.hasOwnProperty.call(body, 'success')) {
                this.lastResponseBody = body;
                return true;
            }
            return false;
        });
    }

    async clickLoginButton() {
        await Promise.all([
            this.page.locator(this.locatorLoginButton).click(),
            this.waitForLoginResponse(),
        ]);
        await this.page.waitForURL(/main\.php/);
    }
    
    async getUsername(){
        const value = await this.page.locator(this.locatorUserName).inputValue();
        // console.log(value);
        return value ;
    }
    async getPassword(){
        const value = await this.page.locator(this.locatorPassword).inputValue();
        // console.log(value);
        return value ;
    }
    async checkResponse(){
        const result = { success: this.lastResponseBody?.success === true ,
                         message: this.lastResponseBody?.message?.split(' ')[0] || '' };
        console.log('checkResponse:', this.lastResponseBody);
        return result;
    }
}