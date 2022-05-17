describe('Dynamic Spec', () => {
    it('should show dynamically displayed element', async () => {
        await browser.url('dynamic_loading/1');
        await $('#start button').click();
        await expect(await $('#finish h4')).toBeDisplayed();
    });
});
