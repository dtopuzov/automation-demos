describe('Dynamic Spec', () => {
    it('should show dynamically created element', async () => {
        await browser.url('dynamic_loading/2');
        await $('#start button').click();
        await expect(await $('#finish h4')).toBeDisplayed();
    });
});
