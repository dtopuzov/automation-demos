import LoginPage from '../pages/login.page';
import SecurePage from '../pages/secure.page';

describe('Login Spec', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    it('should login with valid credentials', async () => {
        await LoginPage.login('tomsmith', 'SuperSecretPassword!');
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining('You logged into a secure area!');
    });

    it('should login with invalid username', async () => {
        await LoginPage.login('wrongUsername', 'SuperSecretPassword');
        await expect(LoginPage.flashAlert).toHaveTextContaining('Your username is invalid!');
    });

    it('should login with invalid password', async () => {
        await LoginPage.open();
        await LoginPage.login('tomsmith', 'wrongPassword');
        await expect(LoginPage.flashAlert).toBeExisting();
        await expect(LoginPage.flashAlert).toHaveTextContaining('Your password is invalid!');
    });
});
