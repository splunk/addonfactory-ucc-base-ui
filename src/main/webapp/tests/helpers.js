export function mockCustomMenu() {
    class MockCustomRenderable {
        navigator;

        render() {
            // doing some magic with the target element
        }
    }

    const mockCustomMenuInstance = new MockCustomRenderable();
    jest.mock(
        '/custom/CustomMenu.js',
        () => (globalConfig, target, navigator) => {
            mockCustomMenuInstance.navigator = navigator;
            return mockCustomMenuInstance;
        },
        { virtual: true }
    );
    jest.mock('/custom/Hook.js', () => () => {}, { virtual: true });
    jest.mock('/custom/PrivateEndpointInput.js', () => () => new MockCustomRenderable(), {
        virtual: true,
    });

    return {
        mockCustomMenuInstance,
    };
}
